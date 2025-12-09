# Course Management Setup Guide

## Overview
This document outlines the complete course management system with predefined courses and comprehensive admin form validation.

---

## 📋 What Was Implemented

### 1. **Database Model Updates** (`server/models/Course.js`)
New course fields added:
- `course_name`: Display title of the course
- `date`: Course start date (e.g., "January 2026" or "Flexible")
- `duration`: Human-friendly duration (e.g., "1 Month / 12 Sessions")
- `mode`: Array of course modes - `["online"]`, `["offline"]`, or `["online", "offline"]`
- `description`: Course description
- `price`: Numeric price or null (for free courses)
- Legacy fields (`image_url`, `short_description`) supported for backward compatibility

### 2. **Frontend Types** (`src/lib/types.ts`)
TypeScript interfaces for type safety:
```typescript
interface AdminCoursePayload {
  course_name: string;
  image?: string;
  date: string;
  duration: string;
  description?: string;
  price?: number | null;
  mode: ("online" | "offline")[];
}

interface CourseFormState {
  course_name: string;
  date: string;
  duration: string;
  description: string;
  price: string;
  mode: ("online" | "offline")[];
}
```

### 3. **API Enhancement** (`src/lib/api.ts`)
New methods in `adminApi`:
- `uploadImage(file: File): Promise<string>` - Upload image to `/api/admin/upload-image`
- Enhanced `addCourse()` with support for all new fields

### 4. **Admin Form** (`src/pages/AdminDashboard.tsx`)
Comprehensive "Add Course" dialog with:
- **Course Name** field (min 3 chars, required)
- **Image Upload** with preview and remove button
  - Accepts JPG, PNG, GIF
  - Max 5MB file size
  - Shows preview before upload
- **Date** field (required, supports "Flexible")
- **Duration** field (required)
- **Description** field (optional but recommended)
- **Price** field (optional, numeric, >= 0)
- **Mode** checkboxes (required, at least one)
  - Online
  - Offline
- Real-time validation
- Disabled Save button until all required fields pass validation
- Success toast notification on save

### 5. **Backend Image Upload** (`server/routes/admin.js`)
New endpoint: `POST /api/admin/upload-image`
- Multipart form data upload using Multer
- Stores images in `public/uploads/courses/`
- Returns URL: `/uploads/courses/{filename}`
- File validation (type & size)
- Requires admin authentication

### 6. **Seed Script** (`server/scripts/seedCourses.js`)
Populates database with 3 predefined courses:
```javascript
[
  {
    "course_name": "1 Month Program (Students)",
    "image": "students_program.jpg",
    "date": "January 2026",
    "duration": "1 Month / 12 Sessions",
    "description": "Domain + 2 Tech + 2 Softskills...",
    "price": null,
    "mode": ["online", "offline"]
  },
  {
    "course_name": "Career Acceleration Program (Working Professionals)",
    "image": "professionals_program.jpg",
    "date": "January 2026",
    "duration": "12 Hours (Weekend Batches)",
    "description": "Weekend Online or Offline sessions...",
    "price": null,
    "mode": ["online", "offline"]
  },
  {
    "course_name": "Customized College Training Program",
    "image": "college_program.jpg",
    "date": "Flexible",
    "duration": "Custom Duration",
    "description": "Curriculum customization, flexible timings...",
    "price": null,
    "mode": ["online", "offline"]
  }
]
```

---

## 🚀 How to Use

### Step 1: Run the Seed Script
To populate your database with the 3 predefined courses:

```bash
# From the server directory
cd server
node scripts/seedCourses.js
```

Expected output:
```
Connected to MongoDB
✓ Successfully seeded 3 courses
  - 1 Month Program (Students)
  - Career Acceleration Program (Working Professionals)
  - Customized College Training Program
Database connection closed
```

### Step 2: Install Multer (if not already installed)
```bash
npm install multer
```

Update `server/package.json` to ensure multer is included.

### Step 3: Create Upload Directory
The upload directory will be created automatically, but you can pre-create it:
```bash
mkdir -p public/uploads/courses
```

### Step 4: Add New Courses via Admin Panel
1. Navigate to Admin Dashboard → Courses tab
2. Click "Add Course" button
3. Fill in the form:
   - **Course Name** (required, min 3 chars)
   - **Cover Image** (optional, but recommended)
   - **Date** (required)
   - **Duration** (required)
   - **Description** (optional)
   - **Price** (optional)
   - **Mode** (required, select at least one)
4. Click "Add Course"
5. See success toast notification

---

## ✅ Validation Rules

### Frontend Validation (Real-time)
- `course_name`: Min length 3, required
- `date`: Required
- `duration`: Required
- `description`: Optional
- `price`: Optional; if provided, must be >= 0
- `mode`: Required; must select at least online or offline
- `image`: Optional; if provided, must be image file, max 5MB

### Backend Validation
- Validates all required fields
- Supports file uploads via Multer
- Returns appropriate error messages

---

## 📊 Course Display in Courses Page

The Courses page (`src/pages/Courses.tsx`) automatically displays all published courses:
- Shows course name (from `course_name`)
- Displays image (from `image_url`)
- Shows date and duration
- Displays mode (online/offline)
- Shows price if not null

The existing CourseCard component will work with the new fields.

---

## 🔄 API Endpoints

### Get All Courses (Public)
```
GET /api/courses
```

### Get Course Details
```
GET /api/courses/{slug}
```

### Admin: Upload Image
```
POST /api/admin/upload-image
Headers: Authorization: Bearer {token}
Body: multipart/form-data with "image" field
Response: { url: "/uploads/courses/{filename}", success: true }
```

### Admin: Add Course
```
POST /api/courses
Headers: Authorization: Bearer {token}
Body: {
  course_name: string,
  image_url?: string,
  date: string,
  duration: string,
  description?: string,
  price?: number | null,
  mode: ["online"] | ["offline"] | ["online", "offline"],
  slug?: string,
  published?: boolean
}
```

### Admin: Delete Course
```
DELETE /api/courses/{id}
Headers: Authorization: Bearer {token}
```

---

## 📝 Database Schema

```javascript
{
  _id: ObjectId,
  course_name: String,              // Display name
  slug: String,                     // URL-friendly name
  image: String,                    // Image filename/URL
  image_url: String,                // Full image URL
  date: String,                     // "January 2026" or "Flexible"
  duration: String,                 // "1 Month / 12 Sessions"
  description: String,              // Long description
  short_description: String,        // Short description (legacy)
  full_description: String,         // Full description (legacy)
  price: Number | null,             // Price in dollars
  mode: [String],                   // ["online", "offline"] or subset
  duration_weeks: Number,           // Optional numeric weeks
  tags: [String],                   // Optional tags
  published: Boolean,               // Visibility flag
  created_at: Date                  // Creation timestamp
}
```

---

## 🎨 UI Components Used

- `Dialog` - Modal for add course form
- `Input` - Text input fields
- `Textarea` - Description field
- `Checkbox` - Mode selection (online/offline)
- `Button` - Form submission
- `Label` - Form labels
- `Loader2` (lucide-react) - Loading indicator during image upload
- `Image` (lucide-react) - Icon for upload area
- `X` (lucide-react) - Icon for removing image

---

## 🔒 Security Notes

- Admin authentication required for all admin endpoints
- Image upload restricted to image file types
- File size limit: 5MB
- Images stored in public directory with sanitized names
- Backend validates all inputs

---

## 🐛 Troubleshooting

### "Cannot find multer"
**Solution:** Install multer in server directory
```bash
cd server
npm install multer
```

### Images not uploading
**Solution:** Ensure public/uploads/courses directory exists
```bash
mkdir -p public/uploads/courses
```

### "Course not found" error
**Solution:** Check that courses are published (published: true)

### Validation messages appearing
**Ensure:**
- Course name is at least 3 characters
- Date and Duration are filled
- At least one mode is selected
- Price is a valid number >= 0

---

## 📦 Next Steps (Optional)

1. **Add course images** to the courses via the admin panel
2. **Customize the 3 predefined courses** by editing the seed script
3. **Add course filtering** by mode (online/offline) in Courses page
4. **Implement course editing** (currently only add/delete)
5. **Add course categories/tags** for better organization

---

## 📞 Support

For issues or questions:
1. Check the validation messages in the UI
2. Check browser console for API errors
3. Check server logs for backend errors
4. Ensure MongoDB is running and connected
5. Verify admin authentication token is valid
