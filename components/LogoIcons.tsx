import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const LogoIcons = () => {
  return (
        <View style={styles.logoWrapper}>
          <Image
            source={require("../assets/images/profileIcone.png")}
            style={styles.logoIcon}
            resizeMode="contain"
          />
          <Text style={styles.logoText}>Mojayl</Text>
        </View>
  )
}

export default LogoIcons

const styles = StyleSheet.create({


      logoWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  logoIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  logoText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333333",
  },
})