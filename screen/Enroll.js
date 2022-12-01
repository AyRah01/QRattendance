import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';
import CustomBtn from '../components/CustomBtn/CustomBtn';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Enroll({ navigation, route }) {
  const [students, setStudents] = useState([])
  const [toSearch, setToSearch] = useState("")

  const classId = route.params.classId 


  useEffect(() => {
    if(toSearch.length > 3)search()
  }, [toSearch]);

  const search = async() => {
     const searchReq = await axios.get(API_BASE+"/searchStudent/"+toSearch)

     if(searchReq.status === 200){
        const searchData = searchReq.data
        setStudents(searchData)
     }
  }
  const submitStudent = async(studentId) => {
        const enrollReq = await axios.post(API_BASE+"/enroll",{classId, studentId})
        if(enrollReq.status !== 200)return Alert.alert("Server Error", "Sorry, cannot reach the server at the moment. Please try again later.")
        const enrollRes = enrollReq.data
        if(!enrollRes.success)return Alert.alert("Failed to Enroll", "Sorry, an error has occured while enrolling student. Please try again later.")

        navigation.goBack()
        
  }

  const Student = ({ data, target }) => {
    return (
      <View style={styles.item} onTouchEnd={() =>submitStudent(data.student_id)}>
        <Text style={styles.itemTitle}>{data.fullname.toUpperCase()}</Text>
        <Text style={styles.itemTitle}>{data.year_section}</Text>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <SafeAreaView style={styles.mainWrapper}>
        <ScrollView>
          <View style={styles.body}>
            <View style={styles.headerWrapper}>
              <Text style={styles.header}>QR ATTENDANCE</Text>
            </View>
            <View style={styles.tittleWrapper}>
              <Text style={styles.title}>Enroll Student</Text>
            </View>
            <View style={styles.detailsWrapper}>
              <View style={styles.details}>
                <Text style={styles.detailsTitle}>Search:</Text>
                <TextInput style={styles.input} defaultValue={toSearch} onChangeText={(e)=>setToSearch(e)} />
              </View>
              <View style = {styles.list}>
                    {students.map((data, idx)=>(
                        <Student data={data} key = {idx}/>
                    ))}

              </View>
              
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 0,
    backgroundColor: 'white',
  },
  body: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#000104',
  },
  title: {
    fontSize: 30,
    color: '#94dff5',
  },
  tittleWrapper: {
    width: '100%',
    height: 70,
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },
  headerWrapper: {
    width: '100%',
    height: 50,
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8d5c5',
  },
  inputWrapper: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: 50,
    marginBottom: 0,
  },
  input: {
    flex: 1,
    width: '70%',
    borderRadius: 10,
    borderColor: '#e8d5c5',
    paddingLeft: 5,
    paddingRight: 5,
  },
  detailsWrapper: {
    flex: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
  },
  details: {
    width: '95%',
    height: 'auto',
    borderRadius: 3,
    flex: 0,
    backgroundColor: '#e8d5c5',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 5,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'white',
  },
  detailsTitle: {
    fontWeight: 'bold',
    color: 'black',
    marginRight: 10,
  },
  qrContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    marginTop: 50,
  },
  btnWrapper: {
    width: 100,
    margin: 10,
  },
  list:{
    height:"auto",
    width:"100%"
  },
  item: {
    width: '95%',
    height: 'auto',
    borderRadius: 10,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 5,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'white',
  },
  itemTitle: {
    fontWeight: 'bold',
    color: 'white',
  },
});
