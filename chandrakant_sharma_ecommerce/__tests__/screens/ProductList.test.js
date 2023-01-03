import React from 'react';
import renderer from 'react-test-renderer';
import { ProductsList } from '../../screens/ProductsList';

test('renders correctly', () => {
  const mockedParams = {
    products: [],
  };

  jest.spyOn(React, 'useContext').mockImplementation(() => ({
    name: 'this is a mock context return value'
  }));
  
  const tree = renderer.create(<ProductsList {... mockedParams}/>).toJSON();
  expect(tree).toMatchSnapshot();
});
