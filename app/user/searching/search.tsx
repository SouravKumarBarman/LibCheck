import { TextInput, StyleSheet, Pressable, Text, View, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import axios from '@/config/axiosConfig';
import * as SecureStore from 'expo-secure-store';
import SearchResult from '@/components/searchResult';

interface SearchResultItem {
    id: string;
    title: string;
    author: string;
    available_books: number;
    total_books: number;
}

const search = () => {
    const [query, setQuery] = useState("");
    const router = useRouter();
    const [queryResult, setQueryResult] = useState<SearchResultItem[]>([])
    const [isLoading, setIsLoading] = useState(false);
    const [addingToWishlist, setAddingToWishlist] = useState<string | null>(null);

    const handleSearch = async (query: string) => {
        if (!query.trim()) return;
        
        setIsLoading(true);
        try {
            const BEARER_TOKEN = await SecureStore.getItemAsync('accessToken');
            console.log(query)

            const res = await axios.get("/books/search", {
                headers: {
                    Authorization: `Bearer ${BEARER_TOKEN}`
                },
                params: {
                    query: query
                }
            })
            setQueryResult(res.data.data)
        } catch (error) {
            console.log("Error while searching", error)
        } finally {
            setIsLoading(false);
        }
    };

    const addToWishlist = async(id: string) => {
        setAddingToWishlist(id);
        try{
            const BEARER_TOKEN = await SecureStore.getItemAsync('accessToken');
            const res= await axios.post("/wishlist/add",{
                book_id:id
            },{
                headers:{
                    Authorization: `Bearer ${BEARER_TOKEN}`
                }
            })
            console.log("Book added successfully")
        }catch(error){
            console.log("Failed to add to wishlist",error)
        } finally {
            setAddingToWishlist(null);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer}>
                <Pressable onPress={() => router.back()}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </Pressable>
                <TextInput
                    placeholder="Search for a book"
                    value={query}
                    onChangeText={setQuery}
                    onSubmitEditing={() => handleSearch(query)}
                    style={styles.searchBox}
                    editable={!isLoading}
                />
                {isLoading && (
                    <ActivityIndicator 
                        style={styles.loadingIndicator}
                        size="small" 
                        color="#0000ff" 
                    />
                )}
            </View>
            
            <ScrollView style={styles.resultsContainer}>
                {isLoading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#0000ff" />
                        <Text style={styles.loadingText}>Searching...</Text>
                    </View>
                ) : queryResult && queryResult.length > 0 ? (
                    queryResult.map((result) => (
                        <View key={result.id} style={styles.resultItem}>
                            <SearchResult
                                title={result.title}
                                authors={[result.author]}
                                totalCopies={result.total_books}
                                availableCopies={result.available_books}
                            />
                            <Pressable 
                                onPress={() => addToWishlist(result.id)}
                                disabled={addingToWishlist === result.id}
                                style={styles.wishlistButton}
                            >
                                {addingToWishlist === result.id ? (
                                    <ActivityIndicator size="small" color="#0000ff" />
                                ) : (
                                    <Text>Add to wishlist</Text>
                                )}
                            </Pressable>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noResults}>No results found</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    searchBox: {
        flex: 1,
        marginLeft: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ccc',
    },
    loadingIndicator: {
        marginLeft: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    loadingText: {
        marginTop: 10,
        color: '#666',
    },
    resultsContainer: {
        flex: 1,
        padding: 10
    },
    resultItem: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 8
    },
    noResults: {
        textAlign: 'center',
        marginTop: 20,
        color: '#666'
    },
    wishlistButton: {
        marginTop: 8,
        padding: 8,
        backgroundColor: '#f0f0f0',
        borderRadius: 4,
        alignItems: 'center',
    },
})

export default search