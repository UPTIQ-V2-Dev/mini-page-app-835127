import { MainLayout } from './components/layout/MainLayout';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { FeaturesSection } from './components/sections/FeaturesSection';
import { ContactSection } from './components/sections/ContactSection';

export const App = () => {
    return (
        <MainLayout>
            <HeroSection />
            <AboutSection />
            <FeaturesSection />
            <ContactSection />
        </MainLayout>
    );
};
