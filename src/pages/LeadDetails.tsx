import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, MessageCircle, Clock, User, DollarSign, Car, Calendar } from 'lucide-react';
import { Layout } from '@/components/shared/Layout';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { mockLeads } from '@/data/mockData';
import { Interaction } from '@/types';

export default function LeadDetails() {
  const [searchParams] = useSearchParams();
  const leadId = searchParams.get('id');
  const lead = mockLeads.find(l => l.id === leadId);
  const [newNote, setNewNote] = useState('');

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

  const formatDate = (date: Date | null) => {
    if (!date) return 'Never';
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString();
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      // In a real app, this would update the lead
      console.log('Adding note:', newNote);
      setNewNote('');
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
                <StatusBadge status={lead.status} />
                <span className="text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">
                  Created {formatDate(lead.createdAt)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Phone className="h-4 w-4 mr-2" />
              Call
            </Button>
            <Button variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              Email
            </Button>
            <Link to={`/lead-management?id=${leadId}`}>
              <Button className="bg-gradient-primary">
                Manage Lead
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Contact Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                  <div className="flex items-center justify-between">
                    <span>{lead.phone}</span>
                    <Button variant="ghost" size="sm">
                      <Phone className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <div className="flex items-center justify-between">
                    <span className="truncate">{lead.email}</span>
                    <Button variant="ghost" size="sm">
                      <Mail className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Lead Source</label>
                  <div className="mt-1">
                    <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-sm">
                      {lead.source}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Assigned Salesperson</label>
                  <p>{lead.assignedSalesperson}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Last Contacted</label>
                  <p>{formatDate(lead.lastContacted)}</p>
                </div>
              </CardContent>
            </Card>

            {/* Lead Preferences */}
            {(lead.budget || lead.preferredModel || lead.timeline) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Car className="h-4 w-4" />
                    <span>Purchase Preferences</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {lead.budget && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Budget</label>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-4 w-4" />
                        <span>{lead.budget.toLocaleString()}</span>
                      </div>
                    </div>
                  )}
                  {lead.preferredModel && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Preferred Model</label>
                      <p>{lead.preferredModel}</p>
                    </div>
                  )}
                  {lead.timeline && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Timeline</label>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{lead.timeline}</span>
                      </div>
                    </div>
                  )}
                  {lead.financingNeeded !== undefined && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Financing Needed</label>
                      <p>{lead.financingNeeded ? 'Yes' : 'No'}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Panel - Timeline & Notes */}
          <div className="lg:col-span-2 space-y-6">
            {/* Interaction Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Interaction Timeline</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lead.interactions && lead.interactions.length > 0 ? (
                    lead.interactions.map((interaction) => (
                      <div key={interaction.id} className="border-l-2 border-primary pl-4 pb-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="capitalize font-medium">{interaction.type}</div>
                            <span className="text-muted-foreground">by {interaction.salesperson}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {formatDate(interaction.timestamp)}
                          </span>
                        </div>
                        <p className="mt-1 text-muted-foreground">{interaction.content}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground">No interactions recorded yet.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Notes Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>Notes</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Existing Notes */}
                {lead.notes && lead.notes.length > 0 && (
                  <div className="space-y-2">
                    {lead.notes.map((note, index) => (
                      <div key={index} className="p-3 bg-muted rounded-lg">
                        <p>{note}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add New Note */}
                <div className="space-y-3">
                  <Textarea
                    placeholder="Add a note about this lead..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    rows={3}
                  />
                  <Button onClick={handleAddNote} disabled={!newNote.trim()}>
                    Add Note
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
