
import CTASection from "../components/landing/CTASection";
import FeaturesSection from "../components/landing/FeaturesSection";
import Footer from "../components/landing/Footer";
import HeroSection from "../components/landing/HeroSection";
import PricingSection from "../components/landing/PricingSection";
import TestimonialsSection from "../components/landing/TestimonialsSection";
import { features, pricingPlans,testimonialsSection} from "../assets/data";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Landing =()=>{

  const {openSignIn,openSignUp}=useClerk();
  const {isSignedIn}=useUser();
  const navigate=useNavigate();

 useEffect(()=>{
  if(isSignedIn){
    navigate("/dashboard");
  }
 },[isSignedIn,navigate]);


    return (
      <div>
        {/* Hero section */}
          <HeroSection openSignIn={openSignIn} openSignUp={openSignUp}/>
        {/* Features section*/}
           <FeaturesSection features={features}/>
        {/* pricing section */}
           <PricingSection pricingPlans={pricingPlans} />
        {/* Testimonials section */}
        <TestimonialsSection  testimonialsSection={testimonialsSection}/>
        {/* CTA section */}
        <CTASection/>
        {/* footer section */}
        <Footer/>

      </div>
    );
} 
export default Landing;