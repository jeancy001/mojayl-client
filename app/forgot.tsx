
import PrimaryButton from "@/components/PrimaryButton";
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
  const router = useRouter()
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
        },
      ]}
    >
      <View style={styles.container}>
        {/* Title */}
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.subtitle}>
          Enter your email to receive a reset code
        </Text>

        {/* Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        {/* Button */}
        <PrimaryButton title="Send Code" onPress={handleSendCode} />
      </View>
      <TouchableOpacity onPress={()=>router.replace("/login")} style={{marginBottom:20,paddingBottom:20,justifyContent:'center', alignContent:"center" }}>
        <Text style={{textAlign:"center", color:"#0047ff", fontWeight:"bold"}}>Go back to  Login </Text>

      </TouchableOpacity>
    </View>
  );
};

export default Forgot;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0047FF",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    marginBottom: 28,
  },
  inputGroup: { marginBottom: 20 },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0047FF",
    marginBottom: 6,
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
});

