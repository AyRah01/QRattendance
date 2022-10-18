import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'
import { API_BASE } from '../config'

export default function Login({navigation}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const submit = async() => {
        const loginData = {
            email,password
        }
        console.log("data",loginData)
     
        const loginReq = await axios.post(API_BASE+"/login",{email,password})
        console.log(loginReq.data)

        const resData = loginReq.data
        if(!resData.success)Alert.alert("Login Failed", resData.msg)
        else navigation.navigate('home')
        


    }



  return (
    <View style = {styles.main}>
      <Text style = {styles.title} >Login</Text>
      <View style = {styles.inputWrapper}>
        <TextInput style = {styles.input} defaultValue = {email} onChangeText = {(e)=>setEmail(e)}/>
      </View>
      <View style = {styles.inputWrapper}>
        <TextInput style = {styles.input} defaultValue = {password} onChangeText = {(e)=>setPassword(e)}/>
      </View>
      <View style = {styles.btnWrapper} title = "Login">
      <Button style = {styles.btn} title = "Login" onPress={submit}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    main:{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        height: "100%",

    },
    title:{
        fontSize:60,
        marginBottom:50
    },
    inputWrapper:{
        justifyContent:'flex-start',
        alignItems:'center',
        width:"100%",
        height:50,
        marginBottom:10
    },
    input:{
        borderWidth:1,
        flex:1,
        width:"95%",
        borderRadius:10
    },
    btnWrapper:{
        width:"95%",
        flex:1
    },
    btn:{
        flex:1
    }



})