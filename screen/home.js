import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, ScrollView } from 'react-native';
import { API_BASE } from '../config';

export default function Home({ navigation }) {
  const [classses, setClasses] = useState([])

  useEffect(()=>{
    const reqClasses = async()=>{
      const classsReq = await axios.get(API_BASE+"/getClasses")

      const classesData = classsReq.data
       setClasses(classesData)
       console.log(classesData)

    }
    reqClasses();

  },[])

  const createClasss = () => {
    navigation.navigate("addClass")
  }
  const ClassItem = ({ data }) => {
    return (
      <View key={data.id} style={styles.classItem} onTouchEnd = {()=>navigation.navigate("view-class",{
        classId:data.id
      })}>
        <Text>{data.course_title}</Text>
      </View>
    );
  };
  return (
    <ScrollView>
      <View style={styles.main}>
      <Text style={styles.title}>Classes</Text>
      <View style={styles.classList}>
        {classses.map((data)=>(
          <ClassItem data = {data} key={data.id}/>
        )) }
      </View>
      <Button title='Add Class' onPress={createClasss}/>

    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  classList:{
    width:"100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemWrapper: {
    width: '100%',
    marginBottom: 20,
  },
  classItem: {
    padding: 20,
    borderWidth: 1,
    width: '99%',
    marginBottom: 5,
    borderRadius: 5,
  },
  title: {
    fontSize: 50,
    margin: 10,
  },
});
