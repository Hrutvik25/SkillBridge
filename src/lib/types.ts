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
