import { differenceInDays, isAfter } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { showUserItems } from '../../app/slices/itemsSlice';
import { showUser } from '../../app/slices/userSlice';
import { useAppSelector } from '../../app/store';
import Chart from '../reusables/Chart';
import { capitalizeWords } from '../utility/functions/capitalizeWord';
import { gsap } from 'gsap';

export interface IDataItem {
  title: string;
  value: number;
  color: string;
}
const HomeHero = () => {
  // DATES
  const today = new Date();
  let yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  let in3Days = new Date();
  in3Days.setDate(today.getDate() + 3);
  let inAWeek = new Date();
  inAWeek.setDate(today.getDate() + 7);

  let welcomeRef = useRef(null);
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
        isAfter(new Date(item.expiryDate), yesterday) &&
        differenceInDays(new Date(item.expiryDate), yesterday) < 8
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
    const welcome = welcomeRef.current;
    gsap.from(welcome, {
      duration: 1,
      opacity: 0,
    });
  }, []);

  return (
    <div
      ref={welcomeRef}
      className='w-full h-[350px] bg-bgColorPeachBeige rounded-2xl flex-col flex md:flex-row justify-left items-center px-[10%] gap-2 md:gap-10'
    >
      <div
        className={`w-full lg:w-1/3 justify-center items-center ${
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
        className={`flex h-full md:h-full justify-center items-center p-2 ${
          summarizedData[0].value === 0 &&
          summarizedData[1].value === 0 &&
          summarizedData[2].value === 0
            ? 'w-full'
            : 'w-full lg:w-2/3'
        }`}
      >
        {!pieStatus && (
          <div className='w-full flex flex-col items-center justify-center'>
            <div className='text-xl md:text-2xl xl:text-3xl font-lato font-normal text-orange tracking-wider'>{`Welcome back ${capitalizeWords(
              user.name
            )},`}</div>
            {allUserItems.length > 0 && (
              <div className='text-xs md:text-md xl:text-lg font-lato italic text-gray-500 tracking-wider'>{`FridgeDaddy is watching ${allUserItems.length} items for you!`}</div>
            )}
            {allUserItems.length === 0 && (
              <div className='text-xs md:text-md xl:text-lg font-lato italic text-mutedPink tracking-wider'>{`You do not have any items with us! Add some now!`}</div>
            )}
          </div>
        )}
        {pieStatus && (
          <div className='flex items-center justify-center flex-col'>
            <div className='text-xl md:text-2xl xl:text-3xl font-lato font-normal text-orange tracking-wider'>{`Welcome back ${capitalizeWords(
              user.name
            )}!`}</div>
            <p className='text-xs md:text-md xl:text-lg font-lato font-normal text-mutedPink tracking-wider'>
              You have {pieStatus?.value} {pieStatus?.title} item(s)!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeHero;
