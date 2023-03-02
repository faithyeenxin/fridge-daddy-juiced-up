import { differenceInDays, parseISO } from 'date-fns';
import format from 'date-fns/format';
import React, { useState, Fragment, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  getItemByItemId,
  getItemsByUserId,
  trashItem,
  untrashItem,
  updateItem,
} from '../app/slices/itemsSlice';
import { useAppDispatch, useAppSelector } from '../app/store';
import { IItem } from '../interface';
import { capitalizeWords } from './utility/functions/capitalizeWord';
import { Dialog, Transition } from '@headlessui/react';
import DropdownSelect from './button/DropdownSelect';
import {
  filterCategories,
  getCategory,
  getCategoryById,
  showCategories,
  showFilteredCategories,
} from '../app/slices/categoriesSlice';
import { getUserId } from '../app/slices/userSlice';
import isAfter from 'date-fns/isAfter';

interface ISingleItemProps {
  item: IItem;
  colorState: boolean;
}
const SingleItemRow = ({ item, colorState }: ISingleItemProps) => {
  const token: any = useAppSelector(getUserId);
  const dispatch = useAppDispatch();
  const category = useAppSelector(getCategory);
  const navigate = useNavigate();
  const today = new Date();
  const todayStr = format(today, 'yyyy-MM-dd');
  const [purchaseDate, setPurchaseDate] = useState(todayStr);
  const [expiryDate, setExpiryDate] = useState(todayStr);
  const [expiryError, setExpiryError] = useState(false);
  const [daysInFocus, setDaysInFocus] = useState(0);
  const [binHoverState, setbinHoverState] = useState(false);
  const [isTrashedHoverState, setisTrashedHoverState] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  const [resetState, setResetState] = useState(false);
  const allCategories = useAppSelector(showCategories);
  const filteredCategories = useAppSelector(showFilteredCategories);
  const [shelfLife, setShelfLife] = useState([
    { id: 1, name: 'Pantry', days: 0 },
    { id: 2, name: 'Fridge', days: 0 },
    { id: 3, name: 'Freezer', days: 0 },
  ]);
  const [edit, setEdit] = useState(false);

  function closeModal() {
    setEdit(false);
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleFilteredCategories = (e: any) => {
    dispatch(filterCategories(e.target.value));
  };

  const [newItem, setNewItem] = useState<IItem>({
    userId: token.id,
    id: item.id,
    name: item.name,
    purchaseDate: new Date(item.purchaseDate),
    expiryDate: new Date(item.expiryDate),
    categoryId: item.categoryId,
    storedIn: item.storedIn,
    quantity: item.quantity,
    trashed: item.trashed,
  });

  return (
    <div
      id={`item-${item.id}`}
      key={item.id}
      className={`flex hover:cursor-default ${
        colorState ? 'bg-tableOffWhite' : 'bg-tablePink'
      } font-lora text-black text-sm text-center items-center h-[40px]`}
    >
      <div className='w-2/12 tracking-wide'>
        {differenceInDays(new Date(item.expiryDate), today)}
      </div>
      <div
        className='w-4/12 hover:cursor-pointer hover:text-orangeLight'
        onClick={openModal}
      >
        {capitalizeWords(item.name)}
      </div>
      <div className='w-1/12 hover:cursor-default'>
        {capitalizeWords(item.quantity)}
      </div>
      <div className='w-2/12 hover:cursor-default'>{item.storedIn}</div>
      <div className='w-2/12 hover:cursor-default'>
        {format(new Date(item.purchaseDate), 'd MMM yy')}
      </div>
      <div className='w-2/12 hover:cursor-default'>
        {format(new Date(item.expiryDate), 'd MMM yy')}
      </div>
      <div className='w-1/12 flex items-center justify-center hover:cursor-pointer'>
        {item.trashed ? (
          <div
            onMouseEnter={() => setisTrashedHoverState(true)}
            onMouseLeave={() => setisTrashedHoverState(false)}
            onClick={() => {
              dispatch(untrashItem(item?.id));
            }}
          >
            <img
              src={
                isTrashedHoverState
                  ? 'images/table/unchecked.svg'
                  : 'images/table/checked.svg'
              }
            />
          </div>
        ) : (
          <div
            onMouseEnter={() => setbinHoverState(true)}
            onMouseLeave={() => setbinHoverState(false)}
            onClick={() => {
              dispatch(trashItem(item?.id));
            }}
          >
            <img
              src={
                binHoverState
                  ? 'images/table/untrashed-red.svg'
                  : 'images/table/untrashed-black.svg'
              }
            />
          </div>
        )}
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
                <Dialog.Panel className=' font-lora w-[400px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='flex text-2xl font-medium leading-6 text-orange'
                  >
                    {capitalizeWords(item.name)}
                  </Dialog.Title>
                  <div className='my-5 flex flex-col'>
                    <div>
                      <label className='text-xs px-2 text-gray-500 italic'>
                        Quantity
                      </label>
                      {!edit && (
                        <div className='w-full h=[40px] hover:cursor-default p-2 rounded-3xl bg-opacity-60 text-md tracking-wide text-white placeholder-white bg-mutedPink placeholder:font-bold font-lora text-center focus:bg-opacity-80 focus:outline-none'>
                          {capitalizeWords(item.quantity)}
                        </div>
                      )}
                      {edit && (
                        <input
                          type='text'
                          id='quantity'
                          name='quantity'
                          spellCheck={true}
                          maxLength={9}
                          placeholder='Quantity'
                          autoComplete='off'
                          defaultValue={capitalizeWords(item.quantity)}
                          className='w-full h=[40px] p-2 rounded-3xl bg-opacity-60 text-md tracking-wide text-white placeholder-white bg-mutedPink placeholder:font-bold font-lora text-center focus:bg-opacity-80 focus:outline-none'
                          onChange={(e) => {
                            console.log(e.target.value);
                            setNewItem({
                              ...newItem,
                              quantity: e.target.value,
                            });
                          }}
                        />
                      )}
                    </div>
                    <div>
                      <label className='text-xs px-2 text-gray-500 italic'>
                        Category
                      </label>
                      {!edit && (
                        <div className='w-full h=[40px] hover:cursor-default  p-2 rounded-3xl bg-opacity-60 text-md tracking-wide text-white placeholder-white bg-mutedPink placeholder:font-bold font-lora text-center focus:bg-opacity-80 focus:outline-none'>
                          {capitalizeWords(item?.category?.name)}
                        </div>
                      )}
                      {edit && (
                        <DropdownSelect
                          // name={`${capitalizeWords(item?.category?.name)}`}
                          name='Category'
                          newItem={newItem}
                          setNewItem={setNewItem}
                          purchaseDate={purchaseDate}
                          setExpiryDate={setExpiryDate}
                          setDaysInFocus={setDaysInFocus}
                          resetState={resetState}
                        />
                      )}
                    </div>
                    <div>
                      <label className='text-xs px-2 text-gray-500 italic'>
                        Stored In
                      </label>
                      {!edit && (
                        <div className='w-full h=[40px] hover:cursor-default p-2 rounded-3xl bg-opacity-60 text-md tracking-wide text-white placeholder-white bg-mutedPink placeholder:font-bold font-lora text-center focus:bg-opacity-80 focus:outline-none'>
                          {capitalizeWords(item.storedIn)}
                        </div>
                      )}
                      {edit && (
                        <DropdownSelect
                          // name={`${capitalizeWords(item?.storedIn)}`}
                          name='Compartment'
                          newItem={newItem}
                          setNewItem={setNewItem}
                          purchaseDate={purchaseDate}
                          setExpiryDate={setExpiryDate}
                          setDaysInFocus={setDaysInFocus}
                          resetState={resetState}
                        />
                      )}
                    </div>
                    <div>
                      <label className='text-xs px-2 text-gray-500 italic'>
                        Purchased On
                      </label>
                      <input
                        disabled={!edit}
                        type='date'
                        id='purchasedOn'
                        name='purchasedOn'
                        spellCheck={true}
                        maxLength={9}
                        placeholder='Purchased On'
                        autoComplete='off'
                        defaultValue={format(
                          new Date(newItem.purchaseDate),
                          'yyyy-MM-dd'
                        )}
                        className='w-full h=[40px] p-2 rounded-3xl bg-opacity-70 text-md tracking-wide text-white placeholder-white bg-mutedPink placeholder:font-bold font-lora text-center focus:bg-opacity-90 focus:outline-none'
                        onChange={(e) => {
                          setNewItem({
                            ...newItem,
                            purchaseDate: format(
                              new Date(e.target.value),
                              'yyyy-MM-dd'
                            ),
                          });
                          setPurchaseDate(
                            format(new Date(e.target.value), 'yyyy-MM-dd')
                          );
                        }}
                      />
                    </div>
                    <div>
                      <label className='text-xs px-2 text-gray-500 italic'>
                        Expiring On
                      </label>
                      <input
                        disabled={!edit}
                        type='date'
                        id='expireOn'
                        name='expireOn'
                        spellCheck={true}
                        maxLength={9}
                        min={
                          new Date(newItem.purchaseDate)
                            .toISOString()
                            .split('T')[0]
                        }
                        placeholder='Expire On'
                        autoComplete='off'
                        defaultValue={format(
                          new Date(newItem.expiryDate),
                          'yyyy-MM-dd'
                        )}
                        className='w-full h=[40px] p-2 rounded-3xl bg-opacity-70 text-md tracking-wide text-white placeholder-white bg-mutedPink placeholder:font-bold font-lora text-center focus:bg-opacity-90 focus:outline-none'
                        onChange={(e) => {
                          setNewItem({
                            ...newItem,
                            expiryDate: format(
                              new Date(e.target.value),
                              'yyyy-MM-dd'
                            ),
                          });
                          setExpiryDate(
                            format(new Date(e.target.value), 'yyyy-MM-dd')
                          );
                        }}
                      />
                      <p
                        className={`text-xs text-red-400 text-center ${
                          expiryError ? '' : 'hidden'
                        }`}
                      >
                        Expiry Date must be after Purchase Date!
                      </p>
                    </div>
                  </div>
                  <div className='mt-4 flex justify-center'>
                    <button
                      type='button'
                      className='mr-2 w-[200px] inline-flex justify-center rounded-3xl border border-transparent bg-orange px-4 py-2 text-sm font-medium text-white hover:bg-gradient-to-r from-orange to-pink focus:outline-none '
                      onClick={(e) => {
                        setEdit(!edit);
                      }}
                    >
                      {edit ? 'Cancel Edit' : 'Edit'}
                    </button>
                    {edit && (
                      <button
                        type='button'
                        className='mr-2 w-[200px] inline-flex justify-center rounded-3xl border border-transparent bg-orange px-4 py-2 text-sm font-medium text-white hover:bg-gradient-to-r from-orange to-pink focus:outline-none focus-visible:ring-2'
                        onClick={(e) => {
                          console.log('submit edit');
                          console.log(newItem);
                          if (
                            !isAfter(
                              new Date(newItem.expiryDate),
                              new Date(newItem.purchaseDate)
                            )
                          ) {
                            setExpiryError(true);
                          } else {
                            let data = {
                              ...newItem,
                              userId: token.id,
                              purchaseDate: parseISO(
                                format(
                                  new Date(newItem.purchaseDate),
                                  'yyyy-MM-dd'
                                )
                              ),
                              expiryDate: parseISO(
                                format(
                                  new Date(newItem.expiryDate),
                                  'yyyy-MM-dd'
                                )
                              ),
                            };
                            console.log(data);
                            dispatch(updateItem(data))
                              .unwrap()
                              .then((originalPromiseResult) => {
                                toast.success('Your item has been updated!');
                                dispatch(getItemsByUserId(token.id));
                                closeModal();
                              })
                              .catch((rejectedValueOrSerializedError) => {
                                toast.error(
                                  'We could not update your item! Please try again.'
                                );
                              });
                          }
                        }}
                      >
                        Submit
                      </button>
                    )}
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

export default SingleItemRow;
