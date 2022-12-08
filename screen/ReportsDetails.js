import {
    Alert,
    Button,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View,
  } from 'react-native';
  import React, { useState, useEffect, useCallback } from 'react';
  import axios from 'axios';
  import { API_BASE } from '../config';
  import { setStatusBarBackgroundColor } from 'expo-status-bar';
  import { Colors } from 'react-native/Libraries/NewAppScreen';
  import CustomBtn from '../components/CustomBtn/CustomBtn';
  import { SafeAreaView } from 'react-native-safe-area-context';
  import { useFocusEffect } from '@react-navigation/native';
  import { Ionicons } from '@expo/vector-icons';
  import * as Print from 'expo-print';
  import { shareAsync } from 'expo-sharing';
  import useGenerateReport from '../helper/useGenerateReport';
  
  export default function ReportDetails({ navigation, route }) {
    const [attendance, setAttendance] = useState([]);
    const classData = route.params.classData;
    const subjectData = route.params.subjectData
  
    const {generateReport}=useGenerateReport(classData, subjectData)
  
    useEffect(() => {
      navigation.setOptions({
        headerTitle: 'Attendance Reports'
      });
    }, []);
  
    useFocusEffect(
      useCallback(() => {
        const reqClasses = async () => {
          const attendanceReq = await axios.post(API_BASE + '/getClassAttendance', { classId: subjectData.course_number, yearSection:classData.yearsection });
  
          const attendanceData = attendanceReq.data;
          setAttendance(attendanceData);
          console.log(attendanceData);
        };
        reqClasses();
      }, []),
    );
  
    const Item = ({ data, target }) => {
      return (
        <View style={styles.item}>
          <TouchableOpacity>
            <Text
              style={styles.itemTitle}            >
              Attendance of {data.date}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="print-outline" size={25} color="black" onPress={()=>generateReport(data.date)} />
          </TouchableOpacity>
        </View>
      );
    };

  
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView style={styles.mainWrapper}>
          <ScrollView>
            <View style={styles.body}>
              <View style={styles.tittleWrapper}>
                <Text style={styles.title}>{subjectData.course_number}</Text>
                <Text style={styles.title}>{subjectData.course_title}</Text>
                <Text style={styles.subtitle}>{subjectData.semester} Semester</Text>
                <Text style={styles.title}>{classData.yearsection}</Text>

              </View>
              <View style={styles.itemsWrapper}>
                {attendance.map((data, idx) => (
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
      fontWeight: 'bold',
    },
    subtitle: {
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
      height: 'auto',
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
  