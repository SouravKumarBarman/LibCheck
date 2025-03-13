import { Text, View, StyleSheet, ScrollView, StatusBar } from "react-native";
import SearchResult from "@/components/searchResult";

export default function Index() {
  return (
    <ScrollView>
      <StatusBar barStyle={"light-content"} backgroundColor={"black"} />
      <View style={styles.container}>
        <Text style={styles.headline}>Welcome to{"\n"}<Text style={{ fontWeight: "bold" }}>JEC CSE</Text>{"\n"}Library</Text>
        <SearchResult
          title="Introduction to Algorithm"
          authors={["Thomas H. Cormen", "Charles E. Leiserson", "Ronald L. Rivest", "Clifford Stein"]}
          edition={"3rd"}
          totalCopies={2}
          availableCopies={3}
          admin={false}
        />
      </View>
    </ScrollView>

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
    fontSize: 40
  }
});
