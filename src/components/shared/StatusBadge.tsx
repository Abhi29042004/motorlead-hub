import { cn } from '@/lib/utils';
import { Lead } from '@/types';

interface StatusBadgeProps {
  status: Lead['status'];
  className?: string;
}

const statusConfig = {
  'New': {
    className: 'status-new',
    label: 'New'
  },
  'Contacted': {
    className: 'status-contacted',
    label: 'Contacted'
  },
  'Qualified': {
    className: 'status-qualified',
    label: 'Qualified'
  },
  'Not Interested': {
    className: 'status-not-interested',
    label: 'Not Interested'
  }
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];
  
  return (
    <span 
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
};