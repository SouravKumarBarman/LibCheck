import { Text, View, StyleSheet, ScrollView, StatusBar, Pressable, RefreshControl, ActivityIndicator } from "react-native";
import SearchResult from "@/components/searchResult";
import axios from "@/config/axiosConfig";
import { useEffect, useState, useCallback } from "react";
import * as SecureStore from 'expo-secure-store';

export default function Index() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for delete operation

  const fetchWishlist = async () => {
    try {
      let BEARER_TOKEN = await SecureStore.getItemAsync('accessToken');
      const res = await axios.get("/wishlist/all-books", {
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN}`
        }
      });
      setWishlistItems(res.data.wishlist);
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
    }
  };

  const deleteWishlist = async (bookid: string) => {
    setLoading(true); // Start loading
    try {
      const BEARER_TOKEN = await SecureStore.getItemAsync('accessToken');

      const res = await axios.delete("/wishlist/", {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`
        },
        data: {
          book_id: bookid
        }
      });
      if (res.status === 200) {
        console.log("Book deleted successfully from wishlist");
        setWishlistItems((prevItems) =>
          prevItems.filter((item) => item.book_id !== bookid)
        );
      }
    } catch (error) {
      console.error('Failed to delete wishlist:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchWishlist();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <StatusBar barStyle={"light-content"} backgroundColor={"black"} />
      <View style={styles.container}>
        <Text style={styles.headline}>
          Welcome to{"\n"}
          <Text style={{ fontWeight: "bold" }}>JEC CSE</Text>
          {"\n"}Library
        </Text>
        {wishlistItems.map((wishlistItem) => (
          <View key={wishlistItem.id} style={styles.wishlistItem}>
            <SearchResult
              title={wishlistItem?.books.title}
              authors={[wishlistItem.books.author]}
              availableCopies={wishlistItem.books.available_books}
            />
            <Pressable
              style={styles.deleteButton}
              onPress={() => deleteWishlist(wishlistItem.book_id)}
              disabled={loading} // Disable button while loading
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.deleteButtonText}>Delete</Text>
              )}
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
  },
  headline: {
    textAlign: 'center',
    fontSize: 40,
    marginBottom: 20,
  },
  wishlistItem: {
    marginBottom: 16,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  deleteButton: {
    marginTop: 8,
    backgroundColor: '#ff4d4d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
