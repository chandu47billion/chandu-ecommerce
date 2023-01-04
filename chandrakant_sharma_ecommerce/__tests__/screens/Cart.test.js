import React from 'react';
import { Cart } from '../../screens/Cart';
import { render } from '@testing-library/react-native';
import { CartContext } from '../../CartContext';

test('component handles cart screen', () => {

  const items = [
    {
      "id": 1,
      "colour": "Black",
      "name": "Black Sheet Strappy Textured Glitter Bodycon Dress",
      "price": 10,
      "img": "http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024"
    },
    {
      "id": 2,
      "colour": "Stone",
      "name": "Stone Ribbed Strappy Cut Out Detail Bodycon Dress",
      "price": 4,
      "img": "https://cdn-img.prettylittlething.com/3/6/5/a/365a5d1dce6a2b77b564379b302c9d83afccf33b_cmd2051_1.jpg?imwidth=1024"
    },
    {
      "id": 3,
      "colour": "Black",
      "name": "Black Frill Tie Shoulder Bodycon Dress",
      "price": 7.99,
      "img": "https://cdn-img.prettylittlething.com/d/c/3/3/dc337260f9ecefdb99a8c8e98cd73ccb1b79cea5_cmb6804_4.jpg?imwidth=1024"
    },
    {
      "id": 5,
      "colour": "Red",
      "name": "Red Pin Stripe Belt T Shirt Dress",
      "price": 17,
      "img": "https://cdn-img.prettylittlething.com/f/7/1/8/f718a4011ddf92f48aeefff6da0f475178694599_cly0842_1.jpg?imwidth=1024"
    }
  ];
  const addItemToCart = jest.fn();
  const decreaseItemCountFromCart = jest.fn();
  const removeItemFromCart = jest.fn();
  const getTotalPrice = jest.fn();

  const { getAllByText } = render(
    <CartContext.Provider
      value={{ items, addItemToCart, decreaseItemCountFromCart, removeItemFromCart, getTotalPrice }}>
      <Cart />
    </CartContext.Provider>
  );

  const incrementbutton = getAllByText('Increment Count');
  const decrementbutton = getAllByText('Decrement Count');
  const removeThisItembutton = getAllByText('Remove this Item');
  const grandTotalButton = getAllByText('Grand Total:');
  expect(incrementbutton).toBeDefined();
  expect(decrementbutton).toBeDefined();
  expect(removeThisItembutton).toBeDefined();
  expect(grandTotalButton).toBeDefined();
}
);
