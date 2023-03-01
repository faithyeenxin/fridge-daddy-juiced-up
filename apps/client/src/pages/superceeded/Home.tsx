import { Tab } from '@headlessui/react';
import CardItem from './CardItem';
import { useAppDispatch, useAppSelector } from '../../app/store';
import isAfter from 'date-fns/isAfter';

import {
  getEvergreenItems,
  getRottenItems,
  getTrashedItems,
  showUserItems,
} from '../../app/slices/itemsSlice';
import { useEffect, useState } from 'react';
import { all } from 'axios';
import { taskCancelled } from '@reduxjs/toolkit/dist/listenerMiddleware/exceptions';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function Home() {
  // let userItems = useAppSelector(showUserItems);
  let evergreen = useAppSelector(getEvergreenItems);
  let rotten = useAppSelector(getRottenItems);
  let trashed = useAppSelector(getTrashedItems);

  let badgeColor = {
    green: 'bg-green-200 text-green-900',
    red: 'bg-red-200 text-red-900',
    gray: 'bg-gray-700 text-gray-300',
  };

  let allItems: any = {
    Evergreen: evergreen,
    Rotten: rotten,
    Trashed: trashed,
  };
  return (
    <div className='flex justify-center sm:mx-2 md:mx-10'>
      {/* Same as */}
      <div className='w-full px-2 py-5 sm:px-0 mx-8'>
        <Tab.Group>
          <Tab.List className='flex space-x-1 rounded-full bg-bgColor p-1 border-2 border-orange'>
            {Object.keys(allItems)?.map((itemName, idx) => {
              return (
                <Tab
                  key={idx}
                  className={({ selected }) =>
                    classNames(
                      'w-screen rounded-3xl py-2.5 text-sm font-medium leading-5 text-orange',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-orange focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-white shadow'
                        : 'text-white hover:bg-white/[0.12] hover:text-white'
                    )
                  }
                >
                  <div className='space-x-2 p-1'>
                    <span>{itemName}</span>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        itemName === 'Evergreen'
                          ? badgeColor.green
                          : itemName === 'Rotten'
                          ? badgeColor.red
                          : badgeColor.gray
                      }`}
                    >
                      {/* Tab Bar bagde icon telling how many in each category */}
                      {allItems[itemName].length}
                    </span>
                  </div>
                </Tab>
              );
            })}
          </Tab.List>

          <Tab.Panels className='flex w-full mt-5 text-center items-center justify-center'>
            {Object.values(allItems)?.map((foodItem: any, idx) => (
              <Tab.Panel
                key={idx}
                id='second'
                className={classNames(
                  'flex flex-wrap items-center justify-center rounded-xl bg-white gap-2 md:gap-5',
                  'ring-white ring-opacity-60 ring-offset-2  focus:outline-none focus:ring-2'
                )}
              >
                {foodItem?.map((item: any, idx: any) => {
                  return (
                    <div id='first' key={idx}>
                      <CardItem item={item} />
                    </div>
                  );
                })}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
