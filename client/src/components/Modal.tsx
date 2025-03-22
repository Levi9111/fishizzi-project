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
        className='px-4 py-2 bg-gray-700 hover:bg-gray-900 text-white rounded-lg shadow transition'
      >
        {title}
      </button>

      {isOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-50'>
          {/* Centering container */}
          <div className='flex items-center justify-center h-full'>
            {/* Modal content */}
            <div className='bg-white p-6 rounded-lg shadow-lg min-w-96 md:w-1/2 max-h-[90vh] overflow-y-auto'>
              <div>{children}</div>

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
        </div>
      )}
    </div>
  );
};

export default Modal;
