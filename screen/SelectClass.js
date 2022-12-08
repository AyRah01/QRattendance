
import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CustomBtn from '../components/CustomBtn/CustomBtn';
import { SafeAreaView } from 'react-native-safe-area-context';
import useStorage from '../helper/useStorage';
import { Ionicons } from '@expo/vector-icons';

export default function SelectClass({ navigation,route }) {
  const {getValueFor} = useStorage()
  const [classes, setClasses] = useState([])
  const subjectData = route.params.classData

  

  useEffect(()=>{
    const reqClasses = async()=>{
      const email = await getValueFor("user_id")
      const classsReq = await axios.get(API_BASE+"/getClasses/"+email+"/"+subjectData.course_number)

      const classesData = classsReq.data
       setClasses(classesData)
       console.log(classesData)

    }
    reqClasses();

  },[])

  const Item = ({ data, target }) => {
    return (
     <TouchableOpacity style={{width:'100%'}}>
         <View style={styles.item} onTouchEnd = {()=>navigation.navigate("view-reports",{classData:data, subjectData:subjectData})}>
        <Text style={styles.itemTitle}>{data.yearsection.toUpperCase()}</Text>
      </View>
     </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1}}>
      <SafeAreaView style={styles.mainWrapper}>
        <ScrollView>
          <View style={styles.body}>
            <View style={styles.headerWrapper}>
              <Text style={styles.header}>List of Classes</Text>
            </View>
            <View style={styles.itemsWrapper}>
              {classes.map((data, idx) => (
                <Item data={data} key={idx} />
              ))}
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
  scrollList: {
    flex: 1,
  },
  itemsWrapper: {
    flex: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: "auto",
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
    height: 'auto',
    width: '90%',
  },
});

