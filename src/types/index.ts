export interface Product {
  id: string;
  name: string;
  image: string;
  category: string;
  unit: string;
  deliveryTime: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface QuotationForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
}