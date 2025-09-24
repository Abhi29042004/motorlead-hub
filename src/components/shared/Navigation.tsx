import { LayoutDashboard, Users, UserCheck, BarChart3 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navigationItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard
  },
  {
    name: 'Lead Listing',
    href: '/',
    icon: Users
  },
  {
    name: 'Lead Management',
    href: '/lead-management',
    icon: UserCheck
  }
];

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="bg-card border-b border-card-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          {navigationItems.map((item) => {
            const isActive = item.href === '/' 
              ? location.pathname === '/' || location.pathname === '/leads'
              : location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'flex items-center space-x-2 py-4 px-2 border-b-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};