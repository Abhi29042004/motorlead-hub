import { Lead, Salesperson, DashboardStats } from '@/types';

export const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'John Smith',
    phone: '+1 (555) 123-4567',
    email: 'john.smith@email.com',
    source: 'Facebook',
    status: 'New',
    assignedSalesperson: 'Sarah Johnson',
    lastContacted: null,
    createdAt: new Date('2024-01-15'),
    budget: 35000,
    preferredModel: 'Honda Civic',
    timeline: 'Within 2 months',
    financingNeeded: true,
    notes: ['First contact via Facebook ad inquiry'],
    interactions: []
  },
  {
    id: '2',
    name: 'Emily Davis',
    phone: '+1 (555) 234-5678',
    email: 'emily.davis@email.com',
    source: 'Google',
    status: 'Contacted',
    assignedSalesperson: 'Mike Wilson',
    lastContacted: new Date('2024-01-14'),
    createdAt: new Date('2024-01-10'),
    budget: 45000,
    preferredModel: 'Toyota Camry',
    timeline: 'Within 1 month',
    financingNeeded: false,
    notes: ['Initial call completed', 'Interested in test drive'],
    interactions: [
      {
        id: '1',
        type: 'call',
        content: 'Initial contact call - very interested in Toyota Camry',
        timestamp: new Date('2024-01-14'),
        salesperson: 'Mike Wilson'
      }
    ]
  },
  {
    id: '3',
    name: 'Robert Brown',
    phone: '+1 (555) 345-6789',
    email: 'robert.brown@email.com',
    source: 'Website',
    status: 'Qualified',
    assignedSalesperson: 'Sarah Johnson',
    lastContacted: new Date('2024-01-13'),
    createdAt: new Date('2024-01-08'),
    budget: 55000,
    preferredModel: 'BMW 3 Series',
    timeline: 'Within 3 weeks',
    financingNeeded: true,
    notes: ['Pre-approved for financing', 'Ready to purchase'],
    interactions: [
      {
        id: '2',
        type: 'email',
        content: 'Sent financing options and BMW brochures',
        timestamp: new Date('2024-01-13'),
        salesperson: 'Sarah Johnson'
      }
    ]
  },
  {
    id: '4',
    name: 'Lisa Wilson',
    phone: '+1 (555) 456-7890',
    email: 'lisa.wilson@email.com',
    source: 'Offline',
    status: 'Not Interested',
    assignedSalesperson: 'Tom Rodriguez',
    lastContacted: new Date('2024-01-12'),
    createdAt: new Date('2024-01-05'),
    notes: ['Not ready to purchase at this time'],
    interactions: []
  },
  {
    id: '5',
    name: 'David Martinez',
    phone: '+1 (555) 567-8901',
    email: 'david.martinez@email.com',
    source: 'Twitter',
    status: 'New',
    assignedSalesperson: 'Mike Wilson',
    lastContacted: null,
    createdAt: new Date('2024-01-16'),
    budget: 25000,
    preferredModel: 'Nissan Sentra',
    timeline: 'Within 6 months',
    financingNeeded: true,
    notes: ['Inquiry from Twitter campaign'],
    interactions: []
  }
];

export const mockSalespeople: Salesperson[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    leadsAssigned: 15,
    leadsQualified: 8,
    conversionRate: 53.3
  },
  {
    id: '2',
    name: 'Mike Wilson',
    leadsAssigned: 12,
    leadsQualified: 5,
    conversionRate: 41.7
  },
  {
    id: '3',
    name: 'Tom Rodriguez',
    leadsAssigned: 10,
    leadsQualified: 4,
    conversionRate: 40.0
  }
];

export const mockDashboardStats: DashboardStats = {
  totalLeads: 37,
  leadsContacted: 22,
  leadsQualified: 17,
  conversionRate: 45.9,
  leadsBySource: {
    Facebook: 12,
    Google: 10,
    Website: 8,
    Twitter: 4,
    Offline: 3
  },
  leadsByStatus: {
    New: 8,
    Contacted: 12,
    Qualified: 17,
    'Not Interested': 0
  },
  monthlyTrends: [
    { month: 'Oct', leads: 28 },
    { month: 'Nov', leads: 32 },
    { month: 'Dec', leads: 35 },
    { month: 'Jan', leads: 37 }
  ]
};