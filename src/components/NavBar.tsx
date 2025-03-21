
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Leaf, User, Award, BarChart2, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Home', icon: <Leaf className="h-4 w-4 mr-1" /> },
    { path: '/dashboard', label: 'Dashboard', icon: <BarChart2 className="h-4 w-4 mr-1" /> },
    { path: '/rewards', label: 'Rewards', icon: <Award className="h-4 w-4 mr-1" /> },
    { path: '/profile', label: 'Profile', icon: <User className="h-4 w-4 mr-1" /> },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled ? "bg-background/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Leaf className="h-6 w-6 text-eco-dark" />
          <span className="font-medium text-lg">EcoTrack</span>
        </Link>

        {isMobile ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            {isMenuOpen && (
              <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg shadow-lg animate-slide-down">
                <nav className="flex flex-col p-4 space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={cn(
                        "flex items-center px-4 py-3 rounded-md transition-colors",
                        location.pathname === link.path
                          ? "bg-primary/10 text-primary font-medium"
                          : "hover:bg-secondary"
                      )}
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </Link>
                  ))}
                </nav>
              </div>
            )}
          </>
        ) : (
          <nav className="flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "flex items-center px-4 py-2 rounded-md text-sm transition-colors",
                  location.pathname === link.path
                    ? "bg-primary/10 text-primary font-medium"
                    : "hover:text-primary hover:bg-secondary/50"
                )}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default NavBar;
