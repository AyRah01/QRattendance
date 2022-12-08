
import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';
import CustomBtn from '../components/CustomBtn/CustomBtn';
import { SafeAreaView } from 'react-native-safe-area-context';
import useStorage from '../helper/useStorage';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function Classes({ navigation }) {
  const {getValueFor} = useStorage()
  const [classes, setClasses] = useState([])


  useEffect(()=>{
    navigation.setOptions({
      headerRight: () => (
        <Ionicons name="add-circle-outline" size={32} color="black" onPress={()=>navigation.navigate("addClass",{type: "add", data:null})} />
      ),
    });
  },[])
  useFocusEffect(useCallback(()=>{
    const reqClasses = async()=>{
      const email = await getValueFor("user_id")
      const classsReq = await axios.get(API_BASE+"/getSubjects/"+email)

      const classesData = classsReq.data
       setClasses(classesData)
       console.log(classesData)

    }
    reqClasses()
  },[navigation]));


  const Item = ({ data, target }) => {
    return (
      <View style={styles.item} onTouchEnd = {()=>navigation.navigate("view-class",data)}>
        <Text style={styles.itemTitle}>{data.course_title.toUpperCase()}</Text>
        <Text style={styles.itemTitle}>{data.course_number}</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1}}>
      <SafeAreaView style={styles.mainWrapper}>
        <ScrollView>
          <View style={styles.body}>
            <View style={styles.itemsWrapper}>
              {classes?.length === 0?(<Text>You have no class yet.</Text>):
              classes.map((data, idx) => (
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

