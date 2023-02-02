import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CustomBtn from '../components/CustomBtn/CustomBtn';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

import { headerStyle, colors } from './../config';
import LogoWest from './../assets/westlogo.png';
import { Ionicons } from '@expo/vector-icons';
import Footer from './Footer';
import Header from './Header';

export default function AttendanceReport({ navigation, route }) {
  const [attendance, setAttendance] = useState([]);
  const classData = route.params.classData;

  useEffect(() => {}, []);

  useFocusEffect(
    useCallback(() => {
      const reqClasses = async () => {
        const attendanceReq = await axios.post(API_BASE + '/getAttendance', { classId: classData.course_number });

        const attendanceData = attendanceReq.data;
        setAttendance(attendanceData);
        console.log(attendanceData);
      };
      reqClasses();
    }, []),
  );
  const Item = ({ data, target }) => {
    return (
      <View
        style={styles.item}
        onTouchEnd={() => navigation.navigate('attendance-details', { classData: classData, attendanceData: data })}
      >
        <Text style={styles.itemTitle}>{data.date}</Text>
        <Text style={styles.itemTitle}>Present: {data.present}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.mainWrapper}>
      <Header title={"Attendance"} navigation = {navigation}/>
      <View style={styles.body}>
        <View style={styles.titleBox}>
          <Text style={styles.courseTitle}>{classData.course_number}</Text>
          <Text style={styles.title}>{classData.course_title}</Text>
          <Text style={styles.subtitle}>{classData.semester} Semester</Text>
        </View>
        <View style={styles.itemsWrapper}>
          <ScrollView>
            {attendance.map((data, idx) => (
              <Item data={data} key={idx} />
            ))}
          </ScrollView>
        </View>
      </View>
      <Footer active={'attendance'} actionIcon = "scan-circle-outline" actionTitle="Scan"navigation = {navigation} action = {()=>navigation.navigate('check-attendance',classData)}/>
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
    width: '84%',
    height: 60,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  itemIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  });
