import { Alert, BackHandler, Button, Image, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CustomBtn from '../components/CustomBtn/CustomBtn';
import { SafeAreaView } from 'react-native-safe-area-context';
import useStorage from '../helper/useStorage';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function Home({ navigation }) {
    const {save, getValueFor} = useStorage()
   
    const [teacher, setTeacher] = useState('')



    React.useEffect(() => {
      navigation.setOptions({
        headerTitle:()=>(
          <View style = {styles.appHeader}>
            <Text style={styles.appTitle}>Mobile Based Class Attendance Monitoring System via QR Code</Text>
          </View>
        ),
        headerRight: () => (
          <Ionicons name="menu-outline" size={32} color="black" onPress={()=>navigation.navigate("menu")} />
        ),
      });
    }, [navigation]);
    useFocusEffect(useCallback(()=>{
      
      getValueFor('teacher').then((val)=>setTeacher(val))
      const backActionHandler = () => {
        Alert.alert("Exit?", "Are you sure you want to close the app?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => BackHandler!==undefined?BackHandler.exitApp():""
          () }
        ]);
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress", backActionHandler);

    return () => BackHandler.removeEventListener("hardwareBackPress", backActionHandler);


    },[navigation]))
    const Item = ({title, target}) => {
        return(
            <View style = {styles.item} onTouchEnd = {()=>navigation.navigate(target)}>
                <Text style = {styles.itemTitle}>{title}</Text>
                <Text style = {styles.itemsubtitle}>{target}</Text>
            </View>
        )
    }
   

  return (
    <View style={styles.main}>
        <View style={styles.body}>
        <View style={styles.headerWrapper}>
              <Text style={styles.header}>HELLO, TEACHER {teacher.toUpperCase()}</Text>
            </View>
          <View style = {styles.itemsWrapper}>
            <Item title = "A" target = "attendance"/>
            <Item title = "S" target = "students"/>
            <Item title = "C" target = "classes"/>
            <Item title = "R" target = "reports"/>
          </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1
  },
  mainWrapper: {
    flex: 0,
  },
  body: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  appHeader:{
    flex:0,
    height:"auto",
    width:"93%",
    padding:10
  },
  appTitle:{
    fontSize:18
  },
  title: {
    fontSize: 30,
    color: '#94dff5',
  },
  tittleWrapper: {
    width: '100%',
    marginTop:50,
    height: 80,
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemsWrapper:{
    flex:0,
    justifyContent:'center',
    alignItems:"center",
    flexDirection:"row",
    flexWrap:"wrap",
    width:300,
    height:400,
  },
  item:{
    width:100,
    height:120,
    backgroundColor:"#e8d5c5",
    borderRadius:10,
    flex:0,
    justifyContent:"center",
    alignItems:"center",
    margin:20
  },
  itemTitle:{
    fontSize:60,
    height:66,
    fontWeight:"bold",
    margin:0,
    padding:0,
  },
  
  btnWrapper:{
    width:"90%",
    height:30
  },
  header: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },
  headerWrapper: {
    width: '90%',
    height: 50,
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:30

  },
});
