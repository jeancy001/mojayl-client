import { useAuth } from "@/context/authContext";
import { useTheme } from "@/context/theme-context";
import { Ionicons } from "@expo/vector-icons";
import { AxiosError } from "axios";
import Checkbox from "expo-checkbox";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const RegisterScreen: React.FC = () => {
  const { theme, toggleTheme } = useTheme(); // get theme and toggle function

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isChecked, setChecked] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [error,  setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)


  const {register}= useAuth()
const handleRegister = async () => {
  setLoading(true);
  setError(""); 
  try {
    if (!email || !password || !confirmPassword || !isChecked) {
      setError("Veuillez renseigner tous les champs.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe doivent être identiques.");
      return;
    }

    const data = {
      email,
      password
    };

    await register(data);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setChecked(false)
    setLoading(false)

    Alert.alert(
  "Confirmation",
  "Vous êtes inscrit avec succès"
);

    router.replace("/(tabs)")

    console.log("Registering:", {
      email,
      password,
      confirmPassword,
      isChecked,
    });
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    const message = err.response?.data?.message || err.message || "Erreur inconnue";
    setError(message);
  } finally {
    setLoading(false);
  }
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

          {/* Theme Toggle */}
          <TouchableOpacity onPress={toggleTheme}>
            <Ionicons
              name={theme.dark ? "sunny" : "moon-outline"}
              size={28}
              color={theme.colors.primary}
            />
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text style={[styles.title, { color: theme.colors.primary }]}>Créez un compte</Text>
        <Text style={[styles.subtitle, { color: theme.colors.secondary }]}>Inscrivez-vous pour continuer</Text>

        {/* Email */}
        <View style={styles.inputGroup}>
         {error && (<View style ={[styles.ErrorMessageViews, {backgroundColor:theme.colors.card}]}><Text style={styles.errMessage}>{error}</Text></View> )}
          <View style={styles.inputHeader}>
            <Text style={[styles.inputLabel, { color: theme.colors.link }]}>Email Address</Text>
            <Text style={[styles.link, { color: theme.colors.link }]}>Utiliser un Téléphone </Text>
          </View>
          <TextInput
            style={[styles.input, { backgroundColor: theme.colors.card, color: theme.colors.text }]}
            placeholder="Entrer Votre  Email"
            placeholderTextColor={theme.colors.placeholder}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password */}
        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: theme.colors.link }]}>Mot de passe</Text>
          <View style={styles.passwordWrapper}>
            <TextInput
              style={[styles.input, { backgroundColor: theme.colors.card, color: theme.colors.text }]}
              placeholder="Créez un Mot de passe"
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

        {/* Confirm Password */}
        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: theme.colors.link }]}>Confirmez votre mot de passe</Text>
          <View style={styles.passwordWrapper}>
            <TextInput
              style={[styles.input, { backgroundColor: theme.colors.card, color: theme.colors.text }]}
              placeholder="Confirmez votre mot de passe"
              placeholderTextColor={theme.colors.placeholder}
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
                color={theme.colors.secondary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Privacy Policy */}
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? theme.colors.primary : undefined}
          />
          <Text style={[styles.checkboxText, { color: theme.colors.text }]}>
           J’accepte la politique de confidentialité
          </Text>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: theme.colors.primary }]}
          onPress={handleRegister}
        >
          <Text style={styles.primaryButtonText}> {loading ? "Enregistrement...":"Inscrivez-vous"}</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={[styles.orText, { color: theme.colors.link }]}>Ou  Continuer  avec</Text>
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
        <Text style={[styles.footerText, { color: theme.colors.text }]}>
          Avez-vous  deja  un compte?{" "}
          <Text
            style={[styles.footerLink, { color: theme.colors.primary }]}
            onPress={() => router.push("/login")}
          >
            Connexion
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
  ErrorMessageViews:{
   backgroundColor:"#eeb3b3ff",
   padding:10,
   borderRadius:2,
   borderColor:"#ddd"
  },
  errMessage:{
     fontSize:18,
     fontWeight:"bold",
     color:"#f33232ff",
      paddingBottom:1,
     }
});
