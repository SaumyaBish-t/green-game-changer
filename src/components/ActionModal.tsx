
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Bike, Car, Train, Apple, Utensils, Lightbulb, Recycle, ShoppingBag } from 'lucide-react';

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Action categories and their respective options
const actionCategories = [
  {
    id: 'transport',
    label: 'Transport',
    icon: <Car className="h-4 w-4" />,
    options: [
      { id: 'bike', label: 'Biked instead of driving', icon: <Bike className="h-4 w-4" />, impact: 3.2, credits: 12 },
      { id: 'public', label: 'Used public transport', icon: <Train className="h-4 w-4" />, impact: 2.5, credits: 8 },
      { id: 'carpool', label: 'Carpooled with others', icon: <Car className="h-4 w-4" />, impact: 1.8, credits: 6 },
      { id: 'walk', label: 'Walked instead of driving', icon: <Bike className="h-4 w-4" />, impact: 3.0, credits: 10 },
    ]
  },
  {
    id: 'food',
    label: 'Food',
    icon: <Apple className="h-4 w-4" />,
    options: [
      { id: 'vegetarian', label: 'Ate a vegetarian meal', icon: <Apple className="h-4 w-4" />, impact: 1.8, credits: 6 },
      { id: 'local', label: 'Purchased local produce', icon: <Utensils className="h-4 w-4" />, impact: 1.2, credits: 4 },
      { id: 'garden', label: 'Grew own vegetables', icon: <Utensils className="h-4 w-4" />, impact: 2.0, credits: 7 },
      { id: 'foodwaste', label: 'Reduced food waste', icon: <Recycle className="h-4 w-4" />, impact: 1.5, credits: 5 },
    ]
  },
  {
    id: 'home',
    label: 'Home',
    icon: <Lightbulb className="h-4 w-4" />,
    options: [
      { id: 'led', label: 'Installed LED bulbs', icon: <Lightbulb className="h-4 w-4" />, impact: 0.8, credits: 3 },
      { id: 'recycle', label: 'Recycled materials', icon: <Recycle className="h-4 w-4" />, impact: 1.5, credits: 5 },
      { id: 'water', label: 'Reduced water usage', icon: <Lightbulb className="h-4 w-4" />, impact: 1.0, credits: 4 },
      { id: 'energy', label: 'Reduced energy consumption', icon: <Lightbulb className="h-4 w-4" />, impact: 2.2, credits: 8 },
    ]
  },
  {
    id: 'shopping',
    label: 'Shopping',
    icon: <ShoppingBag className="h-4 w-4" />,
    options: [
      { id: 'bags', label: 'Used reusable bags', icon: <ShoppingBag className="h-4 w-4" />, impact: 0.5, credits: 2 },
      { id: 'secondhand', label: 'Bought secondhand items', icon: <ShoppingBag className="h-4 w-4" />, impact: 1.8, credits: 6 },
      { id: 'ecoproducts', label: 'Purchased eco-friendly products', icon: <ShoppingBag className="h-4 w-4" />, impact: 1.0, credits: 4 },
      { id: 'plastic', label: 'Declined single-use plastic', icon: <Recycle className="h-4 w-4" />, impact: 0.7, credits: 3 },
    ]
  },
];

const ActionModal = ({ isOpen, onClose }: ActionModalProps) => {
  const [category, setCategory] = useState('');
  const [action, setAction] = useState('');
  const [note, setNote] = useState('');
  const [selectedAction, setSelectedAction] = useState<any>(null);
  const { toast } = useToast();

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setAction('');
    setSelectedAction(null);
  };

  const handleActionChange = (value: string) => {
    setAction(value);
    
    // Find the selected action details
    const categoryObj = actionCategories.find(cat => cat.id === category);
    if (categoryObj) {
      const actionObj = categoryObj.options.find(opt => opt.id === value);
      setSelectedAction(actionObj);
    }
  };

  const handleSubmit = () => {
    if (!category || !action) {
      toast({
        title: "Required fields missing",
        description: "Please select both a category and an action",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    // Here you would normally save the action to your database
    // For now, we'll just show a success message
    toast({
      title: "Action recorded!",
      description: `You've earned ${selectedAction?.credits} green credits for this eco-action`,
      duration: 3000,
    });
    
    // Reset form and close modal
    setCategory('');
    setAction('');
    setNote('');
    setSelectedAction(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] glassmorphism">
        <DialogHeader>
          <DialogTitle>Log Eco-Friendly Action</DialogTitle>
          <DialogDescription>
            Record your sustainable activities to earn green credits.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={handleCategoryChange}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {actionCategories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id} className="flex items-center">
                    <div className="flex items-center">
                      {cat.icon}
                      <span className="ml-2">{cat.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {category && (
            <div className="space-y-2">
              <Label htmlFor="action">Action</Label>
              <Select value={action} onValueChange={handleActionChange}>
                <SelectTrigger id="action">
                  <SelectValue placeholder="Select an action" />
                </SelectTrigger>
                <SelectContent>
                  {actionCategories
                    .find(cat => cat.id === category)?.options
                    .map((option) => (
                      <SelectItem key={option.id} value={option.id} className="flex items-center">
                        <div className="flex items-center">
                          {option.icon}
                          <span className="ml-2">{option.label}</span>
                        </div>
                      </SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </div>
          )}
          
          {selectedAction && (
            <div className="bg-secondary/50 p-3 rounded-md text-sm space-y-1">
              <div className="flex justify-between">
                <span>Carbon impact:</span>
                <span className="font-medium">-{selectedAction.impact} kg CO₂</span>
              </div>
              <div className="flex justify-between">
                <span>Credits earned:</span>
                <span className="font-medium">+{selectedAction.credits} credits</span>
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="note">Additional Notes (Optional)</Label>
            <Textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add any details about your action..."
              className="resize-none"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={handleSubmit}
            className="bg-eco-dark hover:bg-eco-dark/90 text-white"
          >
            Log Action
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ActionModal;
