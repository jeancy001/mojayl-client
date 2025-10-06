import PrimaryButton from "@/components/PrimaryButton";
import { useAuth } from "@/context/authContext";
import { useTheme } from "@/context/theme-context";
import { AxiosError } from "axios";
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
  const [step, setStep] = useState<"email" | "code" | "password">("email");
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState(["", "", "", ""]); // code à 4 chiffres
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false);

  const { theme } = useTheme();
  const { requestResetCode, verifyCode, resetPassword } = useAuth();
  const router = useRouter();

  // Envoi du code
  const handleSendCode = async () => {
    try {
      setError("");
      setSuccess("");
      setLoading(true);
      if (!email.includes("@")) return setError("Entrez une adresse email valide.");
      await requestResetCode(email);
      setSuccess("Un code a été envoyé à votre adresse email.");
      setEmail("");
      setStep("code"); 
      setSuccess("")
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message = err.response?.data?.message || "Erreur inconnue.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Vérification du code
  const handleVerifyCode = async () => {
    try {
      setError("");
      setSuccess("")
      setLoading(true);
      const enteredCode = code.join("");
      await verifyCode(enteredCode);
      setStep("password"); 
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message = err.response?.data?.message || "Code invalide.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Réinitialisation du mot de passe
  const handleResetPassword = async () => {
    try {
      setError("");
      setLoading(true);
      const enteredCode = code.join("");
      await resetPassword(enteredCode, newPassword);
      setSuccess("Mot de passe réinitialisé avec succès.");
      setTimeout(() => {
        router.replace("/(tabs)"); // rediriger vers Accueil ou Connexion
      }, 1500);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message = err.response?.data?.message || "Erreur inconnue.";
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
          paddingTop:
            Platform.OS === "android" ? StatusBar.currentHeight ?? 20 : 20,
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      <View style={styles.container}>
        {/* Titre */}
        <Text style={[styles.title, { color: theme.colors.primary }]}>
          Mot de passe oublié ?
        </Text>

        {step === "email" && (
          <>
            <Text style={[styles.subtitle, { color: theme.colors.secondary }]}>
              Entrez votre adresse email pour recevoir un code de réinitialisation
            </Text>

            {/* Champ Email */}
            <View style={styles.inputGroup}>
              {error ? (
                <View style={styles.errorBox}>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              ) : null}
              {success ? (
                <View style={styles.successBox}>
                  <Text style={styles.successText}>{success}</Text>
                </View>
              ) : null}
              <Text style={[styles.inputLabel, { color: theme.colors.primary }]}>
                Adresse Email
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
                placeholder="Entrez votre email"
                placeholderTextColor={theme.colors.placeholder}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            {/* Bouton */}
            <PrimaryButton
              title={loading ? "Envoi..." : "Envoyer le code"}
              onPress={handleSendCode}
              buttonStyle={{ backgroundColor: theme.colors.primary }}
              textStyle={{ color: "#fff" }}
            />
          </>
        )}

        {step === "code" && (
          <>
            <Text style={[styles.subtitle, { color: theme.colors.secondary }]}>
              Entrez le code à 4 chiffres envoyé à votre email
            </Text>
             {error ? (
                <View style={styles.errorBox}>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              ) : null}
              {success ? (
                <View style={styles.successBox}>
                  <Text style={styles.successText}>{success}</Text>
                </View>
              ) : null}
              
            <View style={styles.codeContainer}>
              {code.map((c, i) => (
                <TextInput
                  key={i}
                  style={[
                    styles.codeInput,
                    {
                      backgroundColor: theme.colors.card,
                      color: theme.colors.text,
                      borderColor: theme.colors.border,
                    },
                  ]}
                  maxLength={1}
                  keyboardType="numeric"
                  value={c}
                  onChangeText={(val) => {
                    const newCode = [...code];
                    newCode[i] = val;
                    setCode(newCode);
                  }}
                />
              ))}
            </View>
            <PrimaryButton
              title={loading ? "Vérification..." : "Vérifier le code"}
              onPress={handleVerifyCode}
              buttonStyle={{ backgroundColor: theme.colors.primary }}
              textStyle={{ color: "#fff" }}
            />
          </>
        )}

        {step === "password" && (
          <>
            <Text style={[styles.subtitle, { color: theme.colors.secondary }]}>
              Entrez votre nouveau mot de passe
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
              placeholder="Nouveau mot de passe"
              placeholderTextColor={theme.colors.placeholder}
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <PrimaryButton
              title={loading ? "Réinitialisation..." : "Réinitialiser"}
              onPress={handleResetPassword}
              buttonStyle={{ backgroundColor: theme.colors.primary }}
              textStyle={{ color: "#fff" }}
            />
          </>
        )}
      </View>

      <View style={{ marginBottom: "20%" }}>
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
            Retour à la connexion
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Forgot;

const styles = StyleSheet.create({
  root: { flex: 1 },
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 6 },
  subtitle: { fontSize: 15, textAlign: "center", marginBottom: 28 },
  inputGroup: { marginBottom: 20 },
  inputLabel: { fontSize: 14, fontWeight: "600", marginBottom: 6 },
  input: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 14 },
  codeContainer: { flexDirection: "row", justifyContent: "space-evenly", marginBottom: 20 },
  codeInput: { borderWidth: 1, borderRadius: 8, padding: 12, fontSize: 18, textAlign: "center", width: 50 },
  errorBox: { backgroundColor: "#f8ccccff", marginBottom: 10, padding: 10, borderRadius: 5 },
  errorText: { color: "#df0a0abb", fontSize: 16, fontWeight: "bold", textAlign: "center" },
  successBox: { backgroundColor: "#baebdfff", marginBottom: 10, padding: 10, borderRadius: 5 },
  successText: { color: "#37b851bb", fontSize: 16, fontWeight: "bold", textAlign: "center" },
});
