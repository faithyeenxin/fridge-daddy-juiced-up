import React from "react";
import { FeaturesSection } from "../components/home/FeaturesSection";
import HeroSection from "../components/home/HeroSection";
import { RegisterSection } from "../components/home/RegisterSection";

export const Landing = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <RegisterSection />
    </div>
  );
};
