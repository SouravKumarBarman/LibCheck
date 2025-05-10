import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from '@/config/axiosConfig';
import SearchResult from '@/components/searchResult';

interface SearchResultItem {
  id: string;
  books: {
    title: string;
    author: string;
    available_books: number;
  };
}

const ReturnBook = () => {
  const [rollNo, setRollNo] = useState('');
  const [books, setBooks] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setBooks([]);
    try {
      const BEARER_TOKEN = await SecureStore.getItemAsync('accessToken');
      const res = await axios.get(`/students/rollno/${rollNo}`, {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      });

      const booksRes = await axios.get(
        `/borrow/all-borrow-records-by-rollno/${res.data.student_id}`,
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        }
      );

      setBooks(booksRes.data.borrow_records);
    } catch (error) {
      console.error('Error fetching books: ', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (borrowid:{id:string}) => {
    setLoading(true);
    try {
      const BEARER_TOKEN = await SecureStore.getItemAsync('accessToken');
      console.log('Borrow ID:', borrowid.id);
      const res = await axios.put(
        `/borrow/return/${borrowid.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        }
      );
      if (res.status === 200) {
        console.log('Book returned successfully');
        alert('Book returned successfully');
      }
    } catch (error) {
      console.error('Error returning book: ', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: SearchResultItem }) => (
    <>
      <SearchResult
        title={item.books.title}
        authors={[item.books.author]}
        edition="3rd"
        totalCopies={2}
        availableCopies={item.books.available_books}
        admin={true}
      />
      <Pressable onPress={() => handleReturn({ id: item.id })}>
        <Text style={{ color: 'blue', textAlign: 'center' }}>
          Return Book
        </Text>
      </Pressable>
    </>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Roll No"
          value={rollNo}
          onChangeText={setRollNo}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : books.length > 0 ? (
        <FlatList
          data={books}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      ) : (
        <Text style={styles.noBooksText}>No books found for this roll number.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
  },
  noBooksText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ReturnBook;
