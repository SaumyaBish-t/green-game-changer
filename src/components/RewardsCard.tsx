
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Coins, Gift, Award, ShoppingBag, Coffee, Bike, Tree, Leaf } from 'lucide-react';

// Mock rewards data
const availableRewards = [
  { 
    id: 1, 
    title: '15% Off at EcoStore', 
    description: 'Get 15% off your next purchase of sustainable products',
    category: 'Shopping',
    cost: 75,
    partner: 'EcoStore',
    icon: <ShoppingBag className="h-5 w-5" />,
    expiry: '30 days',
    popular: true
  },
  { 
    id: 2, 
    title: 'Free Plant-Based Coffee', 
    description: 'One free coffee at GreenBean Café',
    category: 'Food & Drink',
    cost: 35,
    partner: 'GreenBean Café',
    icon: <Coffee className="h-5 w-5" />,
    expiry: '60 days'
  },
  { 
    id: 3, 
    title: 'Bike Tune-Up', 
    description: 'Free bike maintenance check at CyclePaths',
    category: 'Transport',
    cost: 100,
    partner: 'CyclePaths',
    icon: <Bike className="h-5 w-5" />,
    expiry: '90 days',
    popular: true
  },
  { 
    id: 4, 
    title: 'Tree Planting', 
    description: 'We\'ll plant a tree in your name',
    category: 'Conservation',
    cost: 50,
    partner: 'TreeFuture',
    icon: <Tree className="h-5 w-5" />,
    expiry: 'Never'
  },
  { 
    id: 5, 
    title: 'Renewable Energy Credit', 
    description: '$10 credit towards your renewable energy bill',
    category: 'Energy',
    cost: 120,
    partner: 'GreenPower Co.',
    icon: <Leaf className="h-5 w-5" />,
    expiry: '60 days'
  },
];

const redeemedRewards = [
  { 
    id: 101, 
    title: '10% Off Eco Products', 
    description: 'Discount on sustainable home goods',
    category: 'Shopping',
    partner: 'EarthGoods',
    redeemed: '2 days ago',
    expires: 'in 28 days',
    icon: <ShoppingBag className="h-5 w-5" />,
    code: 'ECO-10-XYZ123'
  },
  { 
    id: 102, 
    title: 'Tree Planted', 
    description: 'A tree has been planted in your name',
    category: 'Conservation',
    partner: 'TreeFuture',
    redeemed: '1 week ago',
    expires: 'Never',
    icon: <Tree className="h-5 w-5" />,
    code: 'Certificate #TF-29853'
  },
];

const RewardsCard = () => {
  const [credits, setCredits] = useState(187);
  const { toast } = useToast();

  const handleRedeem = (reward: any) => {
    if (credits >= reward.cost) {
      setCredits(prev => prev - reward.cost);
      toast({
        title: "Reward Redeemed!",
        description: `You've successfully redeemed "${reward.title}"`,
        duration: 3000,
      });
    } else {
      toast({
        title: "Not enough credits",
        description: `You need ${reward.cost - credits} more credits to redeem this reward`,
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 pt-20 pb-16 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Green Rewards</h1>
          <p className="text-muted-foreground">Redeem your eco-credits for sustainable rewards</p>
        </div>
        
        <Card className="mt-4 md:mt-0 glassmorphism card-hover border-0 bg-eco-dark/10">
          <CardContent className="p-4 flex items-center">
            <Coins className="h-6 w-6 mr-3 text-eco-dark" />
            <div>
              <p className="text-sm text-muted-foreground">Available Credits</p>
              <p className="text-2xl font-bold">{credits}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="available" className="w-full">
        <TabsList className="glassmorphism mb-6">
          <TabsTrigger value="available" className="data-[state=active]:bg-eco-dark data-[state=active]:text-white">
            <Gift className="mr-2 h-4 w-4" />
            Available Rewards
          </TabsTrigger>
          <TabsTrigger value="redeemed" className="data-[state=active]:bg-eco-dark data-[state=active]:text-white">
            <Award className="mr-2 h-4 w-4" />
            Redeemed Rewards
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="available" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableRewards.map((reward) => (
              <Card key={reward.id} className="glassmorphism border-0 card-hover h-full flex flex-col">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded-full bg-eco-light flex items-center justify-center text-eco-dark">
                      {reward.icon}
                    </div>
                    {reward.popular && (
                      <Badge className="bg-eco-dark hover:bg-eco-dark/90">Popular</Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl mt-2">{reward.title}</CardTitle>
                  <CardDescription>{reward.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="outline" className="bg-secondary/50">
                      {reward.category}
                    </Badge>
                    <Badge variant="outline" className="bg-secondary/50">
                      {reward.partner}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Expires: {reward.expiry}
                  </p>
                </CardContent>
                <CardFooter className="pt-0 flex justify-between items-center">
                  <div className="flex items-center">
                    <Coins className="h-4 w-4 mr-1 text-eco-dark" />
                    <span className="font-medium">{reward.cost}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    className={`border-eco-dark text-eco-dark hover:bg-eco-dark hover:text-white
                      ${credits < reward.cost ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => handleRedeem(reward)}
                    disabled={credits < reward.cost}
                  >
                    Redeem
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="redeemed" className="mt-0">
          {redeemedRewards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {redeemedRewards.map((reward) => (
                <Card key={reward.id} className="glassmorphism border-0 card-hover">
                  <CardHeader className="pb-2">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-eco-light flex items-center justify-center text-eco-dark">
                        {reward.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{reward.title}</CardTitle>
                        <CardDescription>{reward.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="bg-secondary/50">
                          {reward.category}
                        </Badge>
                        <Badge variant="outline" className="bg-secondary/50">
                          {reward.partner}
                        </Badge>
                      </div>
                      <div className="text-sm">
                        <p>Redeemed: {reward.redeemed}</p>
                        <p>Expires: {reward.expires}</p>
                      </div>
                      <div className="mt-3 p-2 bg-muted rounded-md font-mono text-sm overflow-x-auto">
                        {reward.code}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="glassmorphism border-0">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Award className="h-16 w-16 text-muted mb-4" />
                <h3 className="text-xl font-medium mb-2">No Redeemed Rewards Yet</h3>
                <p className="text-muted-foreground text-center max-w-md">
                  You haven't redeemed any rewards yet. Start earning credits and redeem
                  them for exciting sustainable rewards!
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RewardsCard;
