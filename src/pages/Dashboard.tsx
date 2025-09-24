import { Layout } from '@/components/shared/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, Phone, TrendingUp, Target, Award, Calendar, DollarSign } from 'lucide-react';
import { mockDashboardStats, mockSalespeople } from '@/data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function Dashboard() {
  const { 
    totalLeads, 
    leadsContacted, 
    leadsQualified, 
    conversionRate, 
    leadsBySource, 
    leadsByStatus, 
    monthlyTrends 
  } = mockDashboardStats;

  // Transform data for charts
  const sourceData = Object.entries(leadsBySource).map(([source, count]) => ({
    source,
    count
  }));

  const statusData = Object.entries(leadsByStatus).map(([status, count]) => ({
    status,
    count
  }));

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground">Monitor your lead performance and team metrics</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalLeads}</div>
              <p className="text-xs text-muted-foreground">
                +5 from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Leads Contacted</CardTitle>
              <Phone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{leadsContacted}</div>
              <p className="text-xs text-muted-foreground">
                {((leadsContacted / totalLeads) * 100).toFixed(1)}% of total leads
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Leads Qualified</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{leadsQualified}</div>
              <p className="text-xs text-muted-foreground">
                +3 from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{conversionRate}%</div>
              <p className="text-xs text-success">
                +2.1% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Leads by Source */}
          <Card>
            <CardHeader>
              <CardTitle>Leads by Source</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sourceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="source" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Lead Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ status, count }) => `${status}: ${count}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Lead Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="leads" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Team Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="table-professional">
                <thead>
                  <tr>
                    <th>Salesperson</th>
                    <th>Leads Assigned</th>
                    <th>Leads Qualified</th>
                    <th>Conversion Rate</th>
                    <th>Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {mockSalespeople.map((person, index) => (
                    <tr key={person.id}>
                      <td>
                        <div className="flex items-center space-x-2">
                          <div className="bg-gradient-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">
                            {person.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="font-medium">{person.name}</span>
                        </div>
                      </td>
                      <td>{person.leadsAssigned}</td>
                      <td>
                        <div className="flex items-center space-x-2">
                          <span>{person.leadsQualified}</span>
                          <UserCheck className="h-4 w-4 text-success" />
                        </div>
                      </td>
                      <td>
                        <span className={`font-medium ${person.conversionRate >= 50 ? 'text-success' : person.conversionRate >= 40 ? 'text-warning' : 'text-danger'}`}>
                          {person.conversionRate}%
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center space-x-1">
                          {index === 0 && (
                            <div className="flex items-center space-x-1 text-success">
                              <Award className="h-4 w-4" />
                              <span className="text-xs">Top Performer</span>
                            </div>
                          )}
                          {index !== 0 && (
                            <div className="w-full bg-secondary rounded-full h-2">
                              <div 
                                className="bg-gradient-primary h-2 rounded-full"
                                style={{ width: `${person.conversionRate}%` }}
                              />
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}