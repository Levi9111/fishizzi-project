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
    <div className='md:max-w-full max-w-[95%] w-fixedScreen mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
      {informations.map((info) => (
        <div
          className='flex items-center gap-3 rounded-md shadow-md p-4 bg-white'
          key={info.title}
        >
          <Image src={info.icon} alt={info.title} width={35} height={35} />
          <p className='text-center text-lg font-medium'>{info.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Banner;
