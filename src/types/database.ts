export type UserRole = "super_admin" | "clinic_admin" | "doctor" | "receptionist" | "accountant" | "assistant";
export type AppointmentStatus = "pending" | "confirmed" | "arrived" | "in_progress" | "completed" | "cancelled" | "no_show";
export type PlanStatus = "proposed" | "awaiting_approval" | "approved" | "in_progress" | "completed" | "cancelled";
export type InvoiceStatus = "draft" | "issued" | "partially_paid" | "paid" | "cancelled" | "overdue";
export type PaymentMethod = "cash" | "card" | "bank_transfer" | "cheque" | "other";
export type TreatmentCategory = "consultation" | "cleaning" | "whitening" | "filling" | "root_canal" | "extraction" | "implant" | "orthodontics" | "crown_bridge" | "periodontics" | "surgery" | "pediatric" | "other";
export type ToothCondition = "healthy" | "decay" | "filled" | "crown" | "root_canal" | "missing" | "implant" | "bridge" | "extraction_needed" | "fractured" | "impacted" | "other";

export interface Clinic {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
  currency: string;
  timezone: string;
  is_active: boolean;
  created_at: string;
}

export interface Profile {
  id: string;
  clinic_id: string;
  full_name: string;
  role: UserRole;
  is_active: boolean;
}

export interface Patient {
  id: string;
  clinic_id: string;
  full_name: string;
  phone: string;
  balance: number;
  status: "active" | "archived" | "deceased";
  created_at: string;
}

export interface Appointment {
  id: string;
  clinic_id: string;
  patient_id: string;
  doctor_id: string;
  start_time: string;
  end_time: string;
  status: AppointmentStatus;
}

export interface DashboardStats {
  totalPatients: number;
  newPatientsThisMonth: number;
  todayAppointments: number;
  dailyRevenue: number;
  monthlyRevenue: number;
  outstandingBalance: number;
}
