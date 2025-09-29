import React from "react";
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

interface ButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  buttonStyle?: StyleProp<ViewStyle>; // optional custom style for button
  textStyle?: StyleProp<TextStyle>;   // optional custom style for text
}

const PrimaryButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  buttonStyle,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.buttonWrapper, buttonStyle]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonWrapper: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    marginVertical: 10,
    backgroundColor: "#0047FF",
    borderRadius: 12,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
