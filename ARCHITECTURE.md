# 🏗️ Course Management System - Architecture Diagram

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     BROWSER (User Interface)                 │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              FRONTEND (React + TypeScript)                   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  AdminDashboard Component                             │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │  • Course List Table                                  │   │
│  │  • Add Course Dialog                                  │   │
│  │  • Form Validation                                    │   │
│  │  • Image Upload Handling                              │   │
│  └──────────────────────────────────────────────────────┘   │
│                         │                                     │
│                         ▼                                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  API Layer (src/lib/api.ts)                           │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │  • adminApi.uploadImage()                             │   │
│  │  • adminApi.addCourse()                               │   │
│  │  • adminApi.deleteCourse()                            │   │
│  │  • adminApi.getStats()                                │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼ HTTP/REST API
┌─────────────────────────────────────────────────────────────┐
│             BACKEND (Express.js + Node.js)                  │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Admin Routes (server/routes/admin.js)               │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │  POST   /api/admin/upload-image                      │   │
│  │         ├─ Multer file upload                        │   │
│  │         ├─ File validation                           │   │
│  │         └─ Returns: {url: "/uploads/courses/..."}   │   │
│  │                                                       │   │
│  │  POST   /api/courses                                 │   │
│  │         ├─ Create new course                         │   │
│  │         ├─ Save to database                          │   │
│  │         └─ Returns: Course object                    │   │
│  │                                                       │   │
│  │  DELETE /api/courses/:id                             │   │
│  │         └─ Remove course                             │   │
│  │                                                       │   │
│  │  GET    /api/admin/stats                             │   │
│  │         └─ Get dashboard statistics                  │   │
│  └──────────────────────────────────────────────────────┘   │
│                         │                                     │
│                         ▼                                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Models (server/models/Course.js)                    │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │  Mongoose Schema with fields:                         │   │
│  │  • course_name (string)                               │   │
│  │  • date (string)                                      │   │
│  │  • duration (string)                                  │   │
│  │  • mode (array)                                       │   │
│  │  • image_url (string)                                 │   │
│  │  • price (number | null)                              │   │
│  │  • description (string)                               │   │
│  │  • slug (string - auto-generated)                     │   │
│  │  • published (boolean)                                │   │
│  └──────────────────────────────────────────────────────┘   │
│                         │                                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   DATABASE (MongoDB)                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Courses Collection                                           │
│  ├─ _id: ObjectId                                            │
│  ├─ course_name: String                                      │
│  ├─ date: String                                             │
│  ├─ duration: String                                         │
│  ├─ mode: [String]                                           │
│  ├─ image_url: String                                        │
│  ├─ price: Number | null                                     │
│  ├─ description: String                                      │
│  ├─ slug: String (unique)                                    │
│  ├─ published: Boolean                                       │
│  └─ created_at: Date                                         │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              FILE SYSTEM (Images Storage)                   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  public/uploads/courses/                                     │
│  ├─ image-1234567890.jpg                                     │
│  ├─ image-1234567891.png                                     │
│  └─ image-1234567892.gif                                     │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram

### Adding a Course

```
1. ADMIN OPENS FORM
   User → AdminDashboard → "Add Course" Dialog opens

2. FILL FORM
   User inputs:
   ├─ Course Name
   ├─ Image File (optional)
   ├─ Date
   ├─ Duration
   ├─ Description
   ├─ Price
   └─ Mode checkboxes

3. FORM VALIDATION (CLIENT-SIDE)
   ├─ course_name >= 3 chars ✓
   ├─ date filled ✓
   ├─ duration filled ✓
   ├─ mode selected ✓
   ├─ price >= 0 ✓
   └─ Save button enabled

4. CLICK SAVE
   Admin clicks "Add Course" button

5. IMAGE UPLOAD (if selected)
   Form Data:
   ├─ POST /api/admin/upload-image
   ├─ Multipart form data with image
   └─ Returns: { url: "/uploads/courses/image-xxxxx.jpg" }

6. CREATE COURSE
   JSON Request:
   ├─ POST /api/courses
   ├─ Body: {
   │    course_name: "...",
   │    date: "...",
   │    duration: "...",
   │    mode: [...],
   │    image_url: "/uploads/courses/...",
   │    description: "...",
   │    price: ...
   │  }
   └─ Response: { _id, course_name, ... }

7. DATABASE SAVE
   ├─ Validate schema
   ├─ Save to MongoDB
   ├─ Auto-generate slug
   └─ Return with _id

8. SUCCESS RESPONSE
   ├─ Frontend receives course data
   ├─ Show toast: "Course added successfully"
   ├─ Clear form
   ├─ Refresh course list
   └─ Dialog closes

9. DISPLAY
   ├─ New course appears in admin table
   ├─ New course visible on public courses page
   └─ Image accessible at /uploads/courses/...
```

---

## Component Hierarchy

```
App
└── Layout
    └── AdminDashboard
        ├── Stats Cards (read-only)
        ├── Tabs
        │   ├── Mentors Tab
        │   │   ├── Mentor List Table
        │   │   └── Add Mentor Dialog
        │   └── Courses Tab
        │       ├── Course List Table
        │       │   └── Delete buttons
        │       └── Add Course Dialog
        │           ├── course_name Input
        │           ├── Image Upload
        │           ├── date Input
        │           ├── duration Input
        │           ├── description Textarea
        │           ├── price Input
        │           ├── mode Checkboxes
        │           └── Save Button
        └── Toast Notifications
```

---

## State Management

```
AdminDashboard Component
│
├── State: courses
│   └─ Course[] array from API
│
├── State: courseForm
│   └─ CourseFormState {
│       course_name: string,
│       date: string,
│       duration: string,
│       description: string,
│       price: string,
│       mode: ("online" | "offline")[]
│     }
│
├── State: imageFile
│   └─ File | null
│
├── State: imagePreview
│   └─ string (data URL) | null
│
└── State: uploadingImage
    └─ boolean (loading state)
```

---

## Validation Flow

```
User Input
    │
    ▼
    ├─ Client-side Validation (React)
    │   ├─ course_name length >= 3 ✓
    │   ├─ date not empty ✓
    │   ├─ duration not empty ✓
    │   ├─ mode array length > 0 ✓
    │   ├─ price >= 0 ✓
    │   └─ image file type validation ✓
    │
    └─ If all valid:
        │
        ▼
        Server Validation (Express/Node)
        ├─ course_name required ✓
        ├─ date required ✓
        ├─ duration required ✓
        ├─ mode valid enum ✓
        ├─ price is number ✓
        └─ file uploaded successfully ✓
            │
            ▼
            Database Validation (Mongoose)
            ├─ Schema type checking ✓
            ├─ Required field validation ✓
            ├─ Unique slug validation ✓
            └─ Data saved to MongoDB ✓
```

---

## API Endpoints Map

```
/api/courses
├── GET     - Get all published courses (public)
├── POST    - Create new course (admin only)
└── /:id
    └── DELETE - Delete course (admin only)

/api/admin
├── /stats
│   └── GET - Get dashboard statistics (admin only)
├── /upload-image
│   └── POST - Upload course image (admin only)
├── /courses
│   └── POST - Create course (admin only)
└── /courses/:id
    ├── DELETE - Delete course (admin only)
    └── PATCH  - Update course (future)
```

---

## File Organization

```
project/
├── Frontend
│   └── src/
│       ├── components/
│       │   ├── layout/Layout.tsx
│       │   ├── CourseCard.tsx
│       │   └── ui/
│       │       ├── dialog.tsx
│       │       ├── checkbox.tsx
│       │       ├── button.tsx
│       │       └── ... (other UI components)
│       ├── pages/
│       │   ├── AdminDashboard.tsx ⭐
│       │   └── Courses.tsx
│       ├── lib/
│       │   ├── api.ts ⭐ (updated)
│       │   ├── types.ts ⭐ (new)
│       │   └── utils.ts
│       └── contexts/
│           └── AuthContext.tsx
│
├── Backend
│   └── server/
│       ├── models/
│       │   └── Course.js ⭐ (updated)
│       ├── routes/
│       │   └── admin.js ⭐ (updated)
│       ├── middleware/
│       │   └── auth.js
│       ├── scripts/
│       │   └── seedCourses.js ⭐ (new)
│       ├── public/
│       │   └── uploads/
│       │       └── courses/ ⭐ (new)
│       ├── index.js
│       └── package.json ⭐ (updated)
│
└── Documentation
    ├── QUICK_START_COURSES.md ⭐ (new)
    ├── COURSE_MANAGEMENT_SETUP.md ⭐ (new)
    ├── COURSE_MANAGEMENT_README.md ⭐ (new)
    ├── IMPLEMENTATION_SUMMARY.md ⭐ (new)
    ├── TESTING_CHECKLIST.md ⭐ (new)
    └── data/COURSES_SCHEMA.json ⭐ (new)

⭐ = New or Updated
```

---

## Tech Stack

```
Frontend
├── React 18+
├── TypeScript
├── Tailwind CSS
├── Lucide Icons
├── Radix UI Components
└── Vite

Backend
├── Node.js
├── Express.js
├── MongoDB + Mongoose
├── Multer (file uploads)
├── JWT (authentication)
└── CORS

DevOps
├── npm/yarn (package management)
├── Git (version control)
└── Docker (optional containerization)
```

---

## Security Architecture

```
Request Flow
    │
    ▼
Middleware: Authentication Check
├── Extract JWT from Authorization header
├── Verify token validity
├── Extract user info
└── Check admin role
        │
        ▼
    If Admin:
    ├── File Upload Validation
    │   ├─ Check file type (image only)
    │   ├─ Check file size (<5MB)
    │   └─ Sanitize filename
    │
    ├── Database Validation
    │   ├─ Mongoose schema validation
    │   ├─ Type coercion
    │   └─ Index uniqueness (slug)
    │
    └─ Success: Save to DB & File System
        │
        ▼
    Return secure response
        (no sensitive data leaked)
        │
        ▼
    If Not Admin: Return 401/403 Error
```

---

## Future Enhancement Map

```
Current System
└─ User can:
   ├─ View courses
   ├─ Add courses (admin)
   ├─ Delete courses (admin)
   └─ Upload images (admin)

Future v2.0
└─ Add:
   ├─ Edit courses (admin)
   ├─ Course drafts
   ├─ Course categories
   ├─ Bulk import (CSV)
   ├─ Course scheduling
   └─ Student reviews

Future v3.0
└─ Add:
   ├─ Course prerequisites
   ├─ Learning paths
   ├─ Certificates
   ├─ Course analytics
   └─ Recommendation system
```

---

This architecture provides:
✅ Separation of concerns
✅ Type safety
✅ Security
✅ Scalability
✅ Maintainability
✅ Extensibility
