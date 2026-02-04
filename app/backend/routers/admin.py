from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, status, Request
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from typing import List, Dict, Any, Optional
import csv
import io
import json
import os
import logging
import re
import hashlib
from datetime import datetime
from urllib.parse import urlparse, parse_qsl, urlencode
from sqlalchemy import text as sql_text, func

from database import get_db, Resource, User, Bookmark, create_tables, engine, ResourceTranslation
from translation_service import translation_service, SUPPORTED_LANGUAGES
from auth_middleware import require_admin_user
from cache_service import cache
from rate_limit_service import limiter, RATE_LIMIT_AI_PER_MINUTE

router = APIRouter()
logger = logging.getLogger(__name__)
ADMIN_DEBUG = os.environ.get("ADMIN_DEBUG", "false").lower() == "true"

async def trigger_demo_user_recommendations(db: Session) -> Dict[str, Any]:
    """
    Trigger AI-generated recommendations for demo users only after resources are uploaded.
    This ensures demo users have fresh recommendations when new resources are available.
    """
    logger.info("🎭 DEMO RECOMMENDATIONS: Starting recommendation generation for demo users")
    
    try:
        # Get all demo users who are onboarded
        demo_users = db.query(User).filter(
            User.is_demo_user == True,
            User.is_onboarded == True,
            User.survey_responses.isnot(None)
        ).all()
        
        if not demo_users:
            logger.info("🎭 DEMO RECOMMENDATIONS: No onboarded demo users found")
            return {"processed": 0, "errors": []}
        
        logger.info(f"🎭 DEMO RECOMMENDATIONS: Found {len(demo_users)} onboarded demo users")
        
        processed_count = 0
        errors = []
        
        # Import the recommendation functions
        from recommender_llm import generate_priority_categories_llm, generate_all_priority_resources_llm
        
        for user in demo_users:
            try:
                logger.info(f"🎭 DEMO RECOMMENDATIONS: Processing user {user.email}")
                
                # Get user's survey responses
                answers = user.survey_responses or {}
                if not answers:
                    logger.warning(f"🎭 DEMO RECOMMENDATIONS: User {user.email} has no survey responses, skipping")
                    continue
                
                # Regenerate priority categories
                cats_result = await generate_priority_categories_llm(answers)
                priority_categories = cats_result.get("categories", [])
                logger.info(f"🎭 DEMO RECOMMENDATIONS: Generated {len(priority_categories)} categories for {user.email}")
                
                # Pre-generate ALL priority resources for all categories
                priority_resources = {}
                if priority_categories:
                    logger.info(f"🎭 DEMO RECOMMENDATIONS: Generating resources for {user.email}")
                    priority_resources = await generate_all_priority_resources_llm(db, answers, priority_categories)
                    logger.info(f"🎭 DEMO RECOMMENDATIONS: Generated {len(priority_resources)} resource sets for {user.email}")
                
                # Update user's onboarding profile with new recommendations
                profile = dict(user.onboarding_profile or {})
                profile["priority_categories"] = priority_categories
                profile["priority_resources"] = priority_resources
                profile["recommendations_updated_at"] = datetime.utcnow().isoformat()
                
                user.onboarding_profile = profile
                processed_count += 1
                
                # Trigger translation of category subtitles for demo user
                if priority_categories:
                    try:
                        from translation_service import translation_service
                        from routers.onboarding import start_category_subtitle_translation_task
                        logger.info(f"🌐 TRANSLATION: Starting translation for {len(priority_categories)} category subtitles for demo user {user.id}")
                        import asyncio
                        asyncio.create_task(start_category_subtitle_translation_task(user.id, priority_categories))
                        logger.info(f"🌐 TRANSLATION: Translation task created for category subtitles for demo user {user.id}")
                    except Exception as e:
                        logger.warning(f"🌐 TRANSLATION: Failed to start category subtitle translation for demo user {user.id}: {e}")
                
                logger.info(f"🎭 DEMO RECOMMENDATIONS: ✅ Successfully updated recommendations for {user.email}")
                
            except Exception as e:
                error_msg = f"Failed to update recommendations for {user.email}: {str(e)}"
                logger.error(f"🎭 DEMO RECOMMENDATIONS: ❌ {error_msg}")
                errors.append(error_msg)
        
        # Commit all changes
        if processed_count > 0:
            db.commit()
            logger.info(f"🎭 DEMO RECOMMENDATIONS: ✅ Successfully committed recommendations for {processed_count} demo users")
        
        return {
            "processed": processed_count,
            "errors": errors,
            "total_demo_users": len(demo_users)
        }
        
    except Exception as e:
        db.rollback()
        error_msg = f"Failed to trigger demo user recommendations: {str(e)}"
        logger.error(f"🎭 DEMO RECOMMENDATIONS: ❌ {error_msg}")
        return {
            "processed": 0,
            "errors": [error_msg],
            "total_demo_users": 0
        }

# Canonical category definitions
CANONICAL_CATEGORIES = [
    "Community/Belonging",
    "Culture/Leisure",
    "ESL/Immigrant",
    "Education/Youth",
    "Living/Essentials",
    "Work/Business",
]

def normalize_category_name(raw: str) -> Optional[str]:
    """Normalize any incoming category label to one of six canonical names.

    Accepts common variants like ampersands, spaces, or alternate wording.
    Returns None if the input is empty or unrecognized.
    """
    if not raw:
        return None
    value = clean_text(raw).lower()
    # Common variants mapping
    mapping = {
        # Living Essentials
        "living essentials": "Living/Essentials",
        "living/essentials": "Living/Essentials",
        "living & essentials": "Living/Essentials",
        "essentials": "Living/Essentials",

        # Education & Youth
        "education & youth": "Education/Youth",
        "education/youth": "Education/Youth",
        "education youth": "Education/Youth",
        "education": "Education/Youth",

        # ESL and Immigrant Support
        "esl and immigrant support": "ESL/Immigrant",
        "esl/immigrant": "ESL/Immigrant",
        "esl immigrant": "ESL/Immigrant",
        "immigrant": "ESL/Immigrant",
        "esl": "ESL/Immigrant",

        # Community & Belonging
        "community & belonging": "Community/Belonging",
        "community/belonging": "Community/Belonging",
        "community belonging": "Community/Belonging",
        "community": "Community/Belonging",

        # Work & Business
        "work & business": "Work/Business",
        "work/business": "Work/Business",
        "work and business": "Work/Business",
        "work": "Work/Business",
        "business": "Work/Business",

        # Culture & Leisure
        "culture & leisure": "Culture/Leisure",
        "culture/leisure": "Culture/Leisure",
        "culture and leisure": "Culture/Leisure",
        "leisure": "Culture/Leisure",
        "culture": "Culture/Leisure",
    }
    # Try full direct match
    if value in mapping:
        return mapping[value]
    # Fuzzy handling: replace ampersands with slash and collapse spaces
    value_variant = value.replace("&", "/").replace(" and ", "/")
    if value_variant in mapping:
        return mapping[value_variant]
    # Try direct title-case if already canonical-like
    for canonical in CANONICAL_CATEGORIES:
        if value.replace(" ", "") == canonical.lower().replace("/", "").replace(" ", ""):
            return canonical
    return None

def parse_multi_categories(raw: str) -> List[str]:
    """Parse a possibly comma-separated list of categories and normalize.

    Returns a de-duplicated list of canonical category names preserving
    canonical order.
    """
    if not raw:
        return []
    # Split on comma and normalize each token
    tokens = [t.strip() for t in raw.split(',') if t and t.strip()]
    normalized = []
    seen = set()
    for token in tokens:
        canonical = normalize_category_name(token)
        if canonical and canonical not in seen:
            seen.add(canonical)
            normalized.append(canonical)
    # Ensure stable, canonical ordering
    ordered = [c for c in CANONICAL_CATEGORIES if c in seen]
    # Include any not in canonical list (should be none), preserving order
    for c in normalized:
        if c not in ordered:
            ordered.append(c)
    return ordered

class CSVImportResult:
    def __init__(self):
        self.total_rows = 0
        self.successful_imports = 0
        self.failed_imports = 0
        self.updated_records = 0
        self.new_records = 0
        self.deleted_records = 0
        self.errors = []
        self.warnings = []
        self.skipped_rows = 0

def clean_text(text: str) -> str:
    """Clean and normalize text data"""
    if not text:
        return ""
    # Remove extra whitespace, normalize line endings
    return re.sub(r'\s+', ' ', text.strip())

def normalize_url_for_compare(url_value: Optional[str]) -> str:
    """Return a canonical string for URL equality/dedup comparisons.

    - Ensure scheme present (assume https if missing)
    - Lowercase scheme/host
    - Strip leading www.
    - Remove trailing slash (except when path is root)
    - Collapse duplicate slashes in path
    - Drop common tracking params (utm_*, gclid, gbraid, wbraid, fbclid)
    - Drop fragments
    """
    if not url_value:
        return ""
    url_value = url_value.strip()
    if not re.match(r'^https?://', url_value, re.IGNORECASE):
        # Ensure scheme so urlparse works consistently
        url_value = f"https://{url_value.lstrip('/')}"

    try:
        parsed = urlparse(url_value)
        scheme = 'https'  # normalize to https for compare
        netloc = (parsed.netloc or '').lower()
        if netloc.startswith('www.'):
            netloc = netloc[4:]
        path = parsed.path or ''
        path = re.sub(r'/+', '/', path)
        if path.endswith('/') and path != '/':
            path = path[:-1]
        # filter query params
        disallowed = re.compile(r'^(utm_|gclid|gbraid|wbraid|fbclid)$', re.IGNORECASE)
        q_pairs = [(k, v) for k, v in parse_qsl(parsed.query, keep_blank_values=False) if not disallowed.match(k)]
        query = urlencode(q_pairs, doseq=True)
        # build canonical string
        return f"{scheme}://{netloc}{path}{('?' + query) if query else ''}"
    except Exception:
        # Fallback to cleaned original
        return url_value.strip()

def safe_to_iso(value: Any) -> Optional[str]:
    """Convert a datetime-like value to ISO 8601 string.

    Handles native datetimes, strings that look like datetimes, and returns
    a best-effort string for unknown types.
    """
    if value is None:
        return None
    try:
        # Native datetime
        return value.isoformat()  # type: ignore[attr-defined]
    except Exception:
        try:
            # String timestamp
            return datetime.fromisoformat(str(value)).isoformat()
        except Exception:
            # Fallback string representation
            return str(value)

def get_existing_columns(db: Session, table_name: str) -> List[str]:
    """Return a list of column names that exist on a given table.

    Works across Postgres schemas; relies on information_schema.
    """
    try:
        rows = db.execute(
            sql_text(
                """
                SELECT column_name
                FROM information_schema.columns
                WHERE table_name = :table
                """
            ),
            {"table": table_name},
        ).fetchall()
        return [r[0] for r in rows]
    except Exception as e:
        logger.warning(f"Could not introspect columns for table {table_name}: {e}")
        return []

def table_exists(db: Session, table_name: str) -> bool:
    """Return True if the given table exists in the current database."""
    try:
        row = db.execute(
            sql_text(
                """
                SELECT 1
                FROM information_schema.tables
                WHERE table_name = :table
                """
            ),
            {"table": table_name},
        ).first()
        return row is not None
    except Exception as e:
        logger.warning(f"Could not check if table exists ({table_name}): {e}")
        return False

def compute_user_counts(db: Session) -> Dict[str, int]:
    """Safely compute user counts even if some columns are missing."""
    counts = {"total_users": 0, "admin_users": 0, "demo_users": 0}
    try:
        if not table_exists(db, "users"):
            return counts
        counts["total_users"] = db.execute(sql_text("SELECT COUNT(1) FROM users")).scalar() or 0
        user_cols = set(get_existing_columns(db, "users"))
        if "role" in user_cols:
            counts["admin_users"] = db.execute(sql_text("SELECT COUNT(1) FROM users WHERE role = 'admin'")) .scalar() or 0
        if "is_demo_user" in user_cols:
            counts["demo_users"] = db.execute(sql_text("SELECT COUNT(1) FROM users WHERE COALESCE(is_demo_user, FALSE) = TRUE")).scalar() or 0
    except Exception as e:
        logger.warning(f"compute_user_counts failed: {e}")
    return counts


def generate_resource_id(resource_name: str) -> str:
    """Generate a unique, URL-safe ID from resource name"""
    if not resource_name:
        raise ValueError("Resource name is required")
    
    # Clean and normalize the name
    clean_name = clean_text(resource_name.lower())
    
    # Replace special characters and spaces with hyphens
    clean_id = re.sub(r'[^\w\s-]', '', clean_name)  # Remove special chars except hyphens
    clean_id = re.sub(r'[-\s]+', '-', clean_id)     # Replace spaces and multiple hyphens
    clean_id = clean_id.strip('-')                   # Remove leading/trailing hyphens
    
    # Ensure minimum length and handle edge cases
    if len(clean_id) < 3:
        clean_id = f"resource-{clean_id}"
    
    return clean_id[:100]  # Limit length for database compatibility

def parse_ready_status(ready_value: str) -> bool:
    """Parse the Ready column value to boolean"""
    if not ready_value:
        return False
    
    ready_lower = ready_value.lower().strip()
    return ready_lower in ['yes', 'y', 'true', '1', 'ready', 'complete', 'done', 'x']

def parse_csv_row_to_resource(row: Dict[str, str], row_number: int) -> Dict[str, Any]:
    """Parse a CSV row and convert it to a Resource-compatible format with validation"""
    
    # Normalize headers for robust matching (case- and space-insensitive)
    def normalize_header(name: str) -> str:
        return re.sub(r"[^a-z0-9]+", " ", (name or '').lower()).strip()

    normalized_row = {normalize_header(k): (v or '') for k, v in row.items()}

    def get_value(aliases: List[str]) -> str:
        for alias in aliases:
            key = normalize_header(alias)
            if key in normalized_row:
                return clean_text(normalized_row[key])
        return ''

    # Extract and validate resource name (required field)
    resource_name = get_value(['Resource Name', 'Organization', 'Organization Name', 'Name', 'Resource'])
    if not resource_name:
        raise ValueError(f"Row {row_number}: Resource Name is required")
    
    if len(resource_name) > 255:
        raise ValueError(f"Row {row_number}: Resource Name too long (max 255 characters)")
    
    # Extract and validate category (required field)
    raw_category = get_value(['Category', 'Categories', 'Primary Category', 'Main Category'])
    if not raw_category:
        raise ValueError(f"Row {row_number}: Category is required")
    # Normalize and support multi-category values
    parsed_categories = parse_multi_categories(raw_category)
    if not parsed_categories:
        raise ValueError(f"Row {row_number}: Category '{raw_category}' is not recognized")
    normalized_category_value = ", ".join(parsed_categories)
    
    try:
        # Generate unique ID
        resource_id = generate_resource_id(resource_name)
        
        # Parse ready status
        ready = parse_ready_status(get_value(['Ready', 'Status', 'Publish', 'Ready To Publish', 'Is Ready']))
        
        # Extract other fields directly from CSV
        raw_subcategory = get_value(['Subcategory', 'Sub Category', 'Sub-Category', 'Subcategories', 'Services', 'Service Categories'])
        summary = get_value(['Summary', 'Description', 'Short Description', 'About'])
        website_link = get_value(['Website link', 'Website', 'Website URL', 'URL', 'Link'])
        physical_location = get_value(['Physical Location', 'Location', 'Address'])
        notes = get_value(['Notes', 'Comments', 'Remarks', 'Additional Info'])
        priority_raw = get_value(['Priority', 'Ranking', 'Rank', 'Importance', 'Rating'])
        
        # Normalize subcategories: store exactly as in CSV (comma-separated),
        # trimming whitespace and collapsing spaces around slashes. Do NOT
        # prepend canonical category prefixes or generate variations.
        def normalize_subcategories(raw: str, categories: List[str]) -> str:
            if not raw:
                return ""
            tokens = [t.strip() for t in raw.split(',') if t and t.strip()]
            normalized_tokens: List[str] = []
            seen = set()
            for token in tokens:
                token_clean = re.sub(r"\s*/\s*", "/", token)
                if token_clean not in seen:
                    normalized_tokens.append(token_clean)
                    seen.add(token_clean)
            # Generous cap to avoid truncation-related data loss
            return ", ".join(normalized_tokens)[:4000]

        subcategory = normalize_subcategories(raw_subcategory, parsed_categories)
        
        # Clean website URL for storage (preserve original meaningful path/query but add scheme)
        if website_link:
            website_link = normalize_url_for_compare(website_link)
        
        # Parse and validate priority if provided (1-7, 7 highest)
        priority_value: Optional[int] = None
        if priority_raw:
            try:
                # Extract first integer token from the string if present
                m = re.search(r"-?\d+", priority_raw)
                if m:
                    parsed = int(m.group(0))
                else:
                    parsed = int(priority_raw)
                if parsed < 1 or parsed > 7:
                    raise ValueError("Priority must be an integer between 1 and 7")
                priority_value = parsed
            except Exception:
                raise ValueError(f"Row {row_number}: Priority must be an integer between 1 and 7")
        
        return {
            'id': resource_id,
            'ready': ready,
            'category': normalized_category_value[:255],  # Multi-category, normalized
            'subcategory': subcategory if subcategory else None,
            'resource_name': resource_name[:255],  # Limit length
            'summary': summary[:2000] if summary else None,  # Limit length
            'website_link': website_link[:500] if website_link else None,  # Limit URL length
            'physical_location': physical_location[:500] if physical_location else None,  # Limit length
            'notes': notes[:2000] if notes else None,  # Limit length
            'priority': priority_value,
        }
        
    except Exception as e:
        raise ValueError(f"Row {row_number}: Error processing {resource_name} - {str(e)}")

def parse_csv_content(csv_content: str) -> List[Dict[str, str]]:
    """Parse CSV/TSV content into list of dictionaries with delimiter sniffing."""
    import csv
    import io

    if not csv_content:
        return []

    # Remove BOM if present
    if csv_content and csv_content[0] == "\ufeff":
        csv_content = csv_content.lstrip("\ufeff")

    # Heuristic delimiter detection from header line
    header_line = csv_content.splitlines()[0] if csv_content.splitlines() else ""
    if "\t" in header_line:
        delimiter = "\t"
    elif header_line.count(";") > header_line.count(","):
        delimiter = ";"
    else:
        delimiter = ","

    # Try csv.Sniffer for robustness
    try:
        import itertools
        sample = "\n".join(list(csv_content.splitlines())[:50])
        sniffer = csv.Sniffer()
        sniffed = sniffer.sniff(sample, delimiters=[",", ";", "\t", "|"])
        delimiter = sniffed.delimiter
    except Exception:
        pass

    results: List[Dict[str, str]] = []
    reader = csv.DictReader(io.StringIO(csv_content), delimiter=delimiter)
    for row_data in reader:
        results.append({k: (v or '') for k, v in row_data.items()})

    return results

def import_csv_data_batch(
    csv_content: str,
    db: Session,
    batch_size: int = 50,
    replace_mode: bool = True,
) -> CSVImportResult:
    """Import CSV data in batches with proper transaction handling.

    When replace_mode=True (default), the CSV acts as the source of truth: any
    existing resources in the database that do not appear in the uploaded CSV
    (by the composite key of resource_name + website_link) will be removed after
    a successful import.
    """
    result = CSVImportResult()
    
    # Track IDs across all batches to prevent duplicates across different batches
    global_processed_ids = set()
    
    try:
        # Parse CSV content
        rows = parse_csv_content(csv_content)
        result.total_rows = len(rows)
        
        # Capture existing IDs once to enforce unique primary keys across the whole import
        try:
            existing_ids = {rid for (rid,) in db.query(Resource.id).all()}
        except Exception:
            existing_ids = set()

        # Process in batches for better performance
        for batch_start in range(0, len(rows), batch_size):
            batch_end = min(batch_start + batch_size, len(rows))
            batch = rows[batch_start:batch_end]
            batch_number = batch_start // batch_size + 1
            
            # Process each batch in a separate transaction
            try:
                # Snapshot counters and global sets so we can roll back metrics
                # if the DB transaction fails.
                snapshot_success = result.successful_imports
                snapshot_new = result.new_records
                snapshot_updated = result.updated_records
                snapshot_skipped = result.skipped_rows
                snapshot_errors_len = len(result.errors)
                snapshot_warnings_len = len(result.warnings)
                snapshot_global_processed_ids = set(global_processed_ids)
                snapshot_global_used_ids = set(existing_ids)

                process_batch(batch, db, result, batch_start + 1, global_processed_ids, existing_ids)
                db.commit()
                logger.info(f"Successfully processed batch {batch_number}: {len(batch)} rows")
            except IntegrityError as e:
                db.rollback()
                # Parse the error to extract useful information
                error_str = str(e)
                if "duplicate key value violates unique constraint" in error_str:
                    # Extract resource name from error if possible
                    resource_match = re.search(r"Key \(id\)=\(([^)]+)\)", error_str)
                    if resource_match:
                        resource_id = resource_match.group(1)
                        # Convert ID back to readable name (replace hyphens with spaces, capitalize)
                        readable_name = resource_id.replace('-', ' ').title()
                        error_msg = f"❌ Rows {batch_start + 1}-{batch_end}: Duplicate resource found - '{readable_name}' appears multiple times. Please check your CSV file and remove duplicate entries."
                    else:
                        error_msg = f"❌ Rows {batch_start + 1}-{batch_end}: Duplicate resources found in this section. Please check for duplicate resource names and remove them from your CSV file."
                else:
                    error_msg = f"❌ Rows {batch_start + 1}-{batch_end}: Database error - some resources in this section could not be imported. Please check the data format and remove any duplicate entries."
                
                # Revert counters and global sets for this failed batch
                result.successful_imports = snapshot_success
                result.new_records = snapshot_new
                result.updated_records = snapshot_updated
                result.skipped_rows = snapshot_skipped
                result.errors = result.errors[:snapshot_errors_len]
                result.warnings = result.warnings[:snapshot_warnings_len]
                global_processed_ids.clear(); global_processed_ids.update(snapshot_global_processed_ids)
                existing_ids.clear(); existing_ids.update(snapshot_global_used_ids)

                result.errors.append(error_msg)
                # Treat the entire batch as failed so downstream pruning is skipped
                result.failed_imports += (batch_end - batch_start)
                logger.error(f"Database integrity error in batch {batch_number}: {e}")
                # Continue with next batch instead of stopping
                continue
            except Exception as e:
                db.rollback()
                # Revert counters and global sets for this failed batch
                result.successful_imports = snapshot_success
                result.new_records = snapshot_new
                result.updated_records = snapshot_updated
                result.skipped_rows = snapshot_skipped
                result.errors = result.errors[:snapshot_errors_len]
                result.warnings = result.warnings[:snapshot_warnings_len]
                global_processed_ids.clear(); global_processed_ids.update(snapshot_global_processed_ids)
                existing_ids.clear(); existing_ids.update(snapshot_global_used_ids)

                error_msg = f"🚫 Processing issue with rows {batch_start + 1}-{batch_end}: Could not process resources in this section. Please check the data format and try again."
                result.errors.append(error_msg)
                # Treat the entire batch as failed so downstream pruning is skipped
                result.failed_imports += (batch_end - batch_start)
                logger.error(f"Batch processing error in batch {batch_number}: {e}")
                # Continue with next batch instead of stopping
                continue
                
        # If configured, remove any DB resources not present in this CSV
        if replace_mode:
            if result.successful_imports > 0:
                try:
                    # Build set of dedupe keys we actually processed from this file
                    processed_keys = set(global_processed_ids)

                    # Collect IDs to delete by comparing against DB rows
                    to_delete_ids: List[str] = []
                    rows = db.query(Resource.id, Resource.resource_name, Resource.website_link).all()
                    for rid, rname, rlink in rows:
                        db_key = (
                            (rname or '').strip().lower(),
                            normalize_url_for_compare(rlink),
                        )
                        if db_key not in processed_keys:
                            to_delete_ids.append(rid)

                    if len(to_delete_ids) > 0:
                        # Clean up any dependent rows that would block deletion
                        try:
                            db.query(Bookmark).filter(Bookmark.resource_id.in_(to_delete_ids)).delete(synchronize_session=False)
                        except Exception:
                            # Best-effort: proceed even if bookmarks table/rows are absent
                            pass
                        deleted_count = db.query(Resource).filter(Resource.id.in_(to_delete_ids)).delete(synchronize_session=False)
                        db.commit()
                        result.deleted_records += int(deleted_count or 0)
                        result.warnings.append(
                            f"🗑 Removed {int(deleted_count or 0)} resources not present in the uploaded CSV (source of truth)."
                        )
                except Exception as e:
                    db.rollback()
                    logger.error(f"Failed to delete resources not in CSV: {e}")
                    result.errors.append("Could not remove resources missing from CSV; please retry import.")
            else:
                # Safety: avoid deleting if some rows failed to import
                result.warnings.append(
                    "⚠️ Skipped deletion of records not in CSV because some rows failed to import. Fix errors and re-import to enforce exact match."
                )

        # After replace-mode pruning, collapse any legacy duplicates where
        # multiple rows share the same (resource_name, website_link)
        try:
            rows = db.query(
                Resource.id,
                Resource.resource_name,
                Resource.website_link,
                Resource.updated_at,
                Resource.created_at,
            ).all()
            buckets: Dict[tuple, List[tuple]] = {}
            for rid, rname, rlink, updated_at, created_at in rows:
                key = ((rname or '').strip().lower(), normalize_url_for_compare(rlink))
                buckets.setdefault(key, []).append((rid, updated_at, created_at))

            dup_delete_ids: List[str] = []
            for key, items in buckets.items():
                if len(items) <= 1:
                    continue
                # Keep the most recently updated (fallback to most recent created), delete the rest
                items_sorted = sorted(
                    items,
                    key=lambda t: (
                        (t[1] or t[2] or datetime.fromtimestamp(0)),  # updated_at or created_at
                        t[0],
                    ),
                    reverse=True,
                )
                keep_id = items_sorted[0][0]
                for rid, _, _ in items_sorted[1:]:
                    dup_delete_ids.append(rid)

            if dup_delete_ids:
                deleted_dups = db.query(Resource).filter(Resource.id.in_(dup_delete_ids)).delete(synchronize_session=False)
                db.commit()
                result.deleted_records += int(deleted_dups or 0)
                result.warnings.append(
                    f"🧹 Removed {int(deleted_dups or 0)} duplicate resources with the same name + link."
                )
        except Exception as e:
            db.rollback()
            logger.error(f"Failed to collapse duplicate name+link rows: {e}")

        # Try to enforce uniqueness at the DB level going forward
        try:
            with engine.begin() as conn:
                conn.execute(sql_text(
                    """
                    DO $$
                    BEGIN
                        IF NOT EXISTS (
                            SELECT 1 FROM pg_indexes WHERE indexname = 'uniq_resource_name_link'
                        ) THEN
                            CREATE UNIQUE INDEX uniq_resource_name_link
                            ON resources (lower(resource_name), lower(website_link))
                            WHERE website_link IS NOT NULL;
                        END IF;
                    END$$;
                    """
                ))
        except Exception as e:
            # If index creation fails (likely due to lingering duplicates), we keep going
            logger.warning(f"Could not ensure unique index on (resource_name, website_link): {e}")

        # Update search vectors for any resources that don't have them (backup for trigger)
        try:
            with engine.begin() as conn:
                updated_vectors = conn.execute(sql_text(
                    """
                    UPDATE resources SET search_vector =
                      setweight(to_tsvector('simple', replace(coalesce(resource_name,''), '/', ' ')), 'A') ||
                      setweight(to_tsvector('simple', replace(coalesce(category,''), '/', ' ')), 'B') ||
                      setweight(to_tsvector('simple', replace(coalesce(subcategory,''), '/', ' ')), 'B') ||
                      setweight(to_tsvector('simple', coalesce(summary,'')), 'C') ||
                      setweight(to_tsvector('simple', coalesce(notes,'')), 'D')
                    WHERE search_vector IS NULL;
                    """
                )).rowcount
                if updated_vectors > 0:
                    result.warnings.append(f"🔍 Updated search vectors for {updated_vectors} resources to enable better recommendations")
        except Exception as e:
            logger.warning(f"Could not update search vectors after import: {e}")

        # Invalidate cache and recompute publishing counters after import
        if hasattr(cache, 'invalidate_resources_cache'):
            cache.invalidate_resources_cache()
            
    except Exception as e:
        db.rollback()
        result.errors.append(f"📁 File format error: Could not read your CSV file. Please ensure it's a valid CSV file with the correct column headers (Resource Name, Category, etc.)")
        logger.error(f"CSV import error: {e}")
        
    return result

def process_batch(
    batch: List[Dict],
    db: Session,
    result: CSVImportResult,
    start_row: int,
    global_processed_ids: set,
    global_used_ids: set,
):
    """Process a single batch of CSV rows with de-duplication"""
    
    # Track IDs processed in this batch to prevent duplicates within the same batch
    batch_processed_ids = set()
    
    for i, row in enumerate(batch):
        row_number = start_row + i
        try:
            # Skip empty rows
            if not any(value.strip() for value in row.values() if value):
                result.skipped_rows += 1
                continue
                
            # Parse row to resource format
            resource_data = parse_csv_row_to_resource(row, row_number)
            resource_id = resource_data['id']
            # Build composite deduplication key using both resource name and normalized website link
            dedupe_key = (
                (resource_data.get('resource_name') or '').strip().lower(),
                normalize_url_for_compare(resource_data.get('website_link')),
            )
            
            # Check for duplicate within current batch - flag and skip (warning, not error)
            if dedupe_key in batch_processed_ids:
                result.skipped_rows += 1
                result.warnings.append(
                    f"⚠️ Row {row_number}: Duplicate entry found - '{resource_data['resource_name']}' with the same link appears multiple times in your file. Only the first occurrence was processed."
                )
                continue
                
            # Check for duplicate across previous batches in this import session - flag and skip (warning, not error)
            if dedupe_key in global_processed_ids:
                result.skipped_rows += 1
                result.warnings.append(
                    f"⚠️ Row {row_number}: Duplicate entry found - '{resource_data['resource_name']}' with the same link was already processed earlier in this file. Skipped this duplicate."
                )
                continue
                
            # Prefer matching by resource name + normalized link (authoritative identity)
            existing_resource = None
            link_value = normalize_url_for_compare(resource_data.get('website_link'))
            if link_value:
                # Match using case-insensitive comparisons to align with
                # the DB unique index (lower(resource_name), lower(website_link)).
                existing_resource = db.query(Resource).filter(
                    func.lower(Resource.resource_name) == resource_data['resource_name'].strip().lower(),
                    func.lower(Resource.website_link) == (link_value or '').strip().lower()
                ).first()
            else:
                # No link provided: fallback to name-only match (case-insensitive)
                existing_resource = db.query(Resource).filter(
                    func.lower(Resource.resource_name) == resource_data['resource_name'].strip().lower()
                ).first()
            
            if existing_resource:
                # Only update if something actually changed compared to the existing row
                def normalize_for_compare(field_key: str, raw_value: Any) -> Any:
                    # Normalize values for fair comparison and avoid false-positive updates
                    if isinstance(raw_value, str):
                        value = raw_value.strip()
                        # Normalize spaces and slashes
                        value = re.sub(r"\s+/\s+", "/", value)
                        value = re.sub(r"\s*\/\s*", "/", value)

                        # URL canonicalization handled below
                        if field_key in ("category", "subcategory"):
                            # Compare order-insensitively and ignore comma spacing
                            tokens = [t.strip() for t in value.split(',') if t and t.strip()]
                            tokens = [re.sub(r"\s+", " ", t).lower() for t in tokens]
                            value = ",".join(sorted(tokens))
                        elif field_key == "resource_name":
                            # Ignore purely case/spacing differences in names
                            value = re.sub(r"\s+", " ", value).lower()
                        else:
                            # Collapse internal whitespace for robust string compare
                            value = re.sub(r"\s+", " ", value)

                        if field_key == 'website_link':
                            value = normalize_url_for_compare(value)
                        return value
                    return raw_value

                changed_fields = []
                for key, new_value in resource_data.items():
                    if key == 'id':
                        continue
                    current_value = getattr(existing_resource, key)
                    # Preserve non-string types like booleans during normalization
                    lhs_input = current_value if not isinstance(new_value, str) else (current_value or '')
                    rhs_input = new_value if not isinstance(new_value, str) else (new_value or '')
                    lhs = normalize_for_compare(key, lhs_input)
                    rhs = normalize_for_compare(key, rhs_input)
                    if lhs != rhs:
                        changed_fields.append(key)

                if changed_fields:
                    for key in changed_fields:
                        setattr(existing_resource, key, resource_data[key])
                    # If the resource was previously published, mark it as unpublished
                    # so that an explicit Publish action is required to push updates live.
                    if getattr(existing_resource, 'published', False):
                        existing_resource.published = False
                        result.warnings.append(
                            f"ℹ️ Row {row_number}: '{resource_data['resource_name']}' had changes and was temporarily unpublished pending Publish action"
                        )
                    result.updated_records += 1
                    result.warnings.append(
                        f"✅ Row {row_number}: Updated existing resource '{resource_data['resource_name']}' with new information"
                    )
            else:
                # Create new resource. Ensure unique ID if base name-slug already exists for a different link
                base_id_conflict = (
                    resource_id in global_used_ids
                    or db.query(Resource).filter(Resource.id == resource_id).first() is not None
                )
                if base_id_conflict:
                    base_id = resource_id
                    link_value = resource_data.get('website_link') or ''
                    suffix = hashlib.md5(link_value.encode('utf-8')).hexdigest()[:8]
                    max_len = 100
                    proposed_id = f"{base_id}-{suffix}"
                    if len(proposed_id) > max_len:
                        # Trim base to keep total within limit
                        trim_len = max_len - (len(suffix) + 1)
                        proposed_id = f"{base_id[:trim_len]}-{suffix}"
                    resource_data['id'] = proposed_id
                    resource_id = proposed_id
                resource = Resource(**resource_data)
                db.add(resource)
                result.new_records += 1
                
            # Track this ID as processed in this batch and globally (using dedupe key)
            batch_processed_ids.add(dedupe_key)
            global_processed_ids.add(dedupe_key)
            global_used_ids.add(resource_id)
            result.successful_imports += 1
            
        except ValueError as e:
            result.failed_imports += 1
            # Make validation errors more user-friendly
            error_msg = str(e)
            if "Resource Name is required" in error_msg:
                result.errors.append(f"❌ Row {row_number}: Missing resource name - please add a name for this resource")
            elif "Category is required" in error_msg:
                result.errors.append(f"❌ Row {row_number}: Missing category - please specify which category this resource belongs to")
            elif "too long" in error_msg:
                result.errors.append(f"❌ Row {row_number}: Resource name is too long - please shorten to 255 characters or less")
            else:
                result.errors.append(f"❌ Row {row_number}: {error_msg}")
        except IntegrityError as e:
            db.rollback()
            result.failed_imports += 1
            result.errors.append(f"❌ Row {row_number}: Database error - this resource conflicts with existing data. Please check for duplicates.")
        except Exception as e:
            # Any error aborts the current transaction in PostgreSQL; rollback so subsequent rows can proceed
            db.rollback()
            result.failed_imports += 1
            logger.error(f"Row {row_number} import exception: {e}")
            detail = str(e)
            if len(detail) > 240:
                detail = detail[:240] + "…"
            result.errors.append(
                f"❌ Row {row_number}: Could not process this row - {detail}"
            )

@router.get("/test", summary="Test endpoint")
def test_endpoint():
    """Simple test endpoint"""
    return {"message": "Test endpoint works"}

@router.get("/dashboard", summary="Get admin dashboard data")
def get_admin_dashboard(
    current_user: User = Depends(require_admin_user),
    db: Session = Depends(get_db)
):
    """Get admin dashboard overview data"""
    
    try:
        # Handle case where resources table is missing (first run before migrations)
        resources_exist = table_exists(db, "resources")
        if not resources_exist:
            total_resources = 0
            ready_resources = 0
            published_resources = 0
            uc = compute_user_counts(db)
            total_users = uc["total_users"]
            admin_users = uc["admin_users"]
            demo_users = uc["demo_users"]
            category_counts: Dict[str, int] = {c: 0 for c in CANONICAL_CATEGORIES}
        else:
            # Prefer raw SQL to be resilient to minor ORM/DDL drift
            total_resources = db.execute(sql_text("SELECT COUNT(1) FROM resources")) .scalar() or 0
            # Ready and published may not exist on older schemas; guard with COALESCE
            try:
                ready_resources = db.execute(sql_text("SELECT COUNT(1) FROM resources WHERE COALESCE(ready, FALSE) = TRUE")).scalar() or 0
            except Exception:
                ready_resources = 0
            try:
                published_resources = db.execute(sql_text("SELECT COUNT(1) FROM resources WHERE COALESCE(published, FALSE) = TRUE AND COALESCE(ready, FALSE) = TRUE")).scalar() or 0
            except Exception:
                published_resources = 0

            uc = compute_user_counts(db)
            total_users = uc["total_users"]
            admin_users = uc["admin_users"]
            demo_users = uc["demo_users"]

            # Category distribution (only if column exists)
            category_counts: Dict[str, int] = {c: 0 for c in CANONICAL_CATEGORIES}
            existing_cols = get_existing_columns(db, "resources")
            if "category" in existing_cols:
                results = db.execute(sql_text("SELECT category FROM resources")).fetchall()
                for (category_field,) in results:
                    if not category_field:
                        continue
                    parts = [p.strip() for p in str(category_field).split(',') if p and p.strip()]
                    normalized_parts = parse_multi_categories(','.join(parts))
                    for cat in normalized_parts:
                        category_counts[cat] = category_counts.get(cat, 0) + 1
        
        return {
            "stats": {
                "total_resources": total_resources,
                "ready_resources": ready_resources,
                "published_resources": published_resources,
                "total_users": total_users, 
                "admin_users": admin_users,
                "demo_users": demo_users,
                "category_distribution": category_counts
            },
            "user": {
                "id": current_user.id,
                "email": current_user.email,
                "username": current_user.username,
                "role": current_user.role,
                "first_name": current_user.first_name,
                "last_name": current_user.last_name
            }
        }
        
    except Exception as e:
        logger.error(f"Admin dashboard error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=(f"Failed to get dashboard data: {e}" if ADMIN_DEBUG else "Failed to get dashboard data")
        )

@router.post("/publish", summary="Publish all ready resources (admin only)")
async def publish_ready_resources(
    current_user: User = Depends(require_admin_user),
    db: Session = Depends(get_db)
):
    """Publish resources for public visibility.

    Sets published = True for all resources with ready = True.
    Ensures resources that are not ready are not published (published = False).
    Invalidates resource cache after update.
    """
    try:
        # Count before
        before_published = db.query(Resource).filter(Resource.published == True).count()
        ready_count = db.query(Resource).filter(Resource.ready == True).count()

        # Unpublish any resources that are not ready but were published
        unpublish_result = db.query(Resource).filter(
            Resource.published == True, Resource.ready == False
        ).update({Resource.published: False}, synchronize_session=False)
        # Note: the code above already performed the publish/unpublish and committed.
        # The duplicated block that re-ran the same updates has been removed as unreachable.

        # Publish all ready resources
        publish_result = db.query(Resource).filter(Resource.ready == True).update(
            {Resource.published: True}, synchronize_session=False
        )

        db.commit()

        # Invalidate caches after publishing
        if hasattr(cache, 'invalidate_resources_cache'):
            cache.invalidate_resources_cache()

        # Trigger translations for ready resources that need them
        translation_results = {"triggered": 0, "already_complete": 0, "errors": []}
        try:
            logger.info("🌐 PUBLISH: Triggering translations for resources needing translation")
            resource_ids = translation_service.identify_resources_needing_translation(db)
            if resource_ids:
                logger.info(f"🌐 PUBLISH: Found {len(resource_ids)} resources needing translation")
                results = await translation_service.translate_resources_batch(
                    resource_ids=resource_ids,
                    db=db,
                    languages=None  # All supported languages
                )
                translation_results["triggered"] = len(resource_ids)
                # Count successful translations
                successful = sum(1 for r in results.values() for success in r.values() if success)
                translation_results["successful"] = successful
                logger.info(f"🌐 PUBLISH: Translation complete - {successful} translations successful")
            else:
                logger.info("🌐 PUBLISH: No resources need translation")
                translation_results["already_complete"] = ready_count
        except Exception as e:
            logger.error(f"🌐 PUBLISH: Translation trigger failed: {e}")
            translation_results["errors"].append(str(e))

        # Immediately refresh demo user recommendations now that resources are published
        demo_results = {"processed": 0, "errors": [], "total_demo_users": 0}
        try:
            logger.info("🎭 PUBLISH: Triggering demo user recommendations after publishing")
            # Recompute only for demo users, as requested
            demo_results = await trigger_demo_user_recommendations(db)
            logger.info(
                f"🎭 PUBLISH: Demo recommendations complete - processed {demo_results.get('processed', 0)}/"
                f"{demo_results.get('total_demo_users', 0)} users"
            )
        except Exception as e:
            logger.error(f"🎭 PUBLISH: Demo recommendation trigger failed: {e}")

        # Count after
        after_published = db.query(Resource).filter(Resource.published == True).count()

        return {
            "message": "Publishing completed successfully",
            "results": {
                "ready_resources": ready_count,
                "previously_published": before_published,
                "now_published": after_published,
                "published_now": max(0, after_published - before_published + unpublish_result),
                "unpublished_not_ready": unpublish_result,
                "updated_ready_to_published": publish_result,
                "translations": translation_results,
                "demo_recommendations": demo_results
            },
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        db.rollback()
        logger.error(f"Publish ready resources error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=(f"Failed to publish resources: {e}" if ADMIN_DEBUG else "Failed to publish resources")
        )

@router.post("/migrate", summary="Run database schema synchronization (admin only)")
def run_schema_migration(
    current_user: User = Depends(require_admin_user),
):
    """Synchronize database schema in production without changing deploy scripts.

    Idempotent: creates missing tables and ensures required columns and indexes
    exist on the `resources` table.
    """
    operations: Dict[str, Any] = {"create_tables": False, "ensure_columns": False}
    try:
        logger.info("Admin: starting /api/admin/migrate …")
        # 1) Create tables from ORM metadata (no-op if already exist)
        create_tables()
        operations["create_tables"] = True

        # 2) Ensure resources columns and indexes (no-op if already exist)
        try:
            # Use a transactional connection so DDL is committed
            with engine.begin() as conn:
                conn.execute(sql_text(
                    """
                    DO $$
                    BEGIN
                        -- ready flag
                        IF NOT EXISTS (
                            SELECT 1 FROM information_schema.columns
                            WHERE table_name='resources' AND column_name='ready'
                        ) THEN
                            ALTER TABLE resources ADD COLUMN ready BOOLEAN NOT NULL DEFAULT FALSE;
                        END IF;

                        -- published flag
                        IF NOT EXISTS (
                            SELECT 1 FROM information_schema.columns
                            WHERE table_name='resources' AND column_name='published'
                        ) THEN
                            ALTER TABLE resources ADD COLUMN published BOOLEAN NOT NULL DEFAULT FALSE;
                        END IF;

                        -- category and subcategory
                        IF NOT EXISTS (
                            SELECT 1 FROM information_schema.columns
                            WHERE table_name='resources' AND column_name='category'
                        ) THEN
                            ALTER TABLE resources ADD COLUMN category VARCHAR;
                        END IF;
                        IF NOT EXISTS (
                            SELECT 1 FROM information_schema.columns
                            WHERE table_name='resources' AND column_name='subcategory'
                        ) THEN
                            ALTER TABLE resources ADD COLUMN subcategory VARCHAR;
                        END IF;

                        -- primary fields
                        IF NOT EXISTS (
                            SELECT 1 FROM information_schema.columns
                            WHERE table_name='resources' AND column_name='resource_name'
                        ) THEN
                            ALTER TABLE resources ADD COLUMN resource_name VARCHAR;
                        END IF;
                        IF NOT EXISTS (
                            SELECT 1 FROM information_schema.columns
                            WHERE table_name='resources' AND column_name='summary'
                        ) THEN
                            ALTER TABLE resources ADD COLUMN summary TEXT;
                        END IF;
                        IF NOT EXISTS (
                            SELECT 1 FROM information_schema.columns
                            WHERE table_name='resources' AND column_name='website_link'
                        ) THEN
                            ALTER TABLE resources ADD COLUMN website_link VARCHAR;
                        END IF;
                        IF NOT EXISTS (
                            SELECT 1 FROM information_schema.columns
                            WHERE table_name='resources' AND column_name='physical_location'
                        ) THEN
                            ALTER TABLE resources ADD COLUMN physical_location VARCHAR;
                        END IF;
                        IF NOT EXISTS (
                            SELECT 1 FROM information_schema.columns
                            WHERE table_name='resources' AND column_name='notes'
                        ) THEN
                            ALTER TABLE resources ADD COLUMN notes TEXT;
                        END IF;

                        -- timestamps
                        IF NOT EXISTS (
                            SELECT 1 FROM information_schema.columns
                            WHERE table_name='resources' AND column_name='created_at'
                        ) THEN
                            ALTER TABLE resources ADD COLUMN created_at TIMESTAMPTZ DEFAULT now();
                        END IF;
                        IF NOT EXISTS (
                            SELECT 1 FROM information_schema.columns
                            WHERE table_name='resources' AND column_name='updated_at'
                        ) THEN
                            ALTER TABLE resources ADD COLUMN updated_at TIMESTAMPTZ DEFAULT now();
                        END IF;

                        -- helpful indexes
                        CREATE INDEX IF NOT EXISTS idx_resource_category_subcategory ON resources (category, subcategory);
                        CREATE INDEX IF NOT EXISTS idx_resource_ready_category ON resources (ready, category);
                        CREATE INDEX IF NOT EXISTS idx_resource_name_search ON resources (resource_name);
                        CREATE INDEX IF NOT EXISTS idx_resource_published_ready ON resources (published, ready);

                        -- priority column (1-7)
                        IF NOT EXISTS (
                            SELECT 1 FROM information_schema.columns
                            WHERE table_name='resources' AND column_name='priority'
                        ) THEN
                            ALTER TABLE resources ADD COLUMN priority INTEGER;
                        END IF;
                        -- Optional index to accelerate sorting/filtering by priority
                        CREATE INDEX IF NOT EXISTS idx_resource_priority_name ON resources (priority, resource_name);
                        
                        -- Translation tracking fields for resources table
                        IF NOT EXISTS (
                            SELECT 1 FROM information_schema.columns
                            WHERE table_name='resources' AND column_name='translation_status'
                        ) THEN
                            ALTER TABLE resources ADD COLUMN translation_status VARCHAR DEFAULT 'not_started' NOT NULL;
                        END IF;
                        IF NOT EXISTS (
                            SELECT 1 FROM information_schema.columns
                            WHERE table_name='resources' AND column_name='last_translation_hash'
                        ) THEN
                            ALTER TABLE resources ADD COLUMN last_translation_hash VARCHAR(64);
                        END IF;

                        -- Create resource_translations table
                        CREATE TABLE IF NOT EXISTS resource_translations (
                            id SERIAL PRIMARY KEY,
                            resource_id VARCHAR NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
                            language_code VARCHAR(2) NOT NULL,
                            resource_name_translated TEXT,
                            summary_translated TEXT,
                            translation_status VARCHAR DEFAULT 'pending' NOT NULL,
                            error_message TEXT,
                            created_at TIMESTAMPTZ DEFAULT NOW(),
                            updated_at TIMESTAMPTZ DEFAULT NOW(),
                            CONSTRAINT uq_resource_language UNIQUE(resource_id, language_code)
                        );

                        -- Add translation table indexes
                        CREATE INDEX IF NOT EXISTS idx_translation_resource_id ON resource_translations (resource_id);
                        CREATE INDEX IF NOT EXISTS idx_translation_language ON resource_translations (language_code);
                        CREATE INDEX IF NOT EXISTS idx_translation_status ON resource_translations (translation_status);
                        CREATE INDEX IF NOT EXISTS idx_resource_translation_status ON resources (translation_status);
                        
                        -- Drop redundant columns if they exist
                        ALTER TABLE users DROP COLUMN IF EXISTS onboarding_locked_at;
                        ALTER TABLE users DROP COLUMN IF EXISTS professional_status;
                        ALTER TABLE users DROP COLUMN IF EXISTS housing_situation;
                        ALTER TABLE users DROP COLUMN IF EXISTS family_status;
                        ALTER TABLE users DROP COLUMN IF EXISTS arrival_date;
                    END$$;
                    """
                ))

                # 3) FTS + trigram setup (idempotent)
                conn.execute(sql_text("CREATE EXTENSION IF NOT EXISTS pg_trgm;"))
                conn.execute(sql_text("CREATE EXTENSION IF NOT EXISTS unaccent;"))

                # Add search_vector column if missing
                conn.execute(sql_text(
                    """
                    DO $$
                    BEGIN
                        IF NOT EXISTS (
                            SELECT 1 FROM information_schema.columns
                            WHERE table_name='resources' AND column_name='search_vector'
                        ) THEN
                            ALTER TABLE resources ADD COLUMN search_vector tsvector;
                        END IF;
                    END$$;
                    """
                ))

                # Ensure search_vector has correct type (tsvector)
                conn.execute(sql_text(
                    """
                    DO $$
                    DECLARE
                      col_type text;
                    BEGIN
                      SELECT t.typname INTO col_type
                      FROM pg_attribute a
                      JOIN pg_class c ON c.oid = a.attrelid
                      JOIN pg_type t ON t.oid = a.atttypid
                      WHERE c.relname = 'resources' AND a.attname = 'search_vector';

                      IF col_type IS NOT NULL AND col_type <> 'tsvector' THEN
                        -- Recompute search_vector during type change
                        EXECUTE $$
                          ALTER TABLE resources 
                          ALTER COLUMN search_vector TYPE tsvector 
                          USING (
                            setweight(to_tsvector('simple', coalesce(resource_name,'')), 'A') ||
                            setweight(to_tsvector('simple', coalesce(category,'')), 'B') ||
                            setweight(to_tsvector('simple', coalesce(subcategory,'')), 'B') ||
                            setweight(to_tsvector('simple', coalesce(summary,'')), 'C') ||
                            setweight(to_tsvector('simple', coalesce(notes,'')), 'D')
                          )
                        $$;
                      END IF;
                    END$$;
                    """
                ))

                # Backfill search_vector
                conn.execute(sql_text(
                    """
                    UPDATE resources SET search_vector =
                      setweight(to_tsvector('simple', replace(coalesce(resource_name,''), '/', ' ')), 'A') ||
                      setweight(to_tsvector('simple', replace(coalesce(category,''), '/', ' ')), 'B') ||
                      setweight(to_tsvector('simple', replace(coalesce(subcategory,''), '/', ' ')), 'B') ||
                      setweight(to_tsvector('simple', coalesce(summary,'')), 'C') ||
                      setweight(to_tsvector('simple', coalesce(notes,'')), 'D');
                    """
                ))

                # Keep search_vector updated on insert/update
                conn.execute(sql_text(
                    """
                    CREATE OR REPLACE FUNCTION resources_tsv_update() RETURNS trigger AS $$
                    BEGIN
                      NEW.search_vector :=
                        setweight(to_tsvector('simple', replace(coalesce(NEW.resource_name,''), '/', ' ')), 'A') ||
                        setweight(to_tsvector('simple', replace(coalesce(NEW.category,''), '/', ' ')), 'B') ||
                        setweight(to_tsvector('simple', replace(coalesce(NEW.subcategory,''), '/', ' ')), 'B') ||
                        setweight(to_tsvector('simple', coalesce(NEW.summary,'')), 'C') ||
                        setweight(to_tsvector('simple', coalesce(NEW.notes,'')), 'D');
                      RETURN NEW;
                    END
                    $$ LANGUAGE plpgsql;
                    """
                ))
                conn.execute(sql_text("DROP TRIGGER IF EXISTS trg_resources_tsv_update ON resources;"))
                conn.execute(sql_text(
                    """
                    CREATE TRIGGER trg_resources_tsv_update
                    BEFORE INSERT OR UPDATE ON resources
                    FOR EACH ROW EXECUTE PROCEDURE resources_tsv_update();
                    """
                ))

                # Indexes for FTS + trigram similarity
                conn.execute(sql_text("DROP INDEX IF EXISTS idx_resources_search_vector;"))
                conn.execute(sql_text("CREATE INDEX IF NOT EXISTS idx_resources_search_vector ON resources USING GIN (search_vector);"))
                conn.execute(sql_text("CREATE INDEX IF NOT EXISTS idx_resources_name_trgm ON resources USING GIN (resource_name gin_trgm_ops);"))
                conn.execute(sql_text("CREATE INDEX IF NOT EXISTS idx_resources_summary_trgm ON resources USING GIN (summary gin_trgm_ops);"))
            operations["ensure_columns"] = True
        except Exception as e:
            operations["ensure_columns_error"] = str(e)

        logger.info("Admin: finished /api/admin/migrate .")
        return {
            "message": "Schema synchronization completed",
            "operations": operations,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        logger.error(f"Schema migration failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=(f"Migration failed: {e}" if ADMIN_DEBUG else "Migration failed")
        )

@router.post("/import-csv", summary="Import resources from CSV file")
async def import_resources_csv(
    file: UploadFile = File(...),
    current_user: User = Depends(require_admin_user),
    db: Session = Depends(get_db)
):
    """Import resources from uploaded CSV file with robust error handling"""
    
    # Validate file
    if not file.filename.endswith('.csv'):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File must be a CSV file"
        )
    
    # Check file size (limit to 10MB)
    max_size = 10 * 1024 * 1024  # 10MB
    content = await file.read()
    if len(content) > max_size:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File too large. Maximum size is 10MB."
        )
    
    try:
        # Decode file content with error handling
        try:
            csv_content = content.decode('utf-8')
        except UnicodeDecodeError:
            try:
                csv_content = content.decode('latin-1')
            except UnicodeDecodeError:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Unable to decode file. Please ensure it's a valid CSV file with UTF-8 or Latin-1 encoding."
                )
        
        # Import data using batch processing
        result = import_csv_data_batch(csv_content, db)
        
        # Log import activity
        logger.info(f"CSV import by admin {current_user.email}: "
                   f"{result.successful_imports} successful ({result.new_records} new, {result.updated_records} updated), "
                   f"{result.failed_imports} failed, {result.skipped_rows} skipped")
        
        # Note: Demo user recommendations are now triggered after publishing, not during import
        
        # Check for translation needs if service is available
        translation_info = {}
        if translation_service.is_available() and result.successful_imports > 0:
            try:
                # Identify resources that need translation
                resources_needing_translation = translation_service.identify_resources_needing_translation(db)
                
                # Update translation status for resources that need translation
                if resources_needing_translation:
                    db.execute(sql_text("""
                        UPDATE resources 
                        SET translation_status = 'not_started'
                        WHERE id = ANY(:resource_ids)
                    """), {"resource_ids": resources_needing_translation})
                    db.commit()
                
                translation_info = {
                    "resources_needing_translation": len(resources_needing_translation),
                    "translation_service_available": True
                }
                
            except Exception as e:
                logger.error(f"Error checking translation needs after CSV import: {e}")
                translation_info = {
                    "error": str(e),
                    "translation_service_available": translation_service.is_available()
                }
        else:
            translation_info = {
                "resources_needing_translation": 0,
                "translation_service_available": translation_service.is_available()
            }
        
        # Generate user-friendly summary message
        if result.successful_imports > 0 and result.failed_imports == 0:
            summary_message = (
                f"Import completed successfully! Processed {result.successful_imports} resources "
                f"({result.new_records} new, {result.updated_records} updated, {result.deleted_records} deleted).\n"
                f"Remember to click 'Publish' to translate the resources to the supported languages and to make them visible to users."
            )
        elif result.successful_imports > 0 and result.failed_imports > 0:
            summary_message = (
                f"⚠️ Import completed with some issues. Successfully processed {result.successful_imports} resources, "
                f"but {result.failed_imports} rows had problems. Please review the errors below. "
                f"Remember to click 'Publish' to translate the resources to the supported languages and to make them visible to users."
            )
        elif result.failed_imports > 0:
            summary_message = f"❌ Import failed. {result.failed_imports} rows could not be processed. Please fix the issues and try again."
        else:
            summary_message = "ℹ️ No resources were processed. Please check your file format."
            
        # Add duplicate warning if applicable (count across warnings and errors)
        duplicate_count = 0
        duplicate_count += sum(1 for msg in result.errors if "Duplicate entry found" in msg or "Duplicate resource" in msg)
        duplicate_count += sum(1 for msg in result.warnings if "Duplicate entry found" in msg or "Duplicate resource" in msg)
        if duplicate_count > 0:
            summary_message += (
                f"\n\n🔍 DUPLICATE WARNING: Found {duplicate_count} duplicate resources (same name and link) in your file. "
                "Only the first occurrence of each name+link pair was processed. Please remove duplicates from your CSV file to avoid this warning."
            )
        
        # Create response message with translation info
        message_parts = [summary_message]
        
        # Translation info is now handled by the Publish button, so we don't need a separate message
        
        # Prepare response with limited error details for security
        return {
            "message": "\n".join(message_parts) if len(message_parts) > 1 else summary_message,
            "results": {
                "total_rows": result.total_rows,
                "successful_imports": result.successful_imports,
                "failed_imports": result.failed_imports,
                "new_records": result.new_records,
                "updated_records": result.updated_records,
                "deleted_records": result.deleted_records,
                "skipped_rows": result.skipped_rows,
                "errors": result.errors,  # Show all errors so admin can see every issue
                "warnings": result.warnings,  # Show all warnings (updates are typically fewer)
                "has_more_errors": False,
                "has_more_warnings": False
            },
            "translation_info": translation_info,
            "timestamp": datetime.now().isoformat()
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"CSV import error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=(f"Failed to import CSV: {str(e)}" if ADMIN_DEBUG else "Failed to import CSV")
        )

@router.post("/trigger-demo-recommendations", summary="Manually trigger recommendations for demo users (admin only)")
@limiter.limit(f"{RATE_LIMIT_AI_PER_MINUTE}/minute")
async def trigger_demo_recommendations_endpoint(
    request: Request,
    current_user: User = Depends(require_admin_user),
    db: Session = Depends(get_db)
):
    """Manually trigger AI-generated recommendations for all demo users"""
    try:
        logger.info(f"🎭 MANUAL TRIGGER: Admin {current_user.email} manually triggering demo user recommendations")
        
        results = await trigger_demo_user_recommendations(db)
        
        if results["processed"] > 0:
            message = f"✅ Successfully updated recommendations for {results['processed']}/{results['total_demo_users']} demo users."
        elif results["total_demo_users"] == 0:
            message = "ℹ️ No onboarded demo users found."
        else:
            message = f"❌ Failed to update recommendations. {len(results['errors'])} errors occurred."
        
        if results["errors"]:
            message += f"\n\nErrors:\n" + "\n".join(f"• {error}" for error in results["errors"])
        
        return JSONResponse(content={
            "message": message,
            "results": results,
            "timestamp": datetime.now().isoformat()
        })
        
    except Exception as e:
        logger.error(f"🎭 MANUAL TRIGGER: Error in manual demo recommendations trigger: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to trigger demo recommendations: {str(e)}"
        )

@router.get("/users", summary="Get all users (admin only)")
def get_all_users(
    current_user: User = Depends(require_admin_user),
    db: Session = Depends(get_db),
    page: int = 1,
    limit: int = 50
):
    """Get paginated list of all users for admin management"""
    
    try:
        # Calculate offset for pagination
        offset = (page - 1) * limit
        
        # Get total count
        total_users = db.query(User).count()
        
        # Get paginated users
        users = db.query(User).offset(offset).limit(limit).all()
        
        user_list = []
        for user in users:
            user_list.append({
                "id": user.id,
                "email": user.email,
                "username": user.username,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "role": user.role,
                "is_active": user.is_active,
                "is_demo_user": user.is_demo_user,
                "created_at": user.created_at.isoformat() if user.created_at else None
            })
        
        return {
            "users": user_list,
            "pagination": {
                "total": total_users,
                "page": page,
                "limit": limit,
                "total_pages": (total_users + limit - 1) // limit
            }
        }
        
    except Exception as e:
        logger.error(f"Get users error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=(f"Failed to get users: {e}" if ADMIN_DEBUG else "Failed to get users")
        )

@router.get("/resources", summary="Get all resources (admin only)")
def get_all_resources(
    current_user: User = Depends(require_admin_user),
    db: Session = Depends(get_db),
    page: int = 1,
    limit: int = 50
):
    """Get paginated list of all resources for admin view only (no editing)"""
    
    try:
        # If resources table is missing, return an empty result set instead of 500
        if not table_exists(db, "resources"):
            return {
                "resources": [],
                "pagination": {
                    "total": 0,
                    "page": page,
                    "limit": limit,
                    "total_pages": 0
                }
            }

        # Calculate offset for pagination
        offset = (page - 1) * limit

        # Total count via raw SQL to avoid ORM column drift issues
        total_resources = db.execute(sql_text("SELECT COUNT(1) FROM resources")).scalar() or 0

        # Build resilient SELECT that substitutes NULL for any missing columns
        existing_cols = set(get_existing_columns(db, "resources"))
        required_cols = [
            "id",
            "ready",
            "published",
            "category",
            "subcategory",
            "resource_name",
            "summary",
            "website_link",
            "physical_location",
            "notes",
            "priority",
            "created_at",
            "updated_at",
            "translation_status",
        ]

        select_parts = [
            (col if col in existing_cols else f"NULL AS {col}") for col in required_cols
        ]

        # Order by updated_at if it exists, else created_at; both NULL-safe
        # Compute order expression based on available columns
        if "updated_at" in existing_cols:
            order_expr = "updated_at DESC NULLS LAST"
        elif "created_at" in existing_cols:
            order_expr = "created_at DESC NULLS LAST"
        else:
            order_expr = "id DESC"

        sql = sql_text(
            f"SELECT {', '.join(select_parts)} FROM resources ORDER BY {order_expr} OFFSET :offset LIMIT :limit"
        )
        rows = db.execute(sql, {"offset": offset, "limit": limit}).mappings().all()

        resource_list = []
        for r in rows:
            resource_list.append({
                "id": r.get("id"),
                "ready": bool(r.get("ready")) if r.get("ready") is not None else False,
                "published": bool(r.get("published")) if r.get("published") is not None else False,
                "category": r.get("category"),
                "subcategory": r.get("subcategory"),
                "resource_name": r.get("resource_name"),
                "summary": r.get("summary"),
                "website_link": r.get("website_link"),
                "physical_location": r.get("physical_location"),
                "notes": r.get("notes"),
                "priority": r.get("priority"),
                "created_at": safe_to_iso(r.get("created_at")),
                "updated_at": safe_to_iso(r.get("updated_at")),
                "translation_status": r.get("translation_status") or "not_started",
            })
        
        return {
            "resources": resource_list,
            "pagination": {
                "total": total_resources,
                "page": page,
                "limit": limit,
                "total_pages": (total_resources + limit - 1) // limit
            }
        }
        
    except Exception as e:
        logger.error(f"Get resources error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=(f"Failed to get resources: {e}" if ADMIN_DEBUG else "Failed to get resources")
        )

# Resource creation, editing, and deletion removed - resources are managed only through CSV upload

# Translation Management Endpoints

@router.get("/translation-status", summary="Get translation status overview")
def get_translation_status(
    current_user: User = Depends(require_admin_user),
    db: Session = Depends(get_db)
):
    """Get overview of translation status across all resources and languages"""
    try:
        status = translation_service.get_translation_status(db)
        return {
            "status": "success",
            "data": status,
            "supported_languages": SUPPORTED_LANGUAGES,
            "translation_service_available": translation_service.is_available()
        }
    except Exception as e:
        logger.error(f"Error getting translation status: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to get translation status"
        )

@router.get("/translation-progress", summary="Get real-time translation progress")
def get_translation_progress(
    current_user: User = Depends(require_admin_user),
    db: Session = Depends(get_db)
):
    """Get real-time translation progress for resources currently being translated"""
    try:
        # Get all resource translations that are currently in progress or recently completed
        translations = db.query(ResourceTranslation).filter(
            ResourceTranslation.translation_status.in_(['pending', 'completed', 'failed'])
        ).all()
        
        # Group by resource
        resources = {}
        for translation in translations:
            resource_id = translation.resource_id
            if resource_id not in resources:
                # Get resource name
                resource = db.query(Resource).filter(Resource.id == resource_id).first()
                resources[resource_id] = {
                    'resource_name': resource.resource_name if resource else resource_id,
                    'languages': {}
                }
            
            resources[resource_id]['languages'][translation.language_code] = translation.translation_status
        
        return {
            "status": "success",
            "resources": resources,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        logger.error(f"Error getting translation progress: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to get translation progress"
        )

@router.get("/resources-needing-translation", summary="Get list of resource IDs that need translation")
def get_resources_needing_translation(
    current_user: User = Depends(require_admin_user),
    db: Session = Depends(get_db)
):
    """Get list of resource IDs that need translation"""
    try:
        resource_ids = translation_service.identify_resources_needing_translation(db)
        return {
            "status": "success",
            "resource_ids": resource_ids,
            "count": len(resource_ids)
        }
    except Exception as e:
        logger.error(f"Error getting resources needing translation: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to get resources needing translation"
        )

@router.post("/translate-resources", summary="Trigger translation for resources")
async def translate_resources(
    resource_ids: Optional[List[str]] = None,
    languages: Optional[List[str]] = None,
    current_user: User = Depends(require_admin_user),
    db: Session = Depends(get_db)
):
    """Trigger translation for specified resources or all resources needing translation"""
    
    if not translation_service.is_available():
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Translation service is not available. Please check googletrans installation."
        )
    
    try:
        # If no specific resources provided, find ones needing translation
        if not resource_ids:
            resource_ids = translation_service.identify_resources_needing_translation(db)
            
        if not resource_ids:
            return {
                "status": "success",
                "message": "No resources need translation",
                "results": {}
            }
        
        # Validate languages
        if languages:
            invalid_languages = [lang for lang in languages if lang not in SUPPORTED_LANGUAGES]
            if invalid_languages:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Unsupported languages: {invalid_languages}"
                )
        
        # Start translation process
        logger.info(f"Starting async translation for {len(resource_ids)} resources by admin {current_user.email}")
        
        results = await translation_service.translate_resources_batch(
            resource_ids=resource_ids,
            db=db,
            languages=languages
        )
        
        # Count successes and failures
        total_translations = sum(len(lang_results) for lang_results in results.values())
        successful_translations = sum(
            sum(1 for success in lang_results.values() if success) 
            for lang_results in results.values()
        )
        failed_translations = total_translations - successful_translations
        
        return {
            "status": "success",
            "message": f"Translation completed: {successful_translations} successful, {failed_translations} failed",
            "results": results,
            "summary": {
                "resources_processed": len(resource_ids),
                "total_translations": total_translations,
                "successful_translations": successful_translations,
                "failed_translations": failed_translations
            }
        }
        
    except Exception as e:
        logger.error(f"Error during translation process: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Translation failed: {str(e)}"
        )

@router.get("/resources/{resource_id}/translations", summary="Get translations for a specific resource")
def get_resource_translations(
    resource_id: str,
    current_user: User = Depends(require_admin_user),
    db: Session = Depends(get_db)
):
    """Get all translations for a specific resource"""
    try:
        # Get the resource
        resource = db.query(Resource).filter(Resource.id == resource_id).first()
        if not resource:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Resource not found"
            )
        
        # Get all translations
        translations = db.query(ResourceTranslation).filter(
            ResourceTranslation.resource_id == resource_id
        ).all()
        
        # Format response
        translations_data = {}
        for translation in translations:
            translations_data[translation.language_code] = {
                "resource_name": translation.resource_name_translated,
                "summary": translation.summary_translated,
                "status": translation.translation_status,
                "error_message": translation.error_message,
                "updated_at": translation.updated_at.isoformat() if translation.updated_at else None
            }
        
        return {
            "resource_id": resource_id,
            "original": {
                "resource_name": resource.resource_name,
                "summary": resource.summary,
                "translation_status": resource.translation_status
            },
            "translations": translations_data
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting resource translations: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to get resource translations"
        )

# Update and delete endpoints removed - resources are managed only through CSV upload

# Publishing endpoints removed - resources are managed only through CSV upload with ready status 