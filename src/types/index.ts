export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  countryCode: string;
  createdAt: string;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  contact: string;
  rating: number;
}

export interface Subscription {
  id: string;
  userId: string;
  companyId: string;
  category: 'auto' | 'travel' | 'housing' | 'education';
  status: 'active' | 'pending' | 'expired' | 'cancelled';
  startDate: string;
  endDate: string;
  premium: number;
  currency: 'XOF';
}

export interface AutoDetails {
  subscriptionId: string;
  brand: string;
  model: string;
  year: number;
  usage: 'personal' | 'commercial' | 'taxi';
  energy: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
  licensePlate: string;
}

export interface EducationContract {
  subscriptionId: string;
  formula: 'basic' | 'premium' | 'gold';
  duration: number;
  beneficiaryName: string;
  schoolName: string;
}

export interface Claim {
  id: string;
  userId: string;
  category: string;
  subject: string;
  description: string;
  status: 'pending' | 'in-progress' | 'resolved' | 'rejected';
  createdAt: string;
}

export interface Incident {
  id: string;
  userId: string;
  location: string;
  date: string;
  circumstances: string;
  description: string;
  status: 'declared' | 'investigating' | 'approved' | 'rejected';
  estimatedAmount?: number;
}

export interface Payment {
  id: string;
  subscriptionId: string;
  amount: number;
  currency: 'XOF';
  method: 'airtel' | 'orange' | 'flooz' | 'mynita';
  status: 'pending' | 'completed' | 'failed';
  transactionId?: string;
  date: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}