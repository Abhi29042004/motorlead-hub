import { Header } from './Header';
import { Navigation } from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
  showSearch?: boolean;
  showAddLead?: boolean;
  onSearch?: (query: string) => void;
  onAddLead?: () => void;
}

export const Layout = ({ 
  children, 
  showSearch = false, 
  showAddLead = false, 
  onSearch, 
  onAddLead 
}: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header 
        onSearch={showSearch ? onSearch : undefined}
        showAddLead={showAddLead}
        onAddLead={onAddLead}
      />
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};