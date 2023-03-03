import { gsap } from 'gsap';

import { useEffect, useRef } from 'react';
import LandingHero from '../components/HomeHero';
import AddItemCard from '../components/cards/AddItemCard';
import AddCategoryCard from '../components/cards/AddCategoryCard';
import SearchBar from '../components/SearchBar';
import ItemsTable from '../components/table/ItemsTable';
import FilterCard from '../components/cards/FilterCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
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
    <div className='w-full h-full flex flex-col gap-5'>
      {/* Hero Section */}
      <div className='w-full h-[250px] bg-red-400 flex justify-center items-center'>
        <p>the hero section lies here</p>
      </div>
      {/* Content Section */}
      <div className='w-full h-[700px] flex gap-2'>
        {/* Left Container */}
        <div
          ref={itemLeftRef}
          className='w-3/12 h-full hidden lg:flex lg:flex-col justify-between gap-2'
        >
          <div className='w-full h-full bg-offWhite rounded-lg flex justify-center items-center'>
            Totals will be displayed here
          </div>
          <AddItemCard />
          <AddCategoryCard />
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
          <FilterCard />
        </div>
      </div>
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </div>
  );
}
