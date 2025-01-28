import { SafeAreaView, Text } from "react-native";

const IknowWord = ({ route }) => {
  const words = route?.params?.words || [];
  return (
    <SafeAreaView>
      <Text>Bildiğim Kelimeler</Text>
      {words.map((word, index) => (
        <Text key={index}>{word.english}</Text>
      ))}
    </SafeAreaView>
  );
};
export default IknowWord;
