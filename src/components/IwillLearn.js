import { SafeAreaView, Text } from "react-native";

const IwillLearn = ({ route }) => {
  const words = route?.params?.words || [];
  return (
    <SafeAreaView>
      <Text>Öğreneceğim Kelimeler</Text>
      {words.map((word, index) => (
        <Text key={index}>{word.english}</Text>
      ))}
    </SafeAreaView>
  );
};

export default IwillLearn;
