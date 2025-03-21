
import { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Leaf, Sprout, Wind, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const counterRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    let start = 0;
    const end = 2481;
    const duration = 2500;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    const easeOutQuad = (t: number) => t * (2 - t);
    
    let frame = 0;
    const counter = counterRef.current;
    
    const animate = () => {
      frame++;
      const progress = easeOutQuad(frame / totalFrames);
      const currentCount = Math.round(end * progress);
      
      if (counter) {
        counter.textContent = currentCount.toLocaleString();
      }
      
      if (frame < totalFrames) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, []);

  return (
    <div className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden">
      {/* Background gradient and effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-eco-light/30 to-background"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(143,188,143,0.2)_0%,rgba(0,0,0,0)_50%)]"></div>
      
      {/* Floating elements */}
      <div className="absolute hidden md:block opacity-30 top-1/4 left-1/5 animate-pulse-gentle">
        <Leaf className="h-12 w-12 text-eco-medium" />
      </div>
      <div className="absolute hidden md:block opacity-30 bottom-1/3 right-1/4 animate-pulse-gentle animate-delay-300">
        <Sprout className="h-10 w-10 text-eco-dark" />
      </div>
      <div className="absolute hidden md:block opacity-30 top-1/3 right-1/5 animate-pulse-gentle animate-delay-500">
        <Wind className="h-8 w-8 text-eco-medium" />
      </div>
      
      {/* Content */}
      <div className="container relative z-10 px-4 lg:px-8 mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-4 inline-block animate-fade-in">
            <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-eco/20 text-eco-dark">
              <Zap className="mr-1 h-3.5 w-3.5" />
              Powered by AI & Blockchain
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6 animate-slide-up">
            Track, Reduce, <span className="text-eco-dark">Earn</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up animate-delay-100">
            Join the community of <span ref={counterRef}>0</span>+ eco-conscious individuals tracking their carbon footprint, earning rewards, and making a difference.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animate-delay-200">
            <Button
              size="lg"
              className="bg-eco-dark hover:bg-eco-dark/90 text-white rounded-full"
              onClick={() => navigate('/dashboard')}
            >
              Start Tracking
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-eco-dark text-eco-dark hover:bg-eco-dark/10 rounded-full"
              onClick={() => navigate('/rewards')}
            >
              View Rewards
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 animate-fade-in animate-delay-300">
            <div className="glassmorphism rounded-lg p-6 card-hover">
              <h3 className="text-3xl font-bold mb-2">42%</h3>
              <p className="text-muted-foreground">Average carbon reduction by our active users</p>
            </div>
            <div className="glassmorphism rounded-lg p-6 card-hover">
              <h3 className="text-3xl font-bold mb-2">12k+</h3>
              <p className="text-muted-foreground">Green credits redeemed for sustainable products</p>
            </div>
            <div className="glassmorphism rounded-lg p-6 card-hover">
              <h3 className="text-3xl font-bold mb-2">350+</h3>
              <p className="text-muted-foreground">Partner organizations offering eco-rewards</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
