import React, { useState, useEffect } from 'react';
import {
  filterCategories,
  showCategories,
  showFilteredCategories,
} from '../../../app/slices/categoriesSlice';
import { getUserId } from '../../../app/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { ICategory, IItem } from '../../../interface';
import DropdownSelect from '../dropdown/DropdownSelect';
import { capitalizeWords } from '../../utility/functions/capitalizeWord';
import { format, min, max, add, parseISO } from 'date-fns';
import { getDurationFromDays } from '../../utility/functions/getDurationFromDays';
import { addDurationToDate } from '../../utility/functions/addDurationToDate';
import {
  createItem,
  showAddItemLoadingState,
} from '../../../app/slices/itemsSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { parse } from 'path';
import { wordContainsSubstring } from '../../utility/functions/wordContainsSubstring';
import {
  setAddItemModalOpen,
  setAddModalOpen,
} from '../../../app/slices/modalSlice';

interface IShelfLife {
  id: number;
  name: string;
  days: number;
}
const AddItemCard = () => {
  const today = new Date();
  const todayStr = format(today, 'yyyy-MM-dd');
  const token: any = useAppSelector(getUserId);
  const dispatch = useAppDispatch();
  const [resetState, setResetState] = useState(false);
  const [purchasedOnDisplay, setPurchasedOnDisplay] = useState(false);
  const [expirationOnDisplay, setExpirationOnDisplay] = useState(false);
  const [purchaseDate, setPurchaseDate] = useState(todayStr);
  const [expiryDate, setExpiryDate] = useState(todayStr);
  const [daysInFocus, setDaysInFocus] = useState(0);
  const [newItem, setNewItem] = useState<IItem>({
    userId: token.id,
    name: '',
    purchaseDate: new Date(),
    expiryDate: new Date(),
    categoryId: '',
    storedIn: '',
    quantity: '',
    trashed: false,
  });

  const handleSubmit = (e: any) => {
    setResetState(!resetState);
    let data = {
      ...newItem,
      userId: token.id,
      purchaseDate: parseISO(format(new Date(purchaseDate), 'yyyy-MM-dd')),
      expiryDate: parseISO(format(new Date(expiryDate), 'yyyy-MM-dd')),
    };
    setNewItem({
      userId: '',
      name: '',
      purchaseDate: new Date(),
      expiryDate: new Date(),
      categoryId: '',
      storedIn: '',
      quantity: '',
      trashed: false,
    });
    if (Object.values(data).includes('')) {
      toast.error('All fields have to be filled.');
    } else {
      toast("We're adding your item!");
      dispatch(createItem(data))
        .unwrap()
        .then((originalPromiseResult) => {
          toast.success('Your item has been added!');
          // dispatch(setAddItemModalOpen(false));
        })
        .catch((rejectedValueOrSerializedError) => {
          toast.error('We could not add your item! Please try again.');
        });
    }
  };

  return (
    <div
      onMouseLeave={() => {
        setPurchasedOnDisplay(false);
        setExpirationOnDisplay(false);
      }}
    >
      <div className='flex items-center justify-evenly flex-col m-5 gap-2'>
        <div
          className='text-2xl xl:text-3xl font-lora font-bold text-orange tracking-wider'
          data-testid='add-item-heading'
        >
          Add an Item
        </div>
        <input
          type='text'
          data-testid='item-name'
          id='itemName'
          name='itemName'
          placeholder='Name'
          spellCheck={true}
          maxLength={23}
          value={newItem.name}
          autoComplete='off'
          className='w-full h-[30px] xl:h-[40px]  p-2 rounded-3xl bg-opacity-60 text-md tracking-wide text-white placeholder-white bg-mutedPink placeholder:font-bold font-lora text-center focus:bg-opacity-80 focus:outline-none'
          onChange={(e) => {
            setNewItem({ ...newItem, name: e.target.value });
          }}
        />
        <input
          type='text'
          data-testid='quantity'
          id='quantity'
          name='quantity'
          spellCheck={true}
          maxLength={9}
          placeholder='Quantity'
          autoComplete='off'
          value={newItem.quantity}
          className='w-full h-[30px] xl:h-[40px]  p-2 rounded-3xl bg-opacity-60 text-md tracking-wide text-white placeholder-white bg-mutedPink placeholder:font-bold font-lora text-center focus:bg-opacity-80 focus:outline-none'
          onChange={(e) => {
            setNewItem({ ...newItem, quantity: e.target.value });
          }}
        />
        {/* <input
                    type="text"
                    placeholder="Category"
                    className="w-full h=[40px] p-2 rounded-3xl bg-opacity-60 text-md tracking-wide text-white placeholder-white bg-mutedPink placeholder:font-bold font-lora text-center focus:bg-opacity-80 focus:outline-none"
                /> */}
        <DropdownSelect
          name='Category'
          newItem={newItem}
          setNewItem={setNewItem}
          purchaseDate={purchaseDate}
          setExpiryDate={setExpiryDate}
          setDaysInFocus={setDaysInFocus}
          resetState={resetState}
        />
        <DropdownSelect
          name='Compartment'
          newItem={newItem}
          setNewItem={setNewItem}
          purchaseDate={purchaseDate}
          setExpiryDate={setExpiryDate}
          setDaysInFocus={setDaysInFocus}
          resetState={resetState}
        />

        <div className='flex flex-col xl:flex-row gap-2 justify-between w-full'>
          <div
            data-testid='purchase-date-title'
            className={`${
              purchasedOnDisplay ? 'hidden' : ''
            } h-[30px] xl:h-[40px] px-1 w-full gap-1 flex text-sm items-center justify-center rounded-3xl bg-opacity-60 text-tracking-wide  text-white placeholder-white bg-mutedPink placeholder:font-bold font-lora text-center focus:bg-opacity-80 focus:outline-none`}
            onMouseEnter={() => setPurchasedOnDisplay(!purchasedOnDisplay)}
          >
            Purchased <img src='/images/cards/date_small.svg' />
          </div>
          <input
            data-testid='purchase-date'
            style={{ width: '100% !important' }}
            className={`${
              purchasedOnDisplay ? '' : 'hidden'
            } w-full h-[30px] xl:h-[40px] px-1 gap-1 flex text-sm items-center justify-center rounded-3xl bg-opacity-60 text-tracking-wide  text-white placeholder-white bg-mutedPink placeholder:font-bold font-lora text-center focus:bg-opacity-80 focus:outline-none`}
            placeholder='Purchased'
            defaultValue={todayStr}
            type='date'
            min={purchaseDate}
            onChange={(e) => {
              //"yyyy-MM-dd"
              setPurchaseDate(e.target.value);
              setNewItem({
                ...newItem,
                purchaseDate: parseISO(
                  format(new Date(e.target.value), 'yyyy-MM-dd')
                ),
              });
              let newExpiryDate = new Date(e.target.value);
              newExpiryDate.setDate(
                new Date(e.target.value).getDate() + daysInFocus
              );
              setExpiryDate(format(newExpiryDate, 'yyyy-MM-dd'));
            }}
          />
          <div
            data-testid='expiry-date-title'
            className={`${
              expirationOnDisplay ? 'hidden' : ''
            } h-[30px] xl:h-[40px] px-1 w-full gap-1 flex text-sm items-center justify-center rounded-3xl bg-opacity-60 text-tracking-wide  text-white placeholder-white bg-mutedPink placeholder:font-bold font-lora text-center focus:bg-opacity-80 focus:outline-none`}
            onMouseEnter={() => setExpirationOnDisplay(!expirationOnDisplay)}
          >
            Expiration <img src='/images/cards/date_small.svg' />
          </div>
          <input
            data-testid='expiry-date'
            className={`${
              expirationOnDisplay ? '' : 'hidden'
            } h-[30px] xl:h-[40px] px-1 w-full gap-1 flex text-sm items-center justify-center rounded-3xl bg-opacity-60 text-tracking-wide  text-white placeholder-white bg-mutedPink placeholder:font-bold font-lora text-center focus:bg-opacity-80 focus:outline-none`}
            placeholder='Expiration'
            type='date'
            min={purchaseDate}
            defaultValue={purchaseDate}
            value={expiryDate}
            onChange={(e) => {
              setExpiryDate(e.target.value);
              setNewItem({
                ...newItem,
                expiryDate: parseISO(
                  format(new Date(e.target.value), 'yyyy-MM-dd')
                ),
              });
            }}
          />
        </div>
        <div
          data-testid='add-item-button'
          className='flex justify-center w-full bg-orange rounded-3xl hover:bg-gradient-to-r from-orange to-pink cursor-pointer'
          onClick={handleSubmit}
        >
          <img src='/images/cards/add.svg' />
        </div>
      </div>
    </div>
  );
};

export default AddItemCard;
