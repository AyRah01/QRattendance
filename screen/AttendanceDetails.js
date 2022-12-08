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
      const classsReq = await axios.post(API_BASE + '/attendanceDetails',{date:attendanceData.date, classId:classData.course_number});

      const studentsData = classsReq.data;
      setStudents(studentsData);
      console.log(studentsData);
    };
    reqClasses();
  }, []);

  const Item = ({ data, target }) => {
    const fullname = data.firstname + ' ' + data.middlename + ' ' + data.lastname;
    const yearSection = data.course+" "+data.year+" "+data.section
    return (
      <View style={styles.item} onTouchEnd={() => navigation.navigate('student-details', { data })}>
        <Text style={styles.itemTitle}>{fullname.toUpperCase()}</Text>
        <Text style={styles.itemTitle}>{yearSection}</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1}}>
      <SafeAreaView style={styles.mainWrapper}>
        <ScrollView>
          <View style={styles.body}>
            <View style={styles.tittleWrapper}>
            <Text style={styles.title}>{classData.course_number.toUpperCase()}</Text>
              <Text style={styles.title}>{classData.course_title.toUpperCase()}</Text>
              <Text style={styles.subtitle}>{classData.semester} Semester</Text>

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
  },
  body: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight:"bold"
  },
  subtitle:{
    fontSize: 20,
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
  },
  footer: {
    height: 'auto',
    width: '90%',
  },
});
