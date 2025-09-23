import { Ionicons } from "@expo/vector-icons"; // Pour l’icône du mode nuit
// import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function WelcomeScreen() {
  //  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Header avec titre et icône */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Ionicons name="moon-outline" size={24} color="#0047FF" />
      </View>

      {/* Sous-texte */}
      <Text style={styles.subtitle}>Login or signup to continue</Text>

      {/* Illustration */}
      <Image
        source={require("../assets/images/illustration.png")} // Mets ton image ici
        style={styles.image}
        resizeMode="contain"
      />

      {/* Nom de l'app */}
      <Text style={styles.appName}>SchedIt</Text>
      <Text style={styles.appDescription}>A Family Scheduling App{'\n'}For Parents</Text>

      {/* Boutons */}
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
        <Text style={styles.secondaryButtonText}>Already have an account</Text>
      </TouchableOpacity>

      {/* Option invité */}
      <Text style={styles.guestText}>Continue as a guest?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
    // alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    marginBottom: 0,
  },
  welcomeText: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#0047FF",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 40,
    fontWeight: "bold",
    
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0047FF",
    marginBottom: 5,
    textAlign: "center",
  },
  appDescription: {
    fontSize: 14,
    textAlign: "center",
    color: "#333",
    marginBottom: 30,
  },
  primaryButton: {
    backgroundColor: "#0047FF",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  secondaryButton: {
    borderColor: "#0047FF",
    borderWidth: 1,
    width: "100%",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  secondaryButtonText: {
    color: "#0047FF",
    fontWeight: "600",
    fontSize: 16,
  },
  guestText: {
    fontSize: 14,
    color: "#666",
    marginTop: 10,    
    textAlign: "center",
  },
});
