import React, { Fragment, useState } from 'react';
import {
  showFilteredItems,
  showUserItemsLoadingState,
  trashAllItems,
  unselectAllItem,
} from '../../../../app/slices/itemsSlice';
import { useAppDispatch, useAppSelector } from '../../../../app/store';
import { capitalizeWords } from '../../../utility/functions/capitalizeWord';
import differenceInDays from 'date-fns/differenceInDays';
import format from 'date-fns/format';
import SingleItemRow from './SingleItemRowSmall';
import { Dialog, Transition } from '@headlessui/react';
import { toast } from 'react-toastify';
import { getUserId } from '../../../../app/slices/userSlice';

const ItemsTableSmall = () => {
  const filteredItems = useAppSelector(showFilteredItems);
  const filterStatus = useAppSelector(showUserItemsLoadingState);
  const dispatch = useAppDispatch();
  const token: any = useAppSelector(getUserId);

  let [isOpen, setIsOpen] = useState(false);
  const [unselectAll, setUnselectAll] = useState(false);
  let colorState = true;

  const handleUnselectAll = () => {
    console.log('unselect all');
    dispatch(unselectAllItem());
    closeModal();
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <div className='w-full h-full bg-offWhite rounded-lg overflow-auto'>
      <div className='relative flex flex-col justify-between'>
        <div
          id='table-head'
          className='flex sticky top-0 rounded-t-lg bg-orange rounded-top-lg font-lora text-white text-bold xl:text-lg lg:text-md md:text-sm sm:text-xs text-xs text-center items-center h-[45px] shadow-xl'
        >
          <div className='w-2/5 tracking-wide'>Days Left</div>
          <div className='w-2/5 tracking-wide'>Name</div>
          <div
            className='w-1/5 flex items-center justify-center'
            onMouseEnter={() => setUnselectAll(true)}
            onMouseLeave={() => setUnselectAll(false)}
          >
            {!unselectAll && (
              <img src='/images/table/partial/unselect_all.svg' />
            )}
            {unselectAll && (
              <p className='text-xs px-2 cursor-pointer' onClick={openModal}>
                Unselect All
              </p>
            )}
          </div>
        </div>

        {filterStatus && (
          <div className='flex justify-center items-center text-center'>
            <img
              className='flex w-[100px] h-[400px]'
              src='/images/table/full/loading-animation.svg'
            />
          </div>
        )}
        {!filterStatus && filteredItems.length === 0 && (
          <div className='flex w-full h-[400px] justify-center items-center'>
            <div className='font-lora text-orange opacity-70 text-lg tracking-wider font-light'>
              You don't have any items here!
            </div>
          </div>
        )}
        {!filterStatus &&
          filteredItems.map((item, idx) => {
            colorState = !colorState;
            return (
              <SingleItemRow key={idx} item={item} colorState={colorState} />
            );
          })}
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='flex text-lg font-medium leading-6 text-red-400'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-6 h-6 text-red-400 mr-2'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z'
                      />
                    </svg>
                    Unselected All Items
                  </Dialog.Title>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500'>
                      This is irreversible, proceed with caution!
                    </p>
                  </div>

                  <div className='mt-4'>
                    <button
                      type='button'
                      className='mr-2 inline-flex justify-center rounded-md border border-transparent bg-orange px-4 py-2 text-sm font-medium text-white hover:bg-gradient-to-r from-orange to-pink focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                      onClick={handleUnselectAll}
                    >
                      Yes please!
                    </button>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-buttonBrightGreen px-4 py-2 text-sm font-medium text-fontGreen hover:bg-buttonLightGreen focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                      onClick={closeModal}
                    >
                      No thank you
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ItemsTableSmall;
