import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import Card from "../UI/Card";

const ProductItem = (props) => {
  // Touchable Opacity used for Android v21 and later
  // TouchableNativeFeedback used for other devices
  let TouchableComponent = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.product}>
      <TouchableComponent onPress={props.onSelect} useForeground>
        <View style={styles.touchContainer}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: props.imageURL }} />
          </View>
          <View style={styles.details}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.price}>
              ${parseFloat(props.price).toFixed(2)}
            </Text>
          </View>
          <View style={styles.actions}>{props.children}</View>
        </View>
      </TouchableComponent>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20,
  },
  touchContainer: {
    overflow: "hidden",
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
    fontFamily: "open-sans-bold",
  },
  price: {
    fontSize: 14,
    color: "#888",
    fontFamily: "open-sans",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "23%",
    padding: 30,
  },
  details: {
    alignItems: "center",
    height: "17%",
    padding: 10,
    fontFamily: "open-sans",
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
});

export default ProductItem;
