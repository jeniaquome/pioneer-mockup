# Role-Based Access Control (RBAC) Demo System

This document explains the comprehensive RBAC demo system implemented in Pioneer, which showcases how the application adapts to different user types and provides personalized experiences.

## 🎭 Demo User Accounts

The system includes four demo user accounts representing different user personas:

### 1. **Maria Rodriguez** - Immigrant User
- **Email:** `maria.rodriguez@demo.com`
- **Password:** `DemoPass123!`
- **Profile:** Recent immigrant from Latin America seeking settlement support
- **Language:** Spanish (primary)
- **Characteristics:** Family with children, seeking employment, temporary housing
- **Focus:** Emergency resources, housing assistance, English classes, legal aid

### 2. **David Chen** - Student User
- **Email:** `david.chen@demo.com`
- **Password:** `DemoPass123!`
- **Profile:** International graduate student from China
- **Language:** Mandarin (primary)
- **Characteristics:** Graduate student, campus housing, academic focus
- **Focus:** Academic resources, campus services, career development, student organizations

### 3. **Fatima Ahmad** - Professional User
- **Email:** `fatima.ahmad@demo.com`
- **Password:** `DemoPass123!`
- **Profile:** Tech professional from Middle East
- **Language:** Arabic (primary)
- **Characteristics:** Software engineer, apartment hunting, career-focused
- **Focus:** Professional networking, tech meetups, executive housing, industry events

### 4. **John Doe** - Local Helper
- **Email:** `john.doe@demo.com`
- **Password:** `DemoPass123!`
- **Profile:** Local Pittsburgh social worker helping newcomers
- **Language:** English (native)
- **Characteristics:** Community advocate, resource connector, volunteer
- **Focus:** Volunteer opportunities, mentorship programs, community events

## 🏗️ System Architecture

### Database Schema
The User model includes role-based fields:
```python
class User(Base):
    # Basic info
    email = Column(String, unique=True, nullable=False)
    username = Column(String, unique=True, nullable=False)
    
    # Role-based access control
    role = Column(String, default="user")  # immigrant, student, professional, local
    user_type = Column(String)  # More specific categorization
    
    # User preferences and profile
    primary_language = Column(String, default="en")
    cultural_background = Column(String)
    
    # Demo user flag
    is_demo_user = Column(Boolean, default=False)
```

### API Endpoints

#### Get Demo Users
```bash
GET /api/auth/demo-users
```
Returns available demo user credentials for testing.

#### User Authentication
Standard JWT authentication with role information included in user profile.

## 🎨 Frontend Features

### 1. **Enhanced Login Page**
- **Demo Credentials Panel:** Shows all available demo accounts with descriptions
- **One-Click Login:** Click any demo account to auto-fill credentials
- **Role Previews:** Visual preview of what each role experience offers
- **Responsive Design:** Works on desktop and mobile

### 2. **Role-Based Homepage**
When users log in, they see personalized content based on their role:

#### Immigrant Experience
- **Welcome:** `¡Bienvenida, [Name]!`
- **Priority Resources:** Emergency services, temporary housing, healthcare access, language services

#### Student Experience  
- **Welcome:** `Welcome back, [Name]!`
- **Priority Resources:** Academic support, student housing, financial aid, student groups

#### Professional Experience
- **Welcome:** `مرحباً [Name]!` (Arabic greeting)
- **Priority Resources:** Professional networks, career development, executive housing, mentorship

#### Local Helper Experience
- **Welcome:** `Hello [Name]!`
- **Priority Resources:** Volunteer opportunities, community organizations, support networks

### 3. **Smart Navigation**
- **Role-Based Menu Items:** Different navigation options based on user role
- **User Profile Display:** Shows role badge and user information
- **Contextual Features:** Features appear/disappear based on user permissions

### 4. **Visual Design Elements**
- **Role Icons:** Heart (immigrant), Graduation Cap (student), Briefcase (professional), User (local)
- **Color Coding:** Green (immigrant), Blue (student), Purple (professional), Gray (local)
- **Multilingual Elements:** Greetings and key terms in user's primary language

## 🚀 How to Test

### 1. Start the Application
```bash
cd app
docker-compose up --build -d
```

### 2. Access Demo Mode
1. Visit `http://localhost:3000`
2. Click "Try Demo Accounts" or go to `/login`
3. Select any demo user from the panel
4. Experience the personalized interface

### 3. Switch Between Roles
- Log out and try different demo accounts
- Compare the different experiences
- Notice how content, resources, and recommendations change

## 🔧 Configuration

### Environment Variables
- `INIT_DEMO_DATA=true` - Creates demo users on startup (already configured)
- `DATABASE_URL` - Points to PostgreSQL for production features

### Demo Data Initialization
Demo users are automatically created when the backend starts with `INIT_DEMO_DATA=true`.

## 🎯 RBAC Features Demonstrated

### 1. **Personalized Content**
- Different welcome messages and languages
- Role-specific resource prioritization
- Customized quick actions and tips

### 2. **Access Control**
- Protected routes require authentication
- Different navigation menus per role
- Role-based feature visibility

### 3. **User Experience Adaptation**
- Language preferences affect interface elements
- Cultural context influences resource recommendations
- Professional status determines feature priority

### 4. **Data Security**
- JWT token-based authentication
- Role information stored securely
- Demo user flag for easy identification

## 📊 Analytics & Insights

The system tracks:
- User role distribution
- Feature usage by role
- Resource access patterns
- Language preferences

## 🔮 Future Enhancements

Potential expansions:
- **Granular Permissions:** Specific feature access controls
- **Dynamic Role Assignment:** Users can change their status
- **Organization Roles:** Admin/staff roles for service providers
- **Community Features:** Role-based matching and networking
- **Advanced Personalization:** AI-driven content recommendations

## 🛡️ Security Considerations

- Demo users are clearly marked with `is_demo_user=true`
- Production deployment should disable demo mode
- Role-based access is enforced at API level
- JWT tokens include role information for frontend decisions

---

This RBAC demo system showcases how Pioneer adapts to serve different user communities effectively, providing personalized experiences that address the unique needs of immigrants, students, professionals, and local community helpers. 