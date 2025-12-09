# ✅ Course Management System - Testing Checklist

## Prerequisites
- [ ] MongoDB is running and connected
- [ ] Frontend and backend servers are running
- [ ] You are logged in as an admin user

---

## Installation & Setup
- [ ] Run `npm install` in server directory to install multer
- [ ] Verify `multer` is added to `server/package.json`
- [ ] Run seed script: `node server/scripts/seedCourses.js`
- [ ] Verify all 3 predefined courses are in database
- [ ] Directory `public/uploads/courses/` exists (or will auto-create)

---

## Admin Panel - View Courses
- [ ] Navigate to `/admin-dashboard`
- [ ] Click on "Courses" tab
- [ ] Verify 3 predefined courses are displayed:
  - [ ] "1 Month Program (Students)"
  - [ ] "Career Acceleration Program (Working Professionals)"
  - [ ] "Customized College Training Program"
- [ ] Verify each course shows:
  - [ ] Title
  - [ ] Date
  - [ ] Mode (online/offline)
  - [ ] Price (Free)

---

## Add Course Form - UI
- [ ] Click "Add Course" button
- [ ] Dialog opens with proper title
- [ ] Form fields appear in correct order:
  - [ ] Course Name
  - [ ] Cover Image (upload area)
  - [ ] Date
  - [ ] Duration
  - [ ] Description
  - [ ] Price
  - [ ] Mode (checkboxes)
- [ ] "Add Course" button is visible at bottom
- [ ] Save button is initially disabled (grayed out)

---

## Form Validation - Course Name
- [ ] Leave empty, verify button stays disabled
- [ ] Type 1 character, verify button stays disabled
- [ ] Type 2 characters, verify button stays disabled
- [ ] Type 3 characters, verify button becomes enabled
- [ ] See validation message: "Must be at least 3 characters"

---

## Form Validation - Date Field
- [ ] Leave empty with other fields filled, button disabled
- [ ] Type "January 2026", button should be enabled
- [ ] Type "Flexible", button should be enabled
- [ ] Clear field, button becomes disabled again

---

## Form Validation - Duration Field
- [ ] Leave empty with other fields filled, button disabled
- [ ] Type any duration, button updates state
- [ ] Clear field, button becomes disabled again

---

## Form Validation - Mode (Online/Offline)
- [ ] Both unchecked, button disabled
- [ ] Check "Online", button becomes enabled
- [ ] Check "Offline", button remains enabled
- [ ] Check both, button remains enabled
- [ ] Uncheck both, button becomes disabled
- [ ] Verify at least one is always required

---

## Form Validation - Price
- [ ] Leave empty, button enabled (optional field)
- [ ] Type "-5", error message appears
- [ ] Type "0", no error, button enabled
- [ ] Type "99.99", button enabled
- [ ] Type "abc", verify it's number-only field

---

## Image Upload
- [ ] Click on upload area, file picker opens
- [ ] Select a JPG image, preview appears
- [ ] Show image preview below upload area
- [ ] Click X button on preview, image removed
- [ ] Upload area appears again
- [ ] Select PNG image, preview shows correctly
- [ ] Select GIF image, preview shows correctly

---

## Image Upload - Validation
- [ ] Try uploading non-image file (TXT), see error message
- [ ] See error: "Please select a valid image file"
- [ ] Try uploading large file (>5MB), see error message
- [ ] See error: "Image must be less than 5MB"

---

## Description Field
- [ ] Leave empty, form still valid (optional)
- [ ] Type description, form valid
- [ ] Textarea has multiple rows
- [ ] Text wraps correctly

---

## Complete Form Submission - Valid Data
1. Fill form with:
   - Course Name: "Test Course New"
   - Date: "March 2026"
   - Duration: "2 Weeks"
   - Description: "This is a test course"
   - Price: "99"
   - Mode: Check "Online"
   - Image: (skip or upload)

2. Click "Add Course"
3. Verify:
   - [ ] Loading spinner appears
   - [ ] Dialog closes after submission
   - [ ] Success toast appears: "Course added successfully"
   - [ ] Form clears (all fields empty)
   - [ ] New course appears in courses table

---

## New Course Verification
- [ ] Find newly added course in table
- [ ] Verify correct title displayed
- [ ] Verify correct date displayed
- [ ] Verify correct mode displayed (online)
- [ ] Verify correct price displayed ($99)

---

## Image Upload in Real Form
1. Add course with image:
   - Course Name: "Image Test Course"
   - Date: "April 2026"
   - Duration: "1 Month"
   - Mode: Check "Online"
   - Image: Upload test image
   
2. Submit form
3. Verify:
   - [ ] File uploaded successfully
   - [ ] No error messages
   - [ ] Course added to table
   - [ ] Image stored in `public/uploads/courses/`

---

## Public Courses Page
- [ ] Navigate to `/courses`
- [ ] Verify all courses are displayed:
  - [ ] 3 predefined courses
  - [ ] Any newly added courses
- [ ] Verify course cards show:
  - [ ] Course image
  - [ ] Course name
  - [ ] Date
  - [ ] Duration
  - [ ] Mode
  - [ ] Price (if not free)

---

## Delete Course
- [ ] In admin panel, find a test course
- [ ] Click delete (trash icon)
- [ ] Verify course is removed from table
- [ ] Verify course is removed from database
- [ ] Verify removed course is no longer on public page

---

## Edge Cases
- [ ] Add course with minimum valid data (name, date, duration, mode)
- [ ] Add course with all fields filled
- [ ] Add course with maximum length description
- [ ] Add course with special characters in name
- [ ] Add course with price = 0
- [ ] Add course with both modes selected

---

## Error Handling
- [ ] Disconnect internet, try adding course
- [ ] Verify error message appears
- [ ] Reconnect and retry
- [ ] Close dialog during upload
- [ ] Verify upload cancels gracefully

---

## Database Verification
```bash
# Check courses in MongoDB
db.courses.find().pretty()

# Should show all courses with new fields:
# - course_name
# - date
# - duration
# - mode (array)
# - description
# - price
# - image_url
```

---

## API Testing (Optional)
```bash
# Test image upload
curl -X POST http://localhost:5000/api/admin/upload-image \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "image=@test.jpg"

# Should return:
# {"url": "/uploads/courses/image-xxxxx.jpg", "success": true}

# Test add course
curl -X POST http://localhost:5000/api/courses \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "course_name": "API Test",
    "date": "May 2026",
    "duration": "3 Weeks",
    "mode": ["online"],
    "price": null
  }'
```

---

## Browser Console
- [ ] No JavaScript errors appear
- [ ] No console warnings about missing components
- [ ] Network requests show successful responses (200, 201)
- [ ] Image upload request is multipart/form-data
- [ ] Course POST request is application/json

---

## Responsive Design
- [ ] Form displays correctly on desktop
- [ ] Form displays correctly on tablet
- [ ] Form displays correctly on mobile
- [ ] All input fields are accessible
- [ ] Submit button is easily clickable
- [ ] Error messages are readable

---

## Accessibility
- [ ] All fields have associated labels
- [ ] Form is keyboard navigable (Tab key)
- [ ] Required fields are marked with *
- [ ] Error messages are clear
- [ ] Image upload area has clear instructions
- [ ] Checkboxes are large enough to click

---

## Performance
- [ ] Form loads quickly
- [ ] Image preview appears immediately
- [ ] Submit doesn't cause noticeable lag
- [ ] Table updates quickly after adding course
- [ ] No memory leaks with multiple form opens/closes

---

## Final Verification
- [ ] All required features implemented ✅
- [ ] All validation rules working ✅
- [ ] All error handling working ✅
- [ ] Database storing data correctly ✅
- [ ] Images uploading correctly ✅
- [ ] UI is user-friendly ✅
- [ ] Documentation is complete ✅

---

## Sign-Off
- [ ] Tested by: _________________
- [ ] Date: _________________
- [ ] All tests passed: YES / NO
- [ ] Notes: _________________

---

## Known Issues (if any)
```
1. 
2. 
3. 
```

---

## Further Testing
- [ ] Test in different browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test with different MongoDB versions
- [ ] Test with different Node.js versions
- [ ] Test concurrent form submissions
- [ ] Test with various file sizes for images
- [ ] Test with international characters in course name
