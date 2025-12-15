import type { MentorAvailability, TeamMember } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get token from localStorage
const getToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

// Set token in localStorage
export const setToken = (token: string): void => {
  localStorage.setItem('auth_token', token);
};

// Remove token from localStorage
export const removeToken = (): void => {
  localStorage.removeItem('auth_token');
};

// API request helper
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'API request failed');
  }

  return data;
}

// Auth API
export const authApi = {
  register: async (email: string, password: string, full_name: string) => {
    const data = await apiRequest<{ user: User; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, full_name }),
    });
    setToken(data.token);
    return data;
  },

  login: async (email: string, password: string) => {
    const data = await apiRequest<{ user: User; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setToken(data.token);
    return data;
  },

  logout: () => {
    removeToken();
  },

  getMe: async () => {
    return apiRequest<{ user: User }>('/auth/me');
  },
  
  // Forgot password
  forgotPassword: async (email: string) => {
    return apiRequest<{ message: string }>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },
  
  // Reset password
  resetPassword: async (data: { token: string; email: string; newPassword: string }) => {
    return apiRequest<{ message: string }>('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// Courses API
export const coursesApi = {
  getAll: async () => {
    return apiRequest<Course[]>('/courses');
  },

  getBySlug: async (slug: string, options?: RequestInit) => {
    return apiRequest<{ course: Course; mentors: Mentor[]; isEnrolled: boolean }>(
      `/courses/${slug}`,
      options
    );
  },
};

// Mentors API
export const mentorsApi = {
  getAll: async () => {
    return apiRequest<Mentor[]>('/mentors');
  },

  getById: async (id: string) => {
    return apiRequest<Mentor>(`/mentors/${id}`);
  },
};

// Team API
export const teamApi = {
  getAll: async () => {
    return apiRequest<TeamMember[]>('/team');
  },
};

// Enrollments API
export const enrollmentsApi = {
  getAll: async () => {
    return apiRequest<Enrollment[]>('/enrollments');
  },

  enroll: async (course_id: string) => {
    return apiRequest<Enrollment>('/enrollments', {
      method: 'POST',
      body: JSON.stringify({ course_id }),
    });
  },
};

// Profiles API
export const profilesApi = {
  getMe: async () => {
    return apiRequest<Profile>('/profiles/me');
  },

  update: async (data: Partial<Profile>) => {
    return apiRequest<Profile>('/profiles/me', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },
};

// Contact API
export const contactApi = {
  send: async (name: string, email: string, message: string) => {
    return apiRequest<{ message: string }>('/contact', {
      method: 'POST',
      body: JSON.stringify({ name, email, message }),
    });
  },
};

// Admin API
export const adminApi = {
  getStats: async () => {
    return apiRequest<{
      stats: AdminStats;
      courses: Course[];
      mentors: Mentor[];
      teamMembers: TeamMember[];
    }>('/admin/stats');
  },

  addMentor: async (mentor: Partial<Mentor>) => {
    return apiRequest<Mentor>('/admin/mentors', {
      method: 'POST',
      body: JSON.stringify(mentor),
    });
  },

  updateMentor: async (id: string, mentor: Partial<Mentor>) => {
    return apiRequest<Mentor>(`/admin/mentors/${id}`, {
      method: 'PUT',
      body: JSON.stringify(mentor),
    });
  },

  deleteMentor: async (id: string) => {
    return apiRequest<{ message: string }>(`/admin/mentors/${id}`, {
      method: 'DELETE',
    });
  },

  addTeamMember: async (member: Partial<TeamMember>) => {
    return apiRequest<TeamMember>('/admin/team', {
      method: 'POST',
      body: JSON.stringify(member),
    });
  },

  updateTeamMember: async (id: string, member: Partial<TeamMember>) => {
    return apiRequest<TeamMember>(`/admin/team/${id}`, {
      method: 'PUT',
      body: JSON.stringify(member),
    });
  },

  deleteTeamMember: async (id: string) => {
    return apiRequest<{ message: string }>(`/admin/team/${id}`, {
      method: 'DELETE',
    });
  },

  uploadImage: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);
    const token = getToken();
    
    const headers: HeadersInit = {
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await fetch(`${API_BASE_URL}/admin/upload-image`, {
      method: 'POST',
      headers,
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Image upload failed');
    }

    return data.url;
  },

  addCourse: async (course: Partial<Course>) => {
    return apiRequest<Course>('/admin/courses', {
      method: 'POST',
      body: JSON.stringify(course),
    });
  },

  updateCourse: async (id: string, course: Partial<Course>) => {
    return apiRequest<Course>(`/admin/courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(course),
    });
  },

  deleteCourse: async (id: string) => {
    return apiRequest<{ message: string }>(`/admin/courses/${id}`, {
      method: 'DELETE',
    });
  },
  
  // Get all enrollments with user and course details
  getEnrollments: async () => {
    return apiRequest<EnrollmentDetails[]>('/admin/enrollments');
  },
};

// Gallery API (public)
export const galleryApi = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/gallery`);
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error || 'Failed to fetch gallery');
    }
    return response.json();
  }
};

// Admin gallery endpoints
export const adminGalleryApi = {
  getAll: async () => apiRequest('/admin/gallery'),
  create: async (payload: { image_url: string; title?: string; hidden?: boolean }) => apiRequest('/admin/gallery', { method: 'POST', body: JSON.stringify(payload) }),
  update: async (id: string, payload: Partial<{ image_url: string; title: string; hidden: boolean }>) => apiRequest(`/admin/gallery/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  remove: async (id: string) => apiRequest(`/admin/gallery/${id}`, { method: 'DELETE' }),
};

// Types
export interface User {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  roles: AppRole[];
}

export type AppRole = 'user' | 'admin' | 'mentor';

export interface Course {
  _id?: string;
  title?: string;
  course_name?: string;
  slug?: string;
  short_description?: string | null;
  description?: string | null;
  full_description?: string | null;
  image?: string | null;
  image_url?: string | null;
  date?: string;
  duration?: string;
  price?: number | null;
  duration_weeks?: number | null;
  mode?: ("online" | "offline")[];
  tags?: string[] | null;
  published?: boolean;
  created_at?: string;
}

export interface Mentor {
  _id: string;
  name: string;
  title: string | null;
  bio: string | null;
  image_url: string | null;
  skills: string[] | null;
  linkedin: string | null;
  twitter: string | null;
  availability?: MentorAvailability;
  display_order?: number;
  active: boolean;
  created_at: string;
}

export interface Enrollment {
  id: string;
  enrolled_at: string;
  course: {
    id: string;
    title: string;
    slug: string;
    image_url: string | null;
    short_description: string | null;
  };
}

// New interface for admin enrollment details
export interface EnrollmentDetails {
  id: string;
  enrolled_at: string;
  user: {
    id: string;
    full_name: string | null;
    email: string;
    created_at: string;
  };
  course: {
    id: string;
    course_name: string;
    slug: string;
  };
}

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface AdminStats {
  users: number;
  courses: number;
  mentors: number;
  team?: number;
  enrollments: number;
  messages: number;
}

export type { TeamMember, MentorAvailability } from "./types";

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getToken();
};
