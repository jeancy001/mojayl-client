
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get("window");

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Ionicons name="moon-outline" size={26} color="#0047FF" />
      </View>

      {/* Subtitle */}
      <Text style={styles.subtitle}>Login or sign up to continue</Text>

      {/* Illustration */}
      <Image
        source={require("../assets/images/illustration.png")}
        style={styles.image}
        resizeMode="contain"
      />

      {/* App Info */}
      <Text style={styles.appName}>SchedIt</Text>
      <Text style={styles.appDescription}>
        A Family Scheduling App{"\n"}For Parents
      </Text>

      {/* Buttons */}
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => router.push("/register")}
      >
        <Text style={styles.primaryButtonText}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.secondaryButtonText}>Already have an account?</Text>
      </TouchableOpacity>

      {/* Guest Option */}
      <Text style={styles.guestText}>Continue as a guest</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingTop: 40,
    justifyContent: "flex-start",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#0047FF",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 30,
    fontWeight: "500",
  },
  image: {
    width: width * 0.9,
    height: width * 0.6,
    alignSelf: "center",
    marginBottom: 24,
  },
  appName: {
    fontSize: 30,
    fontWeight: "700",
    color: "#0047FF",
    textAlign: "center",
    marginBottom: 6,
  },
  appDescription: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    color: "#444",
    marginBottom: 36,
  },
  primaryButton: {
    backgroundColor: "#0047FF",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 14,
    width: "100%",
    alignSelf: "center",
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  secondaryButton: {
    borderColor: "#0047FF",
    borderWidth: 1.5,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
    alignSelf: "center",
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0047FF",
  },
  guestText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 8,
  },
});

