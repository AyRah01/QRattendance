import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { colors } from './../config';
import CustomBtn from '../components/CustomBtn/CustomBtn';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from './Header';
import Footer from './Footer';

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
      <View style={styles.item} onTouchEnd={() => navigation.navigate('student-details', { data,type:"class" })}>
        <Text style={styles.itemTitle}>{fullname.toUpperCase()}</Text>
        <Text style={styles.itemTitle}>{yearSection}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.mainWrapper}>
    <Header title={classData.course_number} navigation = {navigation}/>
    <View style={styles.body}>
      <View style={styles.titleBox}>
      <Text style={styles.courseTitle}>{attendanceData.date}</Text>

      <Text style={styles.title}>{classData.course_title}</Text>
        <Text style={styles.subtitle}>{classData.semester} Semester</Text>
      </View>
      <View style={styles.itemsWrapper}>
        <ScrollView>
        {students.map((data, idx) => (
                <Item data={data} key={idx} />
             ))}
        </ScrollView>
      </View>
    </View>
    <Footer active={'attendance'} navigation = {navigation} action = {()=>navigation.navigate('check-attendance',classData)}/>
  </SafeAreaView>
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
    paddingTop: 0,
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
  },
  item: {
    width: '88%',
    height: 55,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    padding: 10,
    borderWidth: 0,
    borderRadius: 5,
    borderTopWidth:10,
    marginBottom:5,
    borderWidth:1,
    borderColor: colors.primary,
  },
  itemTitle: {
    fontSize: 15,
    margin: 0,
    padding: 0,
    color: colors.primary,
  },
  itemIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  });
