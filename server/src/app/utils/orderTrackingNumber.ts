import { Orders } from '../modules/Orders/orders.model';

const findLastTrackingNumber = async () => {
  const lastOrder = await Orders.findOne(
    // Replace User with your Order model
    {},
    {
      trackingNumber: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastOrder?.trackingNumber ? lastOrder.trackingNumber : undefined;
};

export const generateTrackingNumber = async () => {
  const year = new Date().getFullYear().toString();
  const month = (new Date().getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
  const day = new Date().getDate().toString().padStart(2, '0');

  let currentId = (0).toString();

  const lastTrackingNumber = await findLastTrackingNumber();

  if (lastTrackingNumber) {
    const lastFourDigits = lastTrackingNumber.toString().substring(10); // Extract last 4 digits
    currentId = lastFourDigits;
  }

  const incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  const trackingNumber = `${year}${month}${day}${incrementId}`;

  return trackingNumber;
};
