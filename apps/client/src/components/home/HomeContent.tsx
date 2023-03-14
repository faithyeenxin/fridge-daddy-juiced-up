import React, { useEffect, useRef } from 'react';
import AddCategoryCard from '../reusables/cards/AddCategoryCard';
import AddItemCard from '../reusables/cards/AddItemCard';
import FilterCard from '../reusables/cards/FilterCard';
import SearchBar from '../reusables/SearchBar';
import ItemsTable from '../reusables/table/full/ItemsTable';
import { gsap } from 'gsap';

const HomeContent = () => {
  let itemLeftRef = useRef(null);
  let itemRightRef = useRef(null);
  let itemMiddleRef = useRef(null);
  useEffect(() => {
    const itemLeft = itemLeftRef.current;
    const itemRight = itemRightRef.current;
    const itemCenter = itemMiddleRef.current;

    gsap.from(itemLeft, {
      duration: 0.5,
      x: -100,
      opacity: 0,
    });
    gsap.from(itemRight, {
      duration: 0.5,
      x: 100,
      opacity: 0,
    });
    gsap.from(itemCenter, {
      duration: 1,
      opacity: 0,
    });
  }, []);
  const foodWasteFacts = [
    '1/3 of food wasted worldwide, impacting economy, environment, and hunger.',
    'Food waste creates 3.3 billion metric tons of CO2, contributing to climate change.',
    '40% of food wasted in the United States alone.',
    'Food waste occurs throughout the supply chain, from production to consumption.',
    'Food waste has economic, social, and environmental impacts.',
    'Reducing food waste saves money and resources, helps fight hunger.',
    'Food waste can be prevented through better production, storage, and consumption.',
    'Composting and recycling food waste reduces landfill waste and improves soil.',
    'Food donation programs help redistribute excess food and reduce waste.',
    'Food waste contributes to water waste and depletion of freshwater resources.',
    '25% of global freshwater consumption is used for uneaten food production.',
    'Food waste contributes to malnutrition despite abundant food resources.',
    'Food waste reduces land available for wildlife and biodiversity.',
    'Food waste depletes natural resources like soil, water, and energy.',
    'Food waste in landfills produces methane, a potent greenhouse gas.',
    'Reducing food waste helps conserve resources for future generations.',
  ];
  console.log(Math.floor(Math.random() * foodWasteFacts.length));

  return (
    <div className='w-full h-[700px] flex gap-2'>
      {/* Left Container */}
      <div
        ref={itemLeftRef}
        className='w-3/12 h-full hidden lg:flex lg:flex-col justify-between gap-2'
      >
        <div className='w-full h-full bg-offWhite rounded-lg flex flex-col gap-1 justify-center items-center px-10'>
          <p className='text-md font-lora text-orange tracking-widest'>
            Food for Thought
          </p>
          <div className='text-md font-lora text-mutedPink tracking-normal flex justify-between'>
            {
              foodWasteFacts[
                foodWasteFacts.length -
                  Math.floor(Math.random() * foodWasteFacts.length)
              ]
            }
          </div>
        </div>
        <div className='flex flex-col bg-offWhite rounded-lg w-full h-full'>
          <AddItemCard />
        </div>
        <div className='flex flex-col bg-offWhite rounded-lg w-full h-full'>
          <AddCategoryCard />
        </div>
      </div>
      {/* Middle Container */}
      <div
        ref={itemMiddleRef}
        className='w-full lg:w-8/12 h-full  flex flex-col gap-2'
      >
        <SearchBar />
        <ItemsTable />
      </div>

      {/* Right Container */}
      <div
        ref={itemRightRef}
        className='w-2/12 h-full hidden lg:flex lg:flex-col  gap-2'
      >
        <div className='w-full h-full flex bg-offWhite rounded-lg'>
          <FilterCard />
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
