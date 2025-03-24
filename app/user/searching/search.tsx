import { TextInput, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const search = () => {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSearch = () => {
        if (query.trim() === "") return;
        router.push({pathname:'./result/[query]', params: {query: query}});
      };


    return (
        <SafeAreaView style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Pressable onPress={() => router.back()}>
                <AntDesign name="arrowleft" size={24} color="black" />
            </Pressable>
            <TextInput
                placeholder="Search for a book"
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={handleSearch}
                style={styles.searchBox}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    searchBox: {
        margin: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ccc',
        width: '85%'
    }
})


export default search