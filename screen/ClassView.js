import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';

export default function ClassView({ route, navigation }) {
  const { classId } = route.params;
  const [students, setStudents] = useState([])

  useEffect(()=>{

    const reqClasses = async()=>{
      const classsReq = await axios.post(API_BASE+"/getStudents", {classId})

      const studentsData = classsReq.data
      setStudents(studentsData)
       console.log(studentsData)

    }
    reqClasses();

 },[])

  const StudentItem = ({ data }) => {
    const fullname = data.firstname + " " + data.middlename + " " + data.lastname
    return (
      <View style={styles.studentItem} key = {data.student_id} onTouchStart = {()=>{navigation.navigate("student-details",{data:data})}}>
        <Text style={styles.text}>{fullname}</Text>
      </View>
    );
  };
  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.title}>Students</Text>
        <Button
          title="Add"
          style={styles.btn}
          onPress={() => navigation.navigate('add-student', { classId: classId })}
        />
      </View>
      <View style={styles.studentList}>
        {students.map((data)=>(
            <StudentItem data={data}/>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 50,
    margin: 10,
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  studentItem: {
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 1,
    padding: 25,
    borderRadius: 7,
    marginBottom: 10,
  },
  studentList: {
    padding: 10,
    width: '100%',
  },
  text: {
    fontSize: 15,
    paddingRight: 10,
  },
});
