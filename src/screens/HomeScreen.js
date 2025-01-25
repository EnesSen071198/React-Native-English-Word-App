import { View, FlatList, StyleSheet, Text, StatusBar } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Avatar, Card, IconButton } from "react-native-paper";
import A1Logo from "../assets/A1-icon.png";
import A2Logo from "../assets/A2-icon.png";
import B1Logo from "../assets/B1-icon.png";
import B2Logo from "../assets/B2-icon.png";
import C1Logo from "../assets/C1-icon.png";
import C2Logo from "../assets/C2-icon.png";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const data = [
  { id: "1", level: "A1", subtitle: "Beginner", icon: A1Logo },
  { id: "2", level: "A2", subtitle: "Elementary", icon: A2Logo },
  { id: "3", level: "B1", subtitle: "Intermediate", icon: B1Logo },
  { id: "4", level: "B2", subtitle: "Upper Intermediate", icon: B2Logo },
  { id: "5", level: "C1", subtitle: "Fluent", icon: C1Logo },
  { id: "6", level: "C2", subtitle: "Advance", icon: C2Logo }
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
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Card
              style={styles.card}
              onPress={() => navigateToContent(item.level)}>
              <View style={styles.cardContent}>
                <Avatar.Icon icon={item.icon} style={styles.avatar} />
                <View style={styles.textContainer}>
                  <Text style={styles.level}>{item.level}</Text>
                  <Text style={styles.subtitle}>{item.subtitle}</Text>
                </View>
              </View>
            </Card>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
    paddingHorizontal: 10
  },
  card: {
    marginBottom: 10,
    padding: 10,
    width: 380,
    borderRadius: 10,
    boxShadow: "0 0 10px rgba(39, 1, 128, 0.1)"
  },
  cardContent: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between"
  },
  avatar: {
    marginRight: 20,
    width: 100,
    height: 100
  },
  textContainer: {
    flex: 1
  },
  level: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333"
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginTop: 5
  },
  iconButton: {
    alignSelf: "flex-end"
  }
});
