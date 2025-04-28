import { Text, View, StyleSheet, ScrollView, StatusBar, Pressable, RefreshControl } from "react-native";
import SearchResult from "@/components/searchResult";
import { useAuth } from "@/context/AuthContext";
import axios from "@/config/axiosConfig";
import { useEffect, useState, useCallback } from "react";
import * as SecureStore from 'expo-secure-store';

export default function Index() {
  const { onLogout } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([])
  const [refreshing, setRefreshing] = useState(false);

  const fetchWishlist = async () => {
    try {
      let BEARER_TOKEN = await SecureStore.getItemAsync('accessToken');
      const res = await axios.get("/wishlist/all-books", {
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN}`
        }
      });
      setWishlistItems(res.data.wishlist)
      console.log(wishlistItems)
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    }
  };

  const deleteWishlist = async (bookid: string) => {
    try {
      const BEARER_TOKEN = await SecureStore.getItemAsync('accessToken');

      const res = await axios.delete("/wishlist/", {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`
        },
        data: {
          book_id: bookid
        }
      })
      if (res.status == 200) {
        console.log("book deleted successfully from wishlist")
      }
      console.log(wishlistItems)
    } catch (error) {
      console.error('Failed to delete wishlist:', error);
    }
  };



  const handleLogout = async () => {
    await onLogout();
  }

  useEffect(() => {
    fetchWishlist()
  }, [])

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);


  return (
    <ScrollView refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <StatusBar barStyle={"light-content"} backgroundColor={"black"} />
      <Pressable onPress={handleLogout}>
        <Text>Logout</Text>
      </Pressable>
      <Pressable onPress={fetchWishlist}>
        <Text>Refresh</Text>
      </Pressable>
      <View style={styles.container}>
        <Text style={styles.headline}>Welcome to{"\n"}<Text style={{ fontWeight: "bold" }}>JEC CSE</Text>{"\n"}Library</Text>
        {wishlistItems.map((wishlistItem) => (
          <>
            <View key={wishlistItem.id}>
              <SearchResult
                title={wishlistItem?.books.title}
                authors={[wishlistItem.books.author]}
                edition={"3rd"}
                totalCopies={2}
                availableCopies={wishlistItem.books.available_books}
                admin={false}
              />
              <Pressable onPress={() => deleteWishlist(wishlistItem.book_id)}>
                <Text>delete</Text>
              </Pressable>

            </View>

          </>
        ))}
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
