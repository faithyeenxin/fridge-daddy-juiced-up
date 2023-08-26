import daddy from '../../assets/img/landing-page/daddy.svg';
import men from '../../assets/img/landing-page/8-men.svg';
const NotEnoughFoodSection = () => {
  return (
    <div
      id='hero'
      className='w-full h-[100vh] flex flex-col-reverse md:flex-col justify-evenly md:pt-10 items-center py-60 md:p-0'
    >
      {/* left item */}
      <h1
        className='w-lg font-bold text-center text-orange text-3xl md:text-4xl xl:text-5xl font-lato hidden md:block'
        // data-aos='fade-up'
        // data-aos-duration='1500'
        // data-aos-easing='ease-in-out'
        // data-aos-once='false'
      >
        1 in 9 people do not have enough food to eat
      </h1>
      <div className='flex flex-col items-center'>
        <h1 className='font-lato font-bold text-4xl block md:hidden text-orange'>
          1 in 9
        </h1>
        <h1 className='font-lato block md:hidden text-3xl text-orange '>
          do not have enough food to eat
        </h1>
      </div>
      {/* </div>
      </div> */}
      {/* right item */}
      <div className='h-auto w-full flex justify-between lg:relative'>
        <div className='w-full flex justify-center items-center'>
          <img
            src={men}
            className='opacity-60'
            // data-aos='fade-in'
            // data-aos-duration='2000'
            // data-aos-easing='ease-in-out'
            // data-aos-once='false'
          />
        </div>
        {/* <img
          src={daddy}
          className='w-[150px] md:w-[300px] lg:w-[400px] xl:w-[500px] block lg:hidden'
        /> */}
      </div>
    </div>
  );
};

export default NotEnoughFoodSection;
