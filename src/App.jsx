
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SmoothScroll from "./smoother/Smoother";
import Menu from "./pages/Menu";

import Navbar from "./components/Navbar";
import Subscription from "./pages/Subscription";
import ContactPage from "./pages/ContactPage";


export default function App(){
  return(
    <>
    <Navbar />
       <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/contact" element={<ContactPage />} />
       </Routes>
      
    </>
  );
}