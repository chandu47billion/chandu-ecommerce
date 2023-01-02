import React from 'react';
import renderer from 'react-test-renderer';
import { ProductDetails } from '../../screens/ProductDetails';

test('renders correctly', () => {
  const tree = renderer.create(<ProductDetails />).toJSON();
  expect(tree).toMatchSnapshot();
});