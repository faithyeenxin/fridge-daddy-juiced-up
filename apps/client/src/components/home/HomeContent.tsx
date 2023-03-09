import React, { useEffect, useRef } from 'react';
import AddCategoryCard from '../reusables/cards/AddCategoryCard';
import AddItemCard from '../reusables/cards/AddItemCard';
import FilterCard from '../reusables/cards/FilterCard';
import SearchBar from '../reusables/SearchBar';
import ItemsTable from '../reusables/table/ItemsTable';
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
  return (
    <div className='w-full h-[700px] flex gap-2'>
      {/* Left Container */}
      <div
        ref={itemLeftRef}
        className='w-3/12 h-full hidden lg:flex lg:flex-col justify-between gap-2'
      >
        <div className='w-full h-full bg-offWhite rounded-lg flex justify-center items-center px-10'>
          <p className='text-lg font-lora font-bold text-mutedPink tracking-wider'>
            {`Insert food wastage facts here?`}
          </p>
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
