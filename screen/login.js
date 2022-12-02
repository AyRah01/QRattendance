import { Alert, Button, Image, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CustomBtn from '../components/CustomBtn/CustomBtn';
import { SafeAreaView } from 'react-native-safe-area-context';
import useStorage from '../helper/useStorage';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {save} = useStorage()

  const submit = async () => {
    const loginData = {
      email,
      password,
    };
    console.log('data', loginData);

    const loginReq = await axios.post(API_BASE + '/login', { email, password });
    console.log(loginReq.data);

    const resData = loginReq.data;
    if (!resData.success) Alert.alert('Login Failed', resData.msg);
    else {
      await save('user_id',resData.data.email)
      await save('teacher', resData.data.firstname)
      navigation.navigate('home');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <SafeAreaView style={styles.mainWrapper}>
        <View style={styles.body}>
          <Image
            style={{ width: 200, height: 200, marginBottom: 15, marginTop: 100 }}
            source={require('./../assets/logo1.png')}
          />

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
              secureTextEntry={true}
              defaultValue={password}
              onChangeText={(e) => setPassword(e)}
              placeholder={'Password:'}
              placeholderTextColor="#e8d5c5"
            />
          </View>
          <View style={styles.btnWrapper}>
            <CustomBtn width={100} height={20} title="Login" action={submit} />
          </View>
        <View style = {styles.hr}></View>
          <View style={styles.btnWrapper}>
              <CustomBtn width={100} height={20} title="Register" outlined={true} action = {()=>navigation.navigate("register")} />
            </View>
            <View style={styles.signup} >
            <Text style={styles.text}>Don't have an account?</Text>
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
    fontSize: 60,
    marginBottom: 50,
    color: '#FFF',
  },
  inputWrapper: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: 40,
    marginBottom: 0,
  },
  input: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    flex: 1,
    width: '70%',
    borderRadius: 10,
    borderColor: '#e8d5c5',
    color: '#e8d5c5',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 10,
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
  hr:{
    marginTop:100,
    width:"95%",
    height:1,
    // borderTopWidth:1,
    borderColor:"#e8d5c5",
    backgroundColor:"#e8d5c5"
  }
});
