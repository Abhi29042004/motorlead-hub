import { Search, Plus, Car } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  onSearch?: (query: string) => void;
  showAddLead?: boolean;
  onAddLead?: () => void;
}

export const Header = ({ onSearch, showAddLead = false, onAddLead }: HeaderProps) => {
  const location = useLocation();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
      case '/leads':
        return 'Lead Management';
      case '/dashboard':
        return 'Dashboard';
      case '/lead-details':
        return 'Lead Details';
      case '/lead-management':
        return 'Lead Management';
      default:
        return 'HSR LeadHub';
    }
  };

  return (
    <header className="bg-card border-b border-card-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-gradient-primary p-2 rounded-lg">
                <Car className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">HSR LeadHub</h1>
                <p className="text-xs text-muted-foreground">Motor Sales CRM</p>
              </div>
            </Link>
          </div>

          {/* Page Title - Hidden on mobile */}
          <div className="hidden md:block">
            <h2 className="text-lg font-semibold text-foreground">{getPageTitle()}</h2>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            {onSearch && (
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search leads..."
                  className="pl-9 w-64"
                  onChange={(e) => onSearch(e.target.value)}
                />
              </div>
            )}
            
            {showAddLead && (
              <Button onClick={onAddLead} className="bg-gradient-primary">
                <Plus className="h-4 w-4 mr-2" />
                Add Lead
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};