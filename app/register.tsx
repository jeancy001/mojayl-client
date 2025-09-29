
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

const RegisterScreen: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isChecked, setChecked] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const handleRegister = () => {
    console.log("Registering:", { email, password, confirmPassword, isChecked });
  };

  return (
    <View
      style={[
        styles.root,
        {
          paddingTop:
            Platform.OS === "android" ? StatusBar.currentHeight ?? 20 : 20,
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
            <Ionicons name="arrow-back" size={28} color="#0047FF" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="moon-outline" size={28} color="#0047FF" />
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to continue</Text>

        {/* Email */}
        <View style={styles.inputGroup}>
          <View style={styles.inputHeader}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <Text style={styles.link}>Use Mobile?</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter email address"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.passwordWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Create password"
              placeholderTextColor="#aaa"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={22}
                color="#666"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Confirm Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <View style={styles.passwordWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Re-enter password"
              placeholderTextColor="#aaa"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Ionicons
                name={showConfirmPassword ? "eye-off" : "eye"}
                size={22}
                color="#666"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Privacy Policy */}
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? "#0047FF" : undefined}
          />
          <Text style={styles.checkboxText}>I agree with privacy policy</Text>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.primaryButton} onPress={handleRegister}>
          <Text style={styles.primaryButtonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.orText}>or sign up with</Text>
          <View style={styles.line} />
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

        {/* Already have account */}
        <Text style={styles.footerText}>
          Already have an account?{" "}
          <Text
            style={styles.footerLink}
            onPress={() => router.push("/login")}
          >
            Login
          </Text>
        </Text>
      </ScrollView>
    </View>
  );
};

export default RegisterScreen;

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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  checkboxText: { marginLeft: 8, fontSize: 14, color: "#333" },
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
