import React, { useState } from "react";
import addGroc from "../../assets/gifs/add_groceries.png";
import getInspired from "../../assets/gifs/get_inspired.png";
import contributeGif from "../../assets/gifs/contribute.png";
import hoverme from "../../assets/gifs/hoverme.png";

import takeout from "../../assets/img/takeout.png";

import pan from "../../assets/img/bubble-gum-pan-with-vegetables.png";
import groceries from "../../assets/img/bubble-gum-baguette-and-salad-in-a-paper-bag-tomatoes-on-a-plate-and-olive-oil.png";
import contribute from "../../assets/img/bubble-gum-man-and-woman-high-fiving-each-other.png";
import inspired from "../../assets/img/inspired.png";
export const FeaturesSection = () => {
  const [focusedGif, setFocusedGif] = useState<string>(hoverme);

  const changeGif = (item: string) => {
    setFocusedGif(item);
  };

  return (
    <section id="features">
      <h1
        className="text-center text-orange text-2xl font-bold md:text-4xl mt-10 px-1 "
        onMouseOver={() => changeGif(hoverme)}
      >
        How FridgeDaddy Works
      </h1>
      <div className="container flex flex-col lg:flex-row  items-center mx-auto space-y-10 md:space-y-0 ">
        {/* Left Section */}
        <div className="flex-col md:w-1/2 hidden md:inline-block">
          <img className="rounded-lg " src={focusedGif} />
        </div>

        {/* Right Section */}
        <div className="flex flex-col md:space-y-8 md:w-1/2 space-y-10 pb-10 lg:py-10 px-5">
          <div
            className="flex flex-row space-y-3 md:space-y-0 md:space-x-3 "
            onMouseOver={() => changeGif(addGroc)}
          >
            <img src={groceries} className="lg:w-1/4 w-1/3" />
            <div className="py-5 space-y-3 pl-5">
              <h1 className="text-xl md:text-3xl font-bold text-orange ">
                add groceries
              </h1>
              <h1 className="text-sm md:text-base font-mono">
                keep tabs on all your food, when they expire & when you've used
                them
              </h1>
            </div>
          </div>
          <div
            className="flex flex-row space-y-1 md:space-y-0 md:space-x-3"
            onMouseOver={() => changeGif(getInspired)}
          >
            {/* lg:w-1/3 md:w-1/2 sm:w-1/3 w-20 */}
            <img src={pan} className="lg:w-1/4 w-1/3" />
            <div className="py-5 space-y-3 pl-5">
              <h1 className="text-xl  md:text-3xl font-bold text-orange ">
                get inspired
              </h1>
              <h1 className="text-sm md:text-base font-mono">
                select items from your fridge & we'll tell you what to make
              </h1>
            </div>
          </div>
          <div
            className="flex flew-row space-y-3 md:space-y-0 md:space-x-3 "
            onMouseOver={() => changeGif(contributeGif)}
          >
            <img src={contribute} className="lg:w-1/4 w-1/3" />
            <div className="py-5 space-y-3 pl-5">
              <h1 className="text-xl md:text-3xl font-bold text-orange">
                contribute
              </h1>
              <h1 className="text-sm md:text-base font-mono">
                join our community in expanding our shelf life database
              </h1>
            </div>
          </div>
          {/* <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-3 md:flex-row">
            <img src={takeout} className="w-1/3" />
            <h1 className="text-3xl font-bold py-10 text-orange ">
            GET INSPIRED
            </h1>
            </div>
            <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-3 md:flex-row">
            <img src={contribute} className="w-1/3" />
            <h1 className="text-3xl font-bold py-10 text-orange s">
            CONTRIBUTE
            </h1>
          </div> */}
        </div>
      </div>
    </section>
  );
};
