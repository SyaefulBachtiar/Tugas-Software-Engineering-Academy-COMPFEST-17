import Contact from "./components/Contact";
import Feautures from "./components/Feautures";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import SmoothScroll from "./smoother/Smoother";
import React from "react";

export default function(){
  return(
    <SmoothScroll>
       <div className="font-sans text-gray-800 bg-white min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-10">
        <HeroSection />
        <Feautures />
        <Contact />
      </main>

      <Footer />
    </div>
    </SmoothScroll>
  );
}