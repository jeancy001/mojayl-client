import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Didaticiel = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.wrapContent}>
        <View style={styles.whiteCircle}></View>
        <Text style={styles.mojaylText}>Mojayl</Text>
      </View>
    </View>
  );
};

export default Didaticiel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF455B",
    justifyContent: "center", 
    alignItems: "center",
  },
  wrapContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  whiteCircle: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25, 
  },
  mojaylText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 1,
  },
});
