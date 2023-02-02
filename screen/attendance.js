
import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import CustomBtn from '../components/CustomBtn/CustomBtn';
import { SafeAreaView } from 'react-native-safe-area-context';
import useStorage from '../helper/useStorage';
import { Ionicons } from '@expo/vector-icons';
import LogoWest from './../assets/westlogo.png';
import {headerStyle, colors} from './../config'
import Header from './Header';
export default function Attendance({ navigation }) {
  const {getValueFor} = useStorage()
  const [classes, setClasses] = useState([])

  

  useEffect(()=>{
    const reqClasses = async()=>{
      const email = await getValueFor("user_id")
      const classsReq = await axios.get(API_BASE+"/getSubjects/"+email)

      const classesData = classsReq.data
       setClasses(classesData)
       console.log(classesData)

    }
    reqClasses();

  },[])

  const Item = ({ data, target }) => {
    return (
      <View style={styles.item} onTouchEnd = {()=>navigation.navigate("view-attendance",{classData:data})}>
        <Text style={styles.itemTitle}>{data.course_title.toUpperCase()}</Text>
        <Text style={styles.itemTitle}>{data.course_number}</Text>
      </View>
    );
  };

  return (
      <SafeAreaView style={styles.mainWrapper}>
      <Header title = {"Attendance"} navigation = {navigation}/>
      <View style={styles.titleBox}>
          <Text style={styles.title}>Choose a class </Text>
        </View>
        <ScrollView>
          <View style={styles.body}>
            <View style={styles.itemsWrapper}>
              {classes.map((data, idx) => (
                <Item data={data} key={idx} />
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 0,
  },
  body: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  titleBox: {
    width: '100%',
    height: 60,
    flex: 0,
    backgroundColor:colors.primary,
    borderColor: colors.warning,
    justifyContent: 'flex-start',
    paddingLeft: 20,
    paddingBottom:10,
    alignItems: 'flex-start',
    marginBottom: 20,
    borderBottomWidth: 10,
  },
  title: {
    textAlign: 'left',
    color: 'white',
    fontSize: 20,
    marginTop:'auto'
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
    width: '90%',
    height: 60,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderRadius: 20,
    marginBottom: 20,
    padding: 20,
    borderWidth: 0,
    borderRadius: 5,
    borderColor: colors.warning,
  },
  itemTitle: {
    fontSize: 15,
    margin: 0,
    padding: 0,
    color: 'white',
  },
  itemIcon:{
    width:40,
    height:40,
    marginRight:10
  },  
  footer: {
    height: 'auto',
    width: '90%',
  },
});

