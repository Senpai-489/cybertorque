import Navbar from "./components/homepage/Navbar";
import Hero from "./components/homepage/HeroSection";
import Countdown from "./components/homepage/Countdown";
import AboutSection from "./components/homepage/AboutSection";
import VehiclesSection from "./components/homepage/VehiclesSection";
import ProcessSection from "./components/homepage/ProcessSection";
import OptionsSection from "./components/homepage/OptionsSection";
import PrinciplesSection from "./components/homepage/PrinciplesSection";
import FAQSection from "./components/homepage/FAQSection";
import ContactSection from "./components/homepage/ContactSection";
import Footer from "./components/homepage/Footer";

export default function Home() {
  return (
    <div className="bg-black min-h-screen">
      
         <Navbar />
          <Hero />
          {/* <Countdown /> */}
          
            <AboutSection />
            <ProcessSection />
            <VehiclesSection />
            <OptionsSection />
            <PrinciplesSection />
            <FAQSection />
            <ContactSection />
            <Footer />
           
    </div>
  );
}
