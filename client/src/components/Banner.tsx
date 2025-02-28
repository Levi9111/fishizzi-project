import delivery from '../../public/icons/delivery.png';
import service from '../../public/icons/customer-care.png';
import quality from '../../public/icons/best-quality.png';
import refund from '../../public/icons/easy-return.png';
import Image from 'next/image';

const informations = [
  {
    title: 'Available Cash on delivery',
    icon: delivery,
  },
  {
    title: '24/7 Customer Support',
    icon: service,
  },
  {
    title: 'Promising the best quality',
    icon: quality,
  },
  {
    title: 'Easy return within 30 days',
    icon: refund,
  },
];

const Banner = () => {
  return (
    <div className='md:max-w-full max-w-[95%] w-fixedScreen mx-auto grid md:grid-cols-4 md:gap-5 gap-2'>
      {informations.map((info) => (
        <div
          className='flex items-center justify-start gap-2 rounded-md shadow-close transition-all duration-300 p-3'
          key={info.title}
        >
          <Image
            src={info.icon}
            alt={info.title}
            width={30}
            height={30}
            className=''
          />

          <p className='text-center text-xl'>{info.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Banner;
