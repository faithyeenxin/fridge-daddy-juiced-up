import React, { useState, useEffect } from 'react';
import {
  filterCategories,
  showCategories,
  showFilteredCategories,
} from '../../app/slices/categoriesSlice';
import { getUserId } from '../../app/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { ICategory, IItem } from '../../interface';
import DropdownSelect from '../button/DropdownSelect';
import { capitalizeWords } from '../utility/functions/capitalizeWord';
import { format, min, max, add, parseISO } from 'date-fns';
import { getDurationFromDays } from '../utility/functions/getDurationFromDays';
import { addDurationToDate } from '../utility/functions/addDurationToDate';
import {
  createItem,
  showAddItemLoadingState,
} from '../../app/slices/itemsSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { parse } from 'path';
import { wordContainsSubstring } from '../utility/functions/wordContainsSubstring';

interface IShelfLife {
  id: number;
  name: string;
  days: number;
}
const AddItemCard = () => {
  const today = new Date();
  const todayStr = format(today, 'yyyy-MM-dd');
  const token: any = useAppSelector(getUserId);
  const addItemLoading = useAppSelector(showAddItemLoadingState);
  const dispatch = useAppDispatch();
  const categories = useAppSelector(showCategories);
  const filteredCategories = useAppSelector(showFilteredCategories);

  const [resetState, setResetState] = useState(false);
  const [shelfLife, setShelfLife] = useState([
    { id: 1, name: 'Pantry', days: 0 },
    { id: 2, name: 'Fridge', days: 0 },
    { id: 3, name: 'Freezer', days: 0 },
  ]);
  const [purchasedOnDisplay, setPurchasedOnDisplay] = useState(false);
  const [expirationOnDisplay, setExpirationOnDisplay] = useState(false);
  const [purchaseDate, setPurchaseDate] = useState(todayStr);
  const [expiryDate, setExpiryDate] = useState(todayStr);
  const [daysInFocus, setDaysInFocus] = useState(0);
  const [resetData, setResetData] = useState(false);
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
        })
        .catch((rejectedValueOrSerializedError) => {
          toast.error('We could not add your item! Please try again.');
        });
    }
  };
  const handleFilteredCategories = (e: any) => {
    dispatch(filterCategories(e.target.value));
  };

  return (
    <div
      className='flex flex-col w-full h-[380px] bg-offWhite rounded-lg'
      onMouseLeave={() => {
        setPurchasedOnDisplay(false);
        setExpirationOnDisplay(false);
      }}
    >
      <div className='flex items-center justify-evenly flex-col h-full m-5'>
        <div className='text-3xl font-lora font-bold text-orange tracking-wider'>
          Add an Item
        </div>
        <input
          type='text'
          id='itemName'
          name='itemName'
          placeholder='Name'
          spellCheck={true}
          maxLength={23}
          value={newItem.name}
          autoComplete='off'
          className='w-full h=[40px] p-2 rounded-3xl bg-opacity-60 text-md tracking-wide text-white placeholder-white bg-mutedPink placeholder:font-bold font-lora text-center focus:bg-opacity-80 focus:outline-none'
          onChange={(e) => {
            setNewItem({ ...newItem, name: e.target.value });
          }}
        />
        <input
          type='text'
          id='quantity'
          name='quantity'
          spellCheck={true}
          maxLength={9}
          placeholder='Quantity'
          autoComplete='off'
          value={newItem.quantity}
          className='w-full h=[40px] p-2 rounded-3xl bg-opacity-60 text-md tracking-wide text-white placeholder-white bg-mutedPink placeholder:font-bold font-lora text-center focus:bg-opacity-80 focus:outline-none'
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
          items={filteredCategories}
          handleFilteredCategories={handleFilteredCategories}
          newItem={newItem}
          setNewItem={setNewItem}
          setShelfLife={setShelfLife}
          purchaseDate={purchaseDate}
          setExpiryDate={setExpiryDate}
          setDaysInFocus={setDaysInFocus}
          resetState={resetState}
        />
        <DropdownSelect
          name='Compartment'
          items={shelfLife}
          handleFilteredCategories={handleFilteredCategories}
          newItem={newItem}
          setNewItem={setNewItem}
          setShelfLife={setShelfLife}
          purchaseDate={purchaseDate}
          setExpiryDate={setExpiryDate}
          setDaysInFocus={setDaysInFocus}
          resetState={resetState}
        />

        <div className='flex gap-2 justify-around w-full'>
          <div
            className={`${
              purchasedOnDisplay ? 'hidden' : ''
            } px-1 w-full gap-1 flex items-center justify-center rounded-3xl bg-opacity-60 text- tracking-wide  text-white placeholder-white bg-mutedPink placeholder:font-bold font-lora text-center focus:bg-opacity-80 focus:outline-none`}
            onMouseEnter={() => setPurchasedOnDisplay(!purchasedOnDisplay)}
          >
            Purchased <img src='images/cards/date_small.svg' />
          </div>
          <input
            className={`${
              purchasedOnDisplay ? '' : 'hidden'
            } px-1 w-full rounded-3xl bg-opacity-60 text-sm tracking-wide text-white placeholder-white bg-mutedPink placeholder:font-bold font-lora text-center focus:bg-opacity-80 focus:outline-none`}
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
            className={`${
              expirationOnDisplay ? 'hidden' : ''
            } px-1 w-full gap-1 flex items-center justify-center rounded-3xl bg-opacity-60 text- tracking-wide  text-white placeholder-white bg-mutedPink placeholder:font-bold font-lora text-center focus:bg-opacity-80 focus:outline-none`}
            onMouseEnter={() => setExpirationOnDisplay(!expirationOnDisplay)}
          >
            Expiration <img src='images/cards/date_small.svg' />
          </div>
          <input
            className={`${
              expirationOnDisplay ? '' : 'hidden'
            } px-1 w-full rounded-3xl bg-opacity-60 text-sm tracking-wide text-white placeholder-white bg-mutedPink placeholder:font-bold font-lora text-center focus:bg-opacity-80 focus:outline-none `}
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
          <img
            onClick={handleSubmit}
            src='images/cards/add.svg'
            className='bg-orange rounded-3xl hover:bg-gradient-to-r from-orange to-pink'
          />
        </div>
      </div>
    </div>
  );
};

export default AddItemCard;
