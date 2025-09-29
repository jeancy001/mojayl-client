import { useTheme } from "@/context/theme-context";
import { Ionicons } from "@expo/vector-icons";
import { Checkbox } from "expo-checkbox";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const LoginScreen: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [keepLoggedIn, setKeepLoggedIn] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLogin = () => {
    console.log("Logging in with:", { email, password, keepLoggedIn });
  };

  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor: theme.colors.background,
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight ?? 20 : 20,
        },
      ]}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
            <Ionicons name="arrow-back" size={28} color={theme.colors.primary} />
          </TouchableOpacity>

          {/* Theme toggle */}
          <TouchableOpacity onPress={toggleTheme}>
            <Ionicons
              name={theme.dark ? "sunny" : "moon-outline"}
              size={28}
              color={theme.colors.primary}
            />
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text style={[styles.title, { color: theme.colors.primary }]}>Login Account</Text>
        <Text style={[styles.subtitle, { color: theme.colors.secondary }]}>Welcome Back 👋</Text>

        {/* Email */}
        <View style={styles.inputGroup}>
          <View style={styles.inputHeader}>
            <Text style={[styles.inputLabel, { color: theme.colors.primary }]}>Email Address</Text>
            <Text style={[styles.link, { color: theme.colors.primary }]}>Use Mobile?</Text>
          </View>
          <TextInput
            style={[
              styles.input,
              { backgroundColor: theme.colors.card, borderColor: theme.colors.border, color: theme.colors.text },
            ]}
            placeholder="Enter your email"
            placeholderTextColor={theme.colors.placeholder}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password */}
        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: theme.colors.primary }]}>Password</Text>
          <View style={styles.passwordWrapper}>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: theme.colors.card, borderColor: theme.colors.border, color: theme.colors.text },
              ]}
              placeholder="Enter your password"
              placeholderTextColor={theme.colors.placeholder}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? "eye-off" : "eye"} size={22} color={theme.colors.secondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Keep me logged in */}
        <View style={styles.checkboxRow}>
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={keepLoggedIn}
              onValueChange={setKeepLoggedIn}
              color={keepLoggedIn ? theme.colors.primary : undefined}
            />
            <Text style={[styles.checkboxText, { color: theme.colors.text }]}>Keep me logged in</Text>
          </View>
          <Text style={[styles.link, { color: theme.colors.primary }]} onPress={() => router.push("/forgot")}>
            Forgot Password?
          </Text>
        </View>

        {/* Login Button */}
        <TouchableOpacity style={[styles.primaryButton, { backgroundColor: theme.colors.primary }]} onPress={handleLogin}>
          <Text style={styles.primaryButtonText}>Login</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={[styles.line, { backgroundColor: theme.colors.border }]} />
          <Text style={[styles.orText, { color: theme.colors.secondary }]}>or sign in with</Text>
          <View style={[styles.line, { backgroundColor: theme.colors.border }]} />
        </View>

        {/* Social Buttons */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={[styles.socialButton, styles.shadow]}>
            <Ionicons name="logo-google" size={22} color="#EA4335" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.socialButton, styles.shadow]}>
            <Ionicons name="logo-apple" size={22} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.socialButton, styles.shadow]}>
            <Ionicons name="logo-facebook" size={22} color="#1877F2" />
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <Text style={[styles.footerText, { color: theme.colors.text }]}>
          Don’t have an account?{" "}
          <Text
            style={[styles.footerLink, { color: theme.colors.primary }]}
            onPress={() => router.push("/register")}
          >
            Sign Up
          </Text>
        </Text>
      </ScrollView>
    </View>
  );
};


export default LoginScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    alignItems: "center",
  },
  iconBtn: {
    padding: 6,
    borderRadius: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#0047FF",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B6B6B",
    fontWeight: "600",
    marginBottom: 25,
  },
  inputGroup: { marginBottom: 18 },
  inputHeader: { flexDirection: "row", justifyContent: "space-between" },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0047FF",
    marginBottom: 6,
  },
  link: {
    fontSize: 14,
    color: "#0047FF",
    textDecorationLine: "underline",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: "#000",
  },
  passwordWrapper: { position: "relative" },
  eyeIcon: { position: "absolute", right: 14, top: 14 },
  checkboxContainer: { flexDirection: "row", alignItems: "center" },
  checkboxText: { marginLeft: 8, fontSize: 14, color: "#333" },
  checkboxRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: "#0047FF",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 25,
  },
  primaryButtonText: { color: "#fff", fontWeight: "700", fontSize: 18 },
  divider: { flexDirection: "row", alignItems: "center", marginVertical: 20 },
  line: { flex: 1, height: 1, backgroundColor: "#E5E5E5" },
  orText: { marginHorizontal: 12, color: "#999", fontSize: 13 },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 25,
  },
  socialButton: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
  },
  shadow: {
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  footerText: { textAlign: "center", color: "#333", fontSize: 14 },
  footerLink: { color: "#0047FF", fontWeight: "bold" },
});
