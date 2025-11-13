import { Card, CardContent } from '../ui/card';

export const AboutSection = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Our App</h2>
            <p className="text-lg text-muted-foreground">
              Discover what makes our single page application special
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Modern Technology</h3>
                <p className="text-muted-foreground">
                  Built with the latest React 19, TypeScript, and modern web technologies 
                  for optimal performance and developer experience.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Beautiful Design</h3>
                <p className="text-muted-foreground">
                  Crafted with shadcn/ui components and Tailwind CSS for a clean, 
                  modern, and accessible user interface.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center">
            <p className="text-lg leading-relaxed text-muted-foreground max-w-3xl mx-auto">
              This single page application demonstrates best practices in modern web development, 
              including responsive design, smooth scrolling navigation, form validation, 
              and clean component architecture. It's designed to be both beautiful and functional, 
              providing an excellent user experience across all devices.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};