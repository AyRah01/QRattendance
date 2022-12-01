import { Alert, Button, Image, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CustomBtn from '../components/CustomBtn/CustomBtn';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setfirstname] = useState("")
  const [middlename, setMiddlename] = useState("")
  const [lastname, setLastname] = useState("")
  const [confirmpass, setConfirmpass] = useState("")

  const submit = async () => {
    if(!(firstname && middlename && lastname && email && password && confirmpass))return Alert.alert("Form is incomplete", "Please fill out the form before submitting.")
    if(confirmpass !== password)return Alert.alert("Password does not match", "Please enter your password correctly")

    const loginReq = await axios.post(API_BASE + '/register', { email, password,firstname, middlename, lastname });

    const resData = loginReq.data;
    if (!resData.success) Alert.alert('Registration Failed', resData.msg);
    else navigation.navigate('login');
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <SafeAreaView style={styles.mainWrapper}>
        <View style={styles.body}>
          <Image
            style={{ width: 200, height: 130, marginBottom: 0, marginTop: 60 }}
            source={require('./../assets/logo1.png')}
          />
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              defaultValue={firstname}
              onChangeText={(e) => setfirstname(e)}
              placeholder={'Firstname:'}
              placeholderTextColor="#e8d5c5"
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              defaultValue={middlename}
              onChangeText={(e) => setMiddlename(e)}
              placeholder={'Middlename:'}
              placeholderTextColor="#e8d5c5"
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              defaultValue={lastname}
              onChangeText={(e) => setLastname(e)}
              placeholder={'Lastname:'}
              placeholderTextColor="#e8d5c5"
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              defaultValue={email}
              onChangeText={(e) => setEmail(e)}
              placeholder={'Username:'}
              placeholderTextColor="#e8d5c5"
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              defaultValue={password}
              secureTextEntry={true}
              onChangeText={(e) => setPassword(e)}
              placeholder={'Password:'}
              placeholderTextColor="#e8d5c5"
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              defaultValue={confirmpass}
              secureTextEntry={true}
              onChangeText={(e) => setConfirmpass(e)}
              placeholder={'Confirm Password:'}
              placeholderTextColor="#e8d5c5"
            />
          </View>
          <View style={styles.btnWrapper}>
            <CustomBtn width={100} height={20} title="Register" action={submit} />
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
    backgroundColor: '#000104',
  },
  title: {
    fontSize: 60,
    marginBottom: 50,
    color: '#FFF',
  },
  inputWrapper: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: 50,
    marginBottom: 0,
  },
  input: {
    borderBottomWidth: 1,
    flex: 1,
    width: '70%',
    borderRadius: 10,
    borderColor: '#e8d5c5',
    color: '#e8d5c5',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 25,
  },
  btnWrapper: {
    width: '70%',
    height: 30,
    marginTop: 30,
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
