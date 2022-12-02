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

export default function Home({ navigation }) {
    const {save, getValueFor} = useStorage()
   
    const [teacher, setTeacher] = useState('')
    useFocusEffect(useCallback(()=>{
      
      getValueFor('teacher').then((val)=>setTeacher(val))
      const backActionHandler = () => {
        Alert.alert("Alert!", "Are you sure you want to go back?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => BackHandler?.exitApp()
          () }
        ]);
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress", backActionHandler);

    return () =>
      // clear/remove event listener
      BackHandler.removeEventListener("hardwareBackPress", backActionHandler);
    },[navigation]))

    const logout = ()=>{
        save("user_id","")
        navigation.navigate("login")
    }
    const Item = ({title, target}) => {
        return(
            <View style = {styles.item} onTouchEnd = {()=>navigation.navigate(target)}>
                <Text style = {styles.itemTitle}>{title}</Text>
                <Text style = {styles.itemsubtitle}>{target}</Text>
            </View>
        )
    }
   

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <SafeAreaView style={styles.mainWrapper}>
        <View style={styles.body}>
        <View style={styles.headerWrapper}>
              <Text style={styles.header}>HELLO TEACHER {teacher.toUpperCase()}</Text>
            </View>
          <View style={styles.tittleWrapper}>
            <Text style={styles.title}>HOME</Text>
          </View>
          <View style = {styles.itemsWrapper}>
            <Item title = "A" target = "attendance"/>
            <Item title = "S" target = "students"/>
            <Item title = "C" target = "classes"/>
            <Item title = "R" target = "reports"/>
          </View>
          <View style = {styles.btnWrapper}>
            <CustomBtn title="Logout" action={logout}/>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 0,
    backgroundColor: 'white',
  },
  body: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#0b172a',
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
    width: '100%',
    height: 50,
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8d5c5',
  },
});
