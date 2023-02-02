import React from "react";
import hotdogPic from "../../assets/img/hotdog.png";
import breakfastPic from "../../assets/img/breakfast.png";
import DonutSVG from "./SVG/DonutSVG";
import hero from "../../assets/img/happy-food.png";
const HeroSection = () => {
  return (
    <section
      id="hero"
      className="bg-bgPink border-b-4 border-fontOrange lg:px-20"
    >
      <div className="container flex flex-col-reverse md:flex-row items-center mx-auto md:space-y-0">
        {/* Left Item */}
        <div
          className="flex flex-col mb-10 md:mt-16 md:mb-32 space-y-5 md:w-1/2 justify-center"
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-easing="ease-in-out"
          data-aos-once="true"
        >
          <h1 className="w-lg text-3xl font-bold text-center text-fontOrange md:text-5xl md:text-left">
            Tracking your fridge's inventory has never been easier!
          </h1>
          <p className="w-lg text-fontOrangeLight text-center md:text-left">
            Play your part to reduce food waste with FridgeDaddy
          </p>
          <div className="flex justify-center md:justify-start">
            <a
              href="/register"
              className=" p-2 px-6 pt-2 text-white bg-fontOrange rounded-full baseline hover:bg-fontOrangeLight text-md "
            >
              Get Started
            </a>
          </div>
        </div>
        {/* Right Item */}
        <div className="w-auto md:w-1/2">
          {/* <img src={hotdogPic} alt="hotdog illustration" /> */}
          <img src={hero} />
          {/* <DonutSVG /> */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
