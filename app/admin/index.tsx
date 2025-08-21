import { View, Text, TextInput, Button, StyleSheet, ScrollView, StatusBar, Pressable, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { useState, useEffect } from 'react';
import axios from '@/config/axiosConfig';
import * as SecureStore from 'expo-secure-store';

export default function AdminHome() {
  const params = useLocalSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    isbn: '',
    total_books: '',
    available_books: ''
  });

  // Pre-fill form if params are present
  useEffect(() => {
    if (params && (params.title || params.author || params.isbn)) {
      setBookData(prev => ({
        ...prev,
        title: params.title ? String(params.title) : '',
        author: params.author ? String(params.author) : '',
        isbn: params.isbn ? String(params.isbn) : '',
      }));
    }
  }, [params.title, params.author, params.isbn]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const BEARER_TOKEN = await SecureStore.getItemAsync('accessToken');
      console.log('Book Data:', bookData);
      const res = await axios.post("/books/add", bookData, {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`
        }
      })
    }
    catch (error) {
      console.log("Error while adding book", error)
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setBookData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Book Data Entry</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={bookData.title}
            onChangeText={(text) => handleChange('title', text)}
            placeholder="Enter book title"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Authors</Text>
          <TextInput
            style={styles.input}
            value={bookData.author}
            onChangeText={(text) => handleChange('author', text)}
            placeholder="Enter authors (comma separated)"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>ISBN</Text>
          <TextInput
            style={styles.input}
            value={bookData.isbn}
            onChangeText={(text) => handleChange('isbn', text)}
            placeholder="Enter ISBN"
            placeholderTextColor="#666"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Total Books</Text>
          <TextInput
            style={styles.input}
            value={bookData.total_books}
            onChangeText={(text) => handleChange('total_books', text)}
            placeholder="Enter total number of books"
            placeholderTextColor="#666"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Available Books</Text>
          <TextInput
            style={styles.input}
            value={bookData.available_books}
            onChangeText={(text) => handleChange('available_books', text)}
            placeholder="Enter number of available books"
            placeholderTextColor="#666"
            keyboardType="numeric"
          />
        </View>

        <Pressable 
          style={[styles.button, isSubmitting && styles.buttonDisabled]} 
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.buttonText}>Submit</Text>
          )}
        </Pressable>
      </View>
      <StatusBar barStyle={'light-content'} backgroundColor={"black"} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: '#000',
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
});
