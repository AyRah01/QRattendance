import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CustomBtn from '../components/CustomBtn/CustomBtn';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from './../config';
import useStorage from '../helper/useStorage';
import Header from './Header';
import Footer from './Footer';
import { Picker } from '@react-native-picker/picker';
export default function ClassView({ navigation, route }) {
  const [students, setStudents] = useState([]);
  const classData = route.params;
  const [classFilter, setClassFilter] = useState('All');
  const [classes, setClasses] = useState([]);

  const {getValueFor} = useStorage()
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.tittleWrapper}>
          <Text style={styles.title}>{classData.course_number.toUpperCase()}</Text>
          <Text style={styles.subTitle}>{classData.course_title}</Text>
        </View>
      ),
      headerRight: () => <></>,
    });
    reqClasses()
  }, []);
  useFocusEffect(
    useCallback(() => {

      reqClasses();
      if(classFilter !== "All"){
        filterStudents()
      }else reqStudents()
     
    }, [navigation]),
  );

  useEffect(() => {
    if(classFilter !== "All"){
      filterStudents()
    }else reqStudents()
   
  }, [classFilter]);
  const reqStudents = async () => {
    const teacherId = await getValueFor('user_id')
    const classsReq = await axios.post(API_BASE + '/getStudents', { classId: classData.course_number,teacherId:teacherId });
    const studentsData = classsReq.data;
    setStudents(studentsData);
    console.log(studentsData);
  };

  const filterStudents = async () => {
    const teacherId = await getValueFor('user_id')
    const yearSection = classFilter
    const classsReq = await axios.post(API_BASE + '/getStudentsByYearSection', { classId: classData.course_number,teacherId:teacherId,yearSection:yearSection });
    const studentsData = classsReq.data;
    setStudents(studentsData);
    console.log(studentsData);
  };
  const reqClasses = async () => {
    const email = await getValueFor('user_id');
    const classsReq = await axios.get(API_BASE + '/getClasses/' + email + '/' + classData.course_number);

    const classesData = classsReq.data;
    setClasses(classesData);
    console.log(classesData);
  };
  const delClass = () => {
    Alert.alert('Delete Class?', 'Are you sure to delete this class?', [
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
    const deleteREq = await axios.post(API_BASE + '/deleteClass', { id: classData.id });
    if (deleteREq.data.success) navigation.goBack();
    else Alert.alert('Failed to Delete', 'An error occured while deleting student data');
  };

  const editClass = () => {
    navigation.navigate('addClass', { type: 'edit', classData });
  };
  const Item = ({ data, target }) => {
    const fullname = data.firstname + ' ' + data.middlename + ' ' + data.lastname;
    const yearSection = data.course + ' ' + data.year + ' ' + data.section;
    return (
      <View
        style={styles.item}
        onTouchEnd={() => navigation.navigate('student-details', { data, type: 'class', classData })}
      >
        <Text style={styles.itemTitle}>{fullname.toUpperCase()}</Text>
        <Text style={styles.itemTitle}>{yearSection}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.mainWrapper}>
      <Header title="Class" navigation={navigation} />
      <View style={styles.titleBox}>
        <View style={styles.HeaderUtilBox}>
          <Text style={styles.courseTitle}>{classData.course_number}</Text>
          <View style ={styles.headerButtons}>
          <View style = {styles.headerButtonWrapper} onTouchEnd = {editClass}><Text style = {{color:'white', margin:3}}>Edit</Text><Ionicons name='create-outline' size={20} color='white'/></View>
          <View style = {styles.headerButtonWrapper} onTouchEnd={delClass}><Text style = {{color:colors.warning, margin:3}}>Delete</Text><Ionicons name='trash-outline' size={20} color={colors.warning}/></View>
          </View>
        </View>
        <Text style={styles.title}>{classData.course_title}</Text>
        <Text style={styles.subtitle}>{classData.semester} Semester</Text>
        <View style={styles.filterWrapper}>
          <View style={styles.filterBox}>
            <Picker
              style={{ flex: 1, color: 'white' }}
              selectedValue={classFilter}
              onValueChange={(itemValue, itemIndex) => setClassFilter(itemValue)}
            >
              <Picker.Item value={"All"} label = {"All"} />
              {classes.map(({yearsection},idx)=>(
                <Picker.Item value={yearsection} label = {yearsection} key = {idx}/>
              ))}
            </Picker>
          </View>
        </View>
        <Text style={styles.title}>Students</Text>

      </View>
      
      <ScrollView>
        <View style={styles.body}>
          <View style={styles.itemsWrapper}>
            {students?.length === 0 ? (
              <Text>You have no students enrolled yet.</Text>
            ) : (
              students.map((data, idx) => <Item data={data} key={idx} />)
            )}
          </View>
        </View>
      </ScrollView>
      <Footer action={() => navigation.navigate('enroll-student', { classData })} active = 'class' navigation={navigation} actionIcon = 'add-circle-outline' actionTitle='Enroll'/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  body: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
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
    backgroundColor: '#e8d5c5',
    paddingLeft: 10,
    paddingRight: 10,
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
  HeaderUtilBox: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    width:'100%'
  },
  headerButtons:{
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    padding:10,
  },
  headerButtonWrapper:{
    flex:0,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    width:'auto',
    backgroundColor:colors.secondary,
    padding:5,
    paddingLeft:10,
    paddingRight:10,
    borderRadius:20,
    marginLeft:5
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
    color: '#e8d5c5',
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
    width: '100%',
    height: 'auto',
    borderRadius: 3,
    flex: 0,
    backgroundColor: colors.secondary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 5,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'white',
  },
  details: {
    flex: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
  },
  detailsLabelBox: {
    width: 'auto',
  },
  detailsLabel: {
    fontWeight: 'bold',
    color: 'white',
  },
  detailsTitle: {
    fontWeight: 'bold',
    color: 'white',
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
  itemsWrapper: {
    flex: 1,
    padding:10,
    paddingTop: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
  },
  item: {
    width: '100%',
    height:40,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 0,
    borderRadius: 5,
    borderColor: colors.warning,
    borderBottomWidth:1,
    padding:10
  },
  itemTitle: {
    fontSize: 15,
    margin: 0,
    padding: 0,
    width:'auto'
  },
  itemIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  filterBox: {
    height: 40,
    borderRadius: 3,
    flex: 1,
    backgroundColor: colors.secondary,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 5,
    padding: 10,
  },
  filterWrapper: {
    flex: 0,
    flexDirection: 'row',
    marginTop: 10,
    marginBottom:10
  },
});
