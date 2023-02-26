import React from "react";
import { FeaturesSection } from "../components/landing/FeaturesSection";
import HeroSection from "../components/landing/HeroSection";
import { RegisterSection } from "../components/landing/RegisterSection";

export const Landing = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <RegisterSection />
    </div>
  );
};
