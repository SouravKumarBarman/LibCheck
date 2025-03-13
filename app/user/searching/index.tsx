import { View, StyleSheet, TouchableOpacity, Text} from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'


const index = () => {
  const router = useRouter()
  return (
    <View>
      <TouchableOpacity style={styles.searchBox} onPress={() => router.push('/user/searching/search')}>
        <Text> What book do you want to search?? </Text>
      </TouchableOpacity>
    </View>
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
  }
});

export default index