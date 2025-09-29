import { useTheme } from "@/context/theme-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get("window");

export default function WelcomeScreen() {
  const { theme, toggleTheme } = useTheme(); 

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.welcomeText, { color: theme.colors.primary }]}>Welcome</Text>
        <TouchableOpacity onPress={toggleTheme}>
          <Ionicons
            name={theme.dark ? "sunny" : "moon-outline"} // toggle icon based on dark/light
            size={26}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
      </View>

      {/* Subtitle */}
      <Text style={[styles.subtitle, { color: theme.colors.secondary }]}>
        Login or sign up to continue
      </Text>

      {/* Illustration */}
      <Image
        source={require("../assets/images/illustration.png")}
        style={styles.image}
        resizeMode="contain"
      />

      {/* App Info */}
      <Text style={[styles.appName, { color: theme.colors.primary }]}>SchedIt</Text>
      <Text style={[styles.appDescription, { color: theme.colors.secondary }]}>
        A Family Scheduling App{"\n"}For Parents
      </Text>

      {/* Buttons */}
      <TouchableOpacity
        style={[styles.primaryButton, { backgroundColor: theme.colors.primary }]}
        onPress={() => router.push("/register")}
      >
        <Text style={styles.primaryButtonText}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.secondaryButton, { borderColor: theme.colors.primary }]}
        onPress={() => router.push("/login")}
      >
        <Text style={[styles.secondaryButtonText, { color: theme.colors.primary }]}>
          Already have an account?
        </Text>
      </TouchableOpacity>

      {/* Guest Option */}
      <Text style={[styles.guestText, { color: theme.colors.secondary }]}>
        Continue as a guest
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  subtitle: {
    fontSize: 16,
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
    textAlign: "center",
    marginBottom: 6,
  },
  appDescription: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 36,
  },
  primaryButton: {
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
  },
  guestText: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
  },
});
