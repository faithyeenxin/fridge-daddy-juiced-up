import '../../index.css';
import daddy from '../../assets/img/landing-page/daddy.svg';
import freshShelf from '../../assets/img/landing-page/fresh-shelf.svg';
import circle from '../../assets/img/landing-page/circle.svg';
import square from '../../assets/img/landing-page/square.svg';
import arrows from '../../assets/img/landing-page/arrows.svg';

const HeroSection = () => {
  return (
    <div
      id='hero'
      className='w-full pt-[20%] gap-10 md:gap-0 md:h-full flex flex-col-reverse lg:flex-row justify-evenly items-center md:pt-20 relative'
    >
      <img
        src={circle}
        className='absolute right-[-10%] md:right-[-5%] top-[10%] md:top-[20%] w-[150px] md:w-fit z-[-1]'
      />
      <img
        src={square}
        className='absolute left-[-5%] md:left-0 bottom-10 md:bottom-20 w-[250px] md:w-fit z-[-1]'
      />
      <img
        src={arrows}
        className='absolute z-[-1] bottom-5 md:bottom-10 blinking-element'
      />

      {/* left item */}
      <div
        data-testid='hero-left-container'
        className='flex flex-col mb-20 md:mt-16 md:mb-32 h-auto lg:h-full w-full lg:w-3/6 justify-center items-center'
      >
        <div
          className='flex flex-col gap-5 md:gap-10'
          data-aos='fade-in'
          data-aos-duration='1000'
          data-aos-easing='ease-in-out'
          data-aos-once='false'
        >
          <div className='flex flex-col gap-5 md:gap-0'>
            <h1
              data-testid='hero-left-container-item'
              className='w-lg font-bold text-orange text-4xl md:text-5xl xl:text-6xl text-center md:text-left font-lato'
            >
              Maximize Taste <br />
              Minimize Food Wastage
            </h1>
            <p
              data-testid='hero-left-container-item'
              className='w-lg text-gray-500 text-center md:text-left text-lg md:text-xl font-lato'
            >
              Join FridgeDaddy - Your Ultimate Food Inventory Solution.
            </p>
          </div>
          <div
            data-testid='hero-left-container-item'
            className='flex justify-center md:justify-start'
          >
            <a
              href='/register'
              className='p-2 px-6 text-white bg-orange rounded-full baseline hover:bg-gradient-to-r from-orange to-pink text-md font-lato font-normal'
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
          className='w-[200px] lg:w-[400px] xl:w-[500px] lg:absolute lg:top-[5%] lg:left-0 xl:top-0 xl:left-0'
          data-aos='fade-in'
          data-aos-duration='1000'
          data-aos-easing='ease-in-out'
          data-aos-once='false'
        />
        <img
          src={daddy}
          className='w-[250px] md:w-[300px] lg:w-[400px] xl:w-[500px] lg:absolute lg:top-[15%] lg:right-0 xl:top-[10%] xl:right-0 block lg:hidden'
        />
      </div>
    </div>
  );
};

export default HeroSection;
