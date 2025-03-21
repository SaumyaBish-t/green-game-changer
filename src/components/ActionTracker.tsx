
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Check, Bike, Train, Apple, Utensils, Lightbulb, Recycle } from 'lucide-react';
import ActionModal from './ActionModal';

// Mock data for recent actions
const recentActions = [
  { id: 1, title: 'Biked to work', category: 'Transport', impact: 3.2, credits: 12, icon: <Bike className="h-5 w-5" />, date: 'Today' },
  { id: 2, title: 'Vegetarian meal', category: 'Food', impact: 1.8, credits: 6, icon: <Apple className="h-5 w-5" />, date: 'Today' },
  { id: 3, title: 'Public transport', category: 'Transport', impact: 2.5, credits: 8, icon: <Train className="h-5 w-5" />, date: 'Yesterday' },
  { id: 4, title: 'Local produce', category: 'Food', impact: 1.2, credits: 4, icon: <Utensils className="h-5 w-5" />, date: '2 days ago' },
  { id: 5, title: 'LED bulbs', category: 'Home', impact: 0.8, credits: 3, icon: <Lightbulb className="h-5 w-5" />, date: '3 days ago' },
  { id: 6, title: 'Recycling', category: 'Home', impact: 1.5, credits: 5, icon: <Recycle className="h-5 w-5" />, date: '4 days ago' },
];

// Mock data for suggested actions
const suggestedActions = [
  { id: 101, title: 'Carpool to work', category: 'Transport', impact: 2.8, credits: 10, icon: <Bike className="h-5 w-5" /> },
  { id: 102, title: 'Shop with reusable bags', category: 'Shopping', impact: 0.5, credits: 2, icon: <Recycle className="h-5 w-5" /> },
  { id: 103, title: 'Reduce shower time', category: 'Home', impact: 1.0, credits: 4, icon: <Lightbulb className="h-5 w-5" /> },
  { id: 104, title: 'Eat a plant-based meal', category: 'Food', impact: 2.0, credits: 7, icon: <Apple className="h-5 w-5" /> },
];

const ActionTracker = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const completeAction = (action: any) => {
    toast({
      title: "Action completed!",
      description: `You've earned ${action.credits} green credits for "${action.title}"`,
      duration: 3000,
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 pt-20 pb-16 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Action Tracker</h1>
          <p className="text-muted-foreground">Record your eco-friendly actions</p>
        </div>
        <Button 
          className="mt-4 md:mt-0 bg-eco-dark hover:bg-eco-dark/90 text-white"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> Log New Action
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Recent activities */}
        <div className="md:col-span-2">
          <Tabs defaultValue="recent" className="w-full">
            <TabsList className="glassmorphism mb-6 w-full justify-start">
              <TabsTrigger value="recent" className="data-[state=active]:bg-eco-dark data-[state=active]:text-white">
                Recent Activities
              </TabsTrigger>
              <TabsTrigger value="suggested" className="data-[state=active]:bg-eco-dark data-[state=active]:text-white">
                Suggested Actions
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="recent" className="mt-0 space-y-4">
              <Card className="glassmorphism border-0">
                <CardHeader>
                  <CardTitle>Recent Eco-Actions</CardTitle>
                  <CardDescription>Your environmental impact activities</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[500px] pr-4">
                    <div className="px-6 pb-6 space-y-4">
                      {recentActions.map((action) => (
                        <div 
                          key={action.id}
                          className="p-4 rounded-lg border border-border flex items-center justify-between card-hover"
                        >
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-eco-light flex items-center justify-center text-eco-dark mr-4">
                              {action.icon}
                            </div>
                            <div>
                              <h3 className="font-medium">{action.title}</h3>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <span className="mr-3">{action.category}</span>
                                <span>{action.date}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-eco-dark">-{action.impact} kg CO₂</div>
                            <div className="text-sm text-muted-foreground">+{action.credits} credits</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="suggested" className="mt-0">
              <Card className="glassmorphism border-0">
                <CardHeader>
                  <CardTitle>Suggested Actions</CardTitle>
                  <CardDescription>Try these activities to reduce your carbon footprint</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {suggestedActions.map((action) => (
                    <div 
                      key={action.id}
                      className="p-4 rounded-lg border border-border flex items-center justify-between card-hover bg-background/50"
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-eco-light flex items-center justify-center text-eco-dark mr-4">
                          {action.icon}
                        </div>
                        <div>
                          <h3 className="font-medium">{action.title}</h3>
                          <div className="text-sm text-muted-foreground">{action.category}</div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="text-sm mb-2">
                          <span className="font-medium text-eco-dark">-{action.impact} kg CO₂</span>
                          <span className="mx-1">•</span>
                          <span>+{action.credits} credits</span>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-eco-dark text-eco-dark hover:bg-eco-dark hover:text-white"
                          onClick={() => completeAction(action)}
                        >
                          <Check className="mr-1 h-3 w-3" /> Complete
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Activity stats */}
        <div className="space-y-6">
          <Card className="glassmorphism card-hover">
            <CardHeader>
              <CardTitle>Activity Stats</CardTitle>
              <CardDescription>Your eco-action performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-border">
                <span className="text-sm">Actions this week</span>
                <span className="font-medium">8</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-border">
                <span className="text-sm">Weekly streak</span>
                <span className="font-medium">12 weeks</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-border">
                <span className="text-sm">Favorite category</span>
                <span className="font-medium">Transport</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">CO₂ saved this month</span>
                <span className="font-medium">38.5 kg</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glassmorphism card-hover">
            <CardHeader>
              <CardTitle>Community Comparison</CardTitle>
              <CardDescription>How you compare to others</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Actions per week</span>
                    <span className="text-sm font-medium">+42%</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-eco-dark rounded-full" style={{ width: '72%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Carbon reduction</span>
                    <span className="text-sm font-medium">+28%</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-eco-dark rounded-full" style={{ width: '64%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Credits earned</span>
                    <span className="text-sm font-medium">+15%</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-eco-dark rounded-full" style={{ width: '57%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <ActionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default ActionTracker;
