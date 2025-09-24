export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: 'Facebook' | 'Twitter' | 'Google' | 'Website' | 'Offline';
  status: 'New' | 'Contacted' | 'Not Interested' | 'Qualified';
  assignedSalesperson: string;
  lastContacted: Date | null;
  createdAt: Date;
  budget?: number;
  preferredModel?: string;
  timeline?: string;
  financingNeeded?: boolean;
  notes?: string[];
  interactions?: Interaction[];
}

export interface Interaction {
  id: string;
  type: 'call' | 'email' | 'note';
  content: string;
  timestamp: Date;
  salesperson: string;
}

export interface Salesperson {
  id: string;
  name: string;
  leadsAssigned: number;
  leadsQualified: number;
  conversionRate: number;
}

export interface DashboardStats {
  totalLeads: number;
  leadsContacted: number;
  leadsQualified: number;
  conversionRate: number;
  leadsBySource: Record<string, number>;
  leadsByStatus: Record<string, number>;
  monthlyTrends: Array<{ month: string; leads: number }>;
}