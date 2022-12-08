import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';
import CustomBtn from '../components/CustomBtn/CustomBtn';
import { SafeAreaView } from 'react-native-safe-area-context';
import useStorage from '../helper/useStorage';
import { Picker } from '@react-native-picker/picker';

export default function AddClass({ navigation, route }) {
  const {getValueFor} = useStorage()
  const {type, classData} = route.params

  const [courseNumber, setCourseNumber] = useState(classData?.course_number);
  const [courseTitle, setCourseTitle] = useState(classData?.course_title);
  const [semester, setSemester] = useState(classData?.semester || "1");
  const [schoolYear, setSchoolYear] = useState(classData?.school_year);
  useEffect(() => {}, []);

  const submit = async() => {
    const email = await getValueFor("user_id")
    const url = type==='edit'?API_BASE+"/editClass/"+classData.id:API_BASE+"/addClass"
    const submitReq = await axios.post(url,{courseNumber, courseTitle, semester, schoolYear, email})
    if(submitReq.status !== 200)return Alert.alert("Server Error", "Sorry, cannot reach the server at the moment. Please try again later.")
    if(!submitReq.data.success)return Alert.alert("Failed to Save", "Sorry, an error has occured while saving the data. Please try again later.")

    navigation.navigate("classes")
  }
  return (
    <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={styles.body}>
            <View style={styles.detailsWrapper}>
              <View style={styles.details}>
                <Text style={styles.detailsTitle}>Course Number</Text>
                <TextInput style={styles.input} defaultValue={courseNumber} onChangeText={(e)=>setCourseNumber(e)} />
              </View>
              <View style={styles.details}>
                <Text style={styles.detailsTitle}>Course Title</Text>
                <TextInput style={styles.input} defaultValue={courseTitle} onChangeText={(e)=>setCourseTitle(e)} />
              </View>
              
              <View style={styles.details}>
                <Text style={styles.detailsTitle}>Semister</Text>
                <Picker
                style={{flex:1}}
                  selectedValue={semester}
                  onValueChange={(itemValue, itemIndex) => setSemester(itemValue)}
                >                  
                    <Picker.Item label="First"value="1st" />
                    
                    <Picker.Item label="Second"value="2nd" />
                </Picker>
              </View>
            <View style={styles.details}>
                <Text style={styles.detailsTitle}>School Year</Text>
                <TextInput style={styles.input} defaultValue={schoolYear} onChangeText={(e)=>setSchoolYear(e)} />
              </View>

              <View style={styles.btnWrapper}>
              <CustomBtn title="Add Class" type={"primary"} action = {submit}/>
            </View>
            </View>
          </View>
        </ScrollView>
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
    width: '70%',
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
