import { Button } from '../ui/button';
import { useAuth } from '@/hooks/useAuth';
import { LogOut } from 'lucide-react';

export const Header = () => {
  const { user, logout, isLogoutLoading } = useAuth();
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold">SinglePage</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Button
              variant="ghost"
              onClick={() => scrollToSection('hero')}
              className="text-sm font-medium"
            >
              Home
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection('about')}
              className="text-sm font-medium"
            >
              About
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection('features')}
              className="text-sm font-medium"
            >
              Features
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection('contact')}
              className="text-sm font-medium"
            >
              Contact
            </Button>
            <div className="flex items-center space-x-4 ml-4 pl-4 border-l">
              <span className="text-sm text-muted-foreground">
                {user?.name || user?.email}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => logout()}
                disabled={isLogoutLoading}
              >
                {isLogoutLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                ) : (
                  <LogOut className="h-4 w-4 mr-2" />
                )}
                Sign out
              </Button>
            </div>
          </div>
          
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              Menu
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};