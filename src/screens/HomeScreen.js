import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ImageBackground,
  Image
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Card } from "react-native-paper";
import A1Logo from "../assets/A1-icon.png";
import A2Logo from "../assets/A2-icon.png";
import B1Logo from "../assets/B1-icon.png";
import B2Logo from "../assets/B2-icon.png";
import C1Logo from "../assets/C1-icon.png";
import C2Logo from "../assets/C2-icon.png";

import A1Background from "../assets/A1Background.jpg";
import A2Background from "../assets/A2Background.jpg";
import B1Background from "../assets/B1Background.jpg";
import B2Background from "../assets/B2Background.jpg";
import C1Background from "../assets/C1Background.jpg";
import C2Background from "../assets/C2Background.jpg";

import React from "react";
import { useNavigation } from "@react-navigation/native";
import MainBackground from "../assets/main-background.jpg";

const data = [
  {
    id: "1",
    level: "A1",
    subtitle: "Beginner",
    icon: A1Logo,
    bg: A1Background
  },
  {
    id: "2",
    level: "A2",
    subtitle: "Elementary",
    icon: A2Logo,
    bg: A2Background
  },
  {
    id: "3",
    level: "B1",
    subtitle: "Intermediate",
    icon: B1Logo,
    bg: B1Background
  },
  {
    id: "4",
    level: "B2",
    subtitle: "Upper Intermediate",
    icon: B2Logo,
    bg: B2Background
  },
  { id: "5", level: "C1", subtitle: "Fluent", icon: C1Logo, bg: C1Background },
  { id: "6", level: "C2", subtitle: "Advance", icon: C2Logo, bg: C2Background }
];

const HomeScreen = () => {
  const navigation = useNavigation();

  const navigateToContent = (level) => {
    switch (level) {
      case "A1":
        navigation.navigate("A1Content");
        break;
      case "A2":
        navigation.navigate("A2Content");
        break;
      case "B1":
        navigation.navigate("B1Content");
        break;
      case "B2":
        navigation.navigate("B2Content");
        break;
      // Add more cases if needed
      default:
        break;
    }
  };

  return (
    <ImageBackground source={MainBackground} style={styles.background}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <Card
                style={styles.card}
                onPress={() => navigateToContent(item.level)}>
                {/* Use ImageBackground for Card background */}
                <ImageBackground source={item.bg} style={styles.cardBackground}>
                  <View style={styles.cardContent}>
                    <Image source={item.icon} style={styles.avatar} />
                    <View style={styles.textContainer}>
                      <Text style={styles.level}>{item.subtitle}</Text>
                    </View>
                  </View>
                </ImageBackground>
              </Card>
            )}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover" // Automatically adjusts background size
  },
  container: {
    flex: 1,
    paddingTop: 10,
    marginTop: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    marginBottom: 10,
    padding: 0, // Removed padding to allow the background to cover the card area
    width: 380,
    borderRadius: 40,
    overflow: "hidden" // Ensures the background fits inside the rounded card
  },
  cardBackground: {
    flex: 1,
    justifyContent: "center", // Adjust content position
    alignItems: "center", // Center content within the background image
    borderRadius: 40 // Ensure background matches the card's rounded corners
  },
  cardContent: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20 // Padding inside the card
  },
  avatar: {
    marginRight: 20,
    width: 100,
    height: 100,
    borderRadius: 40, // Ensures the avatar is circular
    resizeMode: "cover" // Ensures the image fills the avatar area properly
  },
  textContainer: {
    flex: 1
  },
  level: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff" // White text for better visibility
  }
});
