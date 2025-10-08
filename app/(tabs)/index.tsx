import ProfileInfo from "@/components/ProfileInfo";
import { useAuth } from "@/context/authContext";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image, ImageBackground,
  ScrollView, StyleSheet, Text, TouchableOpacity, View,
} from "react-native";

export default function HomeScreen() {
  const [activeMode, setActiveMode] = useState<"expediteur" | "transporteur">(
    "expediteur"
  );
  const [imageUrl, setImageUrl]= useState<string|null>(null)
  const [statut, setStatut] = useState<string | null>(null);
  const { user } = useAuth();

  
// Demande de permission au montage du composant
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setStatut(status);

      if (status !== "granted") {
        Alert.alert(
          "Permission requise",
          "Vous devez autoriser l’accès à vos photos pour pouvoir choisir une image de profil."
        );
      }
    })();
  }, []);

  // Gestion du sélecteur d'image
  const handleImagePicker = async () => {
    if (statut !== "granted") {
      Alert.alert(
        "Permission refusée",
        "Veuillez autoriser l’accès aux photos dans les paramètres pour continuer."
      );
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setImageUrl(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Erreur lors de la sélection de l’image :", error);
      Alert.alert("Erreur", "Une erreur est survenue lors du choix de l’image.");
    }
  };

  return (
    <View>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <ImageBackground
            source={require("../../assets/profile/header_bg.png")}
            style={styles.headerBackground}
            resizeMode="cover"
          >
            <View style={styles.overlay}>
              {imageUrl?(
               <TouchableOpacity onPress={handleImagePicker}>
              <View style={styles.profileImageContainer}>
               
                <Image
                  source={{uri:imageUrl}}
                  style={styles.profileImage}
                />
              </View>
                </TouchableOpacity>
              ):(
               <TouchableOpacity onPress={handleImagePicker}>
              <View style={styles.profileImageContainer}>
               
                <Image
                  source={require("../../assets/profile/profile.png")}
                  style={styles.profileImage}
                />
              </View>
                </TouchableOpacity>
              )}

    
            </View>
          </ImageBackground>
        </View>

        {/* CONTENT */}
        <View style={styles.content}>
          <Text style={styles.infoText}>
            {user?.prenom} {user?.nom}
          </Text>
          <Text style={styles.infoSubText}>{user?.email}</Text>
        </View>

        {/* MODE SWITCHER */}
        <View style={styles.modeContainer}>
          <TouchableOpacity
            style={[
              styles.buttonMode,
              activeMode === "expediteur" && styles.activeButton,
            ]}
            onPress={() => setActiveMode("expediteur")}
          >
            <Text
              style={[
                styles.modeText,
                activeMode === "expediteur" && styles.activeText,
              ]}
            >
              Mode Expéditeur
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.buttonMode,
              activeMode === "transporteur" && styles.activeButton,
            ]}
            onPress={() => setActiveMode("transporteur")}
          >
            <Text
              style={[
                styles.modeText,
                activeMode === "transporteur" && styles.activeText,
              ]}
            >
              Mode Transporteur
            </Text>
          </TouchableOpacity>
        </View>

        {/* CURRENT MODE INFO */}
        <View style={styles.modeStatus}>
          <Text style={styles.statusText}>
            Current Mode:{" "}
            <Text style={{ fontWeight: "bold", color: "#4545BB" }}>
              {activeMode === "expediteur" ? "Expéditeur" : "Transporteur"}
            </Text>
          </Text>

          <ProfileInfo />
        </View>
      </View>
    </ScrollView>
    {activeMode === "expediteur" &&(
         <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.buttonCircle}>
        <Ionicons size={28} name="add" color="#fff" />
      </TouchableOpacity>
    </View>
    )}


        </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#f4f4f4",
    paddingBottom: 40,
  },
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  header: {
    height: 250,
    width: "100%",
  },
  headerBackground: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 20,
    backgroundColor: "#ff455b",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    marginTop: "45%",
    elevation: 4,
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  profileTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
  },
  content: {
    paddingVertical: 30,
    alignItems: "center",
  },
  infoText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  infoSubText: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  modeContainer: {
    backgroundColor: "#ececec",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 2,
    marginHorizontal:20,
    borderRadius: 50,
    elevation: 2,
  },
  buttonMode: {
    flex: 1,
    paddingVertical: 15,
    marginHorizontal:1,
    backgroundColor: "#ececec",
   
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  modeText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
  activeButton: {
    backgroundColor: "#fff",
  },
  activeText: {
    color: "#333",
  },
  modeStatus: {
    alignItems: "center",
    marginTop: 20,
  },
  statusText: {
    fontSize: 16,
    color: "#333",
  },
buttonContainer: {
    position: "absolute", 
    bottom: 30,           
    left: 0,
    right: 0,
    alignItems: "center", 
    zIndex: 100,          
  },
  buttonCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,        
    backgroundColor: "#ff455b",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,           
    shadowColor: "#000",   
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
