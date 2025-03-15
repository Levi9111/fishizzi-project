import AddProductsForm from './AddProductsForm';
import { useUser } from '@/ContextProvider/Provider';
import Modal from '../Modal';
import UpdateProductInfo from './UpdateProductInfo';

const AdminContorlPage = () => {
  const { user } = useUser();

  return (
    <div className='min-h-screen bg-white rounded-md p-3'>
      <h3 className='text-3xl font-bold mb-4'>Welcome {user?.name}</h3>
      <p className='mb-6 text-gray-600'>
        Add and manage Products. Manage Users. Manage Blog.
      </p>

      <Modal title='Add new product' className='mb-3'>
        <AddProductsForm />
      </Modal>

      <Modal title='Update Product Info'>
        <UpdateProductInfo />
      </Modal>
    </div>
  );
};

export default AdminContorlPage;
