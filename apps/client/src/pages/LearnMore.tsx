import React from 'react';
import addItemAndCategory from '../../public/images/gif/add-item-and-add-category.gif';
import searchFridge from '../../public/images/gif/filtering.gif';
import searchRecipe from '../../public/images/gif/search-recipes.gif';
const LearnMore = () => {
  return (
    <>
      <div className='w-full h-full'>
        <div className='w-full h-[80vh] lg:h-[90vh] flex flex-col xl:flex-row justify-evenly items-center'>
          {/* left item */}
          <div className='flex flex-col mb-10 md:mt-16 md:mb-32 h-auto w-full xl:w-3/6 justify-center items-center'>
            <div
              className='flex flex-col gap-2 w-[100%] lg:w-[90%] xl:w-[80%]'
              data-aos='fade-in'
              data-aos-duration='1000'
              data-aos-easing='ease-in-out'
              data-aos-once='false'
            >
              <h1 className='w-lg font-normal text-center text-orange xs:text-lg sm:text-2xl md:text-4xl lg:text-4xl xl:text-5xl xl:text-left'>
                Manage items in your fridge
              </h1>
            </div>
          </div>
          {/* right item */}
          <div className='h-auto lg:h-full w-full xl:w-3/6 flex justify-evenly items-center lg:relative'>
            <img
              src={addItemAndCategory}
              className='w-[850px] md:w-[900px] md:h-[500px] border-2 border-orange rounded-2xl'
              data-aos='fade-in'
              data-aos-duration='1000'
              data-aos-easing='ease-in-out'
              data-aos-once='false'
            />
          </div>
        </div>
      </div>
      <div className='w-full h-full'>
        <div className='w-full h-[80vh] lg:h-[90vh] flex flex-col xl:flex-row justify-evenly items-center'>
          {/* left item */}
          <div className='flex flex-col mb-10 md:mt-16 md:mb-32 h-auto w-full xl:w-3/6 justify-center items-center'>
            <div
              className='flex flex-col gap-2 w-[100%] lg:w-[90%] xl:w-[80%]'
              data-aos='fade-in'
              data-aos-duration='1000'
              data-aos-easing='ease-in-out'
              data-aos-once='false'
            >
              <h1 className='w-lg font-normal text-center text-orange xs:text-lg sm:text-2xl md:text-4xl lg:text-4xl xl:text-5xl xl:text-left'>
                Keep track of what's in your inventory
              </h1>
            </div>
          </div>
          {/* right item */}
          <div className='h-auto lg:h-full w-full xl:w-3/6 flex justify-evenly items-center lg:relative'>
            <img
              src={searchFridge}
              className='w-[850px] md:w-[900px] md:h-[500px] border-2 border-orange rounded-2xl'
              data-aos='fade-in'
              data-aos-duration='1000'
              data-aos-easing='ease-in-out'
              data-aos-once='false'
            />
          </div>
        </div>
      </div>
      <div className='w-full h-full'>
        <div className='w-full h-[80vh] lg:h-[90vh] flex flex-col xl:flex-row justify-evenly items-center'>
          {/* left item */}
          <div className='flex flex-col mb-10 md:mt-16 md:mb-32 h-auto lg:h-full w-full xl:w-3/6 justify-center items-center'>
            <div
              className='flex flex-col gap-2 w-[100%] lg:w-[90%] xl:w-[80%]'
              data-aos='fade-in'
              data-aos-duration='1000'
              data-aos-easing='ease-in-out'
              data-aos-once='false'
            >
              <h1 className='w-lg font-normal text-center text-orange xs:text-lg sm:text-2xl md:text-4xl lg:text-4xl xl:text-5xl xl:text-left'>
                Get curated recipes based on your fridge's items
              </h1>
            </div>
          </div>
          {/* right item */}
          <div className='h-auto lg:h-full w-full xl:w-3/6 flex justify-evenly items-center lg:relative'>
            <img
              src={searchRecipe}
              className='w-[850px] md:w-[900px] md:h-[500px] border-2 border-orange rounded-2xl'
              data-aos='fade-in'
              data-aos-duration='1000'
              data-aos-easing='ease-in-out'
              data-aos-once='false'
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LearnMore;
