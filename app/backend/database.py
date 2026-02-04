import os
import logging
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, ForeignKey, Boolean, Index, text, UniqueConstraint
from sqlalchemy.dialects.postgresql import JSONB, TSVECTOR
from sqlalchemy.orm import declarative_base, sessionmaker, relationship
from sqlalchemy.sql import func
from datetime import datetime

# Database URL configuration (PostgreSQL only)
DATABASE_URL = os.getenv("DATABASE_URL") or "postgresql://pioneer_user:pioneer_password@postgres:5432/pioneer"

# Configure engine for PostgreSQL
engine = create_engine(DATABASE_URL, echo=False)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
logger = logging.getLogger(__name__)

# SQLAlchemy Models
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, index=True, nullable=True)  # Made nullable, removed uniqueness constraint
    hashed_password = Column(String, nullable=True)  # Make nullable for Auth0 users
    auth0_user_id = Column(String(255), unique=True, index=True, nullable=True)  # Auth0 user identifier
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    first_name = Column(String)
    last_name = Column(String)

    # Role-based access control
    role = Column(String, default="user")  # "immigrant", "student", "professional", "admin", "user"
    user_type = Column(String)  # More specific categorization

    # User preferences and profile
    primary_language = Column(String, default="en")
    cultural_background = Column(String)

    # Demo user flag
    is_demo_user = Column(Boolean, default=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Onboarding fields (Phase 1)
    is_onboarded = Column(Boolean, default=False, nullable=False)
    first_survey_at = Column(DateTime(timezone=True))
    checklist_id = Column(String(64))
    survey_responses = Column(JSONB)
    onboarding_profile = Column(JSONB)
    roadmap_summary = Column(Text)
    
    # Translation tracking for roadmap_summary
    roadmap_translation_status = Column(String, default='not_started', nullable=False, index=True)  # not_started, pending, completed, failed
    last_roadmap_translation_hash = Column(String(64))  # SHA256 hash of roadmap_summary for change detection

class Resource(Base):
    __tablename__ = "resources"

    id = Column(String, primary_key=True)
    ready = Column(Boolean, default=False, nullable=False, index=True)  # Ready status from CSV
    published = Column(Boolean, default=False, nullable=False, index=True)  # Visible to public only when published
    category = Column(String, nullable=False, index=True)  # Main category
    subcategory = Column(String, index=True)  # Subcategories (may contain multiple, comma-separated)
    resource_name = Column(String, nullable=False, index=True)  # Resource name
    summary = Column(Text)  # Summary/description
    website_link = Column(String)  # Website URL
    physical_location = Column(String)  # Physical location
    notes = Column(Text)  # Additional notes
    # Priority 1 (lowest) to 7 (highest). Optional for backward compatibility.
    priority = Column(Integer)
    
    # Translation tracking fields
    translation_status = Column(String, default='not_started', nullable=False, index=True)  # not_started, pending, completed, failed
    last_translation_hash = Column(String(64))  # SHA256 hash of resource_name + summary for change detection
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Full-text search vector for PostgreSQL FTS
    search_vector = Column(TSVECTOR)

    # Add indexes for common query patterns
    __table_args__ = (
        # Index for category + subcategory (common filter combination)
        Index('idx_resource_category_subcategory', 'category', 'subcategory'),
        # Index for ready + category (for filtering ready resources by category)
        Index('idx_resource_ready_category', 'ready', 'category'),
        # Index for resource name search
        Index('idx_resource_name_search', 'resource_name'),
        # Index for published + ready filtering
        Index('idx_resource_published_ready', 'published', 'ready'),
        # Index for translation status
        Index('idx_resource_translation_status', 'translation_status'),
    )

class Category(Base):
    __tablename__ = "categories"

    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    description = Column(Text)
    icon = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class ResourceTranslation(Base):
    __tablename__ = "resource_translations"

    id = Column(Integer, primary_key=True, autoincrement=True)
    resource_id = Column(String, ForeignKey('resources.id', ondelete='CASCADE'), nullable=False, index=True)
    language_code = Column(String(2), nullable=False, index=True)
    resource_name_translated = Column(Text)
    summary_translated = Column(Text)
    translation_status = Column(String, default='pending', nullable=False)  # pending, completed, failed
    error_message = Column(Text)  # Store error details if translation fails
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Ensure one translation per resource per language
    __table_args__ = (
        UniqueConstraint('resource_id', 'language_code', name='uq_resource_language'),
        Index('idx_translation_status', 'translation_status'),
        Index('idx_translation_language', 'language_code'),
    )

class UserDescriptionTranslation(Base):
    __tablename__ = "user_description_translations"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'), nullable=False, index=True)
    language_code = Column(String(2), nullable=False, index=True)
    roadmap_summary_translated = Column(Text)
    translation_status = Column(String, default='pending', nullable=False)  # pending, completed, failed
    error_message = Column(Text)  # Store error details if translation fails
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Ensure one translation per user per language
    __table_args__ = (
        UniqueConstraint('user_id', 'language_code', name='uq_user_language'),
        Index('idx_user_translation_status', 'translation_status'),
        Index('idx_user_translation_language', 'language_code'),
    )

class PriorityCategorySubtitleTranslation(Base):
    __tablename__ = "priority_category_subtitle_translations"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'), nullable=False, index=True)
    category_key = Column(String(50), nullable=False, index=True)  # e.g., 'housing', 'education', 'income'
    language_code = Column(String(2), nullable=False, index=True)
    subtitle_translated = Column(Text)
    translation_status = Column(String, default='pending', nullable=False)  # pending, completed, failed
    error_message = Column(Text)  # Store error details if translation fails
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Ensure one translation per user per category per language
    __table_args__ = (
        UniqueConstraint('user_id', 'category_key', 'language_code', name='uq_user_category_language'),
        Index('idx_category_subtitle_translation_status', 'translation_status'),
        Index('idx_category_subtitle_translation_language', 'language_code'),
        Index('idx_category_subtitle_user_category', 'user_id', 'category_key'),
    )

class ScreeningResponse(Base):
    __tablename__ = "screening_responses"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(String)
    responses = Column(Text)  # JSON string
    recommendations = Column(Text)  # JSON string
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Checklist(Base):
    __tablename__ = "checklists"

    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    description = Column(Text)
    items = Column(Text)  # JSON string
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id = Column(Integer, primary_key=True, autoincrement=True)
    session_id = Column(String)
    message = Column(Text, nullable=False)
    sender = Column(String, nullable=False)  # 'user' or 'assistant'
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

class UserProgress(Base):
    __tablename__ = "user_progress"

    id = Column(Integer, primary_key=True, autoincrement=True)
    checklist_id = Column(String, nullable=False)
    progress_data = Column(Text)  # JSON string
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

class UserPreferences(Base):
    __tablename__ = "user_preferences"

    id = Column(Integer, primary_key=True, autoincrement=True)
    checklist_id = Column(String, nullable=False)
    language_preference = Column(String, default='en')
    accessibility_settings = Column(Text)  # JSON string
    notification_settings = Column(Text)  # JSON string
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

class Bookmark(Base):
    __tablename__ = "bookmarks"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    resource_id = Column(String, ForeignKey('resources.id'), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", backref="bookmarks")
    resource = relationship("Resource", backref="bookmarked_by")
    
    # Unique constraint to prevent duplicate bookmarks
    __table_args__ = (
        Index('idx_user_resource_bookmark', 'user_id', 'resource_id', unique=True),
    )

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_tables():
    """Create tables if they do not exist (non-destructive, idempotent)."""
    logger.info("Ensuring database schema is up to date (create_all, non-destructive)…")
    Base.metadata.create_all(bind=engine)
    logger.info("Schema ensure finished.")

def reset_tables():
    """Drop and recreate all tables. Intended for local development only."""
    logger.warning("Resetting database schema (DROP ALL + CREATE ALL). Intended for local dev only.")
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

def get_database_url():
    """Get the current database URL"""
    return DATABASE_URL

def is_postgresql():
    """Check if we're using PostgreSQL"""
    return True

def init_extensions():
    """Initialize PostgreSQL extensions if they don't exist."""
    try:
        with engine.connect() as conn:
            # Create extensions if they don't exist
            extensions = [
                "uuid-ossp",  # For UUID generation functions
                "pg_trgm",    # For trigram matching (fuzzy text search)
                "unaccent"    # For removing accents from text
            ]
            
            for extension in extensions:
                try:
                    conn.execute(text(f"CREATE EXTENSION IF NOT EXISTS \"{extension}\""))
                    logger.info(f"Extension '{extension}' ensured to exist")
                except Exception as e:
                    logger.warning(f"Could not create extension '{extension}': {e}")
                    
            conn.commit()
            
    except Exception as e:
        logger.error(f"Failed to initialize extensions: {e}")
        raise
