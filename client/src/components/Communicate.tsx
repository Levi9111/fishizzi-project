import Marquee from 'react-fast-marquee';

const Communicate = () => {
  return (
    <section className=' bg-brand-accent'>
      <div className='py-2  mx-auto'>
        <Marquee pauseOnHover>
          <p className='text-md font-semibold'>
            Place your order for any product by giving us a call or reaching out
            on WhatsApp:{' '}
            <span className='underline'>
              <a target='_blank' href='https://wa.me/01626974685'>
                +8801329766940
              </a>
            </span>
            .&nbsp;
          </p>
        </Marquee>
      </div>
    </section>
  );
};

export default Communicate;
