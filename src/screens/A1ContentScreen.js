import React, { useEffect, useState } from "react";
import { Pressable, SafeAreaView, View, StyleSheet, Text } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import * as Speech from "expo-speech"; // Expo Speech API

import A1Words from "../data/A1Words.json"; // JSON dosyasını buradan alıyoruz

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
  word,
  RegularContent,
  FlippedContent
}) => {
  const isDirectionX = direction === "x";

  const regularCardAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(isFlipped.value), [0, 1], [0, 180]);
    const rotateValue = withTiming(`${spinValue}deg`, { duration });

    return {
      transform: [
        isDirectionX ? { rotateX: rotateValue } : { rotateY: rotateValue }
      ]
    };
  });

  const flippedCardAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(isFlipped.value), [0, 1], [180, 360]);
    const rotateValue = withTiming(`${spinValue}deg`, { duration });

    return {
      transform: [
        isDirectionX ? { rotateX: rotateValue } : { rotateY: rotateValue }
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
        {RegularContent}
      </Animated.View>

      <Animated.View
        style={[
          flipCardStyles.flippedCard,
          cardStyle,
          flippedCardAnimatedStyle
        ]}>
        {FlippedContent}
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
  const isFlipped = useSharedValue(false);
  const [loadedWords, setLoadedWords] = useState([]);

  useEffect(() => {
    setLoadedWords(A1Words); // Load words from JSON file
  }, []);

  const handlePress = () => {
    isFlipped.value = !isFlipped.value;
  };

  const handlePronunciation = (word) => {
    Speech.speak(word.english); // Speak the English word
  };

  return (
    <SafeAreaView style={styles.container}>
      {loadedWords.map((word) => (
        <FlipCard
          key={word.id}
          isFlipped={isFlipped}
          cardStyle={styles.flipCard}
          RegularContent={<RegularContent word={word} />}
          FlippedContent={<FlippedContent word={word} />}
        />
      ))}

      <View style={styles.buttonContainer}>
        <Pressable style={styles.toggleButton} onPress={handlePress}>
          <Text style={styles.toggleButtonText}>Toggle card</Text>
        </Pressable>
        <Pressable
          style={styles.pronunciationButton}
          onPress={() => handlePronunciation(loadedWords[0])} // Speak the first word as an example
        >
          <Text style={styles.toggleButtonText}>Listen to Pronunciation</Text>
        </Pressable>
        <Pressable style={styles.instructionsButton}>
          <Text style={styles.instructionsText}>
            Please increase the volume on your device for better audio.
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 300,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonContainer: {
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center"
  },
  toggleButton: {
    backgroundColor: "#b58df1",
    padding: 12,
    borderRadius: 48,
    marginBottom: 10
  },
  pronunciationButton: {
    backgroundColor: "#f1b58d",
    padding: 12,
    borderRadius: 48
  },
  toggleButtonText: {
    color: "#fff",
    textAlign: "center"
  },
  flipCard: {
    width: 170,
    height: 200,
    backfaceVisibility: "hidden"
  },
  instructionsButton: {
    marginTop: 10
  },
  instructionsText: {
    color: "#000",
    textAlign: "center",
    fontSize: 16
  }
});
