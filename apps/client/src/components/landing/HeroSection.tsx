import daddy from '../../assets/img/landing-page/daddy.svg';
import freshShelf from '../../assets/img/landing-page/fresh-shelf.svg';

const HeroSection = () => {
  return (
    <div
      id='hero'
      className='w-full h-full flex flex-col-reverse lg:flex-row justify-evenly items-center px-10 pt-20'
    >
      {/* left item */}
      <div
        data-testid='hero-left-container'
        className='flex flex-col mb-10 md:mt-16 md:mb-32 h-auto lg:h-full w-full lg:w-3/6 justify-center items-center'
      >
        <div
          className='flex flex-col gap-2 w-[100%] lg:w-[90%] xl:w-[80%]'
          data-aos='fade-in'
          data-aos-duration='1000'
          data-aos-easing='ease-in-out'
          data-aos-once='false'
        >
          <h1
            data-testid='hero-left-container-item'
            className='w-lg font-bold text-center text-orange xs:text-lg sm:text-2xl md:text-4xl lg:text-4xl xl:text-5xl lg:text-left'
          >
            Tracking your fridge's inventory{' '}
            <br className='hidden md:block lg:hidden' />
            has never been easier!
          </h1>
          <p
            data-testid='hero-left-container-item'
            className='w-lg text-orangeLight text-center lg:text-left'
          >
            Play your part to reduce food waste with FridgeDaddy
          </p>
          <div
            data-testid='hero-left-container-item'
            className='flex justify-center lg:justify-start'
          >
            <a
              href='/register'
              className=' p-2 px-6 pt-2 text-white bg-orange rounded-full baseline hover:bg-gradient-to-r from-orange to-pink text-md '
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
      {/* right item */}
      <div
        data-testid='hero-right-container'
        className='h-auto lg:h-full w-full lg:w-3/6 flex justify-evenly lg:relative'
      >
        <img
          src={freshShelf}
          className='w-[200px] md:w-[300px] lg:w-[400px] xl:w-[500px] lg:absolute lg:top-[8%] lg:left-0 xl:top-0 xl:left-0'
          data-aos='fade-in'
          data-aos-duration='1000'
          data-aos-easing='ease-in-out'
          data-aos-once='false'
        />
        <img
          src={daddy}
          className='w-[200px] md:w-[300px] lg:w-[400px] xl:w-[500px] lg:absolute lg:top-[15%] lg:right-0 xl:top-[10%] xl:right-0 block lg:hidden'
        />
      </div>
    </div>
  );
};

export default HeroSection;
