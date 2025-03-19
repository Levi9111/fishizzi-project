import { ReactNode, useState } from 'react';

const Modal = ({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={className}>
      <button
        onClick={() => setIsOpen(true)}
        className='px-4 py-2 bg-gray-700 hover:bg-gray-900 text-white rounded-lg shadow  transition'
      >
        {title}
      </button>

      {isOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg min-w-96 md:w-1/2 h-[90vh] overflow-y-scroll'>
            {children}
            <div className='flex justify-end'>
              <button
                onClick={() => setIsOpen(false)}
                className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition mt-3'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
