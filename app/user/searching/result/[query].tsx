import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, Button, StyleSheet } from "react-native";

export default function ResultsScreen() {
  const { query } = useLocalSearchParams(); // Get the search query from the URL
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`https://api.example.com/search?q=${query}`);
        const result = await response.json();
        setData(result.items || []); // Assuming API returns { items: [...] }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) {
    return <ActivityIndicator size="large" color="blue" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <Button title="Back to Search" onPress={() => router.back()} />
      <Text style={styles.heading}>Results for "{query}"</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  heading: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  item: { padding: 15, borderBottomWidth: 1, borderBottomColor: "#ddd" },
});
