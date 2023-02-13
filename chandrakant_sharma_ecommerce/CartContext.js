import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const CartContext = createContext();
export function CartProvider(props) {
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://demourl').then((response) => {
      console.log(response.data);
      setProducts(response.data);
    });
  });

  /**
   * function for add item in cart
   * @param {*} id 
   */
  function addItemToCart(id) {
    const product = products.find((product) => (product.id == id));
    setItems((prevItems) => {
      const item = prevItems.find((item) => (item.id == id));
      if (!item) {
        return [...prevItems, {
          id,
          qty: 1,
          product,
          totalPrice: product.price
        }];
      }
      else {
        return prevItems.map((item) => {
          if (item.id == id) {
            item.qty++;
            item.totalPrice += product.price;
          }
          return item;
        });
      }
    });
  }

  /**
   * function to decrease item count
   * @param {*} id 
   */
  function decreaseItemCountFromCart(id) {
    const product = products.find((product) => (product.id == id));
    setItems((prevItems) => {
      const item = prevItems.find((item) => (item.id == id));
      if (item) {
        return prevItems.map((item) => {
          if (item.id == id) {
            if (item.qty == 1) {
              return item;
            }
            item.qty--;
            item.totalPrice -= product.price;
          }
          return item;
        });
      }
    });
  }

  /**
   * function to remove item from cart
   * @param {*} id 
   */
  function removeItemFromCart(id) {
    setItems((prevItems) => {
      const item = prevItems.filter((item) => (item.id !== id));
      return [...item];
    });
  }

  /**
   * function to get item count
   * @returns 
   */
  function getItemsCount() {
    return items.reduce((sum, item) => (sum + item.qty), 0);
  }

  /**
   * function to get total price
   * @returns 
   */
  function getTotalPrice() {
    return items.reduce((sum, item) => (sum + item.totalPrice), 0);
  }

  return (
    <CartContext.Provider
      value={{ products, items, setItems, getItemsCount, addItemToCart, decreaseItemCountFromCart, removeItemFromCart, getTotalPrice }}>
      {props.children}
    </CartContext.Provider>
  );
}
