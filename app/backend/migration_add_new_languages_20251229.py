import logging
import asyncio
from sqlalchemy import text
from sqlalchemy.orm import Session
from database import SessionLocal, Resource, User, ResourceTranslation, UserDescriptionTranslation, PriorityCategorySubtitleTranslation, engine
from translation_service import translation_service, SUPPORTED_LANGUAGES

logger = logging.getLogger(__name__)

# New languages to translate to
NEW_LANGUAGES = ['fa', 'ja', 'de', 'pt', 'ru', 'ur']

def migrate_schema():
    """
    Phase 1: Extend language_code columns from VARCHAR(2) to VARCHAR(10)
    This must run before data migration.
    """
    logger.info("=" * 60)
    logger.info("PHASE 1: EXTENDING LANGUAGE_CODE COLUMNS")
    logger.info("=" * 60)
    
    with engine.begin() as conn:
        tables_to_update = [
            ('resource_translations', 'resource_translations'),
            ('user_description_translations', 'user_description_translations'),
            ('priority_category_subtitle_translations', 'priority_category_subtitle_translations')
        ]
        
        for table_name, display_name in tables_to_update:
            logger.info(f"Checking {display_name}.language_code column...")
            result = conn.execute(text(f"""
                SELECT character_maximum_length 
                FROM information_schema.columns 
                WHERE table_name = '{table_name}' 
                AND column_name = 'language_code'
            """))
            
            row = result.fetchone()
            if row and row[0] and row[0] < 10:
                logger.info(f"  Current size: {row[0]}, expanding to VARCHAR(10)...")
                conn.execute(text(f"""
                    ALTER TABLE {table_name} 
                    ALTER COLUMN language_code TYPE VARCHAR(10)
                """))
                logger.info(f"  ✓ Expanded {display_name}.language_code to VARCHAR(10)")
            else:
                logger.info(f"  ✓ {display_name}.language_code already VARCHAR(10) or larger")
    
    logger.info("Phase 1 completed successfully!")

async def translate_existing_resources(db: Session, batch_size: int = 10):
    """Translate existing resources to ALL supported languages (not just new ones)"""
    logger.info("=" * 60)
    logger.info("TRANSLATING EXISTING RESOURCES TO ALL SUPPORTED LANGUAGES")
    logger.info("=" * 60)
    
    # Get all non-English supported languages
    all_target_languages = [lang for lang in SUPPORTED_LANGUAGES.keys() if lang != 'en']
    logger.info(f"Target languages: {all_target_languages}")
    
    # Find all ready resources that are missing any translations
    all_resources = db.query(Resource).filter(Resource.ready == True).all()
    
    resources_needing_translations = []
    
    for resource in all_resources:
        # Check which languages are missing (check ALL supported languages, not just new ones)
        existing_translations = db.query(ResourceTranslation).filter(
            ResourceTranslation.resource_id == resource.id,
            ResourceTranslation.language_code.in_(all_target_languages),
            ResourceTranslation.translation_status == 'completed'
        ).all()
        
        existing_language_codes = {t.language_code for t in existing_translations}
        missing_languages = [lang for lang in all_target_languages if lang not in existing_language_codes]
        
        if missing_languages:
            resources_needing_translations.append((resource.id, missing_languages))
    
    logger.info(f"Found {len(resources_needing_translations)} resources needing translation")
    
    if not resources_needing_translations:
        logger.info("No resources need translation")
        return
    
    # Process in batches
    total = len(resources_needing_translations)
    for i in range(0, total, batch_size):
        batch = resources_needing_translations[i:i + batch_size]
        resource_ids = [r[0] for r in batch]
        
        logger.info(f"Processing batch {i // batch_size + 1}/{(total + batch_size - 1) // batch_size} "
                   f"({len(batch)} resources)...")
        
        # Get all missing languages for this batch
        all_missing_languages = set()
        for _, missing_langs in batch:
            all_missing_languages.update(missing_langs)
        
        # Translate this batch to all missing languages
        try:
            results = await translation_service.translate_resources_batch(
                resource_ids=resource_ids,
                db=db,
                languages=list(all_missing_languages)
            )
            
            # Log results
            successful = sum(1 for r in results.values() for success in r.values() if success)
            total_translations = sum(len(r) for r in results.values())
            logger.info(f"  Batch completed: {successful}/{total_translations} translations successful")
            
        except Exception as e:
            logger.error(f"  Error processing batch: {e}")
            continue
    
    logger.info("Resource translation migration completed!")

async def translate_existing_user_descriptions(db: Session, batch_size: int = 20):
    """Translate existing user descriptions to new languages"""
    logger.info("=" * 60)
    logger.info("TRANSLATING EXISTING USER DESCRIPTIONS TO NEW LANGUAGES")
    logger.info("=" * 60)
    
    # Find all users with roadmap summaries
    users = db.query(User).filter(
        User.roadmap_summary.isnot(None),
        User.roadmap_summary != ''
    ).all()
    
    users_needing_new_languages = []
    
    for user in users:
        # Check which new languages are missing
        existing_translations = db.query(UserDescriptionTranslation).filter(
            UserDescriptionTranslation.user_id == user.id,
            UserDescriptionTranslation.language_code.in_(NEW_LANGUAGES),
            UserDescriptionTranslation.translation_status == 'completed'
        ).all()
        
        existing_language_codes = {t.language_code for t in existing_translations}
        missing_languages = [lang for lang in NEW_LANGUAGES if lang not in existing_language_codes]
        
        if missing_languages:
            users_needing_new_languages.append((user.id, missing_languages))
    
    logger.info(f"Found {len(users_needing_new_languages)} users needing description translation to new languages")
    
    if not users_needing_new_languages:
        logger.info("No users need description translation to new languages")
        return
    
    # Process in batches
    total = len(users_needing_new_languages)
    for i in range(0, total, batch_size):
        batch = users_needing_new_languages[i:i + batch_size]
        
        logger.info(f"Processing batch {i // batch_size + 1}/{(total + batch_size - 1) // batch_size} "
                   f"({len(batch)} users)...")
        
        for user_id, missing_languages in batch:
            try:
                results = await translation_service.translate_user_description_batch(
                    user_id=user_id,
                    db=db,
                    languages=missing_languages
                )
                
                successful = sum(1 for success in results.values() if success)
                logger.info(f"  User {user_id}: {successful}/{len(missing_languages)} translations successful")
                
            except Exception as e:
                logger.error(f"  Error translating user {user_id}: {e}")
                continue
    
    logger.info("User description translation migration completed!")

async def translate_existing_category_subtitles(db: Session, batch_size: int = 20):
    """Translate existing category subtitles to new languages"""
    logger.info("=" * 60)
    logger.info("TRANSLATING EXISTING CATEGORY SUBTITLES TO NEW LANGUAGES")
    logger.info("=" * 60)
    
    # Find all users with priority categories
    users = db.query(User).filter(
        User.onboarding_profile.isnot(None)
    ).all()
    
    users_with_categories = []
    
    for user in users:
        profile = user.onboarding_profile or {}
        categories = profile.get("priority_categories", [])
        
        if not categories or not isinstance(categories, list):
            continue
        
        # Check which categories need new language translations
        categories_needing_translation = []
        
        for cat in categories:
            category_key = cat.get('key')
            subtitle = cat.get('subtitle', '')
            
            if not category_key or not subtitle:
                continue
            
            # Check which new languages are missing
            existing_translations = db.query(PriorityCategorySubtitleTranslation).filter(
                PriorityCategorySubtitleTranslation.user_id == user.id,
                PriorityCategorySubtitleTranslation.category_key == category_key,
                PriorityCategorySubtitleTranslation.language_code.in_(NEW_LANGUAGES),
                PriorityCategorySubtitleTranslation.translation_status == 'completed'
            ).all()
            
            existing_language_codes = {t.language_code for t in existing_translations}
            missing_languages = [lang for lang in NEW_LANGUAGES if lang not in existing_language_codes]
            
            if missing_languages:
                categories_needing_translation.append((category_key, subtitle, missing_languages))
        
        if categories_needing_translation:
            users_with_categories.append((user.id, categories_needing_translation))
    
    logger.info(f"Found {len(users_with_categories)} users with categories needing translation to new languages")
    
    if not users_with_categories:
        logger.info("No category subtitles need translation to new languages")
        return
    
    # Process in batches
    total = len(users_with_categories)
    for i in range(0, total, batch_size):
        batch = users_with_categories[i:i + batch_size]
        
        logger.info(f"Processing batch {i // batch_size + 1}/{(total + batch_size - 1) // batch_size} "
                   f"({len(batch)} users)...")
        
        for user_id, categories_needing_translation in batch:
            try:
                # Convert to format expected by translate_category_subtitles
                categories_list = [
                    {'key': cat_key, 'subtitle': subtitle}
                    for cat_key, subtitle, _ in categories_needing_translation
                ]
                
                # Get all missing languages for this user's categories
                all_missing_languages = set()
                for _, _, missing_langs in categories_needing_translation:
                    all_missing_languages.update(missing_langs)
                
                results = await translation_service.translate_category_subtitles(
                    user_id=user_id,
                    categories=categories_list,
                    db=db,
                    languages=list(all_missing_languages)
                )
                
                # Count successful translations
                total_translations = sum(len(r) for r in results.values())
                successful = sum(1 for r in results.values() for success in r.values() if success)
                logger.info(f"  User {user_id}: {successful}/{total_translations} category subtitle translations successful")
                
            except Exception as e:
                logger.error(f"  Error translating category subtitles for user {user_id}: {e}")
                continue
    
    logger.info("Category subtitle translation migration completed!")

def check_if_translations_exist(db: Session) -> bool:
    """Quick check to see if any resource translations for new languages already exist
    
    Note: Only checks resources. User descriptions and category subtitles
    are translated on-demand when users select a new language.
    """
    try:
        # Check if any resource translations exist for new languages
        existing_count = db.query(ResourceTranslation).filter(
            ResourceTranslation.language_code.in_(NEW_LANGUAGES),
            ResourceTranslation.translation_status == 'completed'
        ).count()
        
        if existing_count > 0:
            logger.info(f"Found {existing_count} existing resource translations for new languages - data migration may have already run")
            return True
        
        return False
    except Exception as e:
        logger.warning(f"Error checking for existing translations: {e}")
        return False

async def migrate_data():
    """
    Phase 7: Translate existing resources to new languages
    This runs after schema migration.
    
    Note: Only resources are translated automatically. User descriptions and
    category subtitles are translated on-demand when users select a new language
    from the dropdown (see get_translated_roadmap and get_priority_categories endpoints).
    """
    logger.info("=" * 60)
    logger.info("PHASE 7: TRANSLATING EXISTING RESOURCES TO ALL SUPPORTED LANGUAGES")
    logger.info("(User descriptions and category subtitles are translated on-demand)")
    logger.info("=" * 60)
    
    if not translation_service.is_available():
        logger.error("Translation service is not available. Cannot run data migration.")
        return
    
    db = SessionLocal()
    try:
        # Translate resources that are missing any language translations
        # The translate_existing_resources function handles checking which resources need work
        await translate_existing_resources(db, batch_size=10)
        
        logger.info("Phase 7 completed successfully!")
        
    except Exception as e:
        logger.error(f"Data migration failed: {e}")
        raise
    finally:
        db.close()

async def run_migration():
    """Run the complete migration: schema changes first, then data migration"""
    logger.info("=" * 60)
    logger.info("MIGRATION: ADDING SUPPORT FOR 7 NEW LANGUAGES")
    logger.info(f"New languages: {', '.join(NEW_LANGUAGES)}")
    logger.info("=" * 60)
    
    try:
        # Phase 1: Schema migration (must run first)
        migrate_schema()
        
        # Phase 7: Data migration (runs after schema is ready)
        await migrate_data()
        
        logger.info("=" * 60)
        logger.info("MIGRATION COMPLETED SUCCESSFULLY!")
        logger.info("=" * 60)
        
    except Exception as e:
        logger.error(f"Migration failed: {e}")
        raise

if __name__ == "__main__":
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    asyncio.run(run_migration())

