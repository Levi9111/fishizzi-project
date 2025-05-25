'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TOrderData } from '@/Interface';
import Loader from '@/components/Loader';
import { Download } from 'lucide-react';

const OrderConfirmation = () => {
  const [order, setOrder] = useState<TOrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem('order')!);
    if (orderData) {
      setOrder(orderData);
      setLoading(false);
    } else {
      console.error('No order found in localStorage.');
      setLoading(false);
    }
  }, []);

  const generatePDF = async () => {
    if (!order) return;

    setIsGeneratingPDF(true);

    try {
      // Dynamic import to reduce bundle size
      const jsPDF = (await import('jspdf')).default;
      const html2canvas = (await import('html2canvas')).default;

      // Create a temporary div with the receipt content
      const receiptElement = document.createElement('div');
      receiptElement.style.position = 'absolute';
      receiptElement.style.left = '-9999px';
      receiptElement.style.width = '800px';
      receiptElement.style.backgroundColor = 'white';
      receiptElement.style.padding = '40px';
      receiptElement.style.fontFamily = 'Arial, sans-serif';

      receiptElement.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #333; margin-bottom: 10px; font-size: 28px;">Order Receipt</h1>
          <p style="color: #666; font-size: 16px;">Thank you for your purchase!</p>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px;">
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
            <h3 style="color: #333; margin-bottom: 15px; font-size: 18px;">Customer Details</h3>
            <p style="margin: 8px 0;"><strong>Name:</strong> ${
              order.userId.name
            }</p>
            <p style="margin: 8px 0;"><strong>Email:</strong> ${
              order.userId.email
            }</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
            <h3 style="color: #333; margin-bottom: 15px; font-size: 18px;">Shipping Address</h3>
            <p style="margin: 8px 0;"><strong>Name:</strong> ${
              order.address.fullName
            }</p>
            <p style="margin: 8px 0;"><strong>Phone:</strong> ${
              order.address.phoneNumber
            }</p>
            <p style="margin: 8px 0;"><strong>Location:</strong> ${
              order.address.city
            }, ${order.address.division}</p>
            <p style="margin: 8px 0;"><strong>Address:</strong> ${
              order.address.address
            }</p>
            <p style="margin: 8px 0;"><strong>Police Station:</strong> ${
              order.address.policeStation
            }</p>
          </div>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
          <h3 style="color: #333; margin-bottom: 15px; font-size: 18px;">Order Summary</h3>
          ${order.products
            .map(
              (product) => `
            <div style="display: flex; align-items: center; padding: 15px 0; border-bottom: 1px solid #e0e0e0;">
              <div style="margin-left: 15px;">
                <h4 style="margin: 0 0 5px 0; font-size: 16px; color: #333;">${
                  product.productId.name
                }</h4>
                <p style="margin: 5px 0; color: #666; font-size: 14px;">${product.productId.description.substring(
                  0,
                  80,
                )}...</p>
                <p style="margin: 5px 0; font-weight: bold;">Price: ৳${
                  product.productId.price
                }</p>
              </div>
            </div>
          `,
            )
            .join('')}
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
          <p style="font-size: 18px; font-weight: bold; color: #333; margin: 10px 0;">Total: ৳${
            order.totalPrice
          }</p>
          <p style="font-size: 16px; font-weight: bold; color: #333; margin: 10px 0;">
            Placed On: ${new Date(order.createdAt).toLocaleString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
              timeZone: 'Asia/Dhaka',
              hour: 'numeric',
              minute: 'numeric',
            })}
          </p>
          <p style="font-size: 16px; font-weight: bold; color: #333; margin: 10px 0;">
            Tracking Number: ${order.trackingNumber}
          </p>
          <p style="font-size: 16px; font-weight: bold; color: ${
            order.status === 'pending' ? '#f59e0b' : '#10b981'
          }; margin: 10px 0;">
            Status: ${order.status.toUpperCase()}
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #e0e0e0;">
          <p style="color: #666; font-size: 14px;">Thank you for shopping with us!</p>
          <p style="color: #666; font-size: 12px;">Generated on ${new Date().toLocaleString()}</p>
        </div>
      `;

      document.body.appendChild(receiptElement);

      // Convert to canvas
      const canvas = await html2canvas(receiptElement, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: '#ffffff',
      });

      // Remove the temporary element
      document.body.removeChild(receiptElement);

      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      // Download the PDF
      pdf.save(`order-receipt-${order.trackingNumber}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  if (!order) {
    return (
      <div className='text-center p-8'>
        <h2 className='text-2xl font-semibold'>No Order Data Found</h2>
        <p className='text-md text-gray-600'>
          Your order data could not be retrieved.
        </p>
      </div>
    );
  }

  if (loading || !order.products) return <Loader />;

  return (
    <div className='p-6 max-w-fixedScreen w-full mx-auto'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg'>
        <div className='col-span-full'>
          <h2 className='text-3xl font-bold text-gray-800 mb-6'>
            Order Confirmation
          </h2>
        </div>

        {/* Customer Details */}
        <div className='p-6 border rounded-md bg-gray-50'>
          <h3 className='text-lg font-semibold mb-4 text-gray-800'>
            Customer Details
          </h3>
          <p>
            <strong>Name:</strong>{' '}
            <span className='ml-1'>{order.userId.name}</span>
          </p>
          <p>
            <strong>Email:</strong>{' '}
            <span className='ml-1'>{order.userId.email}</span>
          </p>
        </div>

        {/* Shipping Address */}
        <div className='p-6 border rounded-md bg-gray-50'>
          <h3 className='text-lg font-semibold mb-4 text-gray-800'>
            Shipping Address
          </h3>
          <p>
            <strong>Name:</strong>{' '}
            <span className='ml-1'>{order.address.fullName}</span>
          </p>
          <p>
            <strong>Phone:</strong>{' '}
            <span className='ml-1'>{order.address.phoneNumber}</span>
          </p>
          <p>
            <strong>Location:</strong>{' '}
            <span className='ml-1'>
              {order.address.city}, {order.address.division}
            </span>
          </p>
          <p>
            <strong>Address:</strong>{' '}
            <span className='ml-1'>{order.address.address}</span>
          </p>
          <p>
            <strong>Police Station:</strong>{' '}
            <span className='ml-1'>{order.address.policeStation}</span>
          </p>
        </div>

        {/* Products Ordered */}
        <div className='col-span-full p-6 border rounded-md bg-gray-50'>
          <h3 className='text-lg font-semibold mb-4 text-gray-800'>
            Order Summary
          </h3>
          {order.products.map((product) => (
            <div
              key={product.productId._id}
              className='flex items-center gap-4 border-b py-3 last:border-b-0'
            >
              <Image
                src={product.productId.productImgUrl}
                alt={product.productId.name}
                width={80}
                height={80}
                className='w-20 h-20 object-cover rounded-md'
              />
              <div className='flex flex-col'>
                <h4 className='text-md font-semibold text-gray-800'>
                  {product.productId.name}
                </h4>
                <p className='text-sm text-gray-600'>
                  {product.productId.description.substring(0, 50)}...
                </p>
                <p>
                  <strong>Price:</strong> ৳{product.productId.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Total, Status, and Tracking Number */}
        <div className='col-span-full p-6 border rounded-md bg-gray-50'>
          <p className='text-lg font-semibold text-gray-800'>
            Total: ৳{order.totalPrice}
          </p>
          <p className='text-lg font-semibold text-gray-800'>
            Placed On:{' '}
            {new Date(order.createdAt).toLocaleString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
              timeZone: 'Asia/Dhaka',
              hour: 'numeric',
              minute: 'numeric',
            })}
          </p>
          <p className='text-md font-semibold text-gray-800'>
            <strong>Tracking Number:</strong> {order.trackingNumber}
          </p>
          <p
            className={`text-md font-semibold ${
              order.status === 'pending' ? 'text-yellow-500' : 'text-green-500'
            }`}
          >
            Status: {order.status}
          </p>
        </div>

        {/* Action Buttons */}
        <div className='col-span-full grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Button
            onClick={generatePDF}
            disabled={isGeneratingPDF}
            variant='outline'
            className='w-full flex items-center justify-center gap-2'
          >
            <Download size={16} />
            {isGeneratingPDF ? 'Generating PDF...' : 'Download Receipt'}
          </Button>

          <Button className='w-full'>
            <Link href='/shop'>Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
