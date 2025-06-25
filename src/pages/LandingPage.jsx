import HeroSection from "../components/HeroSection";
import Feautures from "../components/Feautures";
import Contact from "../components/Contact";
import SmoothScroll from "../smoother/Smoother";
import Footer from "../components/Footer";


export default function LandingPage(){
  return(
    <div className="font-sans text-gray-800 bg-white min-h-screen overflow-x-hidden">
      <SmoothScroll>
        <HeroSection />
        <Feautures />
        <Contact />
        <Footer />
        </SmoothScroll>

      </div>
  );
}