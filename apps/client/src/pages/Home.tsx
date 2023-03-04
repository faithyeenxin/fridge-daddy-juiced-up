import { gsap } from 'gsap';
import { showUserItems } from '../app/slices/itemsSlice';
import { showUser } from '../app/slices/userSlice';
import { useEffect, useRef, useState } from 'react';
import LandingHero from '../components/HomeHero';
import AddItemCard from '../components/cards/AddItemCard';
import AddCategoryCard from '../components/cards/AddCategoryCard';
import SearchBar from '../components/SearchBar';
import ItemsTable from '../components/table/ItemsTable';
import FilterCard from '../components/cards/FilterCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Chart from '../components/Chart';
import { useAppSelector } from '../app/store';
import { isAfter, isWithinInterval } from 'date-fns';
import { capitalizeWords } from '../components/utility/functions/capitalizeWord';
import { differenceInDays, parseISO } from 'date-fns';

export interface IDataItem {
  title: string;
  value: number;
  color: string;
}

export default function Home() {
  const today = new Date();
  let welcomeRef = useRef(null);
  let itemLeftRef = useRef(null);
  let itemRightRef = useRef(null);
  let itemMiddleRef = useRef(null);
  const [pieStatus, setPieStatus] = useState<IDataItem>();
  const allUserItems = useAppSelector(showUserItems);
  const user = useAppSelector(showUser);

  const [summarizedData, setSummarizedData] = useState([
    { title: 'Rotten', value: 12, color: '#FF7C5F' },
    { title: 'Trashed', value: 20, color: '#445765' },
    { title: 'Evergreen', value: 10, color: '#2DD1AC' },
  ]);
  const [totalCountState, setTotalCountState] = useState({
    rotten: 0,
    trashed: 0,
    evergreen: 0,
    expiring: 0,
  });
  useEffect(() => {
    let totalCount = { rotten: 0, trashed: 0, evergreen: 0, expiring: 0 };
    allUserItems.forEach((item) => {
      // count evergreen items
      if (isAfter(new Date(item.expiryDate), new Date()) && !item.trashed) {
        totalCount.evergreen += 1;
      }
      // count rotten items
      if (isAfter(new Date(), new Date(item.expiryDate)) && !item.trashed) {
        totalCount.rotten += 1;
      }
      // count trashed items
      if (item.trashed) {
        totalCount.trashed += 1;
      }
      // count expiring soon items
      if (
        isAfter(new Date(item.expiryDate), new Date()) &&
        differenceInDays(new Date(item.expiryDate), today) < 8
      ) {
        totalCount.expiring += 1;
      }
    });
    const newData = [
      {
        title: 'Rotten',
        value: totalCount.rotten,
        color: '#FF7C5F',
      },
      {
        title: 'Trashed',
        value: totalCount.trashed,
        color: '#445765',
      },
      {
        title: 'Evergreen',
        value: totalCount.evergreen,
        color: '#2DD1AC',
      },
    ];
    setSummarizedData(newData);
    setTotalCountState(totalCount);
  }, [allUserItems]);

  useEffect(() => {
    const itemLeft = itemLeftRef.current;
    const itemRight = itemRightRef.current;
    const itemCenter = itemMiddleRef.current;
    const welcome = welcomeRef.current;
    gsap.from(welcome, {
      duration: 1,
      opacity: 0,
    });

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
      <div
        ref={welcomeRef}
        className='w-full h-[250px] bg-offWhite rounded-2xl flex justify-left items-center px-[10%] gap-10'
      >
        <div
          className={`w-1/3 h-full justify-center items-center ${
            summarizedData[0].value === 0 &&
            summarizedData[1].value === 0 &&
            summarizedData[2].value === 0
              ? 'hidden'
              : 'flex'
          }`}
        >
          <Chart data={summarizedData} setPieStatus={setPieStatus} />
        </div>
        <div
          className={`flex h-full justify-center items-center ${
            summarizedData[0].value === 0 &&
            summarizedData[1].value === 0 &&
            summarizedData[2].value === 0
              ? 'w-full'
              : 'w-1/3'
          }`}
        >
          {!pieStatus && (
            <div className='text-2xl xl:text-3xl font-lora font-bold text-orange tracking-wider'>{`Welcome back ${capitalizeWords(
              user.name
            )}!`}</div>
          )}
          {pieStatus && (
            <div>
              <p className='text-2xl xl:text-3xl font-lora font-bold text-orange tracking-wider'>
                You have {pieStatus?.value} {pieStatus?.title} item(s)!
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Content Section */}
      <div className='w-full h-[700px] flex gap-2'>
        {/* Left Container */}
        <div
          ref={itemLeftRef}
          className='w-3/12 h-full hidden lg:flex lg:flex-col justify-between gap-2'
        >
          <div className='w-full h-full bg-offWhite rounded-lg flex justify-center items-center px-10'>
            <p className='text-lg font-lora font-bold text-orange tracking-wider'>
              {`You have ${totalCountState.expiring} item(s) expiring in 7 days!`}
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
