import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import Colors from "../../constants/Colors";
import CartItem from "./CartItem";
import Card from "../UI/Card";

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalText}>${props.amount}</Text>
        <Text style={styles.dateText}> {props.date}</Text>
      </View>
      <Button
        color={Colors.primary}
        title={!showDetails ? "show details" : "collapse details"}
        onPress={() => setShowDetails((prevState) => !prevState)}
      />
      {showDetails && (
        <View style={styles.detailItems}>
          {props.items.map((cartItem) => (
            <CartItem
              key={cartItem.productId}
              itemDict={cartItem}
              deletable={false}
              onRemove={() => console.log("")}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,
  },
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  totalText: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  dateText: {
    fontSize: 16,
    fontFamily: "open-sans",
    color: "#888",
  },
  detailItems: {
    width: "100%",
  },
});

export default OrderItem;
