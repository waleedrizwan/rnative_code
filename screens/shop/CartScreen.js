import React from "react";

import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as cartActions from "../../store/actions/cart";
import Color from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";
import * as orderActions from "../../store/actions/orders";
import Card from '../../components/UI/Card';


const CartScreen = (props) => {
  const items = useSelector((state) => state.cart.items);

  const dispatch = useDispatch();

  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const transCartItems = [];
    for (const key in state.cart.items) {
      transCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transCartItems.sort((a, b) => (a.productId > b.productId ? 1 : -1));
  });

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:
          <Text style={styles.amount}>
            ${(Math.round(cartTotalAmount.toFixed(2)) * 100) / 100}
          </Text>
        </Text>
        <Button
          color={Color.accent}
          title="Order Now"
          onPress={() => {
            dispatch(orderActions.addOrder(cartItems, cartTotalAmount));
          }}
          disabled={cartItems.length <= 0}
        />
      </Card>
      <View>
        <Text>CART ITEMS</Text>
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            itemDict={itemData.item}
            onRemove={() => {
              dispatch(cartActions.removeFromCart(itemData.item.productId));
            }}
            deletable={true}
          />
        )}
      />
    </View>
  );
};

CartScreen.navigationOptions = {
  headerTitle: "Cart",
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: Color.accent,
  },
});

export default CartScreen;
