import React from 'react';
import renderer from 'react-test-renderer';
import { ProductsList } from '../../screens/ProductsList';

test('renders correctly', () => {
  const tree = renderer.create(<ProductsList />).toJSON();
  expect(tree).toMatchSnapshot();
});