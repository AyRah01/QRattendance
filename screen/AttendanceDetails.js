import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CustomBtn from '../components/CustomBtn/CustomBtn';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AttendaceDetails({ navigation, route }) {
  const [students, setStudents] = useState([]);
  const classData = route.params.classData
  const attendanceData = route.params.attendanceData
  

  useEffect(() => {
    const reqClasses = async () => {
      const classsReq = await axios.post(API_BASE + '/attendanceDetails',{date:attendanceData.date});

      const studentsData = classsReq.data;
      setStudents(studentsData);
      console.log(studentsData);
    };
    reqClasses();
  }, []);

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
              <Text style={styles.title}>{classData.course_title}</Text>
              <Text style={styles.subtitle}>{attendanceData.date}</Text>
            </View>
            <View style={styles.itemsWrapper}>
              {students.map((data, idx) => (
                <Item data={data} key={idx} />
              ))}
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
  subtitle:{
    fontSize: 20,
    color: '#94dff5',
  },
  tittleWrapper: {
    width: '100%',
    height: 100,
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
