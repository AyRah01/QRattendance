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
    <View style={{ flex: 1}}>
        <ScrollView>
          <View style={styles.body}>
            <View style={styles.contentHeader}>
              <Text style={styles.header}>Student List</Text>
            </View>
            <View style={styles.itemsWrapper}>
              {students.map((data, idx) => (
                <Item data={data} key={idx} />
              ))}
            </View>
            </View>
        </ScrollView>
    </View>
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
    marginTop:10
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
  contentHeader: {
    marginTop:0,
    width: '100%',
    flex: 0,
    paddingLeft:20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',

  },

  header: {
    textAlign:"left",
    fontSize: 20,
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
  },
  itemTitle: {
    fontWeight: 'bold',
  },
  footer: {
    height: 'auto',
    width: '90%',
  },
});
