import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, MessageSquare, CheckCircle, XCircle, Clock, User, DollarSign, Car } from 'lucide-react';
import { Layout } from '@/components/shared/Layout';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { mockLeads } from '@/data/mockData';
import { Lead } from '@/types';
import { useToast } from '@/hooks/use-toast';

export default function LeadManagement() {
  const [searchParams] = useSearchParams();
  const leadId = searchParams.get('id');
  const lead = mockLeads.find(l => l.id === leadId);
  const [currentStatus, setCurrentStatus] = useState(lead?.status || 'New');
  const [qualificationData, setQualificationData] = useState({
    budgetConfirmed: lead?.budget ? true : false,
    modelSelected: lead?.preferredModel ? true : false,
    timelineDiscussed: lead?.timeline ? true : false,
    financingDiscussed: lead?.financingNeeded !== undefined
  });
  const [followUpNote, setFollowUpNote] = useState('');
  const { toast } = useToast();

  if (!lead) {
    return (
      <Layout>
        <div className="text-center py-12">
          <div className="text-muted-foreground">Lead not found.</div>
          <Link to="/">
            <Button className="mt-4">Back to Leads</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const handleStatusUpdate = (newStatus: Lead['status']) => {
    setCurrentStatus(newStatus);
    toast({
      title: "Status Updated",
      description: `Lead status changed to ${newStatus}`,
    });
  };

  const handleQualificationUpdate = (field: keyof typeof qualificationData, value: boolean) => {
    setQualificationData(prev => ({ ...prev, [field]: value }));
  };

  const qualificationProgress = Object.values(qualificationData).filter(Boolean).length;
  const totalCriteria = Object.keys(qualificationData).length;
  const progressPercentage = (qualificationProgress / totalCriteria) * 100;

  const getStatusColor = (status: Lead['status']) => {
    switch (status) {
      case 'New': return 'info';
      case 'Contacted': return 'warning';
      case 'Qualified': return 'success';
      case 'Not Interested': return 'danger';
      default: return 'info';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Leads
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{lead.name}</h1>
              <div className="flex items-center space-x-2 mt-1">
                <StatusBadge status={currentStatus} />
                <span className="text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">
                  Qualification: {progressPercentage.toFixed(0)}% Complete
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Link to={`/lead-details?id=${leadId}`}>
              <Button variant="outline">
                View Details
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Contact & Status */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Quick Contact</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Button className="w-full justify-start" variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    {lead.phone}
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Email Lead
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Status Management */}
            <Card>
              <CardHeader>
                <CardTitle>Update Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={currentStatus} onValueChange={handleStatusUpdate}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Contacted">Contacted</SelectItem>
                    <SelectItem value="Qualified">Qualified</SelectItem>
                    <SelectItem value="Not Interested">Not Interested</SelectItem>
                  </SelectContent>
                </Select>

                {/* Quick Action Buttons */}
                <div className="grid grid-cols-1 gap-2">
                  <Button
                    onClick={() => handleStatusUpdate('Contacted')}
                    variant="outline"
                    className="justify-start"
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Mark as Contacted
                  </Button>
                  <Button
                    onClick={() => handleStatusUpdate('Qualified')}
                    variant="outline"
                    className="justify-start text-success"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Convert to Qualified
                  </Button>
                  <Button
                    onClick={() => handleStatusUpdate('Not Interested')}
                    variant="outline"
                    className="justify-start text-danger"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Mark Not Interested
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Lead Info Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Lead Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Source:</span>
                  <span>{lead.source}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Assigned:</span>
                  <span>{lead.assignedSalesperson}</span>
                </div>
                {lead.budget && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Budget:</span>
                    <span>${lead.budget.toLocaleString()}</span>
                  </div>
                )}
                {lead.preferredModel && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Model:</span>
                    <span>{lead.preferredModel}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Qualification & Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Lead Qualification Checklist */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Car className="h-4 w-4" />
                    <span>Lead Qualification Checklist</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {qualificationProgress}/{totalCriteria} Complete
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Progress Bar */}
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>

                {/* Qualification Items */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        checked={qualificationData.budgetConfirmed}
                        onCheckedChange={(checked) => handleQualificationUpdate('budgetConfirmed', checked as boolean)}
                      />
                      <div>
                        <div className="font-medium">Budget Confirmed</div>
                        <div className="text-sm text-muted-foreground">Customer budget range discussed and confirmed</div>
                      </div>
                    </div>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        checked={qualificationData.modelSelected}
                        onCheckedChange={(checked) => handleQualificationUpdate('modelSelected', checked as boolean)}
                      />
                      <div>
                        <div className="font-medium">Preferred Model Identified</div>
                        <div className="text-sm text-muted-foreground">Customer has specific car model preferences</div>
                      </div>
                    </div>
                    <Car className="h-4 w-4 text-muted-foreground" />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        checked={qualificationData.timelineDiscussed}
                        onCheckedChange={(checked) => handleQualificationUpdate('timelineDiscussed', checked as boolean)}
                      />
                      <div>
                        <div className="font-medium">Purchase Timeline Discussed</div>
                        <div className="text-sm text-muted-foreground">When customer plans to make the purchase</div>
                      </div>
                    </div>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        checked={qualificationData.financingDiscussed}
                        onCheckedChange={(checked) => handleQualificationUpdate('financingDiscussed', checked as boolean)}
                      />
                      <div>
                        <div className="font-medium">Financing Requirements Discussed</div>
                        <div className="text-sm text-muted-foreground">Customer financing needs and options explored</div>
                      </div>
                    </div>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Follow-up Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Follow-up Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Next Steps / Notes</label>
                  <Textarea
                    placeholder="Document next steps, customer requests, or important notes..."
                    value={followUpNote}
                    onChange={(e) => setFollowUpNote(e.target.value)}
                    rows={4}
                  />
                </div>
                
                <div className="flex space-x-2">
                  <Button onClick={() => {
                    if (followUpNote.trim()) {
                      toast({
                        title: "Note Added",
                        description: "Follow-up note has been saved to the lead record.",
                      });
                      setFollowUpNote('');
                    }
                  }}>
                    Save Note
                  </Button>
                  <Button variant="outline">
                    Schedule Follow-up
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}