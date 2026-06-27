export type UserRole = 'patient' | 'doctor' | 'pharmacist' | 'hospital_admin' | 'super_admin';
export type PrescriptionStatus = 'pending' | 'approved' | 'rejected';
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Patient {
  id: string; // UUID
  role: UserRole;
  first_name: string;
  last_name: string;
  date_of_birth?: string | null; // ISO Date String
  email: string;
  phone?: string | null;
  address_line1?: string | null;
  address_line2?: string | null;
  city?: string | null;
  state?: string | null;
  postal_code?: string | null;
  country?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string; // UUID
  name: string;
  description?: string | null;
  sku: string;
  price: number;
  stock_quantity: number;
  requires_prescription: boolean;
  category?: string | null;
  manufacturer?: string | null;
  image_url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Prescription {
  id: string; // UUID
  patient_id: string; // Foreign Key to Patient
  doctor_id?: string | null; // Foreign Key to Doctor (User)
  document_url: string; // Cloud Storage URL
  status: PrescriptionStatus;
  notes?: string | null;
  metadata?: {
    patientName?: string;
    doctorName?: string;
    medications?: string[];
    [key: string]: any;
  } | null;
  reviewed_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string; // UUID
  patient_id: string; // Foreign Key to Patient
  prescription_id?: string | null; // Optional Foreign Key
  status: OrderStatus;
  total_amount: number;
  shipping_address?: string | null;
  tracking_number?: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string; // UUID
  order_id: string; // Foreign Key to Order
  product_id: string; // Foreign Key to Product
  quantity: number;
  unit_price: number;
  subtotal: number;
  created_at: string;
  updated_at: string;
}
