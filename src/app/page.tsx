import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { defaultBusinessConfig } from '@/config/business';

export default function Home() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: defaultBusinessConfig.name,
            url: 'https://suaempresa.com.br',
            telephone: defaultBusinessConfig.phone,
            address: {
              '@type': 'PostalAddress',
              streetAddress: defaultBusinessConfig.address,
              addressLocality: 'São Paulo',
              addressRegion: 'SP',
              addressCountry: 'BR',
            },
          }),
        }}
      />
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Pricing />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
