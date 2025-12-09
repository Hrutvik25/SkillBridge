# 🚀 Quick Start: Course Management

## Installation

### 1. Install Dependencies
```bash
# From the server directory
cd server
npm install

# This will install multer (required for image uploads)
```

### 2. Seed Initial Courses
```bash
# From the server directory
node scripts/seedCourses.js
```

**Expected Output:**
```
Connected to MongoDB
✓ Successfully seeded 3 courses
  - 1 Month Program (Students)
  - Career Acceleration Program (Working Professionals)
  - Customized College Training Program
Database connection closed
```

### 3. Create Upload Directory (Auto-Created)
The directory will be created automatically on first upload:
```bash
mkdir -p public/uploads/courses
```

---

## ✨ Using the Admin Panel

### Access Admin Dashboard
1. Navigate to `/admin-dashboard` (requires admin login)
2. Click on the **Courses** tab

### Add a New Course
1. Click **"Add Course"** button
2. Fill in the form:

| Field | Required | Notes |
|-------|----------|-------|
| Course Name | ✅ | Min 3 characters |
| Cover Image | ❌ | Optional, JPG/PNG/GIF, max 5MB |
| Date | ✅ | e.g., "January 2026" or "Flexible" |
| Duration | ✅ | e.g., "1 Month / 12 Sessions" |
| Description | ❌ | Optional but recommended |
| Price | ❌ | Optional, numeric only |
| Mode | ✅ | Select Online and/or Offline |

3. Click **"Add Course"**
4. See success notification

### View Courses
Courses are displayed in the **Courses** tab with:
- Course title
- Date
- Mode (online/offline)
- Price
- Delete option

---

## 📋 Predefined Courses

These 3 courses are automatically seeded:

### 1️⃣ 1 Month Program (Students)
- **Date:** January 2026
- **Duration:** 1 Month / 12 Sessions
- **Mode:** Online & Offline
- **Price:** Free
- **Description:** Domain + 2 Tech + 2 Softskills. Online or Offline batches. Classes 3 days a week (6–8 PM).

### 2️⃣ Career Acceleration Program (Working Professionals)
- **Date:** January 2026
- **Duration:** 12 Hours (Weekend Batches)
- **Mode:** Online & Offline
- **Price:** Free
- **Description:** Weekend Online or Offline sessions focusing on Domain + Softskills.

### 3️⃣ Customized College Training Program
- **Date:** Flexible
- **Duration:** Custom Duration
- **Mode:** Online & Offline
- **Price:** Free
- **Description:** Curriculum customization, flexible timings, and bulk training options designed for colleges and institutions to enhance placement outcomes.

---

## 🎯 Form Validation

The form prevents submission until:
- ✅ Course name is filled and >= 3 characters
- ✅ Date is filled
- ✅ Duration is filled
- ✅ At least one mode is selected
- ✅ Price (if provided) is >= 0
- ✅ Image (if provided) is valid

**Visual Feedback:**
- Save button is disabled in red until all validations pass
- Error messages appear below fields
- Image upload shows preview before confirmation

---

## 🖼️ Image Upload

### Supported Formats
- JPG/JPEG
- PNG
- GIF

### Size Limit
- Maximum 5MB per image

### Upload Flow
1. Click the dashed upload area
2. Select an image file
3. Preview appears
4. Remove button (X) to change image
5. Image URL is sent with form data
6. Stored in `public/uploads/courses/`

---

## 📊 Viewing Courses

### Public Courses Page
Navigate to `/courses` to see all published courses with:
- Course cover image
- Course title
- Date and duration
- Mode (online/offline)
- Description
- Price (if applicable)

### Filtering (Future Enhancement)
The page supports search and filtering by tags.

---

## 🔧 Customization

### Change Predefined Courses
Edit `server/scripts/seedCourses.js`:
```javascript
const seedCourses = [
  {
    course_name: "Your Course Title",
    image: "filename.jpg",
    date: "Month Year",
    duration: "Duration",
    description: "Your description",
    price: null,
    mode: ["online", "offline"],
    published: true
  },
  // ... more courses
];
```

Then re-run: `node scripts/seedCourses.js`

### Change Upload Directory
Edit `server/routes/admin.js`:
```javascript
const uploadDir = path.join(__dirname, '../public/uploads/courses'); // Change this path
```

### Change File Size Limit
Edit `server/routes/admin.js`:
```javascript
limits: { fileSize: 5 * 1024 * 1024 }, // Change 5 to desired MB
```

---

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| "Cannot find multer" | Run `npm install` in server directory |
| Image upload fails | Check `public/uploads/courses` exists |
| "Save" button stays disabled | Fill all required fields |
| Courses not showing | Ensure `published: true` in database |
| Image not displaying | Check `/uploads/courses/{filename}` URL |

---

## 📚 API Reference

All admin endpoints require `Authorization: Bearer {token}` header.

### Upload Image
```bash
POST /api/admin/upload-image
Content-Type: multipart/form-data

Response:
{
  "url": "/uploads/courses/image-123456789.jpg",
  "success": true
}
```

### Create Course
```bash
POST /api/courses
Content-Type: application/json

Request Body:
{
  "course_name": "Course Title",
  "image_url": "/uploads/courses/image.jpg",
  "date": "January 2026",
  "duration": "1 Month",
  "description": "Course description",
  "price": null,
  "mode": ["online", "offline"],
  "published": true
}
```

### Get All Courses (Public)
```bash
GET /api/courses
```

### Delete Course
```bash
DELETE /api/courses/{courseId}
```

---

## ✅ Checklist

- [ ] Run `npm install` in server directory
- [ ] Run seed script: `node scripts/seedCourses.js`
- [ ] Verify 3 courses in database
- [ ] Test adding a new course via admin panel
- [ ] Upload an image
- [ ] View course on public courses page
- [ ] Verify course displays correctly

---

## 📞 Need Help?

1. **Form validation errors?** → Check all required fields are filled
2. **Image upload fails?** → Verify multer is installed and directory exists
3. **Courses not showing?** → Check published status in database
4. **API errors?** → Check server logs for detailed error messages

For detailed documentation, see `COURSE_MANAGEMENT_SETUP.md`
