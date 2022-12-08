import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CustomBtn from '../components/CustomBtn/CustomBtn';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

export default function AttendanceReport({ navigation, route }) {
  const [attendance, setAttendance] = useState([]);
  const classData = route.params.classData
  

  useEffect(() => {
    
  }, []);

  useFocusEffect(useCallback(()=>{
    const reqClasses = async () => {
      const attendanceReq = await axios.post(API_BASE + '/getAttendance',{classId:classData.course_number});

      const attendanceData = attendanceReq.data;
      setAttendance(attendanceData)
      console.log(attendanceData);
    };
    reqClasses();
  },[]))

  const Item = ({ data, target }) => {
    return (
      <View style={styles.item} onTouchEnd={() => navigation.navigate('attendance-details', { classData:classData,attendanceData:data })}>
        <Text style={styles.itemTitle}>{data.date}</Text>
        <Text style={styles.itemTitle}>Present: {data.present}</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.mainWrapper}>
        <ScrollView>
          <View style={styles.body}>
            <View style={styles.tittleWrapper}>
            <Text style={styles.title}>{classData.course_number}</Text>
              <Text style={styles.title}>{classData.course_title}</Text>
              <Text style={styles.subtitle}>{classData.semester} Semester</Text>
            </View>
            <View style={styles.itemsWrapper}>
              {attendance.map((data, idx) => (
                <Item data={data} key={idx} />
              ))}
            </View>
            <View style={styles.footer}>
              <CustomBtn title="Check Attendace" action={()=>navigation.navigate("check-attendance",classData)}/>
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
    fontWeight:'bold'
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
  },
  itemTitle: {
    fontWeight: 'bold',
  },
  footer: {
    height: 'auto',
    width: '90%',
  },
});
