import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

export const FeaturesSection = () => {
  const features = [
    {
      title: 'Responsive Design',
      description: 'Fully responsive layout that works perfectly on desktop, tablet, and mobile devices.',
      tags: ['Mobile-First', 'Tailwind CSS']
    },
    {
      title: 'Modern Stack',
      description: 'Built with React 19, TypeScript, and Vite for the best developer experience.',
      tags: ['React 19', 'TypeScript', 'Vite']
    },
    {
      title: 'Component Library',
      description: 'Utilizes shadcn/ui components for consistent and accessible user interface.',
      tags: ['shadcn/ui', 'Accessibility']
    },
    {
      title: 'Smooth Navigation',
      description: 'Smooth scrolling navigation between sections with fixed header.',
      tags: ['UX', 'Navigation']
    },
    {
      title: 'Form Validation',
      description: 'Built-in form validation with proper error handling and user feedback.',
      tags: ['Validation', 'UX']
    },
    {
      title: 'Performance Optimized',
      description: 'Optimized for performance with lazy loading and efficient rendering.',
      tags: ['Performance', 'Optimization']
    }
  ];

  return (
    <section id="features" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the powerful features that make this single page application stand out
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-muted-foreground mb-4 flex-1">
                  {feature.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {feature.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};