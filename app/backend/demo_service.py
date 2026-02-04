import os
import json
from typing import List, Dict, Any
from datetime import datetime, timedelta
import random
import logging
from database import (
    SessionLocal, create_tables, is_postgresql,
    Resource, Category, ScreeningResponse, Checklist, ChatMessage, UserProgress, UserPreferences, User
)
from sqlalchemy.exc import SQLAlchemyError
logger = logging.getLogger(__name__)

# Legacy SQLite variables removed: PostgreSQL is the only supported DB

def create_database_schema():
    """Create database tables using SQLAlchemy"""
    logger.info("Creating database schema…")
    try:
        logger.info("Demo: starting create_tables() …")
        create_tables()
        logger.info("Demo: finished create_tables().")
        logger.info("Database tables created successfully")
    except SQLAlchemyError as e:
        logger.error(f"Failed to create tables: {e}")
        raise

def populate_categories():
    """Populate categories table with demo data"""
    session = SessionLocal()
    try:
        categories_data = [
            {
                "id": "housing",
                "name": "Housing",
                "description": "Affordable housing, temporary shelter, and housing assistance programs",
                "icon": "home"
            },
            {
                "id": "education",
                "name": "Education",
                "description": "English classes, job training, and educational programs",
                "icon": "book"
            },
            {
                "id": "healthcare",
                "name": "Healthcare",
                "description": "Medical services, mental health support, and health insurance assistance",
                "icon": "heart"
            },
            {
                "id": "employment",
                "name": "Employment",
                "description": "Job placement services, resume help, and career development",
                "icon": "briefcase"
            },
            {
                "id": "legal",
                "name": "Legal Services",
                "description": "Immigration assistance, legal aid, and document help",
                "icon": "scales"
            },
            {
                "id": "social",
                "name": "Social Engagement",
                "description": "Community groups, cultural events, and social support networks",
                "icon": "users"
            },
            {
                "id": "emergency",
                "name": "Emergency Assistance",
                "description": "Food assistance, emergency shelter, and crisis support",
                "icon": "alert-circle"
            },
            {
                "id": "transportation",
                "name": "Transportation",
                "description": "Public transit help, driving lessons, and transportation vouchers",
                "icon": "car"
            }
        ]
        
        for cat_data in categories_data:
            category = Category(**cat_data)
            session.merge(category)
        
        session.commit()
        print(f"✅ Populated {len(categories_data)} categories")
        
    except SQLAlchemyError as e:
        session.rollback()
        print(f"❌ Failed to populate categories: {e}")
        raise
    finally:
        session.close()

def populate_resources():
    """Populate resources table with demo data"""
    session = SessionLocal()
    try:
        # Use canonical category names and CSV-style subcategories
        resources_data = [
            {
                "id": "welcome-house",
                "ready": True,
                "published": True,
                "category": "Living/Essentials",
                "subcategory": "Housing/Housing assistance",
                "resource_name": "Welcome House",
                "summary": "Affordable housing for newcomers.",
                "website_link": "https://welcomehouse.org",
                "physical_location": "Pittsburgh",
                "notes": None,
                "priority": 7,
            },
            {
                "id": "esl-center",
                "ready": True,
                "published": True,
                "category": "ESL/Immigrant",
                "subcategory": "ESL support",
                "resource_name": "ESL Learning Center",
                "summary": "English as a Second Language courses.",
                "website_link": "https://eslcenter.org",
                "physical_location": "Pittsburgh",
                "notes": None,
                "priority": 6,
            },
            {
                "id": "health-clinic",
                "ready": True,
                "published": True,
                "category": "Living/Essentials",
                "subcategory": "Health/Body and mind care",
                "resource_name": "Community Health Clinic",
                "summary": "Primary healthcare services.",
                "website_link": "https://healthclinic.org",
                "physical_location": "Pittsburgh",
                "notes": None,
                "priority": 5,
            },
            {
                "id": "job-center",
                "ready": True,
                "published": True,
                "category": "Work/Business",
                "subcategory": "Career support",
                "resource_name": "Employment Resource Center",
                "summary": "Job placement and career services.",
                "website_link": "https://employmentcenter.org",
                "physical_location": "Pittsburgh",
                "notes": None,
                "priority": 5,
            },
            {
                "id": "legal-aid",
                "ready": True,
                "published": True,
                "category": "ESL/Immigrant",
                "subcategory": "Immigration/Asylum",
                "resource_name": "Immigration Legal Aid",
                "summary": "Immigration legal assistance.",
                "website_link": "https://legalaid.org",
                "physical_location": "Pittsburgh",
                "notes": None,
                "priority": 6,
            },
            {
                "id": "tech-club",
                "ready": True,
                "published": True,
                "category": "Community/Belonging",
                "subcategory": "Social connection",
                "resource_name": "Tech Professionals Network",
                "summary": "Professional networking for tech workers.",
                "website_link": "https://techclub.org",
                "physical_location": "Pittsburgh",
                "notes": None,
                "priority": 3,
            },
            {
                "id": "food-bank",
                "ready": True,
                "published": True,
                "category": "Living/Essentials",
                "subcategory": "Food/Food pantries",
                "resource_name": "Greater Pittsburgh Food Bank",
                "summary": "Emergency food assistance.",
                "website_link": "https://foodbank.org",
                "physical_location": "Pittsburgh",
                "notes": None,
                "priority": 7,
            },
            {
                "id": "family-services",
                "ready": True,
                "published": True,
                "category": "Education/Youth",
                "subcategory": "Youth programming",
                "resource_name": "Family Support Center",
                "summary": "Family and children services.",
                "website_link": "https://familysupport.org",
                "physical_location": "Pittsburgh",
                "notes": None,
                "priority": 4,
            },
        ]
        
        for resource_data in resources_data:
            resource = Resource(**resource_data)
            session.merge(resource)
        
        session.commit()
        print(f"✅ Populated {len(resources_data)} resources")
        
    except SQLAlchemyError as e:
        session.rollback()
        print(f"❌ Failed to populate resources: {e}")
        raise
    finally:
        session.close()

def populate_checklists():
    """Populate checklists table with demo data"""
    session = SessionLocal()
    try:
        checklists_data = [
            {
                "id": "newcomer-essentials",
                "name": "Newcomer Essentials Checklist",
                "description": "Essential tasks for new arrivals to complete in their first month",
                "items": json.dumps([
                    {"id": "housing", "text": "Find temporary or permanent housing", "completed": False, "priority": "high"},
                    {"id": "documents", "text": "Organize important documents (passport, ID, etc.)", "completed": False, "priority": "high"},
                    {"id": "bank-account", "text": "Open a bank account", "completed": False, "priority": "medium"},
                    {"id": "phone", "text": "Set up phone service", "completed": False, "priority": "high"},
                    {"id": "transportation", "text": "Learn about public transportation", "completed": False, "priority": "medium"},
                    {"id": "emergency-contacts", "text": "Establish emergency contacts", "completed": False, "priority": "high"},
                    {"id": "healthcare", "text": "Find healthcare provider", "completed": False, "priority": "medium"},
                    {"id": "food-sources", "text": "Locate grocery stores and food assistance", "completed": False, "priority": "medium"}
                ])
            },
            {
                "id": "employment-readiness",
                "name": "Employment Readiness Checklist",
                "description": "Steps to prepare for employment in Pittsburgh",
                "items": json.dumps([
                    {"id": "resume-update", "text": "Update resume for US job market", "completed": False, "priority": "high"},
                    {"id": "credential-evaluation", "text": "Get foreign credentials evaluated", "completed": False, "priority": "medium"},
                    {"id": "interview-prep", "text": "Practice interview skills", "completed": False, "priority": "medium"},
                    {"id": "networking", "text": "Join professional networks", "completed": False, "priority": "medium"},
                    {"id": "linkedin", "text": "Create/update LinkedIn profile", "completed": False, "priority": "medium"},
                    {"id": "references", "text": "Establish professional references", "completed": False, "priority": "low"},
                    {"id": "job-search", "text": "Start active job search", "completed": False, "priority": "high"}
                ])
            },
            {
                "id": "education-pathway",
                "name": "Education Pathway Checklist",
                "description": "Educational goals and language learning steps",
                "items": json.dumps([
                    {"id": "english-assessment", "text": "Take English proficiency assessment", "completed": False, "priority": "high"},
                    {"id": "esl-enrollment", "text": "Enroll in ESL classes", "completed": False, "priority": "high"},
                    {"id": "credentials", "text": "Evaluate foreign education credentials", "completed": False, "priority": "medium"},
                    {"id": "library-card", "text": "Get public library card", "completed": False, "priority": "low"},
                    {"id": "citizenship-prep", "text": "Consider citizenship preparation classes", "completed": False, "priority": "low"},
                    {"id": "vocational-training", "text": "Research vocational training programs", "completed": False, "priority": "medium"},
                    {"id": "computer-skills", "text": "Assess and improve computer skills", "completed": False, "priority": "medium"}
                ])
            }
        ]
        
        for checklist_data in checklists_data:
            checklist = Checklist(**checklist_data)
            session.merge(checklist)
        
        session.commit()
        print(f"✅ Populated {len(checklists_data)} checklists")
        
    except SQLAlchemyError as e:
        session.rollback()
        print(f"❌ Failed to populate checklists: {e}")
        raise
    finally:
        session.close()

def populate_sample_chat_data():
    """Populate chat messages with sample conversation data"""
    session = SessionLocal()
    try:
        sample_conversations = [
            {
                "session_id": "demo-chat-1",
                "messages": [
                    {"message": "Hello! I just arrived in Pittsburgh and need help finding housing.", "sender": "user"},
                    {"message": "Welcome to Pittsburgh! I'd be happy to help you find housing. Are you looking for temporary or permanent housing? Do you have any specific budget or location preferences?", "sender": "assistant"},
                    {"message": "I need something temporary for now, maybe a month or two while I look for a permanent place.", "sender": "user"},
                    {"message": "Perfect! For temporary housing, I recommend checking out Welcome House - they specialize in housing for newcomers and offer both temporary and permanent solutions. They're located at 123 Main St and you can reach them at 412-555-1234.", "sender": "assistant"}
                ]
            },
            {
                "session_id": "demo-chat-2",
                "messages": [
                    {"message": "I'm looking for English classes in Pittsburgh. What options are available?", "sender": "user"},
                    {"message": "There are several great options for English classes in Pittsburgh! The ESL Learning Center offers courses for all skill levels with morning, evening, and weekend classes. They even provide free childcare during classes. You can contact them at 412-555-9999.", "sender": "assistant"},
                    {"message": "Do they offer citizenship preparation courses too?", "sender": "user"},
                    {"message": "Yes, they do! The ESL Learning Center offers citizenship preparation courses in addition to their regular English classes. This is a great way to improve your English while preparing for the citizenship test.", "sender": "assistant"}
                ]
            },
            {
                "session_id": "demo-chat-3",
                "messages": [
                    {"message": "I'm a software engineer and just moved here for work. Are there any tech networking groups?", "sender": "user"},
                    {"message": "Absolutely! Pittsburgh has a thriving tech scene. I recommend the Tech Professionals Network - they focus on AI, robotics, life sciences, and engineering professionals. They have regular meetups, mentor matching, and career advancement workshops.", "sender": "assistant"},
                    {"message": "That sounds perfect! How can I join?", "sender": "user"},
                    {"message": "You can contact them at 412-555-8888 or visit their website at https://techclub.org. They're located at 400 Innovation Dr. They're always welcoming new members, especially skilled professionals like yourself!", "sender": "assistant"}
                ]
            }
        ]
        
        for conversation in sample_conversations:
            for msg_data in conversation["messages"]:
                message = ChatMessage(
                    session_id=conversation["session_id"],
                    message=msg_data["message"],
                    sender=msg_data["sender"]
                )
                session.add(message)
        
        session.commit()
        print(f"✅ Populated {len(sample_conversations)} sample chat conversations")
        
    except SQLAlchemyError as e:
        session.rollback()
        print(f"❌ Failed to populate chat data: {e}")
        raise
    finally:
        session.close()

def populate_screening_responses():
    """Populate screening responses with sample data"""
    session = SessionLocal()
    try:
        sample_responses_data = [
            {
                "user_id": "demo-user-1",
                "responses": json.dumps({"housing_status": "temporary", "employment_status": "unemployed", "english_level": "beginner", "family_size": "4", "priority_needs": ["housing", "education", "employment"]}),
                "recommendations": json.dumps(["welcome-house", "esl-center", "job-center", "food-bank"])
            },
            {
                "user_id": "demo-user-2",
                "responses": json.dumps({"housing_status": "stable", "employment_status": "employed", "english_level": "intermediate", "family_size": "2", "priority_needs": ["social", "healthcare"]}),
                "recommendations": json.dumps(["tech-club", "health-clinic", "esl-center"])
            },
            {
                "user_id": "demo-user-3",
                "responses": json.dumps({"housing_status": "at_risk", "employment_status": "unemployed", "english_level": "advanced", "family_size": "1", "priority_needs": ["housing", "legal", "employment"]}),
                "recommendations": json.dumps(["welcome-house", "legal-aid", "job-center", "food-bank"])
            }
        ]
        
        for response_data in sample_responses_data:
            response = ScreeningResponse(**response_data)
            session.add(response)
        
        session.commit()
        print(f"✅ Populated {len(sample_responses_data)} screening responses")
        
    except SQLAlchemyError as e:
        session.rollback()
        print(f"❌ Failed to populate screening responses: {e}")
        raise
    finally:
        session.close()

def populate_demo_users():
    """Populate demo users with different roles and characteristics"""
    session = SessionLocal()
    try:
        from auth_utils import get_password_hash
        from datetime import datetime, timedelta
        
        demo_users = [
            {
                "email": "maria.rodriguez@demo.com",
                "username": "maria_immigrant",
                "hashed_password": get_password_hash("DemoPass123!"),
                "first_name": "Maria",
                "last_name": "Rodriguez",
                "role": "immigrant",
                "user_type": "new_american",
                "primary_language": "es",
                "cultural_background": "Hispanic or Latino/a/x",
                "is_demo_user": True,
                "is_verified": True
            },
            {
                "email": "david.chen@demo.com", 
                "username": "david_student",
                "hashed_password": get_password_hash("DemoPass123!"),
                "first_name": "David",
                "last_name": "Chen",
                "role": "student",
                "user_type": "international_student",
                "primary_language": "zh",
                "cultural_background": "Asian (e.g., Chinese, Indian, Vietnamese)",
                "is_demo_user": True,
                "is_verified": True
            },
            {
                "email": "fatima.ahmad@demo.com",
                "username": "fatima_professional", 
                "hashed_password": get_password_hash("DemoPass123!"),
                "first_name": "Fatima",
                "last_name": "Ahmad",
                "role": "professional",
                "user_type": "tech_professional",
                "primary_language": "ar",
                "cultural_background": "Middle Eastern or North African",
                "is_demo_user": True,
                "is_verified": True
            },
            {
                "email": "john.doe@demo.com",
                "username": "john_local",
                "hashed_password": get_password_hash("DemoPass123!"),
                "first_name": "John",
                "last_name": "Doe",
                "role": "local",
                "user_type": "pittsburgh_native",
                "primary_language": "en",
                "cultural_background": "White",
                "is_demo_user": True,
                "is_verified": True
            }
        ]

        def md5_for_answers(answers: Dict[str, Any]) -> str:
            import hashlib
            answers_str = json.dumps(answers, sort_keys=True)
            return f"checklist_{hashlib.md5(answers_str.encode()).hexdigest()[:12]}"

        # Seed users and optionally set onboarding fixtures
        
        # First onboarded user: Maria Rodriguez (traditional immigrant)
        maria_email = "maria.rodriguez@demo.com"
        maria_answers = {
            "audience": "New American/Immigrant seeking settlement support",
            "primary_language": "es",
            "cultural_background": "Hispanic or Latino/a/x",
            "professional_status": "Seeking employment",
            "housing_need": "Temporary/emergency housing",
            "language_support": "English classes (ESL) - beginner to intermediate",
            "employment": "Job search assistance and resume help",
            "community_priorities": ["Cultural and faith-based communities", "Family and children services"],
            "immediate_needs": ["Emergency assistance (food, shelter)", "Legal/immigration assistance"],
            "timeline": "Just arrived (within last month)",
            # techComfort removed
        }
        maria_profile = {
            "audience_type": "traditional_immigrant",
            "tech_oriented": False,
            "traditional_immigrant": True,
            "language_needs": "high",
            "urgency_level": "high",
            "support_level": "high",
        }
        # Generate enhanced personalized summary for Maria
        from recommendation import compose_summary
        maria_summary = compose_summary(maria_profile, maria_answers, "en")
        maria_checklist_id = md5_for_answers(maria_answers)
        
        # Second onboarded user: John Doe (student/professional)
        john_email = "john.doe@demo.com"
        john_answers = {
            "audience": "Student/Professional (attending a Pittsburgh-region university or working for an organization)",
            "primary_language": "en",
            "cultural_background": "White",
            "professional_status": "Other professional",
            "housing_need": "Help finding neighborhoods and market-rate apartments",
            "language_support": "No language support needed",
            "employment": "Professional networking and career advancement",
            "community_priorities": ["Professional networks and industry meetups", "Social activities and entertainment"],
            "immediate_needs": ["Basic services (healthcare, banking, transportation)"],
            "timeline": "Already settled in Pittsburgh area",
            # techComfort removed
        }
        john_profile = {
            "audience_type": "student_professional",
            "tech_oriented": True,
            "traditional_immigrant": False,
            "language_needs": "low",
            "urgency_level": "medium",
            "support_level": "medium",
        }
        # Generate enhanced personalized summary for John
        john_summary = compose_summary(john_profile, john_answers, "en")
        john_checklist_id = md5_for_answers(john_answers)

        # Third onboarded user: David Chen (international student)
        david_email = "david.chen@demo.com"
        david_answers = {
            "audience": "student_professional",
            "primary_language": "zh", 
            "cultural_background": "asian",
            "professional_status": "student",
            "housing_need": "market_rate",
            "language_support": "professional_english",
            "employment": "networking_advancement",
            "community_priorities": ["pro_networks", "cultural_faith"],
            "immediate_needs": ["basic_services", "school_enrollment"],
            "timeline": "recent_1_6",
            # techComfort removed
        }
        david_profile = {
            "audience_type": "student_professional",
            "tech_oriented": True,
            "traditional_immigrant": False,
            "language_needs": "medium",
            "urgency_level": "medium",
            "support_level": "medium",
        }
        # Generate enhanced personalized summary for David
        david_summary = compose_summary(david_profile, david_answers, "en")
        david_checklist_id = md5_for_answers(david_answers)

        # Personalized recommendations via LLM re-ranker (blocking wrapper for script context)
        from recommender_llm import rank_resources_llm_blocking

        for user_data in demo_users:
            existing_user = session.query(User).filter(User.email == user_data["email"]).first()
            if not existing_user:
                user = User(**user_data)
                session.add(user)
                session.flush()
                # Apply onboarding to the selected demo users
                if user.email == maria_email:
                    user.is_onboarded = True
                    user.first_survey_at = datetime.utcnow()
                    user.checklist_id = maria_checklist_id
                    # Store as dictionary {key: value}
                    user.survey_responses = maria_answers
                    user.onboarding_profile = maria_profile
                    user.roadmap_summary = maria_summary

                elif user.email == john_email:
                    user.is_onboarded = True
                    user.first_survey_at = datetime.utcnow()
                    user.checklist_id = john_checklist_id
                    # Store as dictionary {key: value}
                    user.survey_responses = john_answers
                    user.onboarding_profile = john_profile
                    user.roadmap_summary = john_summary

                elif user.email == david_email:
                    user.is_onboarded = True
                    user.first_survey_at = datetime.utcnow()
                    user.checklist_id = david_checklist_id
                    # Store as dictionary {key: value}
                    user.survey_responses = david_answers
                    user.onboarding_profile = david_profile
                    user.roadmap_summary = david_summary

            else:
                # Always ensure existing demo showcase users have complete data
                if existing_user.email == maria_email:
                    existing_user.is_onboarded = True
                    existing_user.first_survey_at = existing_user.first_survey_at or datetime.utcnow()
                    existing_user.checklist_id = maria_checklist_id
                    # Always update survey responses to ensure completeness
                    existing_user.survey_responses = maria_answers
                    existing_user.onboarding_profile = maria_profile
                    existing_user.roadmap_summary = maria_summary

                elif existing_user.email == john_email:
                    existing_user.is_onboarded = True
                    existing_user.first_survey_at = existing_user.first_survey_at or datetime.utcnow()
                    existing_user.checklist_id = john_checklist_id
                    # Always update survey responses to ensure completeness
                    existing_user.survey_responses = john_answers
                    existing_user.onboarding_profile = john_profile
                    existing_user.roadmap_summary = john_summary


                elif existing_user.email == david_email:
                    existing_user.is_onboarded = True
                    existing_user.first_survey_at = existing_user.first_survey_at or datetime.utcnow()
                    existing_user.checklist_id = david_checklist_id
                    # Always update survey responses to ensure completeness
                    existing_user.survey_responses = david_answers
                    existing_user.onboarding_profile = david_profile
                    existing_user.roadmap_summary = david_summary



        session.commit()
        print(f"✅ Populated {len(demo_users)} demo users")

    except Exception as e:
        session.rollback()
        print(f"❌ Failed to populate demo users: {e}")
        raise
    finally:
        session.close()

def refresh_demo_user_data():
    """Refresh survey responses for existing demo users to ensure completeness"""
    session = SessionLocal()
    try:
        from datetime import datetime
        from recommendation import compose_summary
        
        # Demo user configs with enhanced personalized summaries
        maria_answers = {
            "audience": "New American/Immigrant seeking settlement support",
            "primary_language": "es",
            "cultural_background": "Hispanic or Latino/a/x", 
            "professional_status": "Seeking employment",
            "housing_need": "Temporary/emergency housing",
            "language_support": "English classes (ESL) - beginner to intermediate",
            "employment": "Job search assistance and resume help",
            "community_priorities": ["Cultural and faith-based communities", "Family and children services"],
            "immediate_needs": ["Emergency assistance (food, shelter)", "Legal/immigration assistance"],
            "timeline": "Just arrived (within last month)",
            # techComfort removed
        }
        
        maria_profile = {
            "audience_type": "immigrant",
            "tech_oriented": False,
            "traditional_immigrant": True, 
            "language_needs": "high",
            "urgency_level": "high",
            "support_level": "high",
        }
        
        john_answers = {
            "audience": "Student/Professional (attending a Pittsburgh-region university or working for an organization)",
            "primary_language": "en",
            "cultural_background": "White",
            "professional_status": "Other professional",
            "housing_need": "Help finding neighborhoods and market-rate apartments",
            "language_support": "No language support needed",
            "employment": "Professional networking and career advancement",
            "community_priorities": ["Professional networks and industry meetups", "Social activities and entertainment"],
            "immediate_needs": ["Basic services (healthcare, banking, transportation)"],
            "timeline": "Already settled in Pittsburgh area",
            # techComfort removed
        }
        
        john_profile = {
            "audience_type": "student_professional",
            "tech_oriented": True,
            "traditional_immigrant": False,
            "language_needs": "low",
            "urgency_level": "medium",
            "support_level": "medium",
        }
        
        # David Chen's survey config
        david_answers_refresh = {
            "audience": "student_professional",
            "primary_language": "zh",
            "cultural_background": "asian",
            "professional_status": "student",
            "housing_need": "market_rate",
            "language_support": "professional_english",
            "employment": "networking_advancement",
            "community_priorities": ["pro_networks", "cultural_faith"],
            "immediate_needs": ["basic_services", "school_enrollment"],
            "timeline": "recent_1_6",
            # techComfort removed
        }
        david_profile_refresh = {
            "audience_type": "student_professional",
            "tech_oriented": True,
            "traditional_immigrant": False,
            "language_needs": "medium",
            "urgency_level": "medium",
            "support_level": "medium",
        }

        demo_user_configs = {
            "maria.rodriguez@demo.com": {
                "answers": maria_answers,
                "profile": maria_profile,
                "summary": compose_summary(maria_profile, maria_answers, "en")
            },
            "john.doe@demo.com": {
                "answers": john_answers,
                "profile": john_profile,
                "summary": compose_summary(john_profile, john_answers, "en")
            },
            "david.chen@demo.com": {
                "answers": david_answers_refresh,
                "profile": david_profile_refresh,
                "summary": compose_summary(david_profile_refresh, david_answers_refresh, "en")
            }
        }
        
        # Update each demo user
        for email, config in demo_user_configs.items():
            user = session.query(User).filter(User.email == email).first()
            if user:
                # Always update survey responses to ensure completeness
                user.survey_responses = config["answers"]
                user.onboarding_profile = config["profile"] 
                user.roadmap_summary = config["summary"]
                
                # Regenerate recommendations with new limit of 5 for demo showcase
                from recommender_llm import rank_resources_llm_blocking

                
                # Ensure they're marked as onboarded
                if not user.is_onboarded:
                    user.is_onboarded = True
                    user.first_survey_at = datetime.utcnow()
                
                print(f"✅ Refreshed demo user: {email}")
            else:
                print(f"⚠️ Demo user not found: {email}")
        
        session.commit()
        print("✅ Demo user data refresh completed")
        
    except Exception as e:
        session.rollback()
        print(f"❌ Failed to refresh demo user data: {e}")
        raise
    finally:
        session.close()

def create_secure_admin():
    """Create a secure admin account with hardcoded credentials"""
    import os
    session = SessionLocal()
    
    try:
        # Hardcoded admin credentials (for now)
        admin_email = "admin@pioneer.com"
        admin_password = "SecureAdminPass2025!"  # Hardcoded strong password
        admin_username = "admin"
        
        print(f"🔧 Creating secure admin account: {admin_email}")
        
        # Check if admin already exists
        existing_admin = session.query(User).filter(User.email == admin_email).first()
        if existing_admin:
            # Always update the admin account to ensure current password and settings
            print(f"🔄 Updating existing admin account: {admin_email}")
            from auth_utils import get_password_hash
            existing_admin.hashed_password = get_password_hash(admin_password)  # Update password
            existing_admin.role = "admin"
            existing_admin.user_type = "system_admin"
            existing_admin.is_demo_user = False  # Ensure it's not a demo user
            existing_admin.username = admin_username
            existing_admin.first_name = ""
            existing_admin.last_name = "Administrator"
            existing_admin.is_verified = True
            existing_admin.is_active = True
            session.commit()
            print(f"✅ Updated admin account with current credentials")
            return True
        
        # Create secure admin
        from auth_utils import get_password_hash
        admin_user = User(
            email=admin_email,
            username=admin_username,
            hashed_password=get_password_hash(admin_password),
            first_name="",
            last_name="Administrator", 
            role="admin",
            user_type="system_admin",
            primary_language="en",
            is_demo_user=False,  # NOT a demo user
            is_verified=True,
            is_active=True
        )
        
        session.add(admin_user)
        session.commit()
        
        print(f"✅ Secure admin account created: {admin_email}")
        return True
        
    except Exception as e:
        session.rollback()
        print(f"❌ Failed to create secure admin: {e}")
        import traceback
        traceback.print_exc()
        return False
    finally:
        session.close()

def run_demo_setup():
    """Run the complete demo data setup"""
    logger.info("Starting demo database setup…")
    logger.info(f"Database type: {'PostgreSQL' if is_postgresql() else 'SQLite'}")
    
    try:
        # Create all tables
        create_database_schema()
        
        # Populate with demo data
        populate_categories()
        populate_resources()
        populate_checklists()
        populate_sample_chat_data()
        populate_screening_responses()
        populate_demo_users()
        
        logger.info("Demo database setup complete!")
        logger.info("Demo data includes:")
        logger.info("• 8 resource categories")
        logger.info("• 8 local resources with full contact information")
        logger.info("• 3 comprehensive checklists")
        logger.info("• 3 sample chat conversations")
        logger.info("• 3 screening response examples")
        logger.info("You can now test the application with realistic data!")
        
    except Exception as e:
        logger.error(f"Demo setup failed: {e}")
        raise

def run_demo_setup_without_resources():
    """Run demo setup excluding mock resources.

    Creates schema and seeds categories, checklists, chat messages,
    screening responses, and demo users – but does NOT create any
    demo resources. Useful for production environments where content
    comes from CSV imports.
    """
    logger.info("Starting demo database setup (without resources)…")
    logger.info(f"Database type: {'PostgreSQL' if is_postgresql() else 'SQLite'}")
    try:
        create_database_schema()
        populate_categories()
        # Intentionally skip populate_resources()
        populate_checklists()
        populate_sample_chat_data()
        populate_screening_responses()
        populate_demo_users()

        logger.info("Demo database setup complete (without resources)!")
    except Exception as e:
        logger.error(f"Demo setup (without resources) failed: {e}")
        raise

def clear_all_data():
    """Clear all demo data from the database"""
    session = SessionLocal()
    try:
        # Clear tables in order (to handle any foreign key constraints)
        session.query(ChatMessage).delete()
        session.query(UserProgress).delete()
        session.query(UserPreferences).delete()
        session.query(ScreeningResponse).delete()
        session.query(Checklist).delete()
        session.query(Resource).delete()
        session.query(Category).delete()
        
        session.commit()
        logger.info("All demo data cleared from database")
        
    except SQLAlchemyError as e:
        session.rollback()
        logger.error(f"Failed to clear data: {e}")
        raise
    finally:
        session.close()

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1 and sys.argv[1] == "--clear":
        clear_all_data()
    else:
        run_demo_setup() 
