
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Leaf, TrendingDown, Users, Plus, Calendar, Activity } from 'lucide-react';
import { useIsMobile } from "@/hooks/use-mobile";
import ActionModal from './ActionModal';

// Mock data for the dashboard
const carbonData = [
  { name: 'Transport', value: 43, color: '#2E8B57' },
  { name: 'Food', value: 28, color: '#3CB371' },
  { name: 'Home', value: 17, color: '#66CDAA' },
  { name: 'Other', value: 12, color: '#8FBC8F' },
];

const progressData = [
  { name: 'Jan', reduction: 12 },
  { name: 'Feb', reduction: 18 },
  { name: 'Mar', reduction: 22 },
  { name: 'Apr', reduction: 25 },
  { name: 'May', reduction: 32 },
  { name: 'Jun', reduction: 28 },
  { name: 'Jul', reduction: 35 },
];

const Dashboard = () => {
  const isMobile = useIsMobile();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const totalReduction = 372; // in kg of CO2
  const greenCredits = 187;
  const rankPercentile = 82;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 pt-20 pb-10 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Your Impact Dashboard</h1>
          <p className="text-muted-foreground">Track your progress and contributions</p>
        </div>
        <Button 
          className="mt-4 md:mt-0 bg-eco-dark hover:bg-eco-dark/90 text-white"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> Log Action
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="glassmorphism card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-xl">
              <Leaf className="mr-2 h-5 w-5 text-eco-dark" />
              Carbon Reduction
            </CardTitle>
            <CardDescription>Total CO₂ saved</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalReduction} kg</div>
            <p className="text-sm text-muted-foreground mt-2">Equivalent to planting 12 trees</p>
          </CardContent>
        </Card>

        <Card className="glassmorphism card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-xl">
              <TrendingDown className="mr-2 h-5 w-5 text-eco-dark" />
              Green Credits
            </CardTitle>
            <CardDescription>Available to redeem</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{greenCredits}</div>
            <p className="text-sm text-muted-foreground mt-2">Earned from 29 eco-actions</p>
          </CardContent>
        </Card>

        <Card className="glassmorphism card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-xl">
              <Users className="mr-2 h-5 w-5 text-eco-dark" />
              Community Rank
            </CardTitle>
            <CardDescription>Based on your activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">Top {rankPercentile}%</div>
            <p className="text-sm text-muted-foreground mt-2">Better than {rankPercentile}% of users</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="breakdown" className="w-full">
        <TabsList className="glassmorphism mb-6">
          <TabsTrigger value="breakdown" className="data-[state=active]:bg-eco-dark data-[state=active]:text-white">
            <Activity className="mr-2 h-4 w-4" />
            Carbon Breakdown
          </TabsTrigger>
          <TabsTrigger value="progress" className="data-[state=active]:bg-eco-dark data-[state=active]:text-white">
            <Calendar className="mr-2 h-4 w-4" />
            Monthly Progress
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="breakdown" className="mt-0">
          <Card className="glassmorphism border-0">
            <CardHeader>
              <CardTitle>Carbon Footprint Breakdown</CardTitle>
              <CardDescription>Areas contributing to your carbon footprint</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-[300px] flex flex-col md:flex-row items-center justify-center">
                <ResponsiveContainer width={isMobile ? "100%" : "50%"} height={300}>
                  <PieChart>
                    <Pie
                      data={carbonData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      animationBegin={200}
                      animationDuration={1000}
                    >
                      {carbonData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Percentage']}
                      contentStyle={{ 
                        borderRadius: '8px', 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(4px)',
                        border: 'none'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                
                <div className={`flex flex-wrap ${isMobile ? 'mt-4 justify-center' : 'flex-col ml-8'}`}>
                  {carbonData.map((entry, index) => (
                    <div key={index} className={`flex items-center ${isMobile ? 'mx-4 mb-2' : 'mb-3'}`}>
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></div>
                      <span className="text-sm">
                        {entry.name}: {entry.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="progress" className="mt-0">
          <Card className="glassmorphism border-0">
            <CardHeader>
              <CardTitle>Monthly Reduction Progress</CardTitle>
              <CardDescription>Your carbon reduction over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={progressData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.1)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tickFormatter={(value) => `${value}kg`}
                    />
                    <Tooltip
                      formatter={(value) => [`${value} kg CO₂`, 'Reduction']}
                      contentStyle={{ 
                        borderRadius: '8px', 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(4px)',
                        border: 'none'
                      }}
                    />
                    <Bar 
                      dataKey="reduction"
                      radius={[4, 4, 0, 0]}
                      animationBegin={200}
                      animationDuration={1000}
                    >
                      {progressData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="#2E8B57" />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <ActionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Dashboard;
