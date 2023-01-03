import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, TouchableHighlight, StyleSheet, ScrollView } from 'react-native';
import { CartContext } from '../CartContext';
import { ProductInterface } from '../interfaces/ProductInterface';

export function Cart() {
  const { items, addItemToCart, decreaseItemCountFromCart, removeItemFromCart, getTotalPrice } = useContext(CartContext);

  /**
   * written a function to increase count
   * @param item 
   * @param index 
   */
  function incrementCount(item) {
    addItemToCart(item?.product?.id);
  }

  /**
   * written a function to decrease the count
   * @param item 
   * @param index 
   * @returns 
   */
  function decrementCount(item) {
    decreaseItemCountFromCart(item?.product?.id);
  }

  /**
   * function to remove item from the cart
   * @param item 
   */
  function removeThisItem(item) {
    removeItemFromCart(item?.product?.id);
  }


  /**
   * written total footer function
   * @returns 
   */
  function Totals() {
    let [total, setTotal] = useState(0);
    useEffect(() => {
      setTotal(getTotalPrice());
    });
    return (
      <View style={styles.cartLineTotal}>
        <Text style={[styles.lineLeft, styles.lineTotal]}>Grand Total:</Text>
        <Text style={styles.lineRight}>$ {total}</Text>
      </View>
    );
  }
  /**
   * this function render the item
   * @param param
   * @returns 
   */
  function renderItem({ item, index }) {
    return (
      <ScrollView style={styles.cartLine}>
        <Text style={styles.lineLeft}>{item?.product?.name}</Text>

        <View style={styles.cartCountPrice}>
          <Text style={styles.cartCountText}>Count: {item?.qty}</Text>
          <Text style={styles.lineRight}>Price: $ {item?.totalPrice}</Text>
        </View>

        <View style={styles.cartCountPrice}>
          <TouchableHighlight activeOpacity={0.6}
            underlayColor="#DDDDDD" onPress={() => incrementCount(item, index)} style={styles.cartIncrementCountButton}>
            <Text style={styles.cartIncrementCountText}>Increment Count</Text>
          </TouchableHighlight>
          <TouchableHighlight activeOpacity={0.6}
            underlayColor="#DDDDDD" onPress={() => decrementCount(item, index)} style={styles.cartDecrementCountButton}>
            <Text style={styles.cartDecrementCountText}>Decrement Count</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.cartCountPrice}>
          <TouchableHighlight activeOpacity={0.6}
            underlayColor="#DDDDDD" onPress={() => removeThisItem(item, index)} style={styles.cartRemoveItemButton}>
            <Text style={styles.cartRemoveItemText}>Remove this Item</Text>
          </TouchableHighlight>
        </View>

      </ScrollView>
    );
  }

  return (
    <FlatList
      style={styles.itemsList}
      contentContainerStyle={styles.itemsListContainer}
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item?.product?.id?.toString()}
      ListFooterComponent={Totals}
    />
  );
}
const styles = StyleSheet.create({
  cartLine: {
    flexDirection: 'column',
  },
  cartCountPrice: {
    flexDirection: 'row',
  },
  cartLineTotal: {
    flexDirection: 'row',
    borderTopColor: '#dddddd',
    borderTopWidth: 1
  },
  lineTotal: {
    fontWeight: 'bold',
  },
  lineLeft: {
    fontSize: 20,
    lineHeight: 40,
    color: '#333333'
  },
  cartCountText: {
    fontSize: 20,
    lineHeight: 40,
    color: '#333333',
    fontWeight: 'bold',
  },
  cartIncrementCountText: {
    fontSize: 20,
    lineHeight: 40,
    color: '#FFFFFF',
    fontWeight: 'bold',
    paddingHorizontal: 5,
  },
  cartDecrementCountText: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 40,
    color: '#FFFFFF',
    textAlign: 'right',
    paddingHorizontal: 5,
  },
  cartIncrementCountButton: {
    fontSize: 20,
    lineHeight: 40,
    backgroundColor: '#0000FF',
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  cartDecrementCountButton: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 40,
    backgroundColor: 'gray',
    textAlign: 'right',
  },
  cartRemoveItemButton: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 40,
    backgroundColor: '#FF0000',
    textAlign: 'center',
    margin: 10,
  },
  cartRemoveItemText: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 40,
    color: '#FFFFFF',
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  lineRight: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 40,
    color: '#333333',
    textAlign: 'right',
  },
  itemsList: {
    backgroundColor: '#eeeeee',
  },
  itemsListContainer: {
    backgroundColor: '#eeeeee',
    paddingVertical: 8,
    marginHorizontal: 8,
  },
});
