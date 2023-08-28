import waves from '../../assets/img/landing-page/waves.svg';
import squareCircle from '../../assets/img/landing-page/square-circle.svg';
import circle from '../../assets/img/landing-page/circle.svg';

const UseFridgeDaddy = () => {
  return (
    <div
      id='hero'
      className='w-full  h-full flex flex-col-reverse lg:flex-row justify-evenly items-center pt-20 relative'
    >
      <img
        src={waves}
        className='absolute z-[-1] w-[300px] md:w-[400px] left-[-60px] top-[80px] rotate-[-15deg]'
      />
      <img
        src={squareCircle}
        className='absolute z-[-1] right-[-50px] top-[50px] w-[150px] md:w-[200px]'
      />
      <img
        src={circle}
        className='absolute z-[-1] w-[300px] md:w-[350px] bottom-[-15%] md:bottom-[-20%] left-[10%] md:left-[20%]'
      />

      {/* left item */}
      <div
        data-testid='wasted-left-container'
        className='flex flex-col h-full w-full lg:w-5/6 justify-center mt-2/3'
      >
        <div
          className='flex flex-col justify-center md:justify-start items-center md:items-start px-5 md:px-10 gap-3'
          // data-aos='fade-up'
          // data-aos-duration='1500'
          // data-aos-easing='ease-in-out'
          // data-aos-once='false'
        >
          <h1
            data-testid='wasted-left-container-item'
            className='w-lg font-bold text-center md:text-left text-orange text-3xl md:text-4xl xl:text-5xl font-lato'
          >
            Reduce food wastage when you use FridgeDaddy!
          </h1>
          <h1
            data-testid='wasted-left-container-item'
            className='text-md md:text-xl text-center md:text-left text-gray-500 md:w-5/6 font-lato'
          >
            FridgeDaddy helps you take proactive steps towards reducing food
            wastage. Tracking your food inventory gives you a better overview of
            your groceries and reduces overspending and food item neglect.
          </h1>
          <h1
            data-testid='wasted-left-container-item'
            className='text-md md:text-xl text-center md:text-left text-gray-500 md:w-5/6 font-lato '
          >
            Find out more by clicking the{' '}
            <strong className='text-orange'>Learn More</strong> button our
            navigation bar above!
          </h1>
        </div>
      </div>
      {/* right item */}
      <div
        data-testid='hero-right-container'
        className='h-auto lg:h-full w-full lg:w-3/6 flex justify-evenly lg:relative'
      ></div>
    </div>
  );
};

export default UseFridgeDaddy;
