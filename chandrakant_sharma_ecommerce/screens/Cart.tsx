import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { CartContext } from '../CartContext';
import { ProductInterface } from '../interfaces/ProductInterface';

export function Cart () {
const {items, getItemsCount, getTotalPrice} = useContext(CartContext);
const [itemsList, setItemsList] = useState(items);

/**
 * written a function to increase count
 * @param item 
 * @param index 
 */
function incrementCount(item: ProductInterface, index : number){ // index will be the key value 
    const items = itemsList;           
    item.qty += 1;
    items.splice(index,1,item);
    setItemsList(items);
   }

   /**
    * written a function to decrease the count
    * @param item 
    * @param index 
    * @returns 
    */
function decrementCount(item: ProductInterface, index : number){ // index will be the key value 
    const items = itemsList;
    if(item?.qty == 1){
        return;
    }           
    item.qty -= 1;
    items.splice(index,1,item);
    setItemsList(items);
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
function renderItem({item, index}) {
    return (
       <View style={styles.cartLine}>
          <Text style={styles.lineLeft}>{item?.product?.name}</Text>
          <View style={styles.cartCountPrice}>
          <Text onPress={() => incrementCount(item, index)} style={styles.cartIncrementCountButton}>Increment Count</Text>
          <Text onPress={() => decrementCount(item, index)} style={styles.cartDecrementCountButton}>Decrement Count</Text>
          </View>
          <View style={styles.cartCountPrice}>
          <Text style={styles.cartCountText}>Count: {item?.qty}</Text>
          <Text style={styles.lineRight}>Price: $ {item?.totalPrice}</Text>
          </View>
          
       </View>
    );
  }

  return (
    <FlatList
      style={styles.itemsList}
      contentContainerStyle={styles.itemsListContainer}
      data={itemsList}
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
    flexDirection:'row',
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
    color:'#333333' 
  },
  cartCountText: {
    fontSize: 20, 
    lineHeight: 40, 
    color:'#333333',
    fontWeight: 'bold',
  },
  cartIncrementCountButton: {
    fontSize: 20, 
    lineHeight: 40, 
    color:'#0000FF',
    fontWeight: 'bold',
  },
  cartDecrementCountButton: {
    flex: 1,
    fontSize: 20, 
    fontWeight: 'bold',
    lineHeight: 40, 
    color:'#FF0000', 
    textAlign:'right',
  },
  lineRight: { 
    flex: 1,
    fontSize: 20, 
    fontWeight: 'bold',
    lineHeight: 40, 
    color:'#333333', 
    textAlign:'right',
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
