import { config } from '@/config/environment';

const API_BASE_URL = config.api.baseUrl;

// Types
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: 'patient' | 'doctor' | 'admin';
}

export interface Doctor {
  id: number;
  user: User;
  specialty: Specialty;
  license_number: string;
  bio?: string;
  consultation_price: number;
  is_available: boolean;
}

export interface Specialty {
  id: number;
  name: string;
  description?: string;
  icon?: string;
}

export interface Appointment {
  id: number;
  patient: User;
  doctor: Doctor;
  appointment_date: string;
  appointment_time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  reason?: string;
  notes?: string;
  price?: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone?: string;
  role: 'patient' | 'doctor';
}

// Token management
let authToken: string | null = localStorage.getItem('auth_token');

export const setAuthToken = (token: string) => {
  authToken = token;
  localStorage.setItem('auth_token', token);
};

export const removeAuthToken = () => {
  authToken = null;
  localStorage.removeItem('auth_token');
};

// HTTP Client
class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (authToken) {
      headers.Authorization = `Bearer ${authToken}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Une erreur est survenue' }));
      throw new Error(error.message || `Erreur HTTP: ${response.status}`);
    }

    return response.json();
  }

  // Authentification
  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    const response = await this.request<{ user: User; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    setAuthToken(response.token);
    return response;
  }

  async register(data: RegisterData): Promise<{ user: User; token: string }> {
    const response = await this.request<{ user: User; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    setAuthToken(response.token);
    return response;
  }

  async logout(): Promise<void> {
    await this.request('/auth/logout', {
      method: 'POST',
    });
    removeAuthToken();
  }

  async getCurrentUser(): Promise<User> {
    return this.request<User>('/auth/user');
  }

  // Médecins
  async getDoctors(): Promise<Doctor[]> {
    return this.request<Doctor[]>('/doctors');
  }

  async getDoctor(id: number): Promise<Doctor> {
    return this.request<Doctor>(`/doctors/${id}`);
  }

  async getDoctorAvailability(doctorId: number, date: string): Promise<string[]> {
    return this.request<string[]>(`/doctors/${doctorId}/availability?date=${date}`);
  }

  // Spécialités
  async getSpecialties(): Promise<Specialty[]> {
    return this.request<Specialty[]>('/specialties');
  }

  async getPublicSpecialties(): Promise<Specialty[]> {
    return this.request<Specialty[]>('/specialties/public');
  }

  // Rendez-vous
  async getAppointments(): Promise<Appointment[]> {
    return this.request<Appointment[]>('/appointments');
  }

  async createAppointment(appointment: {
    doctor_id: number;
    appointment_date: string;
    appointment_time: string;
    reason?: string;
  }): Promise<Appointment> {
    return this.request<Appointment>('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointment),
    });
  }

  async updateAppointment(id: number, data: Partial<Appointment>): Promise<Appointment> {
    return this.request<Appointment>(`/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteAppointment(id: number): Promise<void> {
    await this.request(`/appointments/${id}`, {
      method: 'DELETE',
    });
  }

  // Créneaux de disponibilité
  async getAvailableSlots(doctorId: number, date: string): Promise<string[]> {
    return this.request<string[]>(`/availability/${doctorId}/${date}`);
  }
}

export const apiClient = new ApiClient();