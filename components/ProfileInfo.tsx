import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Image, StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

const ProfileInfo = () => {
  const [progression, setProgression] = useState<number>(30);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const radius = 45;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;

  // Animate progress circle dynamically
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progression,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [progression]);

  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  return (
    <View>
    <View style={styles.wrapperContainer}>
      {/* LEFT: Profile + Progress */}
      <View style={styles.container}>
        <View style={styles.profileRow}>
          {/* Profile Image */}
          <View style={styles.imageWrapper}>
            <Image
              source={require("../assets/profile/profile_30.png")}
              style={styles.profileImage}
            />
          </View>

          {/* Progress Circle */}
          <View style={styles.progressWrapper}>
            <Svg height="120" width="120" viewBox="0 0 120 120">
              <Circle
                cx="60"
                cy="60"
                r={radius}
                stroke="#E0E0E0"
                strokeWidth={strokeWidth}
                fill="none"
              />
              <AnimatedCircle
                cx="60"
                cy="60"
                r={radius}
                stroke="#ff455b"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
                rotation="-90"
                origin="60,60"
              />
            </Svg>

            <View style={styles.percentageContainer}>
              <Animated.Text style={styles.percentageText}>
                {Math.round(progression)}%
              </Animated.Text>
            </View>
          </View>
        </View>

        {/* Progress Info Text */}
        <View style={styles.progressTextSection}>
          <Text style={styles.progressHint}>
            Complétez votre profil pour plus de confiance
          </Text>
          <Text style={styles.progressAction}>Compléter maintenant</Text>
        </View>
      </View>

      {/* RIGHT: Stats (Annonces + Avis) */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Mes annonces</Text>
        </View>
        
        <View style={[styles.statBox, styles.statDivider]}>
          <Ionicons name="heart" size={28} color="#ff455b" />
          <Text style={styles.statNumber}>10</Text>
          <Text style={styles.statLabel}>Avis</Text>
        </View>
      </View>


    </View>


    <View style={styles.rowContainer}>
      <View style={styles.item}>
        <Ionicons name="cash-outline" size={28} color="#4545BB" />
        <Text style={styles.itemText}>Portefeuille</Text>
      </View>

      <View style={styles.item}>
        <Ionicons name="stats-chart" size={28} color="#4545BB" />
        <Text style={styles.itemText}>Statistique</Text>
      </View>
    </View>

    </View>
  );
};

// Allow animation control on SVG Circle
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default ProfileInfo;

const styles = StyleSheet.create({
  wrapperContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 10,
    marginTop: 30,
  },

  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 4,
    padding: 15,
    width: "65%",
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  imageWrapper: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 70,
    elevation: 2,
    width: 100,
    height: 100,
  },

  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },

  progressWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
  },

  percentageContainer: {
    position: "absolute",
    top: 48,
    left: 48,
    justifyContent: "center",
    alignItems: "center",
  },

  percentageText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff455b",
  },

  progressTextSection: {
    marginTop: 10,
  },

  progressHint: {
    color: "#555",
    fontSize: 14,
  },

  progressAction: {
    color: "#4545BB",
    fontWeight: "600",
    marginTop: 3,
  },

  statsContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 4,
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "30%",
  },

  statBox: {
    alignItems: "center",
    marginBottom: 15,
  },

  statDivider: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 15,
  },

  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4545BB",
  },

  statLabel: {
    color: "#666",
    fontSize: 13,
    marginTop: 4,
    textAlign: "center",
  },


  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-around", // space between the items
    alignItems: "center",
    marginVertical: 20,
  },
  item: {
    flexDirection: "column",
    alignItems: "center",
  },
  itemText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },

});
