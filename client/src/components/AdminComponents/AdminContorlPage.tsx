import AddProductsForm from './AddProductsForm';
import { useUser } from '@/ContextProvider/Provider';
import Modal from '../Modal';
import ManageProductInfo from './ManageProductInfo';
import ManageUserInfo from './ManageUserInfo';

const AdminContorlPage = () => {
  const { user } = useUser();

  return (
    <div className='min-h-screen bg-white rounded-md p-6'>
      <h3 className='text-4xl font-semibold text-gray-800 mb-4'>
        Welcome {user?.name}
      </h3>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <Modal title='Add new product' className='w-full'>
          <AddProductsForm />
        </Modal>

        <Modal title='Manage Product Info' className='w-full'>
          <ManageProductInfo />
        </Modal>

        <Modal title='Manage User Info' className='w-full'>
          <ManageUserInfo />
        </Modal>
      </div>
    </div>
  );
};

export default AdminContorlPage;
