import { gsap } from 'gsap';

import { useEffect, useRef } from 'react';
import LandingHero from '../components/HomeHero';
import AddItemCard from '../components/cards/AddItemCard';
import AddCategoryCard from '../components/cards/AddCategoryCard';
import SearchBar from '../components/SearchBar';
import ItemsTable from '../components/ItemsTable';
import FilterCard from '../components/cards/FilterCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  let itemLeftRef = useRef(null);
  let itemRightRef = useRef(null);
  let itemCenterRef = useRef(null);

  useEffect(() => {
    const itemLeft = itemLeftRef.current;
    const itemRight = itemRightRef.current;
    const itemCenter = itemCenterRef.current;

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
    <div className='w-full h-[1000px]'>
      <LandingHero />
      <div className='flex gap-5'>
        <div className='relative w-3/12 opacity-1'>
          <div ref={itemLeftRef} className='flex flex-col gap-6'>
            <AddItemCard />
            <AddCategoryCard />
          </div>
        </div>
        <div className='relative w-7/12 opacity-1'>
          <div
            ref={itemCenterRef}
            className='absolute w-full flex flex-col gap-5'
          >
            <SearchBar />
            <ItemsTable />
          </div>
        </div>

        <div className='relative w-2/12 opacity-1'>
          <div ref={itemRightRef} className='absolute w-full flex'>
            <FilterCard />
          </div>
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
