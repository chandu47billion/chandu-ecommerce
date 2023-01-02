import React, {useEffect, useState, useContext} from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { Product } from '../components/Product';
import { CartContext } from '../CartContext';
export function ProductsList ({navigation}) {

  const { products } = useContext(CartContext);

  /**
   * function to render product
   * @param param
   * @returns 
   */
function renderProduct({item: product}) {
    return (
      <Product {...product} 
      onPress={() => {
        navigation.navigate('ProductDetails', {
          productId: product?.id,
        });
      }}
      />
    );
  }

  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
  setProductsData(products)
  });

  return (
    <View>
     {productsData?.length === 0 &&  <ActivityIndicator size="large" /> }
    <FlatList
      style={styles.productsList}
      contentContainerStyle={styles.productsListContainer}
      keyExtractor={(item) => item?.id?.toString()}
      data={productsData}
      renderItem={renderProduct}
    />
    </View>
  );
}
const styles = StyleSheet.create({
  productsList: {
    backgroundColor: '#eeeeee',
  },
  productsListContainer: {
    backgroundColor: '#eeeeee',
    paddingVertical: 8,
    marginHorizontal: 8,
  },
});