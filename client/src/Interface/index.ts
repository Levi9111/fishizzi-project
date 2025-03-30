// -------------------------------
// 1. Product Related Interfaces
// -------------------------------

export interface Product {
  name: string;
  description: string;
  price: string;
  stock: string;
  category: string;
}

export interface TProduct extends Product {
  _id: string;
  productImgUrl: string;
  isDeleted: boolean;
}

export interface UpdateProductInfoProps {
  formData: Partial<TProduct>;
  setFormData: (data: Partial<TProduct> | null) => void;
  setSelectedProduct: (product: TProduct | null) => void;
  setLoading: (loading: boolean) => void;
  setProducts: (products: TProduct[]) => void;
}

// -------------------------------
// 2. Cart Related Interfaces
// -------------------------------

export interface TCartItemProduct {
  _id: string;
  name: string;
  price: string;
  stock: string;
  category: string;
  id: string;
  productImgUrl: string;
}

export interface TCartItemInCart {
  _id: string;
  productId: TCartItemProduct;
  quantity: number;
}

export interface TCartItem {
  _id: string;
  userId: string;
  itemsInCart: TCartItemInCart[];
}

// -------------------------------
// 3. User & Address Related Interfaces
// -------------------------------

export interface TUser {
  _id: string;
  name: string;
  email: string;
  image: string;
  provider: string;
  address?: string[] | null;
  status: 'active' | 'blocked';
  phoneNumber?: string;
}

export interface TAddressFormValues {
  fullName: string;
  phoneNumber: string;
  landmark?: string;
  division: string;
  city: string;
  policeStation: string;
  address: string;
}

export interface TAddress {
  _id: string;
  userId: string;
  fullName: string;
  phoneNumber: string;
  landmark: string;
  division: string;
  city: string;
  policeStation: string;
  address: string;
  default: boolean;
}

// -------------------------------
// 4. Blog Related Interfaces
// -------------------------------

export interface TBlog {
  _id: string;
  title: string;
  blogImgUrl: string;
  content: string[];
  createdAt: string;
  updatedAt: string;
}

// -------------------------------
// 5. Order Related Interfaces
// -------------------------------

export interface TOrderData {
  userId: {
    name: string;
    email: string;
  };
  address: {
    fullName: string;
    phoneNumber: string;
    division: string;
    city: string;
    policeStation: string;
    address: string;
  };
  products: {
    _id: string;
    name: string;
    description: string;
    price: string;
    stock: string;
    category: string;
    productImgUrl: string;
  }[];
  totalPrice: number;
  trackingNumber: number;
  status: string;
}

// -------------------------------
// 6. Event Interfaces
// -------------------------------

export interface InputChangeEvent
  extends React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> {
  target: HTMLInputElement | (HTMLTextAreaElement & EventTarget);
}
