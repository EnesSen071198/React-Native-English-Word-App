import React, { useEffect, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  ImageBackground
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import * as Speech from "expo-speech";
import { useNavigation } from "@react-navigation/native";
import A1Words from "../data/A1Words.json";
import Background from "../assets/background.jpg";

const RegularContent = ({ word }) => {
  return (
    <View style={regularContentStyles.card}>
      <Text style={regularContentStyles.text}>{word.english}</Text>
      <Text style={regularContentStyles.description}>{word.description}</Text>
    </View>
  );
};

const regularContentStyles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#b6cff7",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#001a72"
  },
  description: {
    color: "#333",
    marginTop: 10,
    textAlign: "center",
    paddingHorizontal: 20
  }
});

const FlippedContent = ({ word }) => {
  return (
    <View style={flippedContentStyles.card}>
      <Text style={flippedContentStyles.text}>{word.turkish}</Text>
      <Text style={flippedContentStyles.description}>{word.description}</Text>
    </View>
  );
};

const flippedContentStyles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#baeee5",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#001a72"
  },
  description: {
    color: "#333",
    marginTop: 10,
    textAlign: "center",
    paddingHorizontal: 20
  }
});

const FlipCard = ({
  isFlipped,
  cardStyle,
  direction = "y",
  duration = 500,
  word
}) => {
  const isDirectionX = direction === "x";

  const regularCardAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(isFlipped.value, [0, 1], [0, 180]);
    const rotateValue = `${spinValue}deg`;

    return {
      transform: [
        isDirectionX
          ? { rotateX: withTiming(rotateValue, { duration }) }
          : { rotateY: withTiming(rotateValue, { duration }) }
      ]
    };
  });

  const flippedCardAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(isFlipped.value, [0, 1], [180, 360]);
    const rotateValue = `${spinValue}deg`;

    return {
      transform: [
        isDirectionX
          ? { rotateX: withTiming(rotateValue, { duration }) }
          : { rotateY: withTiming(rotateValue, { duration }) }
      ]
    };
  });

  return (
    <View>
      <Animated.View
        style={[
          flipCardStyles.regularCard,
          cardStyle,
          regularCardAnimatedStyle
        ]}>
        <RegularContent word={word} />
      </Animated.View>

      <Animated.View
        style={[
          flipCardStyles.flippedCard,
          cardStyle,
          flippedCardAnimatedStyle
        ]}>
        <FlippedContent word={word} />
      </Animated.View>
    </View>
  );
};

const flipCardStyles = StyleSheet.create({
  regularCard: {
    position: "absolute",
    zIndex: 1
  },
  flippedCard: {
    zIndex: 2
  }
});

export default function A1ContentScreen() {
  const isFlipped = useSharedValue(0); // Başlangıç değeri 0
  const [loadedWords, setLoadedWords] = useState([]);
  const [randomWord, setRandomWord] = useState(null);
  const [knownWords, setKnownWords] = useState([]);
  const [learningWords, setLearningWords] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    setLoadedWords(A1Words); // JSON'dan kelimeleri yükle
    setRandomWord(A1Words[Math.floor(Math.random() * A1Words.length)]); // Rastgele kelime seç
  }, []);

  const handlePress = () => {
    isFlipped.value = isFlipped.value === 0 ? 1 : 0; // 0 ve 1 arasında geçiş yap
  };

  const handlePronunciation = (word) => {
    Speech.speak(word.english); // İngilizce kelimeyi seslendir
  };

  const handleIknowWord = () => {
    setKnownWords([...knownWords, randomWord]);
    setRandomWord(A1Words[Math.floor(Math.random() * A1Words.length)]);
  };

  const handleIwillLearn = () => {
    setLearningWords([...learningWords, randomWord]);
    setRandomWord(A1Words[Math.floor(Math.random() * A1Words.length)]);
  };

  return (
    <ImageBackground source={Background} style={styles.background}>
      <SafeAreaView style={styles.container}>
        {randomWord && (
          <FlipCard
            isFlipped={isFlipped}
            cardStyle={styles.flipCard}
            word={randomWord}
          />
        )}

        <View style={styles.buttonContainer}>
          <Pressable style={styles.toggleButton} onPress={handlePress}>
            <Text style={styles.toggleButtonText}>Toggle card</Text>
          </Pressable>
          <Pressable
            style={styles.pronunciationButton}
            onPress={() => handlePronunciation(randomWord)}>
            <Text style={styles.toggleButtonText}>Listen to Pronunciation</Text>
          </Pressable>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Pressable
            style={[styles.navigationButton, styles.ıLearnedButton]}
            onPress={handleIknowWord}>
            <Text style={styles.navigationButtonText}>IknowWord </Text>
          </Pressable>

          <Pressable
            style={[styles.navigationButton, styles.willLearnButton]}
            onPress={handleIwillLearn}>
            <Text style={styles.navigationButtonText}>IwillLearn</Text>
          </Pressable>
        </View>

        <View style={styles.navigationButtonContainer}>
          <Pressable
            style={[styles.navigationButton, styles.ıLearnedButton]}
            onPress={() =>
              navigation.navigate("IknowWord", { words: knownWords })
            }>
            <Text style={styles.navigationButtonText}>Biliyorum Sayfası</Text>
          </Pressable>
          <Pressable
            style={[styles.navigationButton, styles.willLearnButton]}
            onPress={() =>
              navigation.navigate("IwillLearn", { words: learningWords })
            }>
            <Text style={styles.navigationButtonText}>Öğreneceğim Sayfası</Text>
          </Pressable>
        </View>
      </SafeAreaView>{" "}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover" // Arka planın boyutunu otomatik ayarlar
  },
  container: {
    flex: 1,
    height: 300,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonContainer: {
    marginTop: 26,
    justifyContent: "center",
    alignItems: "center"
  },
  toggleButton: {
    backgroundColor: "#b58df1",
    padding: 15,
    borderRadius: 45,
    marginBottom: 30
  },
  pronunciationButton: {
    backgroundColor: "#4b5792",
    padding: 12,
    borderRadius: 48,
    marginBottom: 30
  },
  toggleButtonText: {
    color: "#fff",
    textAlign: "center"
  },
  flipCard: {
    width: 300,
    height: 200,
    backfaceVisibility: "hidden",
    fontSize: 30,
    fontFamily: "Arial"
  },
  navigationButtonContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    width: "80%"
  },
  navigationButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 48,
    marginHorizontal: 10
  },
  navigationButtonText: {
    color: "#fff",
    textAlign: "center"
  },
  ıLearnedButton: { backgroundColor: "#4CAF50" },
  willLearnButton: { backgroundColor: "orange" }
});
