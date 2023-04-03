import daddy from '../../assets/img/landing-page/daddy.svg';
import rottenShelf from '../../assets/img/landing-page/rotten-shelf.svg';

const WastedSection = () => {
  return (
    <div
      id='hero'
      className='w-full h-[60vh] lg:h-[90vh] flex flex-col lg:flex-row justify-evenly items-center'
    >
      {/* left item */}
      <div
        data-testid='wasted-left-container'
        className='flex flex-col mb-10 md:mt-16 md:mb-32 h-auto lg:h-full w-full lg:w-3/6 justify-center items-center'
      >
        <div
          className='flex flex-col gap-2 w-[100%] lg:w-[90%] xl:w-[80%]'
          data-aos='fade-up'
          data-aos-duration='1500'
          data-aos-easing='ease-in-out'
          data-aos-once='false'
        >
          <h1
            data-testid='wasted-left-container-item'
            className='w-lg font-bold text-center text-orange xs:text-lg sm:text-2xl md:text-4xl lg:text-4xl xl:text-5xl lg:text-left'
          >
            Did you know that one third of all food produced are lost or wasted?
          </h1>
        </div>
      </div>
      {/* right item */}
      <div className='h-auto lg:h-full w-full lg:w-3/6 flex justify-evenly lg:relative'>
        <img
          src={rottenShelf}
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

export default WastedSection;
