import React from 'react';
import renderer from 'react-test-renderer';
import { CartContext } from '../../CartContext';
import { ProductDetails } from '../../screens/ProductDetails';
import { shallow } from 'enzyme';

test('renders correctly', () => {
  const mockedParams = {
    route: { params: { productId: 1 } },
    navigation: '',
    addItemToCart: jest.fn(),
    products: [],
  };
  
  jest.spyOn(React, 'useContext').mockImplementation(() => ({
    name: 'this is a mock context return value'
  }));

  const tree = renderer.create(<ProductDetails {...mockedParams} />).toJSON();
  expect(tree).toMatchSnapshot();
  
});
