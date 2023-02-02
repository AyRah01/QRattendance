import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';
import CustomBtn from '../components/CustomBtn/CustomBtn';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import HeaderSmall from './HeaderSmall';
import {colors} from './../config'
export default function AddStudent({ navigation }) {
  const [studentId, setStudentId] = useState('');
  const [firstname, setfirstname] = useState('');
  const [middlename, setMiddlename] = useState('');
  const [lastname, setLastname] = useState('');
  const [course, setCourse] = useState('BSIT');
  const [year, setYear] = useState('1');
  const [section, setSection] = useState('A');
  
  const [gender, setGender] = useState("Male")

  const courses = ["BSIT", "COE", "SOA", "CBM"]
  const sections = ["A","B","C","D","E","F","G"]
  const years = ['1','2','3','4']


  useEffect(() => {}, []);


  const submit = async () => {
    const addStudentReq = await axios.post(API_BASE + '/addStudent', {
      firstname,
      middlename,
      lastname,
      gender,
      studentId,
      course,
      year,
      section
    });
    const studentData = addStudentReq.data;
    console.log(studentData);
    if (!studentData.success) {
      if (studentData.code === 'duplicate') return Alert.alert('Failed to add Student', 'Student ID already exists.');
      else return Alert.alert('Failed to add Student', 'There was an error while saving data');
    }
    const data = { firstname, middlename, lastname,gender, student_id: studentId, course, year, section };

    return navigation.navigate('student-details', { data });
  };
  return (
    <SafeAreaView style={styles.mainWrapper}>
      <HeaderSmall title="Add Student" navigation={navigation}/>
        <ScrollView>
          <View style={styles.body}>
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
                <Text style={styles.detailsTitle}>Course</Text>
                <Picker
                style={{flex:1, height:50}}
                  selectedValue={course}
                  onValueChange={(itemValue, itemIndex) => setCourse(itemValue)}
                >                  
                  {courses.map((value,idx)=>(
                    <Picker.Item label={value} value={value} key = {idx} />
                  ))}
                </Picker>
              </View>
              <View style={styles.details}>
                <Text style={styles.detailsTitle}>Year</Text>
                <Picker
                style={{flex:1, height:50}}
                  selectedValue={year}
                  onValueChange={(itemValue, itemIndex) => setYear(itemValue)}
                >                  
                  {years.map((value,idx)=>(
                    <Picker.Item label={value} value={value} key = {idx} />
                  ))}
                </Picker>
              </View>
              <View style={styles.details}>
                <Text style={styles.detailsTitle}>Section</Text>
                <Picker
                style={{flex:1, height:50}}
                  selectedValue={section}
                  onValueChange={(itemValue, itemIndex) => setSection(itemValue)}
                >                  
                  {sections.map((value,idx)=>(
                    <Picker.Item label={value} value={value} key = {idx} />
                  ))}
                </Picker>
              </View>
            
            
              <View style={styles.btnWrapper}>
                <Button onPress={submit} title="Save" color={colors.primary} />
              </View>
            </View>
          </View>
        </ScrollView>
    </SafeAreaView>
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
    backgroundColor: "white",
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
    width: "100%",
    padding:10,
    margin: 10,
  },
});
