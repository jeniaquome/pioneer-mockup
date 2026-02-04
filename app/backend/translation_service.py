import hashlib
import logging
import asyncio
import time
from typing import List, Dict, Optional, Tuple
from sqlalchemy.orm import Session
from sqlalchemy import text as sql_text
from googletrans import Translator
import random
from concurrent.futures import ThreadPoolExecutor
import threading

from database import Resource, ResourceTranslation, User, UserDescriptionTranslation, PriorityCategorySubtitleTranslation

logger = logging.getLogger(__name__)

# Supported language codes that match our frontend
SUPPORTED_LANGUAGES = {
    'en': 'English',
    'es': 'Spanish', 
    'fr': 'French',
    'zh': 'Chinese (Simplified)',
    'ar': 'Arabic',
    'sw': 'Swahili',
    'ne': 'Nepali',
    'ps': 'Pashto',
    'uz': 'Uzbek',
    # New languages
    'fa': 'Farsi',
    'ja': 'Japanese',
    'de': 'German',
    'pt': 'Portuguese',
    'ru': 'Russian',
    'ur': 'Urdu'
}

# googletrans language code mapping (most codes are the same)
GOOGLETRANS_CODES = {
    'en': 'en',
    'es': 'es',
    'fr': 'fr', 
    'zh': 'zh-cn',  # googletrans uses zh-cn for simplified Chinese
    'ar': 'ar',
    'sw': 'sw',
    'ne': 'ne',
    'ps': 'ps',
    'uz': 'uz',
    # New languages
    'fa': 'fa',
    'ja': 'ja',
    'de': 'de',
    'pt': 'pt',
    'ru': 'ru',
    'ur': 'ur'
}

class TranslationService:
    def __init__(self):
        self.translator = None
        self._executor = ThreadPoolExecutor(max_workers=5)  # Limit concurrent translations
        self._translator_lock = threading.Lock()
        self._initialize_translator()
    
    def _initialize_translator(self):
        """Initialize googletrans translator"""
        try:
            self.translator = Translator()
            logger.info("googletrans translator initialized successfully")
        except Exception as e:
            logger.error(f"Failed to initialize googletrans translator: {e}")
            self.translator = None
    
    def is_available(self) -> bool:
        """Check if translation service is available"""
        return self.translator is not None
    
    def calculate_content_hash(self, resource_name: str, summary: str) -> str:
        """Calculate SHA256 hash of translatable content for change detection"""
        content = f"{resource_name or ''}\n{summary or ''}"
        return hashlib.sha256(content.encode('utf-8')).hexdigest()
    
    def calculate_user_description_hash(self, roadmap_summary: str) -> str:
        """Calculate SHA256 hash of user description content for change detection"""
        content = roadmap_summary or ''
        return hashlib.sha256(content.encode('utf-8')).hexdigest()
    
    async def _translate_text_async_native(self, text: str, target_language: str, source_language: str = 'en') -> Optional[str]:
        """Handle async googletrans translation properly"""
        if not self.translator or not text or not text.strip():
            return None
        
        try:
            # Map to googletrans language codes
            target_code = GOOGLETRANS_CODES.get(target_language, target_language)
            source_code = GOOGLETRANS_CODES.get(source_language, source_language)
            
            if target_code == source_code:
                return text  # No translation needed
            
            # Add random delay to avoid rate limiting
            await asyncio.sleep(random.uniform(0.1, 0.3))
            
            # Retry logic for robustness
            max_retries = 3
            for attempt in range(max_retries):
                try:
                    # Create a new translator instance for each request to avoid conflicts
                    translator = Translator()
                    result = translator.translate(text, dest=target_code, src=source_code)
                    
                    # Handle both sync and async responses from googletrans
                    if hasattr(result, '__await__'):
                        # It's a coroutine, await it
                        result = await result
                    
                    if hasattr(result, 'text') and result.text:
                        return result.text
                    else:
                        logger.warning(f"No text in translation result: {result}")
                        return None
                        
                except Exception as e:
                    if attempt < max_retries - 1:
                        logger.warning(f"Translation attempt {attempt + 1} failed: {e}, retrying...")
                        await asyncio.sleep(random.uniform(1, 3))  # Longer delay between retries
                        continue
                    else:
                        raise e
            
            return None
                    
        except Exception as e:
            logger.error(f"Translation error for '{text[:50]}...': {e}")
            return None
    
    async def translate_text(self, text: str, target_language: str, source_language: str = 'en') -> Optional[str]:
        """Async translation method"""
        return await self._translate_text_async_native(text, target_language, source_language)
    
    async def translate_resource(self, resource: Resource, target_language: str, db: Session) -> bool:
        """Async translate a single resource to target language"""
        if target_language == 'en':
            return True  # English is source language
        
        # Pending status should already be set by translate_resources_batch
        
        try:
            logger.info(f"Translating resource {resource.id} to {target_language}")
            
            # Create translation tasks for concurrent execution
            tasks = []
            
            # Translate resource name and summary concurrently
            if resource.resource_name:
                tasks.append(self.translate_text(resource.resource_name, target_language))
            else:
                tasks.append(asyncio.create_task(asyncio.sleep(0, result=None)))  # Dummy task
            
            if resource.summary:
                tasks.append(self.translate_text(resource.summary, target_language))
            else:
                tasks.append(asyncio.create_task(asyncio.sleep(0, result=None)))  # Dummy task
            
            # Wait for both translations to complete
            resource_name_translated, summary_translated = await asyncio.gather(*tasks)
            
            logger.info(f"Translated name: '{resource.resource_name}' -> '{resource_name_translated}'")
            logger.info(f"Translated summary: '{resource.summary[:50] if resource.summary else None}...' -> '{summary_translated[:50] if summary_translated else None}...'")
            
            # Check if we got at least one successful translation
            if not resource_name_translated and not summary_translated:
                self._save_translation_error(
                    db, resource.id, target_language, 
                    "Failed to translate any content"
                )
                return False
            
            # Save translation to database
            self._save_translation(
                db, resource.id, target_language,
                resource_name_translated, summary_translated
            )
            
            return True
            
        except Exception as e:
            logger.error(f"Error translating resource {resource.id} to {target_language}: {e}")
            self._save_translation_error(db, resource.id, target_language, str(e))
            return False
    
    async def translate_user_description(self, user_id: int, target_language: str, db: Session) -> bool:
        """Async translate a user's roadmap summary to target language"""
        if target_language == 'en':
            return True  # English is source language
        
        try:
            # Get fresh user object from database in this session
            user = db.query(User).filter(User.id == user_id).first()
            if not user:
                logger.error(f"User {user_id} not found")
                return False
            
            if not user.roadmap_summary or not user.roadmap_summary.strip():
                logger.warning(f"User {user_id} has no roadmap summary to translate")
                return False
            
            logger.info(f"Translating user {user_id} description to {target_language}")
            
            # Translate the roadmap summary
            translated_summary = await self.translate_text(user.roadmap_summary, target_language)
            
            logger.info(f"Translated summary: '{user.roadmap_summary[:50]}...' -> '{translated_summary[:50] if translated_summary else None}...'")
            
            # Check if translation was successful
            if not translated_summary:
                self._save_user_translation_error(
                    db, user_id, target_language, 
                    "Failed to translate roadmap summary"
                )
                return False
            
            # Save translation to database
            self._save_user_translation(
                db, user_id, target_language, translated_summary
            )
            
            return True
            
        except Exception as e:
            logger.error(f"Error translating user {user_id} description to {target_language}: {e}")
            self._save_user_translation_error(db, user_id, target_language, str(e))
            return False
    
    def _create_pending_translation(self, db: Session, resource_id: str, language_code: str):
        """Create or update translation entry with pending status"""
        try:
            # Check if translation already exists
            existing = db.query(ResourceTranslation).filter(
                ResourceTranslation.resource_id == resource_id,
                ResourceTranslation.language_code == language_code
            ).first()
            
            if existing:
                # Update existing translation to pending
                existing.translation_status = 'pending'
                existing.error_message = None
            else:
                # Create new translation with pending status
                translation = ResourceTranslation(
                    resource_id=resource_id,
                    language_code=language_code,
                    translation_status='pending'
                )
                db.add(translation)
            
            db.commit()
            logger.info(f"Set pending status for resource {resource_id} in {language_code}")
            
        except Exception as e:
            logger.error(f"Error setting pending translation status: {e}")
            db.rollback()

    def _save_translation(self, db: Session, resource_id: str, language_code: str, 
                         resource_name: Optional[str], summary: Optional[str]):
        """Save successful translation to database"""
        try:
            # Check if translation already exists
            existing = db.query(ResourceTranslation).filter(
                ResourceTranslation.resource_id == resource_id,
                ResourceTranslation.language_code == language_code
            ).first()
            
            if existing:
                # Update existing translation
                existing.resource_name_translated = resource_name
                existing.summary_translated = summary
                existing.translation_status = 'completed'
                existing.error_message = None
            else:
                # Create new translation
                translation = ResourceTranslation(
                    resource_id=resource_id,
                    language_code=language_code,
                    resource_name_translated=resource_name,
                    summary_translated=summary,
                    translation_status='completed'
                )
                db.add(translation)
            
            db.commit()
            logger.info(f"Saved translation for resource {resource_id} in {language_code}")
            
        except Exception as e:
            db.rollback()
            logger.error(f"Error saving translation: {e}")
            raise
    
    def _save_translation_error(self, db: Session, resource_id: str, 
                               language_code: str, error_message: str):
        """Save translation error to database"""
        try:
            # Check if translation record already exists
            existing = db.query(ResourceTranslation).filter(
                ResourceTranslation.resource_id == resource_id,
                ResourceTranslation.language_code == language_code
            ).first()
            
            if existing:
                existing.translation_status = 'failed'
                existing.error_message = error_message
            else:
                translation = ResourceTranslation(
                    resource_id=resource_id,
                    language_code=language_code,
                    translation_status='failed',
                    error_message=error_message
                )
                db.add(translation)
            
            db.commit()
            
        except Exception as e:
            db.rollback()
            logger.error(f"Error saving translation error: {e}")
    
    def _create_pending_user_translation(self, db: Session, user_id: int, language_code: str):
        """Create or update user translation entry with pending status"""
        try:
            # Check if translation already exists
            existing = db.query(UserDescriptionTranslation).filter(
                UserDescriptionTranslation.user_id == user_id,
                UserDescriptionTranslation.language_code == language_code
            ).first()
            
            if existing:
                # Update existing translation to pending
                existing.translation_status = 'pending'
                existing.error_message = None
            else:
                # Create new translation with pending status
                translation = UserDescriptionTranslation(
                    user_id=user_id,
                    language_code=language_code,
                    translation_status='pending'
                )
                db.add(translation)
            
            db.commit()
            logger.info(f"Set pending status for user {user_id} description in {language_code}")
            
        except Exception as e:
            logger.error(f"Error setting pending user translation status: {e}")
            db.rollback()

    def _save_user_translation(self, db: Session, user_id: int, language_code: str, 
                              roadmap_summary_translated: str):
        """Save successful user translation to database"""
        try:
            # Check if translation already exists
            existing = db.query(UserDescriptionTranslation).filter(
                UserDescriptionTranslation.user_id == user_id,
                UserDescriptionTranslation.language_code == language_code
            ).first()
            
            if existing:
                # Update existing translation
                existing.roadmap_summary_translated = roadmap_summary_translated
                existing.translation_status = 'completed'
                existing.error_message = None
            else:
                # Create new translation
                translation = UserDescriptionTranslation(
                    user_id=user_id,
                    language_code=language_code,
                    roadmap_summary_translated=roadmap_summary_translated,
                    translation_status='completed'
                )
                db.add(translation)
            
            db.commit()
            logger.info(f"Saved user translation for user {user_id} in {language_code}")
            
        except Exception as e:
            db.rollback()
            logger.error(f"Error saving user translation: {e}")
            raise
    
    def _save_user_translation_error(self, db: Session, user_id: int, 
                                    language_code: str, error_message: str):
        """Save user translation error to database"""
        try:
            # Check if translation record already exists
            existing = db.query(UserDescriptionTranslation).filter(
                UserDescriptionTranslation.user_id == user_id,
                UserDescriptionTranslation.language_code == language_code
            ).first()
            
            if existing:
                existing.translation_status = 'failed'
                existing.error_message = error_message
            else:
                translation = UserDescriptionTranslation(
                    user_id=user_id,
                    language_code=language_code,
                    translation_status='failed',
                    error_message=error_message
                )
                db.add(translation)
            
            db.commit()
            
        except Exception as e:
            db.rollback()
            logger.error(f"Error saving user translation error: {e}")
    
    async def translate_resources_batch(self, resource_ids: List[str], db: Session, 
                                      languages: Optional[List[str]] = None) -> Dict[str, Dict[str, bool]]:
        """Async translate multiple resources in batch with concurrent processing - only Ready resources"""
        if not self.is_available():
            logger.error("Translation service not available")
            return {}
        
        if languages is None:
            languages = [lang for lang in SUPPORTED_LANGUAGES.keys() if lang != 'en']
        
        # Get resources to translate - IMPORTANT: Only translate Ready resources
        resources = db.query(Resource).filter(
            Resource.id.in_(resource_ids),
            Resource.ready == True  # Safety filter: only translate Ready resources
        ).all()
        
        # Log if any resources were filtered out
        filtered_count = len(resource_ids) - len(resources)
        if filtered_count > 0:
            logger.warning(f"Filtered out {filtered_count} non-Ready resources from translation batch")
        
        logger.info(f"Starting async batch translation for {len(resources)} Ready resources in {len(languages)} languages")
        
        results = {}
        
        # Create translation tasks for all resources and languages
        translation_tasks = []
        task_metadata = []
        
        # First, create all pending translation entries
        for resource in resources:
            results[resource.id] = {}
            
            # Update resource translation status to pending
            resource.translation_status = 'pending'
            
            for language in languages:
                if language == 'en':
                    results[resource.id][language] = True
                    continue
                
                # Create pending translation entry immediately
                self._create_pending_translation(db, resource.id, language)
                
                # Create async task for this resource-language combination
                task = self.translate_resource(resource, language, db)
                translation_tasks.append(task)
                task_metadata.append((resource.id, language))
        
        # Commit all pending status updates
        db.commit()
        logger.info(f"Created pending entries for {len(translation_tasks)} translations")
        
        # Execute all translation tasks concurrently with semaphore to limit concurrency
        semaphore = asyncio.Semaphore(3)  # Limit to 3 concurrent resource translations
        
        async def bounded_translate_resource(task, resource_id, language):
            async with semaphore:
                # Add small delay to avoid overwhelming the service
                await asyncio.sleep(random.uniform(0.1, 0.3))
                return await task, resource_id, language
        
        # Create bounded tasks
        bounded_tasks = [
            bounded_translate_resource(task, resource_id, language) 
            for task, (resource_id, language) in zip(translation_tasks, task_metadata)
        ]
        
        # Wait for all translations to complete
        logger.info(f"Executing {len(bounded_tasks)} translation tasks concurrently...")
        completed_tasks = await asyncio.gather(*bounded_tasks, return_exceptions=True)
        
        # Process results
        for result in completed_tasks:
            if isinstance(result, Exception):
                logger.error(f"Translation task failed: {result}")
                continue
            
            success, resource_id, language = result
            results[resource_id][language] = success
        
        # Update overall resource translation status
        for resource in resources:
            resource_results = results.get(resource.id, {})
            if resource_results:
                all_successful = all(resource_results.values())
                has_failures = any(not success for success in resource_results.values())
                
                if all_successful:
                    resource.translation_status = 'completed'
                elif has_failures:
                    resource.translation_status = 'failed'
                else:
                    resource.translation_status = 'pending'
            else:
                resource.translation_status = 'failed'
            
            # Update content hash
            resource.last_translation_hash = self.calculate_content_hash(
                resource.resource_name, resource.summary
            )
        
        db.commit()
        logger.info(f"Async batch translation completed")
        return results
    
    async def translate_user_description_batch(self, user_id: int, db: Session, 
                                             languages: Optional[List[str]] = None) -> Dict[str, bool]:
        """Async translate a user's description to multiple languages"""
        if not self.is_available():
            logger.error("Translation service not available")
            return {}
        
        if languages is None:
            languages = [lang for lang in SUPPORTED_LANGUAGES.keys() if lang != 'en']
        
        # Get user to translate
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            logger.error(f"User {user_id} not found")
            return {}
        
        if not user.roadmap_summary or not user.roadmap_summary.strip():
            logger.warning(f"User {user_id} has no roadmap summary to translate")
            return {}
        
        logger.info(f"Starting async batch translation for user {user_id} description in {len(languages)} languages")
        
        results = {}
        
        # Update user translation status to pending
        user.roadmap_translation_status = 'pending'
        
        # Create translation tasks for all languages
        translation_tasks = []
        task_metadata = []
        
        # First, create all pending translation entries
        for language in languages:
            if language == 'en':
                results[language] = True
                continue
            
            # Create pending translation entry immediately
            self._create_pending_user_translation(db, user.id, language)
            
            # Create async task for this language
            task = self.translate_user_description(user.id, language, db)
            translation_tasks.append(task)
            task_metadata.append(language)
        
        # Commit all pending status updates
        db.commit()
        logger.info(f"Created pending entries for {len(translation_tasks)} user translations")
        
        # Execute all translation tasks concurrently with semaphore to limit concurrency
        semaphore = asyncio.Semaphore(3)  # Limit to 3 concurrent translations
        
        async def bounded_translate_user_description(task, language):
            async with semaphore:
                # Add small delay to avoid overwhelming the service
                await asyncio.sleep(random.uniform(0.1, 0.3))
                return await task, language
        
        # Create bounded tasks
        bounded_tasks = [
            bounded_translate_user_description(task, language) 
            for task, language in zip(translation_tasks, task_metadata)
        ]
        
        # Wait for all translations to complete
        logger.info(f"Executing {len(bounded_tasks)} user translation tasks concurrently...")
        completed_tasks = await asyncio.gather(*bounded_tasks, return_exceptions=True)
        
        # Process results
        for result in completed_tasks:
            if isinstance(result, Exception):
                logger.error(f"User translation task failed: {result}")
                continue
            
            success, language = result
            results[language] = success
        
        # Update overall user translation status
        if results:
            all_successful = all(results.values())
            has_failures = any(not success for success in results.values())
            
            if all_successful:
                user.roadmap_translation_status = 'completed'
            elif has_failures:
                user.roadmap_translation_status = 'failed'
            else:
                user.roadmap_translation_status = 'pending'
        else:
            user.roadmap_translation_status = 'failed'
        
        # Update content hash
        user.last_roadmap_translation_hash = self.calculate_user_description_hash(
            user.roadmap_summary
        )
        
        db.commit()
        logger.info(f"Async user description translation completed")
        return results
    
    def get_translation_status(self, db: Session) -> Dict[str, any]:
        """Get overall translation status statistics"""
        try:
            # Count resources by translation status
            status_counts = db.execute(sql_text("""
                SELECT translation_status, COUNT(*) as count
                FROM resources 
                GROUP BY translation_status
            """)).fetchall()
            
            # Count translations by language and status
            language_stats = db.execute(sql_text("""
                SELECT language_code, translation_status, COUNT(*) as count
                FROM resource_translations 
                GROUP BY language_code, translation_status
                ORDER BY language_code, translation_status
            """)).fetchall()
            
            return {
                'resource_status': {row.translation_status: row.count for row in status_counts},
                'language_stats': [
                    {
                        'language': row.language_code,
                        'status': row.translation_status,
                        'count': row.count
                    } for row in language_stats
                ]
            }
            
        except Exception as e:
            logger.error(f"Error getting translation status: {e}")
            return {'resource_status': {}, 'language_stats': []}
    
    def get_user_translation(self, user_id: int, language_code: str, db: Session) -> Optional[str]:
        """Get translated roadmap summary for a user in a specific language"""
        if language_code == 'en':
            # Return original English text
            user = db.query(User).filter(User.id == user_id).first()
            return user.roadmap_summary if user else None
        
        try:
            translation = db.query(UserDescriptionTranslation).filter(
                UserDescriptionTranslation.user_id == user_id,
                UserDescriptionTranslation.language_code == language_code,
                UserDescriptionTranslation.translation_status == 'completed'
            ).first()
            
            return translation.roadmap_summary_translated if translation else None
            
        except Exception as e:
            logger.error(f"Error getting user translation: {e}")
            return None
    
    def identify_resources_needing_translation(self, db: Session) -> List[str]:
        """Identify resources that need translation (new or updated content) - only Ready resources"""
        try:
            # First, update translation status based on existing translations
            self.update_translation_status_from_db(db)
            
            # Get resources that might need translation
            # IMPORTANT: Only include resources that are marked as "Ready"
            # We'll do more detailed checking in the loop below
            resources = db.query(Resource).filter(
                Resource.ready == True  # Only translate Ready resources
            ).all()
            
            resources_needing_translation = []
            
            for resource in resources:
                current_hash = self.calculate_content_hash(resource.resource_name, resource.summary)
                
                # Check if resource needs translation for any of these reasons:
                # 1. Translation status indicates it needs translation (not_started, failed)
                # 2. Hash has changed (content updated since last translation)
                # 3. No translation hash exists (never been translated)
                # 4. No translation records exist in database (legacy resources)
                needs_translation = False
                reason = ""
                
                # Check translation status first
                if resource.translation_status in ['not_started', 'failed', 'pending']:
                    needs_translation = True
                    reason = f"status is {resource.translation_status}"
                
                # Check if content has changed (hash mismatch)
                elif resource.last_translation_hash != current_hash:
                    needs_translation = True
                    if resource.last_translation_hash is None:
                        reason = "no hash exists (never translated)"
                    else:
                        reason = "content hash changed"
                
                # Additional check for legacy resources: see if any translation records actually exist
                # This catches resources that might have incorrect status but no actual translations
                elif resource.translation_status == 'completed':
                    existing_translations = db.query(ResourceTranslation).filter(
                        ResourceTranslation.resource_id == resource.id
                    ).count()
                    
                    if existing_translations == 0:
                        needs_translation = True
                        reason = "no translation records exist (legacy resource with incorrect status)"
                
                if needs_translation:
                    resources_needing_translation.append(resource.id)
                    logger.debug(f"Resource {resource.id} needs translation: {reason}")
            
            logger.info(f"Found {len(resources_needing_translation)} Ready resources needing translation")
            return resources_needing_translation
            
        except Exception as e:
            logger.error(f"Error identifying resources needing translation: {e}")
            return []
    
    def identify_users_needing_translation(self, db: Session) -> List[int]:
        """Identify users whose descriptions need translation (new or updated content)"""
        try:
            # First, update translation status based on existing translations
            self.update_user_translation_status_from_db(db)
            
            # Get users that have roadmap summaries and need translation
            users = db.query(User).filter(
                User.roadmap_summary.isnot(None),
                User.roadmap_summary != '',
                (
                    (User.roadmap_translation_status.in_(['not_started', 'failed'])) |
                    (User.last_roadmap_translation_hash.is_(None))
                )
            ).all()
            
            users_needing_translation = []
            
            for user in users:
                current_hash = self.calculate_user_description_hash(user.roadmap_summary)
                if user.last_roadmap_translation_hash != current_hash:
                    users_needing_translation.append(user.id)
            
            logger.info(f"Found {len(users_needing_translation)} users needing description translation")
            return users_needing_translation
            
        except Exception as e:
            logger.error(f"Error identifying users needing translation: {e}")
            return []
    
    def update_translation_status_from_db(self, db: Session):
        """Update resource translation status based on existing translations in database"""
        try:
            # Get all resources
            resources = db.query(Resource).all()
            
            for resource in resources:
                # For non-Ready resources, set translation status to 'not_started' and skip translation logic
                if not resource.ready:
                    resource.translation_status = 'not_started'
                    continue
                
                # Count successful translations for this Ready resource
                completed_translations = db.query(ResourceTranslation).filter(
                    ResourceTranslation.resource_id == resource.id,
                    ResourceTranslation.translation_status == 'completed'
                ).count()
                
                failed_translations = db.query(ResourceTranslation).filter(
                    ResourceTranslation.resource_id == resource.id,
                    ResourceTranslation.translation_status == 'failed'
                ).count()
                
                total_expected = len([lang for lang in SUPPORTED_LANGUAGES.keys() if lang != 'en'])
                
                if completed_translations >= total_expected:
                    resource.translation_status = 'completed'
                elif failed_translations > 0:
                    resource.translation_status = 'failed'
                elif completed_translations > 0:
                    resource.translation_status = 'pending'
                else:
                    resource.translation_status = 'not_started'
            
            db.commit()
            logger.info("Updated translation status from database")
            
        except Exception as e:
            logger.error(f"Error updating translation status from database: {e}")
            db.rollback()
    
    def update_user_translation_status_from_db(self, db: Session):
        """Update user translation status based on existing translations in database"""
        try:
            # Get all users with roadmap summaries
            users = db.query(User).filter(
                User.roadmap_summary.isnot(None),
                User.roadmap_summary != ''
            ).all()
            
            for user in users:
                # Count successful translations for this user
                completed_translations = db.query(UserDescriptionTranslation).filter(
                    UserDescriptionTranslation.user_id == user.id,
                    UserDescriptionTranslation.translation_status == 'completed'
                ).count()
                
                failed_translations = db.query(UserDescriptionTranslation).filter(
                    UserDescriptionTranslation.user_id == user.id,
                    UserDescriptionTranslation.translation_status == 'failed'
                ).count()
                
                total_expected = len([lang for lang in SUPPORTED_LANGUAGES.keys() if lang != 'en'])
                
                if completed_translations >= total_expected:
                    user.roadmap_translation_status = 'completed'
                elif failed_translations > 0:
                    user.roadmap_translation_status = 'failed'
                elif completed_translations > 0:
                    user.roadmap_translation_status = 'pending'
                else:
                    user.roadmap_translation_status = 'not_started'
            
            db.commit()
            logger.info("Updated user translation status from database")
            
        except Exception as e:
            logger.error(f"Error updating user translation status from database: {e}")
            db.rollback()
    
    async def translate_category_subtitles(self, user_id: int, categories: List[Dict[str, any]], db: Session,
                                          languages: Optional[List[str]] = None) -> Dict[str, Dict[str, bool]]:
        """Translate priority category subtitles for a specific user
        
        Args:
            user_id: The user ID
            categories: List of category dicts with 'key' and 'subtitle' fields
            db: Database session
            languages: List of language codes to translate to (defaults to all supported languages)
        
        Returns:
            Dict mapping category_key -> language_code -> success boolean
        """
        if not self.is_available():
            logger.error("Translation service not available")
            return {}
        
        if languages is None:
            languages = [lang for lang in SUPPORTED_LANGUAGES.keys() if lang != 'en']
        
        logger.info(f"Starting category subtitle translation for user {user_id}, {len(categories)} categories, {len(languages)} languages")
        
        results = {}
        
        # Create translation tasks for all categories and languages
        translation_tasks = []
        task_metadata = []
        
        for category in categories:
            category_key = category.get('key')
            subtitle = category.get('subtitle', '')
            
            if not category_key or not subtitle:
                logger.warning(f"Skipping category with missing key or subtitle: {category}")
                continue
            
            results[category_key] = {}
            
            for language in languages:
                if language == 'en':
                    results[category_key][language] = True
                    continue
                
                # Create pending translation entry immediately
                self._create_pending_category_subtitle_translation(db, user_id, category_key, language)
                
                # Create async task for this category-language combination
                task = self._translate_category_subtitle(user_id, category_key, subtitle, language, db)
                translation_tasks.append(task)
                task_metadata.append((category_key, language))
        
        # Commit all pending status updates
        db.commit()
        logger.info(f"Created pending entries for {len(translation_tasks)} category subtitle translations")
        
        # Execute all translation tasks concurrently with semaphore to limit concurrency
        semaphore = asyncio.Semaphore(3)  # Limit to 3 concurrent translations
        
        async def bounded_translate(task, category_key, language):
            async with semaphore:
                # Add small delay to avoid overwhelming the service
                await asyncio.sleep(random.uniform(0.1, 0.3))
                return await task, category_key, language
        
        # Create bounded tasks
        bounded_tasks = [
            bounded_translate(task, category_key, language) 
            for task, (category_key, language) in zip(translation_tasks, task_metadata)
        ]
        
        # Wait for all translations to complete
        logger.info(f"Executing {len(bounded_tasks)} category subtitle translation tasks concurrently...")
        completed_tasks = await asyncio.gather(*bounded_tasks, return_exceptions=True)
        
        # Process results
        for result in completed_tasks:
            if isinstance(result, Exception):
                logger.error(f"Category subtitle translation task failed: {result}")
                continue
            
            success, category_key, language = result
            if category_key in results:
                results[category_key][language] = success
        
        logger.info(f"Category subtitle translation completed for user {user_id}")
        return results
    
    async def _translate_category_subtitle(self, user_id: int, category_key: str, subtitle: str, 
                                          target_language: str, db: Session) -> bool:
        """Translate a single category subtitle"""
        try:
            logger.info(f"Translating category subtitle for user {user_id}, category {category_key} to {target_language}")
            
            # Translate the subtitle
            subtitle_translated = await self.translate_text(subtitle, target_language)
            
            logger.info(f"Translated subtitle: '{subtitle[:50]}...' -> '{subtitle_translated[:50] if subtitle_translated else None}...'")
            
            # Check if translation was successful
            if not subtitle_translated:
                self._save_category_subtitle_translation_error(
                    db, user_id, category_key, target_language, 
                    "Failed to translate subtitle"
                )
                return False
            
            # Save translation to database
            self._save_category_subtitle_translation(
                db, user_id, category_key, target_language, subtitle_translated
            )
            
            return True
            
        except Exception as e:
            logger.error(f"Error translating category subtitle for user {user_id}, category {category_key} to {target_language}: {e}")
            self._save_category_subtitle_translation_error(db, user_id, category_key, target_language, str(e))
            return False
    
    def _create_pending_category_subtitle_translation(self, db: Session, user_id: int, 
                                                     category_key: str, language_code: str):
        """Create or update category subtitle translation entry with pending status"""
        try:
            # Check if translation already exists
            existing = db.query(PriorityCategorySubtitleTranslation).filter(
                PriorityCategorySubtitleTranslation.user_id == user_id,
                PriorityCategorySubtitleTranslation.category_key == category_key,
                PriorityCategorySubtitleTranslation.language_code == language_code
            ).first()
            
            if existing:
                # Update existing translation to pending
                existing.translation_status = 'pending'
                existing.error_message = None
            else:
                # Create new translation with pending status
                translation = PriorityCategorySubtitleTranslation(
                    user_id=user_id,
                    category_key=category_key,
                    language_code=language_code,
                    translation_status='pending'
                )
                db.add(translation)
            
            db.commit()
            logger.info(f"Set pending status for category subtitle user {user_id}, category {category_key} in {language_code}")
            
        except Exception as e:
            logger.error(f"Error setting pending category subtitle translation status: {e}")
            db.rollback()
    
    def _save_category_subtitle_translation(self, db: Session, user_id: int, category_key: str,
                                           language_code: str, subtitle_translated: str):
        """Save successful category subtitle translation to database"""
        try:
            # Check if translation already exists
            existing = db.query(PriorityCategorySubtitleTranslation).filter(
                PriorityCategorySubtitleTranslation.user_id == user_id,
                PriorityCategorySubtitleTranslation.category_key == category_key,
                PriorityCategorySubtitleTranslation.language_code == language_code
            ).first()
            
            if existing:
                # Update existing translation
                existing.subtitle_translated = subtitle_translated
                existing.translation_status = 'completed'
                existing.error_message = None
            else:
                # Create new translation
                translation = PriorityCategorySubtitleTranslation(
                    user_id=user_id,
                    category_key=category_key,
                    language_code=language_code,
                    subtitle_translated=subtitle_translated,
                    translation_status='completed'
                )
                db.add(translation)
            
            db.commit()
            logger.info(f"Saved category subtitle translation for user {user_id}, category {category_key} in {language_code}")
            
        except Exception as e:
            db.rollback()
            logger.error(f"Error saving category subtitle translation: {e}")
            raise
    
    def _save_category_subtitle_translation_error(self, db: Session, user_id: int, category_key: str,
                                                  language_code: str, error_message: str):
        """Save category subtitle translation error to database"""
        try:
            # Check if translation record already exists
            existing = db.query(PriorityCategorySubtitleTranslation).filter(
                PriorityCategorySubtitleTranslation.user_id == user_id,
                PriorityCategorySubtitleTranslation.category_key == category_key,
                PriorityCategorySubtitleTranslation.language_code == language_code
            ).first()
            
            if existing:
                existing.translation_status = 'failed'
                existing.error_message = error_message
            else:
                translation = PriorityCategorySubtitleTranslation(
                    user_id=user_id,
                    category_key=category_key,
                    language_code=language_code,
                    translation_status='failed',
                    error_message=error_message
                )
                db.add(translation)
            
            db.commit()
            
        except Exception as e:
            db.rollback()
            logger.error(f"Error saving category subtitle translation error: {e}")
    
    def get_category_subtitle_translation(self, user_id: int, category_key: str, 
                                         language_code: str, db: Session) -> Optional[str]:
        """Get translated subtitle for a specific user's category in a specific language"""
        if language_code == 'en':
            # For English, return None so caller can use the original subtitle
            return None
        
        try:
            translation = db.query(PriorityCategorySubtitleTranslation).filter(
                PriorityCategorySubtitleTranslation.user_id == user_id,
                PriorityCategorySubtitleTranslation.category_key == category_key,
                PriorityCategorySubtitleTranslation.language_code == language_code,
                PriorityCategorySubtitleTranslation.translation_status == 'completed'
            ).first()
            
            return translation.subtitle_translated if translation else None
            
        except Exception as e:
            logger.error(f"Error getting category subtitle translation: {e}")
            return None
    
    def cleanup(self):
        """Clean up resources (call on application shutdown)"""
        if hasattr(self, '_executor') and self._executor:
            logger.info("Shutting down translation service executor...")
            self._executor.shutdown(wait=True)
            logger.info("Translation service executor shut down successfully")

# Global translation service instance
translation_service = TranslationService()