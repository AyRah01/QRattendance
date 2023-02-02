import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CustomBtn from '../components/CustomBtn/CustomBtn';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import {colors} from './../config'
import Header from './Header';
import Footer from './Footer';
import HeaderSmall from './HeaderSmall';

export default function Students({ navigation }) {
  const [students, setStudents] = useState([]);

  useEffect(()=>{
    navigation.setOptions({
      headerTitle:"Students",
      headerRight: () => (
        <Ionicons name="add-circle-outline" size={32} color="black" onPress={()=>navigation.navigate("add-student")} />
      ),
    });
  },[])
  useFocusEffect(

    useCallback(()=>{
        const reqClasses = async () => {
          const classsReq = await axios.post(API_BASE + '/getAllStudents');
    
          const studentsData = classsReq.data;
          setStudents(studentsData);
    }
    reqClasses();

  },[navigation]))

  const Item = ({ data, target }) => {
    const fullname = data.firstname + ' ' + data.middlename + ' ' + data.lastname;
    const yearSection = data.course + " "+data.year+" "+data.section
    return (
      <View style={styles.item} onTouchEnd={() => navigation.navigate('student-details', { data })}>
        <Text style={styles.itemTitle}>{fullname.toUpperCase()}</Text>
        <Text style={styles.itemTitle}>{yearSection}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.mainWrapper}>
      <HeaderSmall title={"Students"} navigation = {navigation}/>
      <View style={styles.body}>
        <View style={styles.itemsWrapper}>
          <ScrollView>
               {students.map((data, idx) => (
                 <Item data={data} key={idx} />
               ))}
          </ScrollView>
        </View>
      </View>
      <Footer active={'students'} actionIcon = "add-circle-outline" actionTitle="Add Student" navigation = {navigation} action = {()=>navigation.navigate('add-student')}/>
    </SafeAreaView>
    // <View style={{ flex: 1}}>
    //     <ScrollView>
    //       <View style={styles.body}>
    //         <View style={styles.contentHeader}>
    //           <Text style={styles.header}>Student List</Text>
    //         </View>
    //         <View style={styles.itemsWrapper}>
    //           {students.map((data, idx) => (
    //             <Item data={data} key={idx} />
    //           ))}
    //         </View>
    //         </View>
    //     </ScrollView>
    // </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    backgroundColor:'white'
  },
  body: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  titleBox: {
    width: '100%',
    height: 120,
    flex: 0,
    backgroundColor: colors.primary,
    borderColor: colors.warning,
    justifyContent: 'flex-start',
    paddingLeft: 20,
    paddingBottom: 10,
    alignItems: 'flex-start',
    marginBottom: 20,
    borderBottomWidth: 10,
  },
  courseTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    margin: 0,
    padding: 0,
  },
  title: {
    textAlign: 'left',
    color: 'white',
    fontSize: 20,
    marginTop: 'auto',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 10,
    color: 'white',
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
    flex: 1,
    padding:10,
    paddingTop: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
  },
  item: {
    width: '86%',
    height:40,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 0,
    borderRadius: 5,
    borderColor: colors.warning,
    borderBottomWidth:1
  },
  itemTitle: {
    fontSize: 15,
    margin: 0,
    padding: 0,
    width:'auto'
  },
  itemIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
});
