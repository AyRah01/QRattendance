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
      navigation.reset({
        index: 0,
        routes: [{ name: 'home' }],
      });
    }
  };

  return (
    <View style={{ flex: 1}}>
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
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              defaultValue={password}
              onChangeText={(e) => setPassword(e)}
              placeholder={'Password:'}
            />
          </View>
          <View style={styles.btnWrapper}>
            <CustomBtn width={100} height={20} title="Login" action={submit} />
          </View>
        <View style = {styles.hr}></View>
          <View style={styles.btnWrapper}>
              <Button width={100} color="black" title="Register" outlined={true} onPress = {()=>navigation.navigate("register")} />
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
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 10,
  },
  btnWrapper: {
    width: '70%',
    height: 40,
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
