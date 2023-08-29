/** @format */

import React from "react";

import sparkles from "../assets/img/learn-more/sparkles.svg";
import clock from "../assets/img/learn-more/clock.png";
import idea from "../assets/img/learn-more/idea.png";
import addItem from "../assets/img/learn-more/add-item.png";
import filter from "../assets/img/learn-more/filter.png";
import recipe from "../assets/img/learn-more/recipe.png";
import waves from "../assets/img/landing-page/waves.svg";
import circle from "../assets/img/landing-page/circle.svg";
import square from "../assets/img/landing-page/square.svg";
import waves2 from "../assets/img/landing-page/waves-2.svg";
import sparkle from "../assets/img/learn-more/sparkles.svg";
const LearnMore = () => {
  return (
    <div className="relative h-full">
      <img
        src={waves}
        className="absolute w-[800px] z-[-20] rotate-[-25deg] left-[-10%] top-[-20%]"
      />
      <img
        src={circle}
        className="absolute w-[400px] z-[-20] right-[-10%] top-[25%]"
      />
      <img src={square} className="absolute w-[300px] z-[-20] top-[60%]" />
      <img
        src={waves2}
        className="absolute w-[800px] z-[-20] bottom-0 rotate-[25deg] right-[-10%]"
      />
      {/* ADD ITEMS */}
      <div className="w-full h-full relative mt-[5%] mb-[5%] bg-tablePink py-20 px-10 z-[-10]">
        <img
          src={sparkles}
          className="absolute z-[-1] right-[50%] bottom-[20%] hidden md:block"
        />
        <div className="w-full flex flex-col xl:flex-row justify-evenly items-start gap-10 md:gap-0">
          {/* left item */}
          <div className="flex h-auto w-full xl:w-1/2 justify-center items-start">
            <div className="relative w-[30px] h-[30px]">
              <div className="absolute w-[100%] h-[100%] bg-mutedPink z-[-1] rounded-full left-[-40%] bottom-[-30%]" />
              <p className="font-medium text-center text-gray-700 text-2xl md:text-3xl xl:text-left bg-opacity-0">
                1.
              </p>
            </div>
            <div
              className="flex flex-col w-[100%] lg:w-[90%] xl:w-[80%] gap-2 md:gap-5"
              // data-aos='fade-in'
              // data-aos-duration='1000'
              // data-aos-easing='ease-in-out'
              // data-aos-once='false'
            >
              <h1 className="font-medium text-center text-gray-700 text-2xl md:text-3xl xl:text-left">
                Add items into your inventory.
              </h1>
              <h1 className="font-normal text-center text-gray-700 text-md md:text-xl xl:text-left">
                Add items that you have stocked up in your pantry, fridge or
                freezer. Categorize these items by type or compartment so you
                can easily track and locate items.
              </h1>
            </div>
          </div>
          {/* right item */}
          <div className="h-full w-full xl:w-1/2">
            <img
              src={addItem}
              className="w-[850px]rounded-2xl"
              // data-aos='fade-in'
              // data-aos-duration='1000'
              // data-aos-easing='ease-in-out'
              // data-aos-once='false'
            />
          </div>
        </div>
      </div>
      {/* TRACK ITEMS */}
      <div className="w-full h-full relative mt-[5%] mb-[5%] bg-tablePink py-20 px-10 z-[-10]">
        <img
          src={clock}
          className="absolute z-[-1] right-[50%] bottom-[20%] hidden md:block"
        />
        <div className="w-full flex flex-col xl:flex-row justify-evenly items-start gap-10 md:gap-0 ">
          {/* left item */}
          <div className="flex h-auto w-full xl:w-1/2 justify-center items-start">
            <div className="relative w-[30px] h-[30px]">
              <div className="absolute w-[100%] h-[100%] bg-mutedPink z-[-1] rounded-full left-[-40%] bottom-[-30%]" />
              <p className="font-medium text-center text-gray-700 text-2xl md:text-3xl xl:text-left bg-opacity-0">
                2.
              </p>
            </div>
            <div
              className="flex flex-col w-[100%] lg:w-[90%] xl:w-[80%] gap-2 md:gap-5"
              // data-aos='fade-in'
              // data-aos-duration='1000'
              // data-aos-easing='ease-in-out'
              // data-aos-once='false'
            >
              <h1 className="font-medium text-center text-gray-700 text-2xl md:text-3xl xl:text-left">
                Monitor food item expiration status.
              </h1>
              <h1 className="font-normal text-center text-gray-700 text-md md:text-xl xl:text-left">
                Effortlessly sort items based on their condition and expiry
                dates, helping you identify what to consume before they expire.
              </h1>
            </div>
          </div>
          {/* right item */}
          <div className="h-full w-full xl:w-1/2">
            <img
              src={filter}
              className="w-[850px]rounded-2xl"
              // data-aos='fade-in'
              // data-aos-duration='1000'
              // data-aos-easing='ease-in-out'
              // data-aos-once='false'
            />
          </div>
        </div>
      </div>

      {/* RECIPE */}
      <div className="w-full h-full relative mt-[5%] mb-[5%] bg-tablePink py-20 px-10 z-[-10]">
        <img
          src={idea}
          className="absolute z-[-1] right-[48%] bottom-[10%] rotate-[-20deg] hidden md:block"
        />
        <div className="w-full flex flex-col xl:flex-row justify-evenly items-start gap-10 md:gap-0 ">
          {/* left item */}
          <div className="flex h-auto w-full xl:w-1/2 justify-center items-start">
            <div className="relative w-[30px] h-[30px]">
              <div className="absolute w-[100%] h-[100%] bg-mutedPink z-[-1] rounded-full left-[-40%] bottom-[-30%]" />
              <p className="font-medium text-center text-gray-700 text-2xl md:text-3xl xl:text-left bg-opacity-0">
                3.
              </p>
            </div>
            <div
              className="flex flex-col w-[100%] lg:w-[90%] xl:w-[80%] gap-2 md:gap-5"
              // data-aos='fade-in'
              // data-aos-duration='1000'
              // data-aos-easing='ease-in-out'
              // data-aos-once='false'
            >
              <h1 className="font-medium text-center text-gray-700 text-2xl md:text-3xl xl:text-left">
                Discover curated recipes based on items in your fridge.
              </h1>
              <h1 className="font-normal text-center text-gray-700 text-md md:text-xl xl:text-left">
                Stuck with leftovers and unsure what to cook? Don't worry, we've
                got you covered with recipe suggestions based on your inventory.
              </h1>
            </div>
          </div>
          {/* right item */}
          <div className="h-full w-full xl:w-1/2">
            <img
              src={recipe}
              className="w-[850px]rounded-2xl"
              // data-aos='fade-in'
              // data-aos-duration='1000'
              // data-aos-easing='ease-in-out'
              // data-aos-once='false'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnMore;
