import LogoIcons from '@/components/LogoIcons'
import PressableButton from '@/components/PressableButton'
import { useRouter } from 'expo-router'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const Start = () => {
    const router = useRouter()
  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <LogoIcons/>

        {/* Title + Subtitle */}
        <View style={styles.textWrapper}>
          <Text style={styles.title}>
            Enjoy your holiday {"\n"} with{" "}
            <Text style={styles.highlight}>Mojayl</Text>
          </Text>

          <Text style={styles.subtitle}>
            Keep your travel very comfortable, easy {"\n"} and explore the world with Travelm.
          </Text>
        </View>

        {/* Button */}
        <View style={styles.buttonWrapper}>
          <PressableButton title={"Explore"} onPress={() => router.replace('/login')} />
        </View>
        </View>

        {/* Bottom Image */}
        <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            source={require("../assets/images/Profile.png")}
            resizeMode="cover"
          />
        </View>

 
    </View>
  )
}

export default Start

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  contentWrapper: {
    marginTop:30,
    paddingHorizontal:20,
    paddingTop: 30,
  },

  textWrapper: {
    marginBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222222",
    lineHeight: 28,
  },
  highlight: {
    color: "#FF455B",
  },
  subtitle: {
    marginTop: 20,
    fontSize: 14,
    lineHeight: 20,
    color: "#777777",
    textAlign: "justify",
  },
  buttonWrapper: {
    marginTop: 20,
    alignItems: "flex-start",
  },
  imageWrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },
  image: {
    width: "100%",
    height: "100%",
  },
})
