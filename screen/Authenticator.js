import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import useStorage from '../helper/useStorage';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function Classgen({navigation, account}) {
  const {getValueFor,save} = useStorage()
    useFocusEffect(useCallback(()=>{
      const auth = async()=>{
        const accountId = await getValueFor("user_id")
      console.log("User ID",accountId)
        if(accountId)navigation.reset({
          index: 0,
          routes: [{ name: 'home' }],
        });
        else navigation.navigate("login")
      }
      setTimeout(auth, 3000)
    },[navigation]));
  


    return (
      <View style={{ flex: 1}}>
        <SafeAreaView style={styles.mainWrapper}>
          <View style={styles.body}>
          <Image
            style={{ width: 300, height: 200, marginTop: 100 }}
            source={require('./../assets/logo1.png')}
          />
          <Text style = {styles.title}>Mobile Based Class Attendance Monitoring System Via QR Code</Text>
          </View>
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
      fontSize: 20,
      width:"100%",
      paddingLeft:40,
      paddingRight:40,
      height:200,
      textAlign:"center"
    },
  });
  