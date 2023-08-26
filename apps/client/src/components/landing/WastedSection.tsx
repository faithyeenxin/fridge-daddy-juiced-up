import daddy from '../../assets/img/landing-page/daddy.svg';
import rottenShelf from '../../assets/img/landing-page/rotten-shelf.svg';

const WastedSection = () => {
  return (
    <div
      id='hero'
      className='w-full h-[100vh] flex flex-col lg:flex-row justify-evenly items-center py-40 md:py-0'
    >
      {/* left item */}
      <div
        data-testid='wasted-left-container'
        className='flex flex-col mb-10 md:mt-16 md:mb-32 h-auto lg:h-full w-full lg:w-3/6 justify-center items-center'
      >
        <div
          className='flex flex-col justify-center items-center gap-3 px-5 md:px-10'
          // data-aos='fade-up'
          // data-aos-duration='1500'
          // data-aos-easing='ease-in-out'
          // data-aos-once='false'
        >
          <h1
            data-testid='wasted-left-container-item'
            className='w-lg font-bold text-center text-orange text-3xl md:text-4xl xl:text-5xl font-lato'
          >
            1/3 of all food goes to waste
          </h1>
          <h1
            data-testid='wasted-left-container-item'
            className='text-md md:text-xl text-center text-gray-500 md:w-5/6 font-lato'
          >
            Food waste contributes to a significant environmental footprint. The
            resources used to produce uneaten food, such as water, land, and
            energy, are also wasted.
          </h1>
        </div>
      </div>
      {/* right item */}
      <div className='h-auto lg:h-full lg:w-3/6 flex justify-evenly lg:relative'>
        <img
          src={rottenShelf}
          className='w-[250px] md:w-[300px] lg:w-[400px] xl:w-[500px] lg:absolute lg:left-0 md:top-[10%] xl:left-0'
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
