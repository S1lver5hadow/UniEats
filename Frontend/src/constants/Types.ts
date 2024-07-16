export type Product = {
  id: number;
  name: string;
  price: string;
  additionalInfo: string;
  restaurant: string;
};

export type CartItem = {
  id: string;
  product: Product;
  product_id: number,
  quantity: number;
}

export type Order = {
  id: number;
  total_food_price: number;
  deliveryCost: number;
  items: Product[];
}

export type APIOrder = {
  id: number;
  totalFoodPrice: number;
  deliveryCost: number;
  status: string;
  items: string;
  timestamp: string;
  restaurants: string;
}

export type OrderItem = {
  id: number,
  quantity: number
}

export type Restaurant = {
  name: string;
  latitude: string;
  longitude: string;
}

export type ColorTheme = {
  light: boolean,
  text: string,
  colorText: string,
  background: string,
  tint: string,
  icon: string,
  tabIconDefault: string,
  tabIconSelected: string,
  colorButton: string,
  colorBorder: string,
  textInput: string,
  textInputBorder: string
  textInputText: string,
  iconColor: string,
  accountButton: string,
  product: string,
  productText: string,
  order: string,
  deliver: string,
  navBar: string,
  navBarBox: string,
}