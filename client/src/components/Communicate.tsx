import Marquee from 'react-fast-marquee';

const Communicate = () => {
  return (
    <section className=' bg-brand-accent'>
      <div className='py-2  mx-auto'>
        <Marquee pauseOnHover>
          <p className='text-md font-semibold'>
            Place your order for any product by giving us a call or reaching out
            on WhatsApp: <span className='underline'>+8801329766940</span>
            .&nbsp;
          </p>
        </Marquee>
      </div>
    </section>
  );
};

export default Communicate;
