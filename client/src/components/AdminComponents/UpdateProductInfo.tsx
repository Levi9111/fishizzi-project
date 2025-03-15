import { getDataFromDB } from '@/api';
import { useUser } from '@/ContextProvider/Provider';
import React, { useEffect, useState } from 'react';
import Loader from '../Loader';
import { Product } from '@/Interface';
import Image from 'next/image';

interface TProduct extends Product {
  _id: string;
  productImgUrl: string;
  isDeleted: boolean;
}

const UpdateProductInfo = () => {
  const { base_url } = useUser();
  const [products, setProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const data = await getDataFromDB(`${base_url}/products`);
    setProducts(data.data);
    setLoading(false);
  };

  console.log(products);

  useEffect(() => {
    fetchData();
  }, [base_url]);

  if (loading) return <Loader />;

  return (
    <div className=''>
      {products.map((product) => (
        <div key={product._id}>
          <Image
            src={product.productImgUrl}
            alt={product.name}
            width={100}
            height={100}
          />
          <div className=''>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <p>{product.stock}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpdateProductInfo;
