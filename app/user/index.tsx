import { Text, View, StyleSheet, ScrollView, StatusBar, Pressable, Button } from "react-native";
import SearchResult from "@/components/searchResult";
import { useAuth } from "@/context/AuthContext";
import axios from "@/config/axiosConfig";
import { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';

export default function Index() {
  const { onLogout } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([])

  const fetchWishlist = async () => {
    try {
      let BEARER_TOKEN = await SecureStore.getItemAsync('accessToken');
      const studentId = await axios.get('/students/id', {
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN}`
        }
      })
      console.log(studentId)
      const res = await axios.get(`/wishlist/${studentId.data.student_id}`, {
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
      const studentId = await axios.get('/students/id', {
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN}`
        }
      })
      const userId=studentId.data.student_id
      console.log(userId, bookid)
      const res = await axios.delete("/wishlist/", {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`
        },
        data: {
          user_id: userId,
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


  return (
    <ScrollView>
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
            <SearchResult
              key={wishlistItem.id}
              title={wishlistItem?.books.title}
              authors={[wishlistItem.books.author]}
              edition={"3rd"}
              totalCopies={2}
              availableCopies={wishlistItem.books.available_books}
              admin={false}
            />
            <Pressable onPress={()=>deleteWishlist(wishlistItem.book_id)}>
              <Text>delete</Text>
            </Pressable>
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
