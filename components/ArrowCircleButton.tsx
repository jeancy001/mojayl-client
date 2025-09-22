import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

interface ButtonPros {
  onPress: () => void;
}

const ArrowCircleButton = ({ onPress }: ButtonPros) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Ionicons name="arrow-forward" size={24} color="#fff" />
    </TouchableOpacity>
  );
};

export default ArrowCircleButton;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6678",
    width: 60,
    height: 60,
    borderRadius: 30, 
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
});
