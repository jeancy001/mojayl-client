import ArrowCircleButton from "@/components/ArrowCircleButton";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

// Data for 3 slides
const slides = [
  {
    id: "1",
    image: require("../assets/images/logo1.png"),
    text: "Mojayl la nouvelle façon de faire voyager vos colis",
  },
  {
    id: "2",
    image: require("../assets/images/logo2.png"),
    text: "Avec Mojayl vos colis voyagent plus simplement",
  },
  {
    id: "3",
    image: require("../assets/images/logo3.png"),
    text: "Parcourez les annonces,choisissez votre transporteur ou proposez vos services",
  },
];

const Didacticiel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const router = useRouter()

  // Handle scroll
  const handleScroll = (event: any) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(slideIndex);
  };

  // Next button
  const goNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.replace("/start")
    }
  };

  return (
    <View style={styles.container}>
      {/* FlatList for slides */}
      <StatusBar style="dark"/>
      <FlatList
        data={slides}
        ref={flatListRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        renderItem={({ item }) => (
          <View style={styles.wrapContent}>
            <View style={styles.imageContainer}>
              <Image source={item.image} style={styles.image} resizeMode="contain" />
            </View>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        )}
      />

      {/* Pagination Dots */}
      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: index === currentIndex ? "#FF6678" : "#ccc" },
            ]}
          />
        ))}
      </View>

      {/* Next Button */}
      <View style={styles.ButtonContainer}>
        <ArrowCircleButton onPress={goNext} />
      </View>
    </View>
  );
};

export default Didacticiel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  wrapContent: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: width * 0.7,
    height: 250,
  },
  text: {
  fontSize: 20,
  textAlign: "center",
  marginTop: 10,
  color: "#333",
  lineHeight: 26, 
  paddingHorizontal: 15
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  ButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
});
