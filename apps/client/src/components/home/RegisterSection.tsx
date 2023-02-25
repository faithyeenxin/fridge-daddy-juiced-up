import React from "react";
import { RegisterCard } from "../cards/RegisterCard";

export const RegisterSection = () => {
  return (
    <section id="register" className="bg-bgColor border-t-4 border-orange">
      <div className="container flex flex-col items-center mx-auto space-y-0 md:flex-row md:space-y-0 px-5 pt-10 md:pt-0">
        {/* Left Item */}
        <div className="flex flex-col items-center md:w-1/2">
          <h1 className="text-2xl font-bold text-center text-orange animate-bounce md:text-4xl ">
            Join FridgeDaddy today!
          </h1>
        </div>
        {/* Right Item */}
        <div className="md:w-1/2 py-10">
          <RegisterCard />
        </div>
      </div>
    </section>
  );
};
