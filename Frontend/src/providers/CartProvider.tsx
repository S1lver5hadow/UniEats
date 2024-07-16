import { PropsWithChildren, createContext, useContext, useState } from "react";
import { CartItem, Product } from "../constants/Types";
import { randomUUID } from 'expo-crypto';

type CartType = {
  items: CartItem[],
  addItem: (product: Product) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: number;
  deleteItem: (itemId: string) => void;
  itemCount: number;
  clearCart: () => void
}

const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  deleteItem: () => {},
  itemCount: 0,
  clearCart: () => {}
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product) => {
    const existingItem = items.find(
      item => item.product.name === product.name
    );

    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }

    const newCartItem: CartItem = {
      id: randomUUID(),
      product,
      product_id: product.id,
      quantity: 1,
    };

    setItems([newCartItem, ...items]);
  };

  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    const updatedItems = items.map(item =>
      item.id !== itemId
        ? item
        : {...item, quantity: item.quantity + amount }
    ).filter((item) => item.quantity > 0);
    setItems(updatedItems);
  };

  const total = items.reduce((sum, item) =>
    (sum += parseFloat(item.product.price) * item.quantity),
    0
  );

  const deleteItem = (itemId: string) => {
    const updatedItems = items.filter(item => item.id !== itemId);
    setItems(updatedItems);
  };

  const itemCount = items.reduce((sum, item) =>
    (sum += item.quantity),
    0
  );

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, total, deleteItem, itemCount, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider;

export const useCart = () => useContext(CartContext);
