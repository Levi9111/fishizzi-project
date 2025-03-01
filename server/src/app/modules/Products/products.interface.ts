export type TProduct = {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  productImgUrl?: string;
  isDeleted?: boolean;
};
