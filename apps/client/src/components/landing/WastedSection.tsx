import daddy from '../../assets/img/landing-page/daddy.svg';
import rottenShelf from '../../assets/img/landing-page/rotten-shelf.svg';
import exlaimation from '../../assets/img/landing-page/exclaimation.svg';
import waves2 from '../../assets/img/landing-page/waves-2.svg';
const WastedSection = () => {
  return (
    <div
      id='hero'
      className='w-full h-[100vh] flex flex-col lg:flex-row justify-evenly items-center py-40 md:py-0 relative'
    >
      <img
        src={exlaimation}
        className='absolute z-[-1] top-[150px] md:top-[120px] left-[5px] md:left-[-20px] w-[30px] md:w-[50px] rotate-[-5deg]'
      />
      <img
        src={waves2}
        className='absolute z-[-1] w-[200px] md:w-[350px] right-[-50px] top-[60px]'
      />

      {/* left item */}
      <div
        data-testid='wasted-left-container'
        className='flex flex-col h-full w-full lg:w-1/2 justify-center mt-2/3'
      >
        <div
          className='flex flex-col justify-center md:justify-start items-center md:items-start gap-10 px-5 md:px-5'
          // data-aos='fade-up'
          // data-aos-duration='1500'
          // data-aos-easing='ease-in-out'
          // data-aos-once='false'
        >
          <div className='flex flex-col gap-3'>
            <h1
              data-testid='wasted-left-container-item'
              className='w-lg font-bold text-center md:text-left text-orange text-3xl md:text-4xl xl:text-5xl font-lato'
            >
              Food waste in Singapore <br className='hidden md:block' /> is
              rising.
            </h1>
            <h1
              data-testid='wasted-left-container-item'
              className='text-md md:text-xl text-center md:text-left text-gray-500 md:w-5/6 font-lato '
            >
              In the past 10 years, food waste in Singapore has risen by 40%. It
              was said that in 2016, the amount of food waste generated was
              equivalent to the weight of over 3,500 MRT trains — about 791,000
              tonnes.*
            </h1>
          </div>
          <div className='md:flex-col gap-3 items-start border-solid border-2 border-orange w-full h-full rounded-xl text-left justify-start p-5 hidden lg:block'>
            <h1
              data-testid='wasted-left-container-item'
              className='w-lg font-bold text-center md:text-left text-2xl text-orange font-lato'
            >
              It's a problem we all relate to...
            </h1>
            <h3 className='text-gray-500 italic text-md'>
              Have you ever purchased ingredients, only to realize that you
              already had those items at home?
            </h3>
            <h3 className='text-gray-500 italic text-md'>
              Or have you ever discovered neglected food items at the back of
              your fridge?
            </h3>
            <h3 className='text-gray-500 text-md'>
              You&apos;re not alone! 27% of households in Singapore had
              leftovers after a meal at least half the time and 24% said they
              often threw away spoilt or expired food.
            </h3>
            <h3 className='text-gray-500 text-md'>
              The top two reasons for food wastage in households were{' '}
              <strong>buying too much </strong>and{' '}
              <strong>
                food items being hidden at the back of the fridge.**
              </strong>
            </h3>
          </div>
          <p className='text-gray-500 text-xs hidden md:block'>
            */ **: (NEA, 2017) Half Of Food Waste Thrown Away By Singapore
            Households Can Be Prevented: NEA Household Waste Study
          </p>
        </div>
      </div>
      {/* right item */}
      <div
        data-testid='hero-right-container'
        className='h-auto lg:h-full w-full lg:w-3/6 flex justify-evenly lg:relative'
      >
        <img
          src={rottenShelf}
          className='w-[200px] md:w-[300px] lg:w-[400px] xl:w-[500px] lg:absolute lg:top-[8%] lg:left-0 xl:top-20 xl:left-0'
          // data-aos='fade-in'
          // data-aos-duration='1000'
          // data-aos-easing='ease-in-out'
          // data-aos-once='false'
        />
        <img
          src={daddy}
          className='w-[250px] md:w-[300px] lg:w-[400px] xl:w-[500px] lg:absolute lg:top-[15%] lg:right-0 xl:top-[10%] xl:right-0 block lg:hidden'
        />
      </div>
    </div>
  );
};

export default WastedSection;
