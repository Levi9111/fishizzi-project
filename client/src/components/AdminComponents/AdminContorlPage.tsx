import AddProductsForm from './AddProductsForm';
import { useUser } from '@/ContextProvider/Provider';
import Modal from '../Modal';
import ManageProductInfo from './ManageProductInfo';
import ManageUserInfo from './ManageUserInfo';

const AdminControlPage = () => {
  const { user } = useUser();

  return (
    <div className='min-h-screen bg-gray-100 rounded-md p-8  mt-5'>
      <h3 className='text-4xl font-bold text-gray-900 mb-6'>
        Welcome, {user?.name} 👋
      </h3>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <AdminCard title='Add New Product'>
          <Modal title='Add New Product'>
            <AddProductsForm />
          </Modal>
        </AdminCard>

        <AdminCard title='Manage Product Info'>
          <Modal title='Manage Product Info'>
            <ManageProductInfo />
          </Modal>
        </AdminCard>

        <AdminCard title='Manage User Info'>
          <Modal title='Manage User Info'>
            <ManageUserInfo />
          </Modal>
        </AdminCard>
      </div>
    </div>
  );
};

// Reusable card component for better UI
const AdminCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className='p-6 bg-white shadow-lg rounded-lg flex flex-col items-center justify-center text-center'>
      <h4 className='text-xl font-semibold text-gray-800 mb-3'>{title}</h4>
      {children}
    </div>
  );
};

export default AdminControlPage;
