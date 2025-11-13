import { Button } from '../ui/button';

export const Header = () => {
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