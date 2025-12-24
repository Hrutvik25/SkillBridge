import type { MentorAvailability, TeamMember } from "./types";

/**
 * IMPORTANT:
 * - Netlify env:  VITE_API_BASE_URL = https://skillbridge-4373.onrender.com/api
 * - Local env:    VITE_API_BASE_URL = http://localhost:5000/api
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://skillbridge-4373.onrender.com/api";

// =====================
// Token helpers
// =====================
const getToken = (): string | null => {
  return localStorage.getItem("auth_token");
};

export const setToken = (token: string): void => {
  localStorage.setItem("auth_token", token);
};

export const removeToken = (): void => {
  localStorage.removeItem("auth_token");
};

// =====================
// Core API request
// =====================
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();

  const headers: HeadersInit = {
    ...(options.body && { "Content-Type": "application/json" }),
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "API request failed");
  }

  return data;
}

// =====================
// Auth API
// =====================
export const authApi = {
  register: async (email: string, password: string, full_name: string) => {
    const data = await apiRequest<{ user: User; token: string }>(
      "/auth/register",
      {
        method: "POST",
        body: JSON.stringify({ email, password, full_name }),
      }
    );
    setToken(data.token);
    return data;
  },

  login: async (email: string, password: string) => {
    const data = await apiRequest<{ user: User; token: string }>(
      "/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }
    );
    setToken(data.token);
    return data;
  },

  logout: () => {
    removeToken();
  },

  getMe: async () => {
    return apiRequest<{ user: User }>("/auth/me");
  },

  forgotPassword: async (email: string) => {
    return apiRequest<{ message: string }>("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },

  resetPassword: async (data: {
    token: string;
    email: string;
    newPassword: string;
  }) => {
    return apiRequest<{ message: string }>("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};

// =====================
// Courses API
// =====================
export const coursesApi = {
  getAll: async () => apiRequest<Course[]>("/courses"),

  getBySlug: async (slug: string, options?: RequestInit) =>
    apiRequest<{ course: Course; mentors: Mentor[]; isEnrolled: boolean }>(
      `/courses/${slug}`,
      options
    ),
};

// =====================
// Mentors API
// =====================
export const mentorsApi = {
  getAll: async () => apiRequest<Mentor[]>("/mentors"),
  getById: async (id: string) => apiRequest<Mentor>(`/mentors/${id}`),
};

// =====================
// Team API
// =====================
export const teamApi = {
  getAll: async () => apiRequest<TeamMember[]>("/team"),
};

// =====================
// Enrollments API
// =====================
export const enrollmentsApi = {
  getAll: async () => apiRequest<Enrollment[]>("/enrollments"),

  enroll: async (course_id: string) =>
    apiRequest<Enrollment>("/enrollments", {
      method: "POST",
      body: JSON.stringify({ course_id }),
    }),
};

// =====================
// Profiles API
// =====================
export const profilesApi = {
  getMe: async () => apiRequest<Profile>("/profiles/me"),

  update: async (data: Partial<Profile>) =>
    apiRequest<Profile>("/profiles/me", {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
};

// =====================
// Contact API
// =====================
export const contactApi = {
  send: async (name: string, email: string, message: string) =>
    apiRequest<{ message: string }>("/contact", {
      method: "POST",
      body: JSON.stringify({ name, email, message }),
    }),
};

// =====================
// Admin API
// =====================
export const adminApi = {
  getStats: async () =>
    apiRequest<{
      stats: AdminStats;
      courses: Course[];
      mentors: Mentor[];
      teamMembers: TeamMember[];
    }>("/admin/stats"),

  getEnrollments: async () =>
    apiRequest<EnrollmentDetails[]>("/admin/enrollments"),

  addMentor: async (mentor: Partial<Mentor>) =>
    apiRequest<Mentor>("/admin/mentors", {
      method: "POST",
      body: JSON.stringify(mentor),
    }),

  updateMentor: async (id: string, mentor: Partial<Mentor>) =>
    apiRequest<Mentor>(`/admin/mentors/${id}`, {
      method: "PUT",
      body: JSON.stringify(mentor),
    }),

  deleteMentor: async (id: string) =>
    apiRequest<{ message: string }>(`/admin/mentors/${id}`, {
      method: "DELETE",
    }),

  addCourse: async (course: Partial<Course>) =>
    apiRequest<Course>("/admin/courses", {
      method: "POST",
      body: JSON.stringify(course),
    }),

  updateCourse: async (id: string, course: Partial<Course>) =>
    apiRequest<Course>(`/admin/courses/${id}`, {
      method: "PUT",
      body: JSON.stringify(course),
    }),

  deleteCourse: async (id: string) =>
    apiRequest<{ message: string }>(`/admin/courses/${id}`, { method: "DELETE" }),

  uploadImage: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", file);

    const token = getToken();
    const headers: HeadersInit = {
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await fetch(
      `${API_BASE_URL}/admin/upload-image`,
      {
        method: "POST",
        headers,
        body: formData,
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Image upload failed");
    }
    return data.url;
  },
  // Team member management
  addTeamMember: async (member: Partial<TeamMember>) =>
    apiRequest<TeamMember>("/admin/team", {
      method: "POST",
      body: JSON.stringify(member),
    }),

  updateTeamMember: async (id: string, member: Partial<TeamMember>) =>
    apiRequest<TeamMember>(`/admin/team/${id}`, {
      method: "PUT",
      body: JSON.stringify(member),
    }),

  deleteTeamMember: async (id: string) =>
    apiRequest<{ message: string }>(`/admin/team/${id}`, { method: "DELETE" }),
};

// =====================
// Gallery API
// =====================
export const galleryApi = {
  getAll: async () => apiRequest("/gallery"),
};

export const adminGalleryApi = {
  getAll: async () => apiRequest("/admin/gallery"),
  create: async (payload: {
    image_url: string;
    title?: string;
    hidden?: boolean;
  }) =>
    apiRequest("/admin/gallery", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  update: async (
    id: string,
    payload: Partial<{ image_url: string; title: string; hidden: boolean }>
  ) =>
    apiRequest(`/admin/gallery/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
  remove: async (id: string) =>
    apiRequest(`/admin/gallery/${id}`, { method: "DELETE" }),
};

// =====================
// Types
// =====================
export interface User {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  roles: AppRole[];
}

export type AppRole = "user" | "admin" | "mentor";

export interface Course {
  _id?: string;
  title?: string;
  course_name?: string;
  slug?: string;
  image_url?: string | null;
  image?: string | null;
  date?: string;
  duration?: string;
  description?: string;
  short_description?: string;
  full_description?: string;
  price?: number | null;
  duration_weeks?: number | null;
  mode?: ("online" | "offline")[];
  tags?: string[];
  published?: boolean;
}

export interface Mentor {
  _id: string;
  name: string;
  title: string | null;
  bio: string | null;
  image_url: string | null;
  skills: string[] | null;
  availability?: MentorAvailability;
}

export interface Enrollment {
  id: string;
  enrolled_at: string;
}

export interface EnrollmentDetails {
  id: string;
  enrolled_at: string;
  user: {
    id: string | null;
    full_name: string | null;
    email: string | null;
    created_at: string | null;
  };
  course: {
    id: string | null;
    course_name: string;
    slug: string | null;
  };
}

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
}

export interface AdminStats {
  users: number;
  courses: number;
  mentors: number;
  enrollments: number;
}

export type { TeamMember, MentorAvailability } from "./types";

// =====================
// Mentor Schedule API
// =====================
export const mentorScheduleApi = {
  getAll: async () => apiRequest<MentorSchedule[]>("/mentor-schedule"),

  getById: async (id: string) => apiRequest<MentorSchedule>(`/mentor-schedule/${id}`),

  create: async (schedule: CreateMentorSchedulePayload) =>
    apiRequest<MentorSchedule>("/mentor-schedule", {
      method: "POST",
      body: JSON.stringify(schedule),
    }),

  update: async (id: string, schedule: UpdateMentorSchedulePayload) =>
    apiRequest<MentorSchedule>(`/mentor-schedule/${id}`, {
      method: "PUT",
      body: JSON.stringify(schedule),
    }),

  delete: async (id: string) =>
    apiRequest<{ message: string }>(`/mentor-schedule/${id}`, {
      method: "DELETE",
    }),

  sendEmail: async (id: string) =>
    apiRequest<{ message: string }>(`/mentor-schedule/${id}/send-email`, {
      method: "POST",
    }),
};

// =====================
// Auth helper
// =====================
export const isAuthenticated = (): boolean => {
  return !!getToken();
};
