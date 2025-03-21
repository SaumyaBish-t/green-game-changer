
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, Award, Target, Trophy, Leaf, Calendar, Settings, Share2 } from 'lucide-react';

// Mock user achievements
const achievements = [
  { id: 1, title: 'Early Adopter', description: 'Joined during the first month', icon: <Trophy className="h-5 w-5" />, date: 'Apr 2023', completed: true },
  { id: 2, title: 'Carbon Cutter', description: 'Reduced carbon footprint by 25%', icon: <Leaf className="h-5 w-5" />, date: 'Jun 2023', completed: true },
  { id: 3, title: 'Eco Warrior', description: 'Completed 50 eco-friendly actions', icon: <Award className="h-5 w-5" />, date: 'Sep 2023', completed: true },
  { id: 4, title: 'Community Leader', description: 'In the top 10% of all users', icon: <User className="h-5 w-5" />, date: 'Dec 2023', completed: true },
  { id: 5, title: 'Sustainability Expert', description: 'Reduced carbon footprint by 50%', icon: <Target className="h-5 w-5" />, progress: 78, target: 100 },
  { id: 6, title: 'Green Influencer', description: 'Referred 5 friends to the platform', icon: <Share2 className="h-5 w-5" />, progress: 3, target: 5 },
];

// Mock activity history
const activityHistory = [
  { id: 1, action: 'Completed eco-action: Biked to work', date: 'Today, 10:23 AM' },
  { id: 2, action: 'Earned achievement: Community Leader', date: 'Yesterday, 5:45 PM' },
  { id: 3, action: 'Redeemed reward: 15% Off at EcoStore', date: '3 days ago' },
  { id: 4, action: 'Completed eco-action: Used reusable grocery bags', date: '5 days ago' },
  { id: 5, action: 'Completed eco-action: Vegetarian meal', date: '1 week ago' },
  { id: 6, action: 'Earned achievement: Carbon Cutter', date: '2 weeks ago' },
  { id: 7, action: 'Completed eco-action: Energy-efficient lighting', date: '2 weeks ago' },
  { id: 8, action: 'Redeemed reward: Tree Planting', date: '3 weeks ago' },
];

const UserProfile = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 pt-20 pb-16 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
          <p className="text-muted-foreground">Manage your account and track your progress</p>
        </div>
        <Button 
          variant="outline" 
          className="mt-4 md:mt-0 border-eco-dark text-eco-dark hover:bg-eco-dark hover:text-white"
        >
          <Settings className="mr-2 h-4 w-4" /> Account Settings
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Profile sidebar */}
        <div className="md:col-span-1 space-y-6">
          <Card className="glassmorphism border-0 card-hover">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-eco-dark text-white text-xl">JD</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold mb-1">Jane Doe</h2>
                <p className="text-muted-foreground text-sm mb-3">Eco Enthusiast</p>
                <Badge className="mb-4 bg-eco-dark hover:bg-eco-dark/90">Level 4</Badge>
                
                <div className="w-full space-y-4 mt-2">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Carbon reduction</span>
                      <span className="text-sm font-medium">372 kg</span>
                    </div>
                    <Progress value={75} className="h-2 bg-secondary" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Green credits</span>
                      <span className="text-sm font-medium">187 / 500</span>
                    </div>
                    <Progress value={37} className="h-2 bg-secondary" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Next level</span>
                      <span className="text-sm font-medium">78%</span>
                    </div>
                    <Progress value={78} className="h-2 bg-secondary" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glassmorphism border-0 card-hover">
            <CardHeader>
              <CardTitle className="text-lg">Account Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-border">
                <span className="text-sm flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" /> Member since
                </span>
                <span className="font-medium">Apr 2023</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-border">
                <span className="text-sm flex items-center">
                  <Leaf className="mr-2 h-4 w-4 text-muted-foreground" /> Actions completed
                </span>
                <span className="font-medium">78</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-border">
                <span className="text-sm flex items-center">
                  <Trophy className="mr-2 h-4 w-4 text-muted-foreground" /> Achievements
                </span>
                <span className="font-medium">4 / 6</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm flex items-center">
                  <Award className="mr-2 h-4 w-4 text-muted-foreground" /> Rewards redeemed
                </span>
                <span className="font-medium">5</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main content */}
        <div className="md:col-span-3">
          <Tabs defaultValue="achievements" className="w-full">
            <TabsList className="glassmorphism mb-6">
              <TabsTrigger value="achievements" className="data-[state=active]:bg-eco-dark data-[state=active]:text-white">
                <Trophy className="mr-2 h-4 w-4" />
                Achievements
              </TabsTrigger>
              <TabsTrigger value="activity" className="data-[state=active]:bg-eco-dark data-[state=active]:text-white">
                <Calendar className="mr-2 h-4 w-4" />
                Activity History
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="achievements" className="mt-0">
              <Card className="glassmorphism border-0">
                <CardHeader>
                  <CardTitle>Your Achievements</CardTitle>
                  <CardDescription>Track your progress and unlock new achievements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((achievement) => (
                      <div 
                        key={achievement.id}
                        className={`p-4 rounded-lg border flex items-start card-hover
                          ${achievement.completed 
                            ? 'border-eco-dark bg-eco-light/30' 
                            : 'border-border'
                          }`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4
                          ${achievement.completed 
                            ? 'bg-eco-dark text-white' 
                            : 'bg-secondary text-muted-foreground'
                          }`}
                        >
                          {achievement.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{achievement.title}</h3>
                            {achievement.completed && (
                              <Badge variant="outline" className="bg-eco-dark/10 text-eco-dark border-eco-dark">
                                Completed
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                          
                          {achievement.completed ? (
                            <p className="text-xs text-muted-foreground">Achieved on {achievement.date}</p>
                          ) : (
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-xs text-muted-foreground">Progress</span>
                                <span className="text-xs font-medium">{achievement.progress} / {achievement.target}</span>
                              </div>
                              <Progress value={(achievement.progress / achievement.target) * 100} className="h-1.5 bg-secondary" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="activity" className="mt-0">
              <Card className="glassmorphism border-0">
                <CardHeader>
                  <CardTitle>Activity History</CardTitle>
                  <CardDescription>Recent actions and events on your account</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[500px] pr-4">
                    <div className="relative pl-6 ml-2 pb-2">
                      <div className="absolute left-0 top-2 bottom-0 w-0.5 bg-border"></div>
                      
                      {activityHistory.map((item, index) => (
                        <div key={item.id} className="mb-6 relative">
                          <div className="absolute -left-2.5 mt-1.5 w-4 h-4 rounded-full border-4 border-background bg-eco-dark"></div>
                          <div className="pl-4">
                            <p className="font-medium">{item.action}</p>
                            <p className="text-sm text-muted-foreground">{item.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
