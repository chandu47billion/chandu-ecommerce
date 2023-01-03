import React from 'react';
import renderer from 'react-test-renderer';
import { Cart } from '../../screens/Cart';

test('renders correctly', () => {
  const mockedParams = {
    route: { params: { productId: 1 } },
    navigation: '',
    items: [],
    addItemToCart: jest.fn(),
    decreaseItemCountFromCart: jest.fn(),
    removeItemFromCart: jest.fn(),
    getTotalPrice: jest.fn(),
    navigation: '',
  };

  jest.spyOn(React, 'useContext').mockImplementation(() => ({
    name: 'this is a mock context return value'
  }));
  
  const tree = renderer.create(<Cart {...mockedParams} />).toJSON();
  expect(tree).toMatchSnapshot();
});
