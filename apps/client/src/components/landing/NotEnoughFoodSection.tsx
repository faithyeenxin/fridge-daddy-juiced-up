import daddy from '../../assets/img/landing-page/daddy.svg';
import men from '../../assets/img/landing-page/8-men.svg';
const NotEnoughFoodSection = () => {
  return (
    <div
      id='hero'
      className='w-full h-[80vh] lg:h-[90vh] flex flex-col justify-evenly items-center'
    >
      {/* left item */}
      <h1
        className='w-lg font-bold text-center text-orange xs:text-lg sm:text-2xl md:text-4xl lg:text-4xl xl:text-5xl'
        data-aos='fade-up'
        data-aos-duration='1500'
        data-aos-easing='ease-in-out'
        data-aos-once='false'
      >
        Or that 1 in 9 people do not have enough food to eat?
      </h1>
      {/* </div>
      </div> */}
      {/* right item */}
      <div className='h-auto w-full flex justify-between lg:relative'>
        <div className='w-full flex justify-center items-center'>
          <img
            src={men}
            className='opacity-60'
            data-aos='fade-in'
            data-aos-duration='2000'
            data-aos-easing='ease-in-out'
            data-aos-once='false'
          />
        </div>
        <img
          src={daddy}
          className='w-[100px] md:w-[300px] lg:w-[400px] xl:w-[500px] block lg:hidden'
        />
      </div>
    </div>
  );
};

export default NotEnoughFoodSection;
