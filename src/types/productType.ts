export interface Product{
  id:number;
 title: string;
  price: number;
  category: string;
  discountPercentage?: number;
  images: string[];
}

export type NewProduct= Product;