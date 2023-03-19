import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/store';
import { Dialog, Transition } from '@headlessui/react';
import AddItemCard from '../reusables/cards/AddItemCard';
import AddCategoryCard from '../reusables/cards/AddCategoryCard';
import FilterCard from '../reusables/cards/FilterCard';
import {
  closeAddCategoryModalOpen,
  closeAddItemModalOpen,
  closeAddModalOpen,
  closeAllModals,
  setAddCategoryModalOpen,
  setAddItemModalOpen,
  setAddModalOpen,
  setFilterModalOpen,
  setIngredientModalOpen,
  setNutritionModalOpen,
  showAddCategoryIsOpen,
  showAddIsOpen,
  showAddItemIsOpen,
  showFilterIsOpen,
  showIngredientIsOpen,
  showNutritionIsOpen,
} from '../../app/slices/modalSlice';
import RecipeNutritionCard from '../reusables/cards/RecipeNutritionCard';
import RecipeIngredientsCard from '../reusables/cards/RecipeIngredientsCard';
import {
  showSingleRecipeData,
  showSingleRecipeNutrition,
} from '../../app/slices/recipesSlice';

const LoggedInNavBar = () => {
  const { id } = useParams();
  console.log(`id: ${id}`);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [navStatus, setNavStatus] = useState('');
  const [hamburgMenuStatus, setHamburgMenuStatus] = useState('hidden');
  const addIsOpen = useAppSelector(showAddIsOpen);
  const addItemIsOpen = useAppSelector(showAddItemIsOpen);
  const addCategoryIsOpen = useAppSelector(showAddCategoryIsOpen);
  const filterIsOpen = useAppSelector(showFilterIsOpen);
  const recipeDataIsOpen = useAppSelector(showIngredientIsOpen);
  const recipeNutritionIsOpen = useAppSelector(showNutritionIsOpen);
  const [addModelOpen, setAddModelOpen] = useState(true);

  const navigate = useNavigate();
  let divRef = useRef<any>();
  const recipeData = useAppSelector(showSingleRecipeData);
  const recipeNutrition = useAppSelector(showSingleRecipeNutrition);
  useEffect(() => {
    const handler = (event: any) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setNavStatus('');
        setHamburgMenuStatus('hidden');
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [navStatus]);

  const navBarClicked = () => {
    if (navStatus !== 'open') {
      setNavStatus('open');
      setHamburgMenuStatus('');
    } else {
      setNavStatus('');
      setHamburgMenuStatus('hidden');
    }
  };

  return (
    // <nav className="bg-bgColor py-2.5 pr-5 md:pr-10 sticky w-full z-20 top-0 left-0 p-7">
    <nav className='bg-bgColor py-2.5 md:py-4 sticky w-full z-20 top-0 left-0 p-7'>
      {/*Flex container */}
      <div className='flex items-center justify-between sm:mx-5 md:mx-0'>
        {/* Logo*/}
        <div className='flex'>
          <div
            className='text-3xl font-bold tracking-wider text-orange hover:cursor-pointer'
            onClick={() => {
              navigate('/home');
              setNavStatus('');
              setHamburgMenuStatus('hidden');
            }}
          >
            FridgeDaddy
          </div>
        </div>
        {/* Menu Items */}
        <div className='flex space-x-3 md:text-l lg:text-xl tracking-wide items-center align-center justify-between'>
          {location.pathname === '/home' && (
            <>
              <img
                className='flex lg:hidden hover:cursor-pointer'
                src='/images/navbar/add_icon.svg'
                onClick={() => dispatch(setAddModalOpen())}
              />
              <img
                className='flex lg:hidden hover:cursor-pointer'
                src='/images/navbar/filter_icon.svg'
                onClick={() => dispatch(setFilterModalOpen())}
              />
            </>
          )}
          {id && location.pathname === `/recipes/${id}` && (
            <>
              <img
                className='flex lg:hidden hover:cursor-pointer'
                src='/images/navbar/ingredients.svg'
                onClick={() => dispatch(setIngredientModalOpen())}
              />
              <img
                className='flex lg:hidden hover:cursor-pointer'
                src='/images/navbar/nutrition.svg'
                onClick={() => dispatch(setNutritionModalOpen())}
              />
            </>
          )}
          <div ref={divRef}>
            {/* Hambuger Icon */}
            <button
              id='menu-btn'
              className={`${navStatus} block hamburger focus:outline-none`}
              onClick={navBarClicked}
            >
              <span className='hamburger-top '></span>
              <span className='hamburger-middle'></span>
              <span className='hamburger-bottom'></span>
            </button>

            {/* Mobile Menu */}
            <div
              id='menu'
              className={`${hamburgMenuStatus} absolute flex flex-col items-center self-end mx-[10%] py-8 mt-8 space-y-6 font-bold bg-white sm:self-center left-2 right-2 drop-shadow-md bg-opacity-80 rounded-2xl`}
            >
              <div
                className='hover:text-orange pt-2 md:text-2xl tracking-wider hover:cursor-pointer'
                onClick={() => {
                  navigate(`/recipes`);
                  setNavStatus('');
                  setHamburgMenuStatus('hidden');
                }}
              >
                Recipes
              </div>
              <div
                className='hover:text-orange pt-2 md:text-2xl tracking-wider hover:cursor-pointer'
                onClick={() => {
                  navigate(`/account`);
                  setNavStatus('');
                  setHamburgMenuStatus('hidden');
                }}
              >
                Account
              </div>
              <div
                className='md:block p-2 px-6 pt-2 text-white bg-orange rounded-full baseline hover:bg-gradient-to-r from-orange to-pink md:text-2xl hover:cursor-pointer'
                onClick={() => {
                  sessionStorage.removeItem('fridgeDaddyToken');
                  navigate(`/`);
                  setNavStatus('');
                  setHamburgMenuStatus('hidden');
                }}
              >
                Log Out
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ADD BUTTON MODAL */}
      <Transition appear show={addIsOpen} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-10'
          onClose={() => dispatch(closeAddModalOpen())}
        >
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
                <Dialog.Panel className='w-full max-w-md flex flex-col items-center justify-center transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='flex text-lg font-medium leading-6 text-red-400'
                  >
                    What would you like to add?
                  </Dialog.Title>
                  <div className='mt-4'>
                    <button
                      type='button'
                      className='mr-2 inline-flex justify-center rounded-2xl border border-transparent bg-orange px-4 py-2 text-sm font-medium text-white hover:bg-gradient-to-r from-orange to-pink focus:outline-none'
                      onClick={() => {
                        dispatch(setAddItemModalOpen());
                      }}
                    >
                      Add Item
                    </button>
                    <button
                      type='button'
                      className='mr-2 inline-flex justify-center rounded-2xl border border-transparent bg-orange px-4 py-2 text-sm font-medium text-white hover:bg-gradient-to-r from-orange to-pink focus:outline-none'
                      onClick={() => {
                        dispatch(setAddCategoryModalOpen());
                      }}
                    >
                      Add Category
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {/* ADD ITEM BUTTON MODAL */}
      <Transition appear show={addItemIsOpen} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-10'
          onClose={() => dispatch(closeAddItemModalOpen())}
        >
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
                <Dialog.Panel className='w-full max-w-md flex flex-col items-center justify-center transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  {/* <Dialog.Title
                    as='h3'
                    className='flex text-lg font-medium leading-6 text-red-400'
                  >
                    Add An Item
                  </Dialog.Title> */}
                  <div className='w-full'>
                    <AddItemCard />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {/* ADD CATEGORY BUTTON MODAL */}
      <Transition appear show={addCategoryIsOpen} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-10'
          onClose={() => dispatch(closeAddCategoryModalOpen())}
        >
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
                <Dialog.Panel className='w-full max-w-md flex flex-col items-center justify-center transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <div className='w-full'>
                    <AddCategoryCard />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {/* FILTER BUTTON MODAL */}
      <Transition appear show={filterIsOpen} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-10'
          onClose={() => dispatch(closeAllModals())}
        >
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
                <Dialog.Panel className='w-[250px] max-h-[580px] max-w-md flex flex-col items-center justify-center transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <FilterCard />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {/* INGREDIENTS BUTTON MODAL */}
      <Transition appear show={recipeDataIsOpen} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-10'
          onClose={() => dispatch(closeAllModals())}
        >
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
                <Dialog.Panel className='w-full max-h-[580px] max-w-md flex flex-col items-center justify-center transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <RecipeIngredientsCard recipeData={recipeData} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {/* NUTRITION BUTTON MODAL */}
      <Transition appear show={recipeNutritionIsOpen} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-10'
          onClose={() => dispatch(closeAllModals())}
        >
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
                <Dialog.Panel className='w-full max-h-[580px] max-w-md flex flex-col items-center justify-center transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <RecipeNutritionCard recipeNutrition={recipeNutrition} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </nav>
  );
};

export default LoggedInNavBar;
