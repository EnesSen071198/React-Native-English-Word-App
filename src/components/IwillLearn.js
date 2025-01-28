import { SafeAreaView, Text, StyleSheet, View } from "react-native";

const IwillLearn = ({ route }) => {
  const words = route?.params?.words || [];
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Öğreneceğim Kelimeler</Text>
      {words.map((word, index) => (
        <View style={styles.wordContainer} key={index}>
          <Text style={styles.wordText}>{word.english}</Text>
        </View>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center"
  },
  wordContainer: {
    backgroundColor: "#fff",
    marginBottom: 10,
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  wordText: {
    fontSize: 18,
    color: "#555"
  }
});

export default IwillLearn;
