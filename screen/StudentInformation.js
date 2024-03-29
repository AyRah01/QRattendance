import { StyleSheet, Text, ScrollView, View, TextInput, Button, Alert, ToastAndroid } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomBtn from '../components/CustomBtn/CustomBtn';

import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

import QRCode from 'react-native-qrcode-svg';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import HeaderSmall from './HeaderSmall';
import { colors } from './../config';
import Footer from './Footer';
export default function StudentInformation({ route, navigation }) {
  const { data, type, classData } = route.params;
  const [qrRef, setQrRef] = useState(null);

  useEffect(() => {
    console.log("data",data)
    navigation.setOptions({
      headerRight: () => <>{/* <Ionicons name="create-outline" size={25} color="black" onPress={editClass} /> */}</>,
    });
  }, []);
  const saveQrCode = async () => {
    navigation.navigate('save-qr', { data });
  };

  const delStudent = () => {
    Alert.alert('Delete?', 'Are you sure to delete this student?', [
      {
        text: 'No',
        onPress: () => {
          return 0;
        },
      },
      { text: 'Yes', onPress: confirmDelete },
    ]);
  };

  const confirmDelete = async () => {
    const deleteREq = await axios.post(API_BASE + '/deleteStudent', { studentId: data.student_id });
    if (deleteREq.data.success) navigation.goBack();
    else Alert.alert('Failed to Delete', 'An error occured while deleting student data');
  };

  const unEnroll = () => {
    Alert.alert('Unenroll?', 'Are you sure to unenroll this student from class ' + classData.course_title + '?', [
      {
        text: 'No',
        onPress: () => {
          return 0;
        },
      },
      { text: 'Yes', onPress: confirmUnenroll },
    ]);
  };
  const confirmUnenroll = async () => {
    const deleteREq = await axios.post(API_BASE + '/unenroll', {
      studentId: data.student_id,
      classId: classData.course_number,
    });
    if (deleteREq.data.success) navigation.goBack();
    else Alert.alert('Failed to Delete', 'An error occured while deleting student data');
  };
  return (
      <SafeAreaView style={styles.mainWrapper}>
          <View style={styles.headerWrapper}>
            <Ionicons name="arrow-back-outline" size={30} color={colors.warning} onPress={() => navigation.goBack()} />
            <View style={styles.titleWrapper}>
              <Text style={styles.title}>Student Information</Text>
            </View>
            {type === 'class' ? (
              <Button title="Unenroll" color={'red'} onPress={unEnroll} />
            ) : (
              <React.Fragment>
              <Ionicons name="create-outline" size={25} color={colors.warning} onPress={()=>navigation.navigate('add-student',{studentData:data})} />
              <Ionicons name="trash-outline" size={25} color={colors.warning} onPress={delStudent} />

              </React.Fragment>
            )}
          </View>

          <View style={styles.body}>
          <ScrollView>

            <View style={styles.detailsWrapper}>
              <StudentInfoBox label="ID Number" value={data.student_id?.toUpperCase()} />
              <StudentInfoBox label="First Name" value={data.firstname?.toUpperCase()} />
              <StudentInfoBox label="Middle Name" value={data.middlename?.toUpperCase()} />
              <StudentInfoBox label="Last Name" value={data.lastname?.toUpperCase()} />
              <StudentInfoBox label="Gender" value={data.gender?.toUpperCase()} />
              <StudentInfoBox label="Course" value={data?.course} />
              <StudentInfoBox label="Student Type" value={data?.type} />
              {data?.type === "regular"?<StudentInfoBox label="Year" value={data?.year} />:""}
              {data?.type === "regular"? <StudentInfoBox label="Section" value={data?.section} />:""}
              <View style={styles.qrContainer}>
                <QRCode value={data.student_id} getRef={(c) => setQrRef(c)} size={200} backgroundColor="#ffffff" />
              </View>
              <View style={styles.btnWrapper}>
                <CustomBtn title="Save QR Code" type={'primary'} action={saveQrCode} />
              </View>
            </View>
            </ScrollView>

          </View>
        <Footer
        active={'students'}
        actionIcon="add-circle-outline"
        actionTitle="Add Student"
        navigation={navigation}
        action={() => navigation.navigate('add-student')}
      />
      </SafeAreaView>
  );
}
const StudentInfoBox = ({ label, value }) => {
  return (
    <View style={styles.detailsBox}>
      <View style={styles.detailsLabelBox}>
        <Text style={styles.detailsLabel}>{label}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.detailsTitle}>: {value}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
  },
  body: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
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
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
  },
  inputWrapper: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: 50,
    marginBottom: 0,
  },
  input: {
    borderBottomWidth: 1,
    flex: 1,
    width: '70%',
    borderRadius: 10,
    borderColor: '#e8d5c5',
    color: colors.primary,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 25,
  },
  detailsWrapper: {
    flex: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
  },
  detailsBox: {
    width: '95%',
    height: 'auto',
    borderRadius: 3,
    flex: 0,
    backgroundColor: "white",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 5,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'white',
  },
  details:{
    flex:0,
    justifyContent:'flex-start',
    alignItems:'flex-start',
    width:"75%"
  },
  detailsLabelBox:{
    width:'auto'
  },
  detailsLabel: {
    fontWeight: 'bold',
  },
  detailsTitle: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  qrContainer: {
    width: 'auto',
    height: 'auto',
    padding: 10,
    borderColor: 'white',
    marginTop: 50,
  },
  btnWrapper: {
    width: 100,
    margin: 10,
  },
  headerWrapper: {
    width: '100%',
    height: 'auto',
    flex: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    backgroundColor: colors.primary,
    padding: 10,
    borderBottomColor: colors.warning,
    borderBottomWidth: 10,
    marginBottom: 10,
  },
  titleWrapper: {
    flex: 0,
    paddingLeft: 10,
    justifyContent: 'flex-start',
    marginRight: 'auto',
    alignItems: 'flex-start',
    backgroundColor: colors.primary,
    paddingTop: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.warning,
  },
  subTitle: {
    fontSize: 15,
    color: colors.warning,
  },
});
