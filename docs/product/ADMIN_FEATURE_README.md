# Admin Content Management Feature

This document describes the Admin Content Management feature implementation for bulk importing community organizations via CSV upload. This feature enables platform administrators to efficiently manage and populate the resource database.

## 🔐 Admin Account

**Email:** `admin@pioneer.com`  
**Password:** `SecureAdminPass2025!`  
**Role:** `admin`

Use this account to test the admin features after logging in through the standard login page.

## 🚀 Features Implemented

### Backend Features

#### 1. **Admin Authentication Middleware**
- `require_admin_user()` dependency for protecting admin routes
- Role-based access control with proper error handling
- JWT token validation with admin role verification

#### 2. **Admin API Endpoints**
- `GET /api/admin/dashboard` - Admin dashboard data and statistics
- `POST /api/admin/import-csv` - CSV file upload and batch import. As of latest update, the importer runs in "replace mode": the uploaded CSV is treated as the source of truth. Any resources currently in the database that do not appear in the CSV (by the composite key of `resource_name` + `website_link`) will be deleted after a successful import. Safety: deletions are skipped if the import reports failed rows; fix errors and re-import to enforce exact match.
- `GET /api/admin/users` - Paginated list of all users
- `GET /api/admin/resources` - Paginated list of all resources  
- `POST /api/admin/resource/{id}/update` - Update specific resource
- `DELETE /api/admin/resources/{id}` - Delete specific resources

#### 3. **Enhanced CSV Import System**
- **Complete Column Capture**: Now captures ALL CSV columns including financial data
- **Batch Processing**: Processes large CSV files in 50-row batches for optimal performance
- **Idempotent Operations**: Can safely re-upload same file - updates existing records without creating duplicates
- **Smart Data Mapping**: Automatically maps CSV columns to resource categories and languages
- **Financial Data Preservation**: Stores revenue, expenses, costs, annual reports, and financial year
- **Partners/Collaborators Storage**: Now preserves partnership information from CSV
- **Comprehensive Validation**: Validates organization names, URL formats, and data integrity
- **Transaction Safety**: Uses database transactions with proper rollback on errors
- **Detailed Reporting**: Provides row-specific error messages and import statistics
- **Cache Invalidation**: Automatically refreshes cache after successful imports

#### 4. **Database Schema Enhancements**
- **New Financial Fields**: Added revenue, expenses, costs, annual_reports, financial_year
- **Partnership Data**: Added partners_collaborators field
- **Affiliation Tracking**: Added affiliation field for enhanced language detection
- **Optimized Indexes**: Updated database indexes for better performance
- **PostgreSQL Support**: Full PostgreSQL compatibility with proper column types
- **Legacy Field Removal**: Removed unused phone, email, address, location fields

### Frontend Features

#### 1. **Enhanced Admin Dashboard**
- **Complete Resource Viewing**: Display all database fields including financial data
- **System Statistics**: Real-time counts of resources, users, and admin accounts
- **Category Analytics**: Visual breakdown of resource distribution by category
- **User Management**: Overview of user roles and demo accounts
- **Performance Metrics**: Import history and success rates

#### 2. **Advanced CSV Upload Interface**
- **Drag & Drop Support**: Modern file upload with visual feedback
- **File Validation**: Client-side validation for file type and size (10MB limit)
- **Progress Tracking**: Real-time upload progress with visual indicators
- **Error Handling**: Detailed error messages with user-friendly explanations
- **Result Visualization**: Comprehensive import results with statistics and error details

#### 3. **Comprehensive Resource Management**
- **Full Field Display**: View all resource fields including financial data and partnerships
- **Inline Editing**: Edit resources directly in the admin interface
- **Bulk Operations**: Select and delete multiple resources
- **Advanced Filtering**: Filter by categories, search terms, and other criteria
- **Pagination**: Efficient handling of large resource datasets

## 📊 Enhanced CSV Format Support

The system now supports a comprehensive CSV format that captures ALL data fields:

### **📋 CSV Column Mapping:**

| CSV Column | Database Field | Notes |
|------------|----------------|-------|
| **Organization** | `name` | Required field |
| **Case Mgmt.** | `categories` | Mapped to "social" |
| **Housing** | `categories` | Mapped to "housing" |
| **ESL** | `categories` | Mapped to "education" |
| **Income/Jobs** | `categories` | Mapped to "employment" |
| **Starting Biz** | `categories` | Mapped to "employment" |
| **Ed/children** | `categories` | Mapped to "education" |
| **Ed/Adult** | `categories` | Mapped to "education" |
| **Social connection** | `categories` | Mapped to "social" |
| **Civic Engagement** | `categories` | Mapped to "social" |
| **Nutrition & Health** | `categories` | Mapped to "healthcare" |
| **Navigating Day-to-Day Logistics** | `categories` | Mapped to "social" |
| **Partners/Collaborators** | `partners_collaborators` | **Now preserved!** |
| **Affiliation** | `affiliation` | Also used for language detection |
| **Website link** | `website` | Auto-adds https:// |
| **Revenue** | `revenue` | **New financial field** |
| **Expenses** | `expenses` | **New financial field** |
| **Year** | `financial_year` | **New financial field** |
| **Costs** | `costs` | **New financial field** |
| **Annual Reports** | `annual_reports` | **New financial field** |

### **Database Schema Summary**

#### ✅ **Active Fields (Used by CSV parser)**
1. **`id`** - Primary key (auto-generated from organization name)
2. **`name`** - Organization name (from CSV `Organization`)
3. **`description`** - Auto-generated from service columns
4. **`short_description`** - Auto-generated brief description
5. **`categories`** - JSON array of standardized service categories
6. **`languages`** - JSON array of detected languages
7. **`website`** - Organization website URL
8. **`partners_collaborators`** - Partnership information from CSV
9. **`affiliation`** - Organization affiliation for language detection
10. **`revenue`** - Financial revenue data
11. **`expenses`** - Financial expense data
12. **`costs`** - Cost information
13. **`annual_reports`** - Annual report references
14. **`financial_year`** - Financial reporting year
15. **`created_at`** - Record creation timestamp

### **Service Category Mapping**
The system intelligently maps CSV service columns to standardized categories:

```
Service Categories → Database Categories
├── Case Mgmt. → social
├── Housing → housing  
├── ESL → education
├── Income/Jobs → employment
├── Starting Biz → employment
├── Ed/children → education
├── Ed/Adult → education
├── Social connection → social
├── Civic Engagement → social
├── Nutrition & Health → healthcare
└── Navigating Day-to-Day Logistics → social
```

### **Language Detection Logic**
The system automatically detects supported languages based on organization affiliation:

```
Affiliation Keywords → Languages Added
├── Hispanic/Latino → Spanish
├── Chinese/Asian → Chinese
├── Arabic/Middle Eastern → Arabic
├── Bhutanese/Nepali → Nepali
├── French/Haitian → French
├── Russian/Ukrainian → Russian
├── Portuguese/Brazilian → Portuguese
└── All organizations → English (default)
```

### **Financial Data Processing**
All financial columns are now preserved exactly as entered:
- **Revenue**: Organization's annual revenue
- **Expenses**: Annual operational expenses  
- **Costs**: Additional cost information
- **Annual Reports**: References to financial reports
- **Financial Year**: Reporting period year

## 🔧 Technical Implementation

### Database Design for Scale

#### Enhanced Schema with Financial Data
The database now captures comprehensive organizational information:

```sql
-- Enhanced Resource table structure
CREATE TABLE resources (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    short_description TEXT,
    categories TEXT,  -- JSON array
    languages TEXT,   -- JSON array  
    website TEXT,
    partners_collaborators TEXT,  -- NEW: Partnership info
    affiliation VARCHAR(255),     -- NEW: For language detection
    revenue VARCHAR(100),         -- NEW: Financial data
    expenses VARCHAR(100),        -- NEW: Financial data
    costs VARCHAR(100),           -- NEW: Financial data
    annual_reports VARCHAR(500),  -- NEW: Report references
    financial_year VARCHAR(10),   -- NEW: Reporting year
    created_at TIMESTAMP DEFAULT NOW()
);
```

#### Performance Optimizations for PostgreSQL
1. **Enhanced Indexes**: Optimized for PostgreSQL with proper column types
2. **Batch Processing**: 50 rows per transaction for optimal performance
3. **Connection Pooling**: Efficient database connection management
4. **Memory Efficiency**: Streams large files without memory overload

### Security Features
- **JWT Authentication**: All admin endpoints require valid JWT tokens with admin role
- **File Validation**: Server-side validation of file type, size, and encoding
- **Input Sanitization**: Clean and validate all CSV input data
- **Error Limiting**: Limits error messages in API responses for security
- **Activity Logging**: All admin actions logged for audit trails
- **PostgreSQL Security**: Leverages PostgreSQL's built-in security features

## 🧪 Testing Instructions

### 1. **Database Migration Test**
```bash
# Ensure PostgreSQL is running
docker compose up -d postgres

# Run the schema migration
cd app/backend
DATABASE_URL=postgresql://pioneer_user:pioneer_password@localhost:5432/pioneer python migrate_schema_for_csv.py
```

### 2. **Start the Application**
```bash
cd app
docker compose up --build -d
```

### 3. **Test Enhanced CSV Import**
1. Create a CSV file with all supported columns:
   ```csv
   Organization,Case Mgmt.,Housing,ESL,Income/Jobs,Starting Biz,Ed/children,Ed/Adult,Social connection,Civic Engagement,Nutrition & Health,Navigating Day-to-Day Logistics,Partners/Collaborators,Affiliation,Website link,Revenue,Expenses,Year,Costs,Annual Reports
   Test Center,Yes,No,Yes,Partial,No,Yes,Yes,Yes,No,Limited,Yes,United Way - Local Schools,Latino Community,www.test.org,$250000,$240000,2023,$45000,Available online
   ```

2. Login as admin: `admin@pioneer.com` / `AdminPass123!`
3. Upload the CSV file via the admin dashboard
4. Verify ALL columns are captured:
   - ✅ Service categories mapped correctly
   - ✅ Financial data preserved
   - ✅ Partners/Collaborators stored
   - ✅ Languages auto-detected from affiliation

### 4. **Verify Database Schema**
```bash
# Check that all new columns exist
docker exec -it app-postgres-1 psql -U pioneer_user -d pioneer -c "\d resources"
```

### 5. **Test Complete Data Visibility**
1. Check admin dashboard shows all resource fields
2. Verify financial data is displayed
3. Confirm partners/collaborators information is visible
4. Test editing functionality for all fields

## 📈 Success Metrics

The enhanced feature meets all requirements if:
- ✅ PostgreSQL migration completes successfully
- ✅ ALL CSV columns are captured and stored
- ✅ Financial data is preserved and displayed
- ✅ Partners/Collaborators information is maintained
- ✅ Admin interface shows complete resource information
- ✅ CSV re-upload updates existing records (idempotent)
- ✅ Language detection works from affiliation data
- ✅ Large CSV files process without data loss
- ✅ Database performance remains optimal

## 🔮 Recent Enhancements

### Completed in This Update
- ✅ **Complete CSV Column Capture**: All 20 columns now preserved
- ✅ **Financial Data Storage**: Revenue, expenses, costs, reports, year
- ✅ **Partnership Information**: Partners/Collaborators field added
- ✅ **Enhanced Language Detection**: Improved affiliation-based detection
- ✅ **PostgreSQL Migration**: Proper schema migration for production
- ✅ **Admin Interface Updates**: Display all fields including financial data
- ✅ **Database Optimization**: Removed unused fields, added new indexes

### Immediate Next Steps
- **Advanced Financial Analytics**: Charts and graphs for financial data
- **Partnership Network Mapping**: Visualize organization relationships
- **Export Functionality**: Export resources with all financial data
- **Bulk Financial Updates**: Edit financial information for multiple resources

## 🛡️ Production Considerations

### Database Migration for Production
```bash
# For production PostgreSQL deployment
DATABASE_URL=your_production_url python migrate_schema_for_csv.py
```

### Security Checklist
- ✅ Change admin credentials from demo password
- ✅ Configure appropriate file size limits
- ✅ Set up monitoring for financial data access
- ✅ Ensure HTTPS for all admin operations
- ✅ Regular database backups before bulk imports

---

This enhanced implementation provides comprehensive CSV data capture while maintaining security, performance, and data integrity. The system now preserves 100% of CSV data including critical financial information and partnership details. 