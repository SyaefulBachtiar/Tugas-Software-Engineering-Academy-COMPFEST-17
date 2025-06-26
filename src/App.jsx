
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SmoothScroll from "./smoother/Smoother";
import Menu from "./pages/Menu";

import Navbar from "./components/Navbar";
import Subscription from "./pages/Subscription";
import ContactPage from "./pages/ContactPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";



export default function App(){
  return(
    <>
    <Navbar />
       <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/subscription" element={<ProtectedRoute><Subscription /></ProtectedRoute>} />
        <Route path="/login" element= {<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/dashboard" element={<ProtectedRoute> <UserDashboard /> </ProtectedRoute>} />
       </Routes>
      
    </>
  );
}