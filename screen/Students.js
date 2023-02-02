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
import {colors} from './../config'
import Header from './Header';
import Footer from './Footer';
import HeaderSmall from './HeaderSmall';
import useStorage from '../helper/useStorage';
import { Picker } from '@react-native-picker/picker';
export default function Students({ navigation }) {
  const [students, setStudents] = useState([]);
  const [toSearch, setToSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('BSIT')
  const [yearSectionFilter, setYearSectionFilter] = useState('1-A')

  const {getValueFor} = useStorage()
  useEffect(()=>{
    navigation.setOptions({
      headerTitle:"Students",
      headerRight: () => (
        <Ionicons name="add-circle-outline" size={32} color="black" onPress={()=>navigation.navigate("add-student")} />
      ),
    });
  },[])
  useFocusEffect(

    useCallback(()=>{
    reqClasses();

  },[navigation]))

  useEffect(() => {
    if (toSearch.length > 3) search();
    else reqClasses();
  }, [toSearch]);

  useEffect(()=>{
    filterReq()
  },[courseFilter, yearSectionFilter])
  const reqClasses = async () => {
    const teacherId = await getValueFor('user_id')
    const classsReq = await axios.post(API_BASE + '/getAllStudents',{teacherId:teacherId});

    const studentsData = classsReq.data;
    setStudents(studentsData);
}
  const filterReq = async()=>{
    const teacherId = await getValueFor('user_id');

    const request = await axios.get(API_BASE+'/filterStudents/'+courseFilter+"/"+yearSectionFilter+"/"+teacherId)
    const studentsData = request.data
    setStudents(studentsData)
  }
  const search = async () => {
    const teacherId = await getValueFor('user_id');

    const searchReq = await axios.get(API_BASE + '/searchStudent/' + toSearch + '/' + teacherId);

    if (searchReq.status === 200) {
      const searchData = searchReq.data;
      setStudents(searchData);
    }
  };
  const Item = ({ data, target }) => {
    const fullname = data.firstname + ' ' + data.middlename + ' ' + data.lastname;
    const yearSection = data.course + " "+data.year+" "+data.section
    return (
      <View style={styles.item} onTouchEnd={() => navigation.navigate('student-details', { data })}>
        <Text style={styles.itemTitle}>{fullname.toUpperCase()}</Text>
        <Text style={styles.itemTitle}>{yearSection}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.mainWrapper}>
      <Header title={"Students"} navigation = {navigation}/>
      <View style={styles.titleBox}>
      <View style = {styles.filterWrapper}>
        <View style={styles.filterBox}>
          <Picker
            style={{ flex: 1,color:'white' }}
            selectedValue={courseFilter}
            onValueChange={(itemValue, itemIndex) => setCourseFilter(itemValue)}
          >
            <Picker.Item label="BSIT" value="BSIT" />
            <Picker.Item label="COE" value="COE" />
            <Picker.Item label="CBM" value="CBM" />
            <Picker.Item label="SOA" value="SOA" />
          </Picker>
        </View>
        <View style={styles.filterBox}>
          <Picker
            style={{ flex: 1,color:'white' }}
            selectedValue={yearSectionFilter}
            onValueChange={(itemValue, itemIndex) => setYearSectionFilter(itemValue)}
          >
            <Picker.Item label="1-A" value="1-A" />
            <Picker.Item label="1-B" value="1-B" />
            <Picker.Item label="1-C" value="1-C" />
            <Picker.Item label="1-D" value="1-D" />
            <Picker.Item label="1-E" value="1-E" />

            <Picker.Item label="2-A" value="2-A" />
            <Picker.Item label="2-B" value="2-B" />
            <Picker.Item label="2-C" value="2-C" />
            <Picker.Item label="2-D" value="2-D" />
            <Picker.Item label="2-E" value="2-E" />

            <Picker.Item label="3-A" value="3-A" />
            <Picker.Item label="3-B" value="3-B" />
            <Picker.Item label="3-C" value="3-C" />
            <Picker.Item label="3-D" value="3-D" />
            <Picker.Item label="3-E" value="3-E" />

            <Picker.Item label="4-A" value="4-A" />
            <Picker.Item label="4-B" value="4-B" />
            <Picker.Item label="4-C" value="4-C" />
            <Picker.Item label="4-D" value="4-D" />
            <Picker.Item label="4-E" value="4-E" />

          </Picker>
        </View>
        </View>
        <View style={styles.searchBox}>
          <Text style={styles.searchLabel}>Search:</Text>
          <TextInput style={styles.input} defaultValue={toSearch} onChangeText={(e) => setToSearch(e)} />
        </View>
        </View>
      <View style={styles.body}>
        <View style={styles.itemsWrapper}>
          <ScrollView>
               {students.map((data, idx) => (
                 <Item data={data} key={idx} />
               ))}
          </ScrollView>
        </View>
      </View>
      <Footer active={'students'} actionIcon = "add-circle-outline" actionTitle="Add Student" navigation = {navigation} action = {()=>navigation.navigate('add-student')}/>
    </SafeAreaView>
    // <View style={{ flex: 1}}>
    //     <ScrollView>
    //       <View style={styles.body}>
    //         <View style={styles.contentHeader}>
    //           <Text style={styles.header}>Student List</Text>
    //         </View>
    //         <View style={styles.itemsWrapper}>
    //           {students.map((data, idx) => (
    //             <Item data={data} key={idx} />
    //           ))}
    //         </View>
    //         </View>
    //     </ScrollView>
    // </View>
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
    padding:10,
    paddingTop: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
  },
  item: {
    width: '86%',
    height:40,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 0,
    borderRadius: 5,
    borderColor: colors.warning,
    borderBottomWidth:1
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
  filterBox:{
    width: '45%',
    height: 40,
    borderRadius: 3,
    flex: 0,
    backgroundColor: colors.secondary,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 5,
    padding: 10,

  },
  filterWrapper:{
    flex:0,
    flexDirection:'row',
    marginTop:10
  },
  searchBox: {
    marginTop: 10,
    width: '95%',
    height: 'auto',
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.secondary,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 50,
  },
  searchLabel:{
    color:'white'
  },
  input: {
    borderBottomWidth: 1,
    flex: 1,
    borderColor: 'white',
    color: 'white',
    paddingLeft: 5,
    paddingRight: 5,
  },
});
