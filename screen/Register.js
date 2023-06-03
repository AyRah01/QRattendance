import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';
import BouncyCheckbox from "react-native-bouncy-checkbox";

import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CustomBtn from '../components/CustomBtn/CustomBtn';
import { SafeAreaView } from 'react-native-safe-area-context';
import {colors} from './../config'
export default function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setfirstname] = useState("")
  const [middlename, setMiddlename] = useState("")
  const [lastname, setLastname] = useState("")
  const [confirmpass, setConfirmpass] = useState("")
  const [showPassword, setShowPassword] = useState(false)


  const submit = async () => {
    if(!(firstname && middlename && lastname && email && password && confirmpass))return Alert.alert("Form is incomplete", "Please fill out the form before submitting.")
    if(confirmpass !== password)return Alert.alert("Password does not match", "Please enter your password correctly")

    const loginReq = await axios.post(API_BASE + '/register', { email, password,firstname, middlename, lastname });

    const resData = loginReq.data;
    if (!resData.success) Alert.alert('Registration Failed', resData.msg);
    else navigation.navigate('login');
  };
  const veririfyInput = (e) => {
    var hasNumber = /\d/;
                  var hasSpecial = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;
                  if(!hasNumber.test(e) && !hasSpecial.test(e)){
                    return true

                  }else{
                    Alert.alert("Invalid Input","Numbers are not allowed in this field")
                  }
                  return false
  }
  return (
      <SafeAreaView style={styles.mainWrapper}>
        <ScrollView>
        <View style={styles.body}>
          <Image
            style={{ width: 300, height: 300, marginBottom: 0 }}
            source={require('./../assets/logo1.png')}
          />
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              defaultValue={firstname}
              onChangeText={(e) => {
                if(veririfyInput(e)){
                  setfirstname(e)
                }else{
                  setfirstname("")
                }
              }}
              placeholder={'Firstname:'}
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              defaultValue={middlename}
              onChangeText={(e) => {
                if(veririfyInput(e)){
                  setMiddlename(e)
                }else{
                  setMiddlename("")
                }
              }}
              placeholder={'Middlename:'}
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              defaultValue={lastname}
              onChangeText={(e) => {
                if(veririfyInput(e)){
                  setLastname(e)
                }else{
                  setLastname("")
                }
              }}
              placeholder={'Lastname:'}
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              defaultValue={email}
              onChangeText={(e) => setEmail(e)}
              placeholder={'Username:'}
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              defaultValue={password}
              secureTextEntry={!showPassword}
              onChangeText={(e) => setPassword(e)}
              placeholder={'Password:'}
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              defaultValue={confirmpass}
              secureTextEntry={!showPassword}
              onChangeText={(e) => setConfirmpass(e)}
              placeholder={'Confirm Password:'}
            />
          </View>
          <View style={styles.inputWrapper}>
          <BouncyCheckbox style={styles.checkBox} onPress={()=>setShowPassword(!showPassword)} text="Show Password" isChecked = {showPassword} size = {20}/>

          </View>
          <View style={styles.btnWrapper}>
            <Button color={colors.primary} title = "Register" onPress={submit}/>
          </View>
        </View>
        </ScrollView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
  },
  body: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 60,
    marginBottom: 50,
    color: '#FFF',
  },
  inputWrapper: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection:'row',
    width: '80%',
    height: 40,
    marginBottom: 0,
  },
  input: {
    borderBottomWidth: 1,
    flex: 1,
    width: '70%',
    borderRadius: 10,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 25,
  },
  btnWrapper: {
    width: '70%',
    height: "auto",
    marginTop: 20,
  },
  btn: {
    flex: 1,
  },
  footerForm: {
    flex: 1,
    backgroundColor: 'red',
  },
  signup: {
    width: '70%',
    height: 30,
  },
  text: {
    color: '#e8d5c5',
  },
  hr: {
    marginTop: 100,
    width: '95%',
    height: 1,
    // borderTopWidth:1,
    borderColor: '#e8d5c5',
    backgroundColor: '#e8d5c5',
  },
});
