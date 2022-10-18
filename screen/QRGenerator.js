'use strict';
 
import React, { Component, useEffect, useState } from 'react'
import QRCode from 'react-native-qrcode-generator';
 
import {
    AppRegistry,
    StyleSheet,
    View,
    TextInput,
    Text
} from 'react-native';

const QRGenerator = ({route, navigation}) => {
     const { studentId, firstname, middlename, lastname, yearSection } = route.params;
    
     useEffect(()=>{
        console.log(route.params)
     },[])
    // const studentId = "cc-19-365"
    // const firstname = "Emmanuel"
    // const middlename = "Despi"
    // const lastname = "Katipunan"
    // const yearSection = "4A"
    return (
        <View style={styles.container}>
          <View>
          <Text style = {styles.name}>Fistname: {firstname}</Text>
          <Text style = {styles.name}>Middlename :{middlename}</Text>
          <Text style = {styles.name}>Lastname :{lastname}</Text>
          
          </View>
          <QRCode
            value={studentId}
            size={200}
            bgColor='black'
            fgColor='white'/>
        </View>
      );
}

export default QRGenerator

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
 
    name: {
        height: 40,
        margin: 10,
        borderRadius: 5,
        padding: 5,
        fontSize:30
    }
})