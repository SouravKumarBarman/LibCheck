import { Text, View, StyleSheet, ScrollView, StatusBar, Pressable } from "react-native";
import SearchResult from "@/components/searchResult";
import { useAuth } from "@/context/AuthContext";

export default function Index() {
  const { onLogout } = useAuth();

  const handleLogout = async () => {
    await onLogout();
  }
  return (
    <ScrollView>
      <StatusBar barStyle={"light-content"} backgroundColor={"black"} />
      <Pressable onPress={handleLogout}>
        <Text>Logout</Text>
      </Pressable>
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
