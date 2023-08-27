import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeHero from '../components/home/HomeHero';
import HomeContent from '../components/home/HomeContent';

export default function Home() {
  return (
    <div className='w-full h-full flex flex-col gap-5 '>
      {/* Hero Section */}
      <HomeHero />
      {/* Content Section */}
      <HomeContent />
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </div>
  );
}
