// Course Types
export interface AdminCoursePayload {
  course_name: string;
  image?: string;
  date: string;
  duration: string;
  description?: string;
  price?: number | null;
  mode: ("online" | "offline")[];
  // optional backend-only fields:
  _id?: string;
  slug?: string;
  createdAt?: string;
}

export interface CourseFormState {
  course_name: string;
  date: string;
  duration: string;
  description: string;
  price: string;
  mode: ("online" | "offline")[];
  image?: string;
}

// Validation result
export interface ValidationError {
  field: string;
  message: string;
}

// Image upload response
export interface ImageUploadResponse {
  url: string;
  success: boolean;
  error?: string;
}

export type MentorAvailability = "weekdays" | "weekends" | "on-demand" | "none";

export interface TeamMember {
  _id?: string;
  name: string;
  title: string | null;
  bio: string | null;
  image_url: string | null;
  skills: string[] | null;
  linkedin: string | null;
  active: boolean;
  display_order?: number;
  created_at?: string;
}

// Mentor Schedule Types
export interface MentorSchedule {
  _id?: string;
  courseName: string;
  mentorId: string;
  mentor: {
    _id: string;
    name: string;
    image_url: string;
  };
  college: string;
  courseLevel: 'Beginner' | 'Advanced' | 'Project Based' | 'Hackathon';
  mentorAvailability: 'Available' | 'Not Available';
  confirmationStatus: 'Pending' | 'Confirmed' | 'Rejected';
  courseContentReady: 'Yes' | 'No';
  lectureDate: string | Date;
  lectureTime: string;
  mode: 'Online' | 'Offline' | 'Hybrid';
  meetingLink?: string;
  location?: string;
  mentorEmail: string;
  mentorMobile: string;
  sessionStatus: 'Scheduled' | 'Completed' | 'Cancelled' | 'Rescheduled';
  emailStatus: 'Not Sent' | 'Sent' | 'Failed';
  createdAt?: string;
  updatedAt?: string;
}

export interface College {
  _id?: string;
  name: string;
  location: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface DefaultMentor {
  _id?: string;
  name: string;
  phone: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateMentorSchedulePayload {
  courseName: string;
  mentorId: string;
  courseLevel: 'Beginner' | 'Advanced' | 'Project Based' | 'Hackathon';
  mentorAvailability?: 'Available' | 'Not Available';
  confirmationStatus?: 'Pending' | 'Confirmed' | 'Rejected';
  courseContentReady?: 'Yes' | 'No';
  lectureDate: string;
  lectureTime: string;
  mode: 'Online' | 'Offline' | 'Hybrid';
  meetingLink?: string;
  location?: string;
  mentorEmail: string;
  mentorMobile: string;
  college: string;
  sessionStatus?: 'Scheduled' | 'Completed' | 'Cancelled' | 'Rescheduled';
}

export interface UpdateMentorSchedulePayload {
  courseName?: string;
  mentorId?: string;
  courseLevel?: 'Beginner' | 'Advanced' | 'Project Based' | 'Hackathon';
  mentorAvailability?: 'Available' | 'Not Available';
  confirmationStatus?: 'Pending' | 'Confirmed' | 'Rejected';
  courseContentReady?: 'Yes' | 'No';
  lectureDate?: string;
  lectureTime?: string;
  mode?: 'Online' | 'Offline' | 'Hybrid';
  meetingLink?: string;
  location?: string;
  mentorEmail?: string;
  mentorMobile?: string;
  college?: string;
  sessionStatus?: 'Scheduled' | 'Completed' | 'Cancelled' | 'Rescheduled';
  emailStatus?: 'Not Sent' | 'Sent' | 'Failed';
}