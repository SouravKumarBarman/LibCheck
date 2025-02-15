import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (


    <View style={styles.container}>
      <Text style={styles.headline}>Welcome to{"\n"}<Text style={{ fontWeight: "bold" }}>JEC CSE</Text>{"\n"}Library</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
  },
  headline: {
    textAlign: 'center',
    fontSize: 40,
    marginTop: 30,
  }

});
