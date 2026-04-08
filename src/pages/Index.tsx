import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { FeaturedCoursesSection } from '@/components/home/FeaturedCoursesSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { StoreSection } from '@/components/home/StoreSection';
import { CTASection } from '@/components/home/CTASection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <CategoriesSection />
      <FeaturedCoursesSection />
      <ServicesSection />
      <StoreSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
