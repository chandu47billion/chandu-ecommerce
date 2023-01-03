import React from 'react';
import renderer from 'react-test-renderer';
import { CartContext } from '../../CartContext';
import { ProductDetails } from '../../screens/ProductDetails';
import { shallow } from 'enzyme';

test('renders correctly', () => {
  const mockedParams = {
    route: { params: { productId: 1 } },
    navigation: ''
  };
  jest.spyOn(React, 'useContext').mockImplementation(() => ({
    name: 'this is a mock context return value'
  }));

  const myComponent = shallow(
    <ProductDetails
    {...mockedParams}
    />).toJSON();
  
  const tree = renderer.create(<ProductDetails {...mockedParams} />).toJSON();
  expect(myComponent).toMatchSnapshot();
  
});
