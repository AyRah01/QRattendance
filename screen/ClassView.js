import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CustomBtn from '../components/CustomBtn/CustomBtn';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

export default function ClassView({ navigation, route }) {
  const [students, setStudents] = useState([]);
  const classData = route.params

  useFocusEffect(useCallback(()=>{
    const reqStudents = async () => {
      const classsReq = await axios.post(API_BASE + '/getStudents',{classId:classData.course_number});
      const studentsData = classsReq.data;
      setStudents(studentsData);
      console.log(studentsData);
    };
    reqStudents()
  },[navigation]));

  const delClass = () => {
    Alert.alert("Delete Class?","Are you sure to delete this class?",[
      {text:"No",onPress:()=>{return 0}},
      {text:"Yes",onPress:confirmDelete}
    ])
  }
  const confirmDelete = async()=>{
    const deleteREq = await axios.post(API_BASE+"/deleteClass",{id:classData.id})
    if(deleteREq.data.success)navigation.goBack()
    else Alert.alert("Failed to Delete","An error occured while deleting student data")
  }

  const editClass = ()=>{
    navigation.navigate("addClass",{type:"edit", classData})
  }
  const Item = ({ data, target }) => {
    const fullname = data.firstname + ' ' + data.middlename + ' ' + data.lastname;
    return (
      <View style={styles.item} onTouchEnd={() => navigation.navigate('student-details', { data,type:"class",classData})}>
        <Text style={styles.itemTitle}>{fullname.toUpperCase()}</Text>
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
              <View style = {styles.headerBtn}>
              <Button title='Edit' onPress={editClass} style = {styles.btn}/>
              <Button title='Delete' color={"#c1012f"} onPress={delClass} style = {styles.btn}/>

              </View>

            </View>
            <View style={styles.tittleWrapper}>
              <Text style={styles.title}>{classData.course_title}</Text>
              <Text style={styles.subTitle}>{classData.firstname + " " + classData.lastname}, {classData.semester} Semester</Text>
            </View>
            <View style={styles.itemsWrapper}>
              {students.map((data, idx) => (
                <Item data={data} key={idx} />
              ))}
            </View>
            <View style={styles.footer}>
              <CustomBtn title="Enroll Student" action={()=>navigation.navigate("enroll-student",{classId:classData.course_number})}/>
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
    fontWeight:"bold"

  },
  subTitle:{
    fontSize:15,
    color: '#94dff5',
  },
  tittleWrapper: {
    width: '100%',
    height: 100,
    flex: 0,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding:10
  },

  header: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    width:200
  },
  headerWrapper: {
    width: '100%',
    height: 50,
    flex: 0,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e8d5c5',
    paddingLeft:10,
    paddingRight:10
  },
  headerBtn:{
    flex:0,
    justifyContent:"flex-end",
    alignItems:"center",
    flexDirection:'row',
  },
  btn:{
    marginRight:2,
  },
  scrollList: {
    flex: 1,
  },
  itemsWrapper: {
    flex: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: "auto",
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
  footer: {
    height: 'auto',
    width: '90%',
  },
});
