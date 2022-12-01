import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';
import CustomBtn from '../components/CustomBtn/CustomBtn';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { courses } from '../config';
export default function AddStudent({ navigation }) {
  const [studentId, setStudentId] = useState('');
  const [firstname, setfirstname] = useState('');
  const [middlename, setMiddlename] = useState('');
  const [lastname, setLastname] = useState('');
  const [courseYearSec, setCourseYearSec] = useState('BSIT 1A');
  const [gender, setGender] = useState("Male")


  useEffect(() => {}, []);


  const submit = async () => {
    const addStudentReq = await axios.post(API_BASE + '/addStudent', {
      firstname,
      middlename,
      lastname,
      gender,
      studentId,
      courseYearSec,
    });
    const studentData = addStudentReq.data;
    console.log(studentData);
    if (!studentData.success) {
      if (studentData.code === 'duplicate') return Alert.alert('Failed to add Student', 'Student ID already exists.');
      else return Alert.alert('Failed to add Student', 'There was an error while saving data');
    }
    const data = { firstname, middlename, lastname,gender, student_id: studentId, year_section: courseYearSec };

    return navigation.navigate('student-details', { data });
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
              <Text style={styles.title}>Add Student</Text>
            </View>
            <View style={styles.details}>
                <Text style={styles.detailsTitle}>ID Number</Text>
                <TextInput style={styles.input} defaultValue={studentId} onChangeText={(e) => setStudentId(e)} />
              </View>
            <View style={styles.detailsWrapper}>
              <View style={styles.details}>
                <Text style={styles.detailsTitle}>First Name</Text>
                <TextInput style={styles.input} defaultValue={firstname} onChangeText={(e) => setfirstname(e)} />
              </View>
              <View style={styles.details}>
                <Text style={styles.detailsTitle}>Middle Name</Text>
                <TextInput style={styles.input} defaultValue={middlename} onChangeText={(e) => setMiddlename(e)} />
              </View>
              <View style={styles.details}>
                <Text style={styles.detailsTitle}>Last Name</Text>
                <TextInput style={styles.input} defaultValue={lastname} onChangeText={(e) => setLastname(e)} />
              </View>
              <View style={styles.details}>
                <Text style={styles.detailsTitle}>Gender</Text>
                <Picker
                style={{flex:1}}
                  selectedValue={gender}
                  onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                >                  
                    <Picker.Item label="Male"value="Male" />
                    
                    <Picker.Item label="Female"value="Female" />
                </Picker>
              </View>
              

              <View style={styles.details}>
                <Text style={styles.detailsTitle}>Course, Year & Section</Text>
                <Picker
                style={{flex:1, height:50}}
                  selectedValue={courseYearSec}
                  onValueChange={(itemValue, itemIndex) => setCourseYearSec(itemValue)}
                >                  
                  {courses.map(({label,value})=>(
                    <Picker.Item label={label} value={value} key = {value} />
                  ))}
                </Picker>
              </View>
              <View style={styles.btnWrapper}>
                <CustomBtn title="Add Student" type={'primary'} action={submit} />
              </View>
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
  inputWrapper: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: 50,
    marginBottom: 0,
  },
  input: {
    flex: 1,
    borderRadius: 10,
    borderColor: '#e8d5c5',
    paddingLeft: 5,
    paddingRight: 5,
  },
  detailsWrapper: {
    flex: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
  },
  details: {
    width: '95%',
    height: 50,
    borderRadius: 3,
    flex: 0,
    backgroundColor: '#e8d5c5',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 5,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'white',
  },
  detailsTitle: {
    fontWeight: 'bold',
    color: 'black',
    marginRight: 10,
  },
  qrContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    marginTop: 50,
  },
  btnWrapper: {
    width: 100,
    margin: 10,
  },
});
