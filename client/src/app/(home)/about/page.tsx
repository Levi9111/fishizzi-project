'use client';

import video from '../../../../public/video/shutki.mp4';

const AboutUsPage = () => {
  return (
    <div className='md:max-w-full w-fixedScreen max-w-[95%] mx-auto min-h-screen  flex flex-col items-center justify-center py-12'>
      {/* Video Section */}
      <div className='w-full h-[60vh] mb-8'>
        <video
          className='w-full h-full object-contain rounded-lg shadow-md'
          controls
          playsInline
        >
          <source src='/videos/fishizzy-welcome.mp4' type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Text Section */}
      <div className='w-full bg-white p-8 rounded-xl shadow-lg'>
        <h1 className='text-4xl font-bold text-gray-800 mb-6'>
          Welcome to Fishizzy! 🎣
        </h1>
        <p className='text-lg text-gray-700 leading-relaxed'>
          At Fishizzy, we&apos;re passionate about delivering the freshest and
          finest seafood directly to your table. We&apos;re committed to
          ensuring that our products not only meet the highest quality standards
          but also contribute to the health of our oceans. Our mission is to
          provide you with an exceptional culinary experience while promoting
          sustainable seafood practices.
        </p>
      </div>
    </div>
  );
};

export default AboutUsPage;
