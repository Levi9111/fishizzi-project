'use client';

import { useState, useEffect } from 'react';
import { getDataFromDB } from '@/api';
import { useUser } from '@/ContextProvider/Provider';
import { TCartItemInCart, TProduct } from '@/Interface';
import Image from 'next/image';
import Loader from '@/components/Loader';
import { AlertCircle, CheckCircle, Search, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { handleAddToCart } from '@/utils/handlers';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const ShopPage = () => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<TProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const { user, base_url, setTotalItemsInCart } = useUser();
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem('url');
  }, []);

  useEffect(() => {
    if (user === null) {
      localStorage.setItem('url', 'shop');
      router.push('/login');
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await getDataFromDB(`${base_url}/products`);
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [base_url, user, router]);

  useEffect(() => {
    let result = [...products];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      result = result.filter(
        (product) => product.category === selectedCategory,
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case 'price-high':
        result.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'stock':
        result.sort((a, b) => Number(a.price) - Number(b.price));
        break;
    }

    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, sortBy, products]);

  if (loading) return <Loader />;

  const categories = [
    'all',
    ...new Set(products.map((product) => product.category)),
  ];

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold text-center mb-8'>Shop Our Products</h1>

      {/* Filters and Search */}
      <div className='mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between gap-4'>
        <div className='relative flex-1 max-w-md'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
          <Input
            type='search'
            placeholder='Search products...'
            className='pl-10 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className='flex flex-wrap gap-4'>
          <select
            className='rounded-lg border border-gray-200 px-4 py-2 bg-white dark:bg-gray-800'
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>

          <select
            className='rounded-lg border border-gray-200 px-4 py-2 bg-white dark:bg-gray-800'
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value='default'>Sort by</option>
            <option value='price-low'>Price: Low to High</option>
            <option value='price-high'>Price: High to Low</option>
            <option value='name'>Name</option>
            <option value='stock'>Stock</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className='bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700'
          >
            <div className='relative group'>
              <Image
                src={product.productImgUrl}
                alt={product.name}
                width={400}
                height={400}
                className='w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105'
              />
              <Link
                href={`/shop/${product._id}`}
                className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'
              >
                <span className='text-white font-medium px-4 py-2 rounded-lg backdrop-blur-sm'>
                  View Details
                </span>
              </Link>
            </div>

            <div className='p-4'>
              <Link href={`/shop/${product._id}`}>
                <h3 className='text-xl font-bold text-gray-900 dark:text-gray-100 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200'>
                  {product.name}
                </h3>
              </Link>

              <p className='mt-2 text-gray-600 dark:text-gray-300 text-sm line-clamp-2'>
                {product.description}
              </p>

              <div className='mt-4 flex items-center justify-between'>
                <span className='text-2xl font-bold text-teal-600 dark:text-teal-400'>
                  ৳{product.price.toLocaleString()}
                </span>

                {+product.stock < 10 ? (
                  <span className='text-red-500 flex items-center gap-1 text-sm font-medium'>
                    <AlertCircle className='w-4 h-4' />
                    Only {product.stock} left!
                  </span>
                ) : (
                  <span className='text-green-600 dark:text-green-400 flex items-center gap-1 text-sm font-medium'>
                    <CheckCircle className='w-4 h-4' />
                    In stock
                  </span>
                )}
              </div>

              <Button
                className='mt-4 w-full bg-teal-600 hover:bg-teal-700 text-white'
                disabled={addingToCart === product._id}
                onClick={async () => {
                  setAddingToCart(product._id);
                  try {
                    const result = await handleAddToCart(
                      user?._id as string,
                      product._id,
                      base_url,
                      +product.stock,
                      setLoading,
                    );
                    const totalQuantity = result.data.itemsInCart.reduce(
                      (acc: number, item: TCartItemInCart) =>
                        acc + item.quantity,
                      0,
                    );
                    setTotalItemsInCart(totalQuantity);
                  } finally {
                    setAddingToCart(null);
                  }
                }}
              >
                {addingToCart === product._id ? (
                  <span className='flex items-center gap-2'>
                    <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                    Adding...
                  </span>
                ) : (
                  <span className='flex items-center gap-2'>
                    <ShoppingCart className='w-4 h-4' />
                    Add to Cart
                  </span>
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className='text-center py-12'>
          <h3 className='text-xl font-medium text-gray-600 dark:text-gray-300'>
            No products found
          </h3>
          <p className='mt-2 text-gray-500 dark:text-gray-400'>
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
