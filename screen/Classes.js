
import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';
import CustomBtn from '../components/CustomBtn/CustomBtn';
import { SafeAreaView } from 'react-native-safe-area-context';
import useStorage from '../helper/useStorage';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import HeaderSmall from './HeaderSmall';
import Footer from './Footer';
import {colors} from './../config'
import Header from './Header';

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
      <SafeAreaView style={styles.mainWrapper}>
        <Header title="Classes" navigation = {navigation} subTitle = "List of Classes"/>
        <View style={styles.titleBox}>
          <Text style={styles.title}>Your Classes </Text>
        </View>
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
        <Footer navigation={navigation} active="class" actionIcon = "add-circle-outline" actionTitle = "Add Class" action={()=>navigation.navigate('addClass',{type: "add", data:null})}/>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor:'white'
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
  titleBox: {
    width: '100%',
    height: 60,
    flex: 0,
    backgroundColor:colors.primary,
    borderColor: colors.warning,
    justifyContent: 'flex-start',
    paddingLeft: 20,
    paddingBottom:10,
    alignItems: 'flex-start',
    marginBottom: 20,
    borderBottomWidth: 10,
  },
  title: {
    textAlign: 'left',
    color: 'white',
    fontSize: 20,
    marginTop:'auto'
  },
  itemsWrapper: {
    flex: 1,
    paddingTop: 0,
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
  },
  item: {
    width: '100%',
    height: 60,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderRadius: 20,
    marginBottom: 20,
    padding: 20,
    borderWidth: 0,
    borderRadius: 5,
    borderColor: colors.warning,
  },
  itemTitle: {
    fontSize: 15,
    margin: 0,
    padding: 0,
    color: 'white',
  },
  itemIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  footer: {
    height: 'auto',
    width: '90%',
  },
});

