import { StyleSheet, Text, View,TouchableOpacity, FlatList,ScrollView } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'expo-router'
import Icon from 'react-native-vector-icons/FontAwesome';

const index = () => {
  const router = useRouter();
  const listdata = [
    {title:'Eng. Math'},
    {title:'DAA'},
    {title:'DBMS'},
    {title:'Data Mining'},
    {title:'TOC'},
    {title:'COA'},
   
  ];
  const listdata1 = [
  // Added Computer Networks
  {  title: 'Physics' },
  {  title: 'JAVA' },
  {  title: 'Python' },
  {  title: 'Compiler Design' },
  {title:'Operating System'},
  {title:'Image Processing'},
];
  const listdata2 = [
    {  title: 'Computer Networks' },
    {  title: 'C/C++' },
    {  title: 'Software Engineering' },
    {  title: 'Computer Graphics' },


  ];

const renderButton = ({ item }) => (
  <TouchableOpacity
    style={styles.subjectButton}
    onPress={() => {
      console.log(`Button pressed for: ${item.title}`);
    }}
  >
    <Text style={styles.subjectButtonText}>{item.title}</Text>
  </TouchableOpacity>
);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.searchBox} onPress={() => router.push('/user/searching/search')}>
            <Icon name="search" size={20} color="#000" />
            <Text style ={styles.searchBoxTitle}> What book do you want to search?? </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bookContainer}>
          <FlatList 
            data={listdata} 
            horizontal={true} 
            showsHorizontalScrollIndicator={false}
            renderItem={renderButton}
           />
         <FlatList 
            data={listdata1} 
            horizontal={true} 
            showsHorizontalScrollIndicator={false}
            renderItem={renderButton}/>
          <FlatList
            data={listdata2}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={renderButton}/>
        </View>
      </View>




      <ScrollView
        style={styles.bottomContainer}>
          <View style={styles.Eng_Math}>
              <Text style={styles.Eng_MathTitle}>Engineering Methematis</Text>
              
          </View>
          <View style={styles.DAA}>
              <Text style={styles.DAATitle}>Data Analysis And Algrithim</Text>
              
          </View>
          <View style={styles.DBMS}>
              <Text style={styles.DBMSTitle}>Database Management System</Text>
              
          </View>
          <View style={styles.OS}>
              <Text style={styles.OSTitle}>Operating System</Text>
              
          </View>
          <View style={styles.TOC}>
              <Text style={styles.TOCTitle}>Theory Of Computation</Text>
              
          </View>




      </ScrollView>
    </View>
  )
}
export default index

const styles = StyleSheet.create({
container:{
  flex: 1,

},
topContainer:{
  backgroundColor: '#000000',
  width: '100%',
  height: 270,
  padding: 20,
  paddingTop: 30,
  borderBottomLeftRadius: 50,
  borderBottomRightRadius: 50,
},
searchContainer:{
 
},
searchBox:{
  backgroundColor: '#fff',
  margin: 10,
  paddingHorizontal: 20,
  paddingVertical: 10,
  borderWidth: 1,
  borderRadius: 8,
  borderColor: '#cccc',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},
searchBoxTitle:{
  color: 'black',
  fontSize: 15,
},

bookContainer:{},

subjectButton: {
  backgroundColor: '#333333',
  
  padding: 10,
  marginVertical: 8,
  borderRadius: 20,
  marginHorizontal: 3,
  alignItems: 'center', 
  justifyContent: 'center', 
},
subjectButtonText: {
  color: '#fff',
  fontSize: 16,
  whiteSpace: 'nowrap',
},

bottomContainer: {
 
},
Eng_Math: {
  margin: 10,
  padding:10,
  height: 200,
  backgroundColor: '#33333333',
  borderRadius: 20,
},
Eng_MathTitle: {
  textAlign: 'center',
  fontSize:18,
},
Eng_MathBooks: {},

DAA: {
  margin: 10,
  padding:10,
  height: 200,
  backgroundColor: '#33333333',
  borderRadius: 20,
},
DAATitle: {
  textAlign: 'center',
  fontSize:18,

},
DAABooks: {},
DBMS: {
  margin: 10,
  padding:10,
  height: 200,
  backgroundColor: '#33333333',
  borderRadius: 20,
},
DBMSTitle: {
  textAlign: 'center',
  fontSize:18,
},
DBMSBooks: {},
OS: {
  margin: 10,
  padding:10,
  height: 200,
  backgroundColor: '#33333333',
  borderRadius: 20,
},
OSTitle: {
  textAlign: 'center',
  fontSize:18,
},
OSBooks: {},
TOC: {
  margin: 10,
  padding:10,
  height: 200,
  backgroundColor: '#33333333',
  borderRadius: 20,
},
TOCTitle: {
  textAlign: 'center',
  fontSize:18,
},
TOCBooks: {},




});

