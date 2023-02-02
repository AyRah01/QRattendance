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
import Header from './Header';
import { colors } from './../config';
export default function ReportDetails({ navigation, route }) {
  const [attendance, setAttendance] = useState([]);
  const classData = route.params.classData;
  const subjectData = route.params.subjectData;

  const { generateReport } = useGenerateReport(classData, subjectData);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Attendance Reports',
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      const reqClasses = async () => {
        const attendanceReq = await axios.post(API_BASE + '/getClassAttendance', {
          classId: subjectData.course_number,
          yearSection: classData.yearsection,
        });

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
          <Text style={styles.itemTitle}>Attendance of {data.date}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="print-outline" size={25} color={colors.primary} onPress={() => generateReport(data.date)} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.mainWrapper}>
      <Header title={'Attendance'} navigation={navigation} />
      <View style={styles.body}>
        <View style={styles.titleBox}>
          <Text style={styles.courseTitle}>{classData.yearsection}</Text>
          <Text style={styles.title}>{subjectData.course_number}</Text>
          <Text style={styles.title}>{subjectData.course_title}</Text>
          <Text style={styles.subtitle}>{subjectData.semester} Semester</Text>
        </View>
        <ScrollView>
          <View style={styles.itemsWrapper}>
            {attendance.map((data, idx) => (
              <Item data={data} key={idx} />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
  },
  body: {
    flex: 1,
    width: '100%',
    },
  titleBox: {
    width: '100%',
    height: 'auto',
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
    padding:10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
  },
  item: {
    width: '100%',
    height: 'auto',
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 20,
    padding: 20,
    borderWidth: 0,
    borderRadius: 5,
    borderColor: colors.secondary,
    borderTopWidth: 10,
    borderWidth:1
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
