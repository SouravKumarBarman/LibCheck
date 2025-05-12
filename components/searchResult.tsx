import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import books from '@/assets/images/icon.png';

type SearchResultProps = {
    title: string;
    authors: string[];
    edition?: string;
    image?: string;
    totalCopies?: number;
    availableCopies: number;
    isbn?: string;
    createdAt?: string;
};

const formatDate = (isoDate?: string) => {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

const SearchResult = ({
    title,
    authors,
    edition,
    totalCopies,
    availableCopies,
    isbn,
    createdAt,
}: SearchResultProps) => {

    return (
        <View style={styles.card}>
            <View style={styles.row}>
                {/* <Image source={books} style={styles.image} resizeMode="cover" /> */}
                <View style={styles.info}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>by {authors.join(', ')}</Text>
                    {edition && <Text style={styles.detail}>Edition: {edition}</Text>}
                    {isbn && <Text style={styles.detail}>ISBN: {isbn}</Text>}
                    {totalCopies && <Text style={styles.detail}>Total Copies: {totalCopies}</Text>}
                    <Text style={styles.detail}>Available: {availableCopies}</Text>
                    {createdAt && (
                        <Text style={styles.detail}>
                            Added: {formatDate(createdAt)}
                        </Text>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f9f9f9',
        marginHorizontal: 2,
        marginVertical: 5,
        padding: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    row: {
        flexDirection: 'row',
    },
    image: {
        width: 80,
        height: 110,
        borderRadius: 8,
        marginRight: 12,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    info: {
        flex: 1,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        fontStyle: 'italic',
        marginBottom: 4,
    },
    detail: {
        fontSize: 13,
        color: '#555',
        marginBottom: 2,
    },
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
    },
    counterButton: {
        paddingVertical: 6,
        paddingHorizontal: 16,
        backgroundColor: '#f0f0f0',
        borderRadius: 6,
        marginHorizontal: 5,
    },
    counterText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    counterInput: {
        width: 40,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
});

export default SearchResult;
