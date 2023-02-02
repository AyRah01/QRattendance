import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';
import CustomBtn from '../components/CustomBtn/CustomBtn';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from './Header';
import { colors } from './../config';

export default function Enroll({ navigation, route }) {
  const [students, setStudents] = useState([]);
  const [toSearch, setToSearch] = useState('');

  const { course_number, course_title } = route.params.classData;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.tittleWrapper}>
          <Text style={styles.title}>{course_number.toUpperCase()}</Text>
          <Text style={styles.subTitle}>{course_title}</Text>
        </View>
      ),
    });
  }, []);
  useEffect(() => {
    if (toSearch.length > 3) search();
    else getAllStudents();
  }, [toSearch]);

  const getAllStudents = async () => {
    const classsReq = await axios.post(API_BASE + '/getAllStudents');

    const studentsData = classsReq.data;
    setStudents(studentsData);
  };
  const search = async () => {
    const searchReq = await axios.get(API_BASE + '/searchStudent/' + toSearch);

    if (searchReq.status === 200) {
      const searchData = searchReq.data;
      setStudents(searchData);
    }
  };
  const submitStudent = async (studentId) => {
    const enrollReq = await axios.post(API_BASE + '/enroll', { classId: course_number, studentId: studentId });
    if (enrollReq.status !== 200)
      return Alert.alert('Server Error', 'Sorry, cannot reach the server at the moment. Please try again later.');
    const enrollRes = enrollReq.data;
    if (enrollRes.code === 11)
      return Alert.alert('Already Enrolled', 'This student is already enrolled in this class.');
    if (!enrollRes.success)
      return Alert.alert(
        'Failed to Enroll',
        'Sorry, an error has occured while enrolling student. Please try again later.',
      );

    navigation.goBack();
  };

  const Student = ({ data, target }) => {
    return (
      <View style={styles.item} onTouchEnd={() => submitStudent(data.student_id)}>
        <Text style={styles.itemTitle}>
          {data.fullname?.toUpperCase() || data.firstname + ' ' + data.middlename + ' ' + data.lastname.toUpperCase()}
        </Text>
        <Text style={styles.itemTitle}>{data.year_section}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.mainWrapper}>
      <Header title="Enroll Student" navigation={navigation} />
      <View style={styles.titleBox}>
        <Text style={styles.title}>{course_number}</Text>
        <Text style={styles.title}>{course_title}</Text>
        <View style={styles.searchBox}>
          <Text style={styles.searchLabel}>Search:</Text>
          <TextInput style={styles.input} defaultValue={toSearch} onChangeText={(e) => setToSearch(e)} />
        </View>
      </View>
      <ScrollView>
        <View style={styles.body}>
          <View style={styles.itemsWrapper}>
            {
              students?.map((data, idx) => <Student data={data} key={idx} />)
            }
          </View>
        </View>
      </ScrollView>
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
  input: {
    borderBottomWidth: 1,
    flex: 1,
    borderColor: 'white',
    color: 'white',
    paddingLeft: 5,
    paddingRight: 5,
  },
  headerButtonWrapper: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 'auto',
    backgroundColor: colors.secondary,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20,
    marginLeft: 5,
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
  searchLabel: {
    color: 'white',
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
    height: 40,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 0,
    borderRadius: 5,
    borderColor: colors.warning,
    borderBottomWidth: 1,
    padding: 10,
  },
  itemTitle: {
    fontSize: 15,
    margin: 0,
    padding: 0,
    width: 'auto',
  },
  itemIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
});
