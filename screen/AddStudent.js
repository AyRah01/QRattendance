import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';
import CustomBtn from '../components/CustomBtn/CustomBtn';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import HeaderSmall from './HeaderSmall';
import { colors } from './../config';
import useStorage from '../helper/useStorage';
export default function AddStudent({ navigation, route }) {
  const studentData = route.params?.studentData
  const [idPart1, setIdPart1] = useState(studentData?.student_id.substring(3,5))
  const [idPart2, setIdPart2] = useState(studentData?.student_id.substring(6))
  const [firstname, setfirstname] = useState(studentData?.firstname);
  const [middlename, setMiddlename] = useState(studentData?.middlename);
  const [lastname, setLastname] = useState(studentData?.lastname);
  const [course, setCourse] = useState(studentData?.course);
  const [year, setYear] = useState(`${studentData?.year}`);
  const [section, setSection] = useState(studentData?.section);
  const [toEditId, setToEditId] = useState(studentData?.id)
  const [studentType, setStudentType] = useState(studentData?.type)

  const [gender, setGender] = useState(studentData?.gender);
  const [saving, setSaving] = useState(false)

  const { getValueFor } = useStorage();
  const courses = ['BSIT', 'COE', 'SOA', 'CBM'];
  const sections = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const years = ['1', '2', '3', '4'];

  const idRef = useRef()

  useEffect(() => {
    console.log("To edit",studentData)
  }, [studentType]);

  const handleIdPart1 = (e) => {
      setIdPart1(e)
  }
  const handleIdPart2 = (e) => {
      setIdPart2(e)
  }

  const submit = async () => {
    let route = API_BASE + '/addStudent'
    if (studentData)route = API_BASE + '/editStudent'

    const teacherId = await getValueFor('user_id');    
    if ((firstname && middlename && lastname && gender && idPart1.length === 2 && idPart2.length >= 3 && course) && ((studentType === "regular" && year && section) || studentType === "irregular")) {
      setSaving(true)
      const studentId = "CC-"+idPart1+"-"+idPart2
      const addStudentReq = await axios.post(route, {
        firstname,
        middlename,
        lastname,
        gender,
        studentId,
        course,
        year,
        section,
        studentType,
        toEditId:toEditId,
        teacherId:teacherId
      });
      const studentData = addStudentReq.data;
      console.log(studentData);
      setSaving(false)

      if (!studentData.success) {
        if (studentData.code === 'duplicate') return Alert.alert('Failed to add Student', 'Student ID already exists.');
        else return Alert.alert('Failed to add Student', 'There was an error while saving data');
      }
      const data = { firstname, middlename, lastname, gender, student_id: studentId, course, year, section, id:studentData.id, type:studentType };

      setfirstname('');
      setMiddlename('');
      setLastname('');
      setIdPart1('');
      setIdPart2('')
      setStudentType('')
      setGender('')
      
      return navigation.navigate('student-details', { data });
    }
    else return Alert.alert('Incomplete', 'All fields are required to be filled');
    

  };
  const veririfyInput = (e) => {
    var hasNumber = /\d/;
                  var hasSpecial = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
                  if(!hasNumber.test(e) && !hasSpecial.test(e)){
                    return true

                  }else{
                    Alert.alert("Invalid Input","Numbers are not allowed in this field")
                  }
                  return false
  }
  return (
    <SafeAreaView style={styles.mainWrapper}>
      <HeaderSmall title="Add Student" navigation={navigation} />
      <ScrollView keyboardShouldPersistTaps = 'always'>
        <View style={styles.body}>
          <View style={styles.details}>
            <Text style={styles.detailsTitle}>ID Number</Text>
            <View style ={styles.idInputBox}>
            <TextInput style={styles.inputId} editable={false} value = "CC" />
            <Text style={styles.detailsTitle}>-</Text>
            <TextInput style={styles.inputId} keyboardType = 'number-pad' maxLength = {2} defaultValue={idPart1} onChangeText={handleIdPart1} />
            <Text style={styles.detailsTitle}>-</Text>
            <TextInput style={styles.inputId} maxLength = {4} keyboardType = 'numeric' defaultValue={idPart2} onChangeText={handleIdPart2} />
            </View>
          </View>
          <View style={styles.detailsWrapper}>
            <View style={styles.details}>
              <Text style={styles.detailsTitle}>First Name</Text>
              <TextInput style={styles.input} defaultValue={firstname} onChangeText={(e) =>{
                  if(veririfyInput(e)){
                    setfirstname(e)
                  }
            
              }} />
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsTitle}>Middle Name</Text>
              <TextInput style={styles.input} defaultValue={middlename} onChangeText={(e) => {
                   if(veririfyInput(e)){
                    setMiddlename(e)
                  }
                   }} />
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsTitle}>Last Name</Text>
              <TextInput style={styles.input} defaultValue={lastname} onChangeText={(e) => {
                if(veririfyInput(e)){
                  setLastname(e)
                }
                }
               } />
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsTitle}>Gender</Text>
              <Picker
                style={{ flex: 1 }}
                selectedValue={gender}
                onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
              >
                <Picker.Item label="Select Gender" value="" />
                <Picker.Item label="Male" value="Male" />

                <Picker.Item label="Female" value="Female" />
              </Picker>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsTitle}>Course</Text>
              <Picker
                style={{ flex: 1, height: 50 }}
                selectedValue={course}
                onValueChange={(itemValue, itemIndex) => setCourse(itemValue)}
              >
                <Picker.Item label={"Select Course"} value={""} />

                {courses.map((value, idx) => (
                  <Picker.Item label={value} value={value} key={idx} />
                ))}
              </Picker>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsTitle}>Student Type</Text>
              <Picker
                style={{ flex: 1 }}
                selectedValue={studentType}
                onValueChange={(itemValue, itemIndex) => setStudentType(itemValue)}
              >
                <Picker.Item label="Select Type" value="" disabled/>
                <Picker.Item label="Regular" value="regular" />

                <Picker.Item label="Irregular" value="irregular" />
              </Picker>
            </View>
            {studentType === "regular"?
            <View style={styles.details}>
            <Text style={styles.detailsTitle}>Year</Text>
            <Picker
              style={{ flex: 1, height: 50 }}
              selectedValue={year}
              onValueChange={(itemValue, itemIndex) => setYear(itemValue)}
            >
              <Picker.Item label={"Select Year"} value={""} />
              {years.map((value, idx) => (
                <Picker.Item label={value} value={value} key={idx} />
              ))}
            </Picker>
          </View>:""}
            {studentType === "regular"?
            <View style={styles.details}>
            <Text style={styles.detailsTitle}>Section</Text>
            <Picker
              style={{ flex: 1, height: 50 }}
              selectedValue={section}
              onValueChange={(itemValue, itemIndex) => setSection(itemValue)}
            >
              <Picker.Item label={"Select Section"} value={""}/>
              {sections.map((value, idx) => (
                <Picker.Item label={value} value={value} key={idx} />
              ))}
            </Picker>
          </View>:""}
            <View style={styles.btnWrapper}>
              <Button onPress={submit} title={saving?'Saving...':"Save"} color={colors.primary} disabled = {saving}/>
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
    width:'auto',
    flex: 1,
    borderRadius: 10,
    borderColor: '#e8d5c5',
    paddingLeft: 5,
    paddingRight: 5,
  },
  inputId:{
    borderRadius: 2,
    paddingLeft: 5,
    paddingRight: 5,
    borderWidth:1,
    borderColor:colors.primary
  },
  idInputBox:{
    flex:0,
    width:150,
    justifyContent:'space-evenly',
    alignItems:'center',
    flexDirection:'row'
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
    backgroundColor: 'white',
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
    width: '100%',
    padding: 10,
    margin: 10,
  },
});
