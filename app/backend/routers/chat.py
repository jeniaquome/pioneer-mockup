from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any
import random
from datetime import datetime

router = APIRouter()

class ChatMessage(BaseModel):
    message: str
    sender: str  # "user" or "assistant"
    timestamp: str

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str
    timestamp: str

# Mock chat data for demonstration
MOCK_RESPONSES = [
    "I'd be happy to help you with information about local resources! What specific type of assistance are you looking for?",
    "Based on your question, I can recommend several local organizations that might be helpful. Would you like me to provide contact information?",
    "That's a great question! Let me share some resources that might be relevant to your situation.",
    "I understand you're looking for support. Here are some organizations in Pittsburgh that specialize in that area.",
    "Thank you for reaching out! I have information about several programs that could be beneficial for you.",
    "I can help you find the right resources. Would you like me to search for options in your specific area?",
    "That's definitely something we can help with! Let me provide you with some relevant information and contacts.",
    "I'm here to help connect you with the right resources. Can you tell me a bit more about what you're looking for?"
]

TOPIC_RESPONSES = {
    "housing": "For housing, I can help with different needs: **Welcome House** (412-555-1234) provides affordable housing and rental assistance with multilingual staff. For professionals looking for neighborhoods, I can share information about areas near CMU, Pitt, and tech companies with good transit access.",
    "education": "For education: **ESL Center** (412-555-9999) offers English classes for all levels with free childcare. If you're a professional looking to enhance skills, there are also advanced English communication courses and professional development programs available.",
    "job": "For employment: **Employment Resource Center** (412-555-7777) provides job placement, resume help, and interview prep. For tech professionals, **Tech Club** offers networking and professional development. I can also connect you with industry-specific meetups and career resources.",
    "legal": "**Immigration Legal Aid** (412-555-8888) provides free and low-cost legal services with multilingual attorneys. They help with visa applications, citizenship processes, family reunification, and deportation defense. They serve many communities including West African, Latino, Afghan, and Bhutanese.",
    "health": "**Community Health Clinic** (412-555-4321) offers affordable healthcare with sliding scale fees and interpreters in multiple languages. They provide primary care, preventive services, and mental health support for individuals and families.",
    "social": "For social connections, it depends on your interests: **Tech Club** for professional networking, cultural organizations for West African, Latino, Afghan, and Bhutanese communities, faith-based groups, and recreational clubs. What type of community are you looking to connect with?",
    "children": "For families with children: I can help with school enrollment, childcare options, youth programs, and family services. Many organizations offer specific support for immigrant families navigating the education system.",
    "language": "Language support includes: **ESL Center** for beginner to advanced English classes, document translation services, and professional English communication training. Classes often include cultural orientation and practical life skills.",
    "professional": "For professionals: Pittsburgh has a thriving tech, healthcare, and education sector. I can connect you with industry meetups, professional development, networking events, and resources for credential evaluation if you have international qualifications.",
    "community": "Pittsburgh has vibrant communities from many cultures. Whether you're looking for cultural events, faith-based connections, professional networks, or social groups, I can help you find your people. What type of community interests you most?"
}

def generate_response(message: str) -> str:
    """Generate a response based on the user's message"""
    message_lower = message.lower()
    
    # Enhanced topic detection with more keywords
    topic_keywords = {
        "housing": ["housing", "apartment", "rent", "live", "neighborhood", "home", "place to stay"],
        "education": ["english", "esl", "learn", "school", "class", "education", "study"],
        "job": ["job", "work", "employment", "career", "resume", "interview", "hiring"],
        "legal": ["legal", "immigration", "lawyer", "attorney", "visa", "citizenship", "documents"],
        "health": ["health", "medical", "doctor", "clinic", "healthcare", "hospital", "insurance"],
        "social": ["social", "meet", "friends", "community", "networking", "events", "club"],
        "children": ["children", "kids", "child", "school enrollment", "daycare", "childcare"],
        "language": ["language", "translate", "interpreter", "spanish", "arabic", "french"],
        "professional": ["professional", "tech", "career", "networking", "industry", "cmu", "pitt"],
        "community": ["community", "culture", "faith", "religion", "african", "latino", "afghan", "bhutanese"]
    }
    
    # Check for topic matches
    for topic, keywords in topic_keywords.items():
        for keyword in keywords:
            if keyword in message_lower:
                return TOPIC_RESPONSES.get(topic, random.choice(MOCK_RESPONSES))
    
    # Special responses for greetings and common phrases
    greetings = ["hello", "hi", "hey", "good morning", "good afternoon"]
    if any(greeting in message_lower for greeting in greetings):
        return "Hello! Welcome to Pittsburgh! I'm here to help you find resources and connect with your community. What can I help you with today? I can assist with housing, jobs, English classes, healthcare, legal services, and connecting with cultural communities."
    
    if "help" in message_lower or "what can you do" in message_lower:
        return "I can help you with many things as you settle in Pittsburgh! I have information about housing assistance, English (ESL) classes, job placement, healthcare services, legal aid, social groups, and cultural communities. I work with 161+ local organizations to serve both professionals joining the tech scene and new Americans from diverse backgrounds. What would you like to know about?"
    
    # Return a general response
    return random.choice(MOCK_RESPONSES)

@router.post("/send-message", response_model=ChatResponse, summary="Send a message to the chat assistant")
def send_message(request: ChatRequest):
    """Send a message to the chat assistant and get a response"""
    try:
        response_text = generate_response(request.message)
        
        return ChatResponse(
            response=response_text,
            timestamp=datetime.now().isoformat()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to process message")

@router.get("/conversation-starters", summary="Get suggested conversation starters")
def get_conversation_starters():
    """Get suggested questions to start a conversation"""
    starters = [
        "I need help finding housing near CMU/Pitt",
        "Where can I find affordable housing assistance?",
        "I want to learn English - what classes are available?",
        "How do I connect with other tech professionals?",
        "I need help with immigration documents",
        "Where can I find healthcare with language support?",
        "How do I enroll my children in school?",
        "I want to connect with my cultural community",
        "What neighborhoods are good for young professionals?",
        "I need job search and resume help",
        "Are there faith-based communities I can join?",
        "How do I get around Pittsburgh without a car?",
        "I'm new to Pittsburgh - what should I do first?",
        "Where can I find professional networking events?",
        "I need help with basic services like banking",
        "Are there programs for refugee families?"
    ]
    
    return {"starters": starters}

@router.get("/chat-history", summary="Get chat history (mock data)")
def get_chat_history():
    """Get mock chat history for demonstration"""
    mock_history = [
        {
            "message": "Hello! I'm new to the area and looking for resources.",
            "sender": "user",
            "timestamp": "2024-01-15T10:00:00"
        },
        {
            "message": "Welcome! I'd be happy to help you find local resources. What specific type of assistance are you looking for?",
            "sender": "assistant",
            "timestamp": "2024-01-15T10:00:30"
        },
        {
            "message": "I need help finding affordable housing and English classes.",
            "sender": "user",
            "timestamp": "2024-01-15T10:01:00"
        },
        {
            "message": "For housing assistance, I recommend contacting Welcome House at 412-555-1234. For English classes, the ESL Center offers excellent courses at 412-555-9999.",
            "sender": "assistant",
            "timestamp": "2024-01-15T10:01:30"
        }
    ]
    
    return {"history": mock_history} 