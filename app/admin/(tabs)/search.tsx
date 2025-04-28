import { TextInput, StyleSheet, Pressable, Text, View, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import axios from '@/config/axiosConfig';
import * as SecureStore from 'expo-secure-store';
import SearchResult from '@/components/searchResult';
import Modal from '@/components/Modal';

interface SearchResultItem {
    id: string;
    title: string;
    author: string;
    available_books: number;
}

const search = () => {
    const [query, setQuery] = useState("");
    const [roll, setRoll] = useState("")
    const [dueDate, setDueDate] = useState("")
    const router = useRouter();
    const [queryResult, setQueryResult] = useState<SearchResultItem[]>([])
    const [isLoading, setIsLoading] = useState(false);
    const [addingToWishlist, setAddingToWishlist] = useState<string | null>(null);
    const [modelOpen, setModelOpen] = useState(false)

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

    const handleLending = async ({ roll, dueDate, result }: { roll: string, dueDate: string, result: any }) => {
        try {
            console.log(roll, dueDate)
            const book_id=result.id
            const BEARER_TOKEN = await SecureStore.getItemAsync('accessToken');
            const student = await axios.get(`/students/rollno/${roll}`, {
                headers: {
                    Authorization: `Bearer ${BEARER_TOKEN}`
                }
            })
            console.log(student.data)
            const student_id = student.data.student_id
            const res = await axios.post(`borrow/book`,{
                student_id: student_id,
                book_id: book_id,
                due_date: "2025-06-01"
            } ,{
                headers: {
                    Authorization: `Bearer ${BEARER_TOKEN}`
                }
            })
            console.log(res.data)
            setModelOpen(false)
        } catch (error) {
            console.log("Error lending book", error)
        }

    }


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
                                edition={"3rd"}
                                totalCopies={2}
                                availableCopies={result.available_books}
                                admin={false}
                            />
                            <Pressable
                                onPress={() => setModelOpen(true)}

                                style={styles.wishlistButton}
                            >
                                {addingToWishlist === result.id ? (
                                    <ActivityIndicator size="small" color="#0000ff" />
                                ) : (
                                    <Text>Lend to Student</Text>
                                )}
                            </Pressable>
                            <Modal
                                isOpen={modelOpen}
                                withInput
                            >
                                <View className='bg-white w-full p-6 rounded-xl'>
                                    <View className='flex-row justify-between items-center mb-4'>
                                        <Text className='text-xl font-semibold'>Lend Book</Text>
                                        <Pressable
                                            onPress={() => setModelOpen(false)}
                                            className='p-2'
                                        >
                                            <AntDesign name="close" size={24} color="black" />
                                        </Pressable>
                                    </View>

                                    <View className='mb-4'>
                                        <Text className='text-gray-600 mb-2'>Book Details</Text>
                                        <Text className='font-medium'>{result.title}</Text>
                                        <Text className='text-gray-500'>{result.author}</Text>
                                    </View>

                                    <View className='mb-4'>
                                        <Text className='text-gray-600 mb-2'>Student ID</Text>
                                        <TextInput
                                            placeholder='Enter student ID'
                                            className='border border-gray-300 rounded-lg p-3'
                                            value={roll}
                                            onChangeText={setRoll}
                                        />
                                    </View>

                                    <View className='mb-4'>
                                        <Text className='text-gray-600 mb-2'>Return Date</Text>
                                        <TextInput
                                            placeholder='Select return date'
                                            className='border border-gray-300 rounded-lg p-3'
                                            value={dueDate}
                                            onChangeText={setDueDate}
                                        />
                                    </View>

                                    <View className='flex-row justify-end space-x-3 mt-4'>
                                        <Pressable
                                            onPress={() => setModelOpen(false)}
                                            className='px-4 py-2 border border-gray-300 rounded-lg'
                                        >
                                            <Text>Cancel</Text>
                                        </Pressable>
                                        <Pressable
                                            className='px-4 py-2 bg-blue-500 rounded-lg'
                                            onPress={() => handleLending({ roll, dueDate, result })}
                                        >
                                            <Text className='text-white'>Confirm Lending</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </Modal>
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