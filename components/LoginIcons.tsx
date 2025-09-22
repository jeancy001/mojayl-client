import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

const LoginIcons = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/Rectangle 52.png")}
        style={styles.icon}
        resizeMode="contain"
      />
      {/* First icon slightly overlapping the second */}
      <Image
        source={require("../assets/images/Rectangle 53.png")}
        style={[styles.icon, styles.firstIcon]}
        resizeMode="contain"
      />
    </View>
  )
}

export default LoginIcons

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",        // horizontal layout
    justifyContent: "flex-end",  // push icons to the right
    alignItems: "center",
    paddingRight: 20,
    marginTop: 10,
  },
  icon: {
    width:120,
    height:140,
    borderRadius: 12,
    backgroundColor: "#fff",     // optional for contrast
    elevation: 3,                // subtle shadow for Android
    shadowColor: "#000",         // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  firstIcon: {
    marginRight: -40,            // overlap first icon on top of second
    zIndex: 2,                   // ensures first icon appears above
  },
})
