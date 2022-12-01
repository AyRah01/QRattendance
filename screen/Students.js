import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CustomBtn from '../components/CustomBtn/CustomBtn';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

export default function Students({ navigation }) {
  const [students, setStudents] = useState([]);
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
    return (
      <View style={styles.item} onTouchEnd={() => navigation.navigate('student-details', { data })}>
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
            </View>
            <View style={styles.tittleWrapper}>
              <Text style={styles.title}>STUDENTS</Text>
            </View>
            <View style={styles.itemsWrapper}>
              {students.map((data, idx) => (
                <Item data={data} key={idx} />
              ))}
            </View>
            <View style={styles.footer}>
              <CustomBtn title="Add Student" action={()=>navigation.navigate("add-student")}/>
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
