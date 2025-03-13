import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'react-native'
import books from '@/assets/images/icon.png'
import { TouchableOpacity, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type searchResultProps = {
    title: string,
    authors: string[],
    edition: string,
    image?: string,
    totalCopies: number,
    availableCopies: number,
    admin: boolean
}

const SearchResult= ({title, authors, edition, image, totalCopies, availableCopies, admin}:searchResultProps) => {
    const [count, setCount] = useState(3);
    const minCount = 1;
    const maxCount = 5;

    const decrement = () => {
        if (count > minCount) setCount(count - 1);
    };

    const increment = () => {
        if (count < maxCount) setCount(count + 1);
    };

    return (
        <View>
            <View className='flex flex-row justify-between ml-2 pl-2 py-5'>
                <View className='flex-1'>
                    <Text className='text-2xl font-bold'>{title}</Text>
                    <Text>by</Text>
                    {
                        authors.map((author, index) => (
                            <Text key={index} className='italic'>{author}</Text>
                        ))
                    }
                    <Text className='text-zinc-500'>{edition} Edition</Text>
                </View>
                <View className='flex-1 items-center'>
                    <Image source={books} className='w-40 h-48 rounded-lg border border-zinc-300' />
                    <View className="relative flex flex-row items-center max-w-[8rem] border border-gray-300 rounded-lg bg-white mt-2">
                        {admin && (
                            <TouchableOpacity
                            onPress={decrement}
                            className="p-3 h-11 border-r border-gray-300"
                            
                        >
                            <Text>+</Text>
                        </TouchableOpacity>)}
                        <TextInput
                            className="text-center text-gray-900 font-medium text-lg flex-1 h-11 "
                            value={availableCopies.toString()}
                            editable={false}
                        />
                        {admin && (<TouchableOpacity
                            onPress={increment}
                            className="p-3 h-11 border-l border-gray-300"
                        >
                            <Text>-</Text>
                        </TouchableOpacity>)}
                    </View>
                </View>
            </View>
            <View className='border-b mx-5 border-zinc-200' />
        </View>
    )
}

export default SearchResult