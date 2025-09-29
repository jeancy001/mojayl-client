import PrimaryButton from "@/components/PrimaryButton";
import { useTheme } from "@/context/theme-context";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Forgot: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const { theme } = useTheme();
  const router = useRouter();

  const handleSendCode = () => {
    console.log("Sending reset code to:", email);
  };

  return (
    <View
      style={[
        styles.root,
        {
          paddingTop:
            Platform.OS === "android" ? StatusBar.currentHeight ?? 20 : 20,
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      <View style={styles.container}>
        {/* Title */}
        <Text style={[styles.title, { color: theme.colors.primary }]}>
          Forgot Password?
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.secondary }]}>
          Enter your email to receive a reset code
        </Text>

        {/* Input */}
        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: theme.colors.primary }]}>
            Email Address
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.colors.card,
                color: theme.colors.text,
                borderColor: theme.colors.border,
              },
            ]}
            placeholder="Enter your email"
            placeholderTextColor={theme.colors.placeholder}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        {/* Button */}
        <PrimaryButton
          title="Send Code"
          onPress={handleSendCode}
          buttonStyle={{ backgroundColor: theme.colors.primary }}
          textStyle={{ color: "#fff" }}
        />
      </View>

      <TouchableOpacity
        onPress={() => router.replace("/login")}
        style={{ marginBottom: 20, paddingBottom: 20 }}
      >
        <Text
          style={{
            textAlign: "center",
            color: theme.colors.primary,
            fontWeight: "bold",
          }}
        >
          Go back to Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Forgot;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 28,
  },
  inputGroup: { marginBottom: 20 },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
  },
});
