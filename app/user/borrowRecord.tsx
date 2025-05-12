import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    FlatList,
    RefreshControl,
} from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
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

const BorrowRecord = () => {
    const [books, setBooks] = useState<SearchResultItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const handleSearch = async () => {
        try {
            const BEARER_TOKEN = await SecureStore.getItemAsync('accessToken');
            const booksRes = await axios.get('borrow/all-books', {
                headers: {
                    Authorization: `Bearer ${BEARER_TOKEN}`,
                },
            });

            const filteredBooks = booksRes.data.borrow_records.filter(
                (record: any) => record.returned === false
            );
            setBooks(filteredBooks);
        } catch (error) {
            console.error('Error fetching books: ', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        handleSearch();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        handleSearch();
    }, []);

    const renderItem = ({ item }: { item: SearchResultItem }) => (
        <SearchResult
            title={item.books.title}
            authors={[item.books.author]}
            availableCopies={item.books.available_books}
        />
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : books.length > 0 ? (
                <FlatList
                    data={books}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
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
    noBooksText: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default BorrowRecord;
