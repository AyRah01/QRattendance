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

export default function ClassView({ navigation, route }) {
  const [students, setStudents] = useState([]);
  const classData = route.params;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => 
        <View style={styles.tittleWrapper}>
          <Text style={styles.title}>{classData.course_number.toUpperCase()}</Text>
          <Text style={styles.subTitle}>
            {classData.course_title}
          </Text>
        </View>
      ,
      headerRight: () => (
        <>
          <Ionicons name="create-outline" size={25} color="black" onPress={editClass} />
          <Ionicons name="trash-outline" size={25} color="orange" onPress={delClass} />
        </>
      ),
    });
  }, []);
  useFocusEffect(
    useCallback(() => {
      const reqStudents = async () => {
        const classsReq = await axios.post(API_BASE + '/getStudents', { classId: classData.course_number });
        const studentsData = classsReq.data;
        setStudents(studentsData);
        console.log(studentsData);
      };
      reqStudents();
    }, [navigation]),
  );

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
    const yearSection = data.course+" "+data.year+" "+data.section
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
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.mainWrapper}>
      <ScrollView>

        <View style={styles.body}>
        <View style={styles.contentHeader}>
              <Text style={styles.title}>Students</Text>
            </View>
          <View style={styles.itemsWrapper}>
              {students?.length===0?(<Text>You have no students enrolled yet.</Text>):
              students.map((data, idx) => (
                <Item data={data} key={idx} />
              ))}
              
          </View>
          <View style={styles.footer}>
            <CustomBtn
              title="Enroll Student"
              action={() => navigation.navigate('enroll-student', { classData })}
            />
          </View>
        </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    margin:0,
    padding:0
  },
  body: {
    margin:0,
    padding:0,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 15,
  },
  tittleWrapper: {
    flex: 0,
    height:"auto",
    width:"90%",
    paddingBottom:10,
    paddingTop:10,
    justifyContent: 'center',
  },

  header: {
    fontSize: 10,
    color: 'black',
    fontWeight: 'bold',
    width: 200,
  },
  contentHeader: {
    marginTop:0,
    width: '100%',
    flex: 0,
    paddingLeft:20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',

  },
  headerBtn: {
    flex: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btn: {
    marginRight: 2,
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
    width: "90%",
    height: 'auto',
    margin:10
  },
});
