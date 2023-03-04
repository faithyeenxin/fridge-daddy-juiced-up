import React, { useEffect, useState } from 'react';
import {
  setFilterToLoading,
  showFilteredItems,
  showUserItems,
  updateFilteredItems,
} from '../../app/slices/itemsSlice';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { isAfter, isWithinInterval } from 'date-fns';
import { IItem } from '../../interface';

interface ICheckboxStatus {
  evergreen: boolean;
  rotten: boolean;
  trashed: boolean;
  pantry: boolean;
  fridge: boolean;
  freezer: boolean;
  today: boolean;
  in3Days: boolean;
  inAWeek: boolean;
}

const FilterCard = () => {
  const dispatch = useAppDispatch();
  const allUserItems = useAppSelector(showUserItems);
  const filteredUserItems = useAppSelector(showFilteredItems);
  // console.log(allUserItems);
  // console.log(`all items array length ${allUserItems.length}`);
  let filteredData: IItem[] = [];
  let result: IItem[] = [];

  useEffect(() => {
    setCheckboxStatus({
      evergreen: false,
      rotten: false,
      trashed: false,
      pantry: false,
      fridge: false,
      freezer: false,
      today: false,
      in3Days: false,
      inAWeek: false,
    });
  }, [allUserItems]);

  // DATES
  let today = new Date();
  let in3Days = new Date();
  in3Days.setDate(today.getDate() + 3);
  let inAWeek = new Date();
  inAWeek.setDate(today.getDate() + 7);

  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  const [checkboxStatus, setCheckboxStatus] = useState({
    evergreen: false,
    rotten: false,
    trashed: false,
    pantry: false,
    fridge: false,
    freezer: false,
    today: false,
    in3Days: false,
    inAWeek: false,
  });

  const filterData = (data: ICheckboxStatus) => {
    if (data.evergreen) {
      allUserItems.forEach((item) => {
        if (isAfter(new Date(item.expiryDate), new Date()) && !item.trashed) {
          filteredData.push(item);
        }
      });
    }
    if (data.rotten) {
      allUserItems.forEach((item) => {
        if (isAfter(new Date(), new Date(item.expiryDate)) && !item.trashed) {
          filteredData.push(item);
        }
      });
    }
    if (data.trashed) {
      allUserItems.forEach((item) => {
        if (item.trashed) {
          filteredData.push(item);
        }
      });
    }

    if (!data.evergreen && !data.rotten && !data.trashed) {
      filteredData = allUserItems;
    }
    if (data.pantry) {
      let newData = filteredData.filter((item) => item.storedIn === 'Pantry');
      result = [...result, ...newData];
    }
    if (data.fridge) {
      let newData = filteredData.filter((item) => item.storedIn === 'Fridge');
      // console.log(newData)
      result = [...result, ...newData];
    }
    if (data.freezer) {
      let newData = filteredData.filter((item) => item.storedIn === 'Freezer');
      result = [...result, ...newData];
    }
    if (!data.pantry && !data.fridge && !data.freezer) {
      result = filteredData;
    }
    if (data.today) {
      console.log(today);
      result = result.filter((item) =>
        isWithinInterval(new Date(item.expiryDate), {
          start: today,
          end: in3Days,
        })
      );
    } else if (data.in3Days) {
      result = result.filter((item) =>
        isWithinInterval(new Date(item.expiryDate), {
          start: today,
          end: in3Days,
        })
      );
    } else if (data.inAWeek) {
      result = result.filter((item) =>
        isWithinInterval(new Date(item.expiryDate), {
          start: today,
          end: inAWeek,
        })
      );
    }
    // console.log(result);
    // console.log(`result array length ${result.length}`);
    dispatch(updateFilteredItems(result));
  };

  const updateCheckboxStatus = (data: ICheckboxStatus) => {
    // console.log("data is being updated");
    setCheckboxStatus(data);
    clearTimeout(timeoutId);
    dispatch(setFilterToLoading());
    const newTimeoutId = setTimeout(() => {
      filterData(data);
    }, 1000);
    setTimeoutId(newTimeoutId);
  };

  return (
    <div className='flex flex-col m-5 justify-between w-full gap-5'>
      <div className='flex text-2xl xl:text-3xl  items-center justify-center font-lora text-orange'>
        Filters
      </div>
      <div>
        <div className='text-xl xl:text-2xl font-lora font-bold text-orange'>
          Condition
        </div>
        <div className='flex flex-col gap-2 py-2'>
          <div className='flex justify-between pr-3 items-center'>
            <div className='font-lora tracking-wider text-gray-400 font-bold text-md xl:text-lg'>
              Evergreen
            </div>
            <img
              src={
                checkboxStatus.evergreen
                  ? `images/cards/check_ring.svg`
                  : `images/cards/uncheck_ring.svg`
              }
              onClick={() => {
                updateCheckboxStatus({
                  ...checkboxStatus,
                  evergreen: !checkboxStatus.evergreen,
                });
              }}
            />
          </div>
          <div className='flex justify-between pr-3'>
            <div className='font-lora tracking-wider text-gray-400 font-bold text-md xl:text-lg'>
              Rotten
            </div>
            <img
              src={
                checkboxStatus.rotten
                  ? `images/cards/check_ring.svg`
                  : `images/cards/uncheck_ring.svg`
              }
              onClick={() => {
                updateCheckboxStatus({
                  ...checkboxStatus,
                  rotten: !checkboxStatus.rotten,
                });
              }}
            />
          </div>
          <div className='flex justify-between pr-3'>
            <div className='font-lora tracking-wider text-gray-400 font-bold text-md xl:text-lg'>
              Trashed
            </div>
            <img
              src={
                checkboxStatus.trashed
                  ? `images/cards/check_ring.svg`
                  : `images/cards/uncheck_ring.svg`
              }
              onClick={() => {
                updateCheckboxStatus({
                  ...checkboxStatus,
                  trashed: !checkboxStatus.trashed,
                });
              }}
            />
          </div>
        </div>
      </div>
      <div>
        <div className='my-3 text-xl xl:text-2xl font-lora font-bold text-orange'>
          Compartment
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex justify-between pr-3'>
            <div className='font-lora tracking-wider text-gray-400 font-bold text-md xl:text-lg'>
              Pantry
            </div>
            <img
              src={
                checkboxStatus.pantry
                  ? `images/cards/check_ring.svg`
                  : `images/cards/uncheck_ring.svg`
              }
              onClick={() => {
                updateCheckboxStatus({
                  ...checkboxStatus,
                  pantry: !checkboxStatus.pantry,
                });
              }}
            />
          </div>
          <div className='flex justify-between pr-3'>
            <div className='font-lora tracking-wider text-gray-400 font-bold text-md xl:text-lg'>
              Fridge
            </div>
            <img
              src={
                checkboxStatus.fridge
                  ? `images/cards/check_ring.svg`
                  : `images/cards/uncheck_ring.svg`
              }
              onClick={() => {
                updateCheckboxStatus({
                  ...checkboxStatus,
                  fridge: !checkboxStatus.fridge,
                });
              }}
            />
          </div>
          <div className='flex justify-between pr-3'>
            <div className='font-lora tracking-wider text-gray-400 font-bold text-md xl:text-lg'>
              Freezer
            </div>
            <img
              src={
                checkboxStatus.freezer
                  ? `images/cards/check_ring.svg`
                  : `images/cards/uncheck_ring.svg`
              }
              onClick={() => {
                updateCheckboxStatus({
                  ...checkboxStatus,
                  freezer: !checkboxStatus.freezer,
                });
              }}
            />
          </div>
        </div>
      </div>
      <div>
        <div className='my-3 text-xl xl:text-2xl font-lora font-bold text-orange'>
          Expiring Soon
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex justify-between pr-3'>
            <div className='font-lora tracking-wider text-gray-400 font-bold text-md xl:text-lg'>
              Today
            </div>
            <img
              src={
                checkboxStatus.today
                  ? `images/cards/check_ring.svg`
                  : `images/cards/uncheck_ring.svg`
              }
              onClick={() => {
                updateCheckboxStatus({
                  ...checkboxStatus,
                  today: !checkboxStatus.today,
                  in3Days: false,
                  inAWeek: false,
                });
              }}
            />
          </div>
          <div className='flex justify-between pr-3'>
            <div className='font-lora tracking-wider text-gray-400 font-bold text-md xl:text-lg'>
              In 3 Days
            </div>
            <img
              src={
                checkboxStatus.in3Days
                  ? `images/cards/check_ring.svg`
                  : `images/cards/uncheck_ring.svg`
              }
              onClick={() => {
                updateCheckboxStatus({
                  ...checkboxStatus,
                  today: false,
                  in3Days: !checkboxStatus.in3Days,
                  inAWeek: false,
                });
              }}
            />
          </div>
          <div className='flex justify-between pr-3'>
            <div className='font-lora tracking-wider text-gray-400 font-bold text-md xl:text-lg'>
              In A Week
            </div>
            <img
              src={
                checkboxStatus.inAWeek
                  ? `images/cards/check_ring.svg`
                  : `images/cards/uncheck_ring.svg`
              }
              onClick={() => {
                updateCheckboxStatus({
                  ...checkboxStatus,
                  today: false,
                  in3Days: false,
                  inAWeek: !checkboxStatus.inAWeek,
                });
              }}
            />
          </div>
        </div>
      </div>
      <div className='flex justify-center'>
        <div
          className='flex w-2/3 bg-orange font-lora font-bolder text-white justify-center rounded-3xl p-1 hover:bg-gradient-to-r from-orange to-pink'
          onClick={() => {
            dispatch(updateFilteredItems(allUserItems));
            setCheckboxStatus({
              evergreen: false,
              rotten: false,
              trashed: false,
              pantry: false,
              fridge: false,
              freezer: false,
              today: false,
              in3Days: false,
              inAWeek: false,
            });
          }}
        >
          Clear All
        </div>
      </div>
    </div>
  );
};

export default FilterCard;
