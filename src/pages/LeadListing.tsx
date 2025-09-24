import { useState, useMemo } from 'react';
import { Phone, Mail, Eye, Edit } from 'lucide-react';
import { Layout } from '@/components/shared/Layout';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { mockLeads } from '@/data/mockData';
import { Lead } from '@/types';
import { Link } from 'react-router-dom';

export default function LeadListing() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);

  const filteredLeads = useMemo(() => {
    return mockLeads.filter(lead => {
      const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           lead.phone.includes(searchQuery) ||
                           lead.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const handleSelectLead = (leadId: string, checked: boolean) => {
    if (checked) {
      setSelectedLeads([...selectedLeads, leadId]);
    } else {
      setSelectedLeads(selectedLeads.filter(id => id !== leadId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedLeads(filteredLeads.map(lead => lead.id));
    } else {
      setSelectedLeads([]);
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'Never';
    return date.toLocaleDateString();
  };

  return (
    <Layout 
      showSearch 
      showAddLead 
      onSearch={setSearchQuery}
      onAddLead={() => console.log('Add new lead')}
    >
      <div className="space-y-6">
        {/* Filters */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Contacted">Contacted</SelectItem>
                <SelectItem value="Qualified">Qualified</SelectItem>
                <SelectItem value="Not Interested">Not Interested</SelectItem>
              </SelectContent>
            </Select>
            
            {selectedLeads.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  {selectedLeads.length} selected
                </span>
                <Button variant="outline" size="sm">
                  Bulk Update Status
                </Button>
              </div>
            )}
          </div>
          
          <div className="text-sm text-muted-foreground">
            Showing {filteredLeads.length} of {mockLeads.length} leads
          </div>
        </div>

        {/* Leads Table */}
        <div className="card-professional overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table-professional">
              <thead>
                <tr>
                  <th className="w-12">
                    <Checkbox
                      checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </th>
                  <th>Lead Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Source</th>
                  <th>Status</th>
                  <th>Assigned To</th>
                  <th>Last Contacted</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr key={lead.id}>
                    <td>
                      <Checkbox
                        checked={selectedLeads.includes(lead.id)}
                        onCheckedChange={(checked) => handleSelectLead(lead.id, checked as boolean)}
                      />
                    </td>
                    <td>
                      <div className="font-medium text-foreground">{lead.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Created {formatDate(lead.createdAt)}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center space-x-2">
                        <span>{lead.phone}</span>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Phone className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center space-x-2">
                        <span className="truncate max-w-32">{lead.email}</span>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Mail className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                    <td>
                      <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs">
                        {lead.source}
                      </span>
                    </td>
                    <td>
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="text-foreground">{lead.assignedSalesperson}</td>
                    <td className="text-muted-foreground">{formatDate(lead.lastContacted)}</td>
                    <td>
                      <div className="flex items-center space-x-1">
                        <Link to={`/lead-details?id=${lead.id}`}>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Eye className="h-3 w-3" />
                          </Button>
                        </Link>
                        <Link to={`/lead-management?id=${lead.id}`}>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredLeads.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground">
              No leads found matching your criteria.
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}