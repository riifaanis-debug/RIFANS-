
export interface ServiceItem {
  name: string;
  description: string;
  tags: string;
  link: string;
}

export interface StatItem {
  value: number;
  label: string;
  suffix?: string;
}

export interface TestimonialItem {
  title: string;
  text: string;
  stars: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TimelineItem {
  title: string;
  text: string;
  stars?: number; // Added to match usage if needed, though strictly strictly not in interface above
}

export interface PerformanceItem {
  label: string;
  value: number; // 0-100
  displayValue: string;
}

export interface ProductItem {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  recommended?: boolean;
}

export interface UserProduct {
  id: number;
  type: string;
  amount: string;
}

export interface UserDocument {
  id: number;
  type: string;
  fileName: string;
  date: string;
}

export interface UserProfile {
  fullName: string;
  nationalId: string;
  mobile: string;
  fileNumber?: string; // Unified File Number
  email?: string;
  jobStatus?: string;
  salary?: number;
  joinDate: string;
  serviceType?: string; // Added field
  // Additional fields matching Waive Form
  age?: string;
  region?: string;
  city?: string;
  bank?: string;
  products?: UserProduct[];
  documents?: UserDocument[];
}

export interface CustomerRequest {
  id: string;
  type: string;
  date: string;
  status: 'pending' | 'processing' | 'completed' | 'rejected';
  description: string;
}

export interface SubmissionData {
  firstName: string;
  middleName: string;
  lastName: string;
  nationalId: string;
  mobile: string;
  requestId: string;
  date: string;
}

export interface Product {
  id: string;
  type: string;
  amount: string;
}

export interface DocumentItem {
  id: string;
  type: string;
  file: File | null;
}
