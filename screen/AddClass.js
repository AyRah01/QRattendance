import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'
import { API_BASE } from '../config'

export default function AddClass({navigation}) {
    const [cTitle, setCTitle] = useState("")
    const [cNumber, setCNumber] = useState("")
    const [firstname, setFirstname] = useState("")
    const [middlename, setMiddlename] = useState("")
    const [lastname, setLastname] = useState("")

     const submit = async() => {
        const submitReq = await axios.post(API_BASE+"/addClass", {
            courseNum:cNumber,
            courseTitle:cTitle,
            firstname:firstname,
            middlename:middlename,
            lastname:lastname
        })
        const classReq = submitReq.data

        if(classReq.success){
            Alert.alert("Success","Class is  successfully added")
            navigation.navigate("home")
        }
        else Alert.alert("Failed","failed while saving class")
     }


  return (
    <View>
      <Text style = {styles.title} >Add Class</Text>
      <Text style = {styles.label}>Course Number</Text>
      <View style = {styles.inputWrapper}>
        <TextInput style = {styles.input} defaultValue = {cTitle} onChangeText = {(e)=>setCTitle(e)}/>
      </View>
      <Text style = {styles.label}>Course Title</Text>
      <View style = {styles.inputWrapper}>
        <TextInput style = {styles.input} defaultValue = {cNumber} onChangeText = {(e)=>setCNumber(e)}/>
      </View>
      <Text style = {styles.portion}>Instructor</Text>
      <Text style = {styles.label}>Firstname</Text>
      <View style = {styles.inputWrapper}>
        <TextInput style = {styles.input} defaultValue = {firstname} onChangeText = {(e)=>setFirstname(e)}/>
      </View>
      <Text style = {styles.label}>Middlename</Text>
      <View style = {styles.inputWrapper}>
        <TextInput style = {styles.input} defaultValue = {middlename} onChangeText = {(e)=>setMiddlename(e)}/>
      </View>
      <Text style = {styles.label}>Lastname</Text>
      <View style = {styles.inputWrapper}>
        <TextInput style = {styles.input} defaultValue = {lastname} onChangeText = {(e)=>setLastname(e)}/>
      </View>
      <Button style = {styles.btn} title='Save Class' onPress={submit}/>
    </View>
  )
}

const styles = StyleSheet.create({

    btnWrapper:{
        width:"99%"
    },
    btn:{
        width:"99%"
    },
    main:{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        height: "100%",

    },
    title:{
        fontSize:50,
        marginBottom:50,
        margin:10
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
        borderRadius:10,
        fontSize:30,
        padding:10
    },
    btnWrapper:{
        width:"95%",
        flex:1
    },
    btn:{
        flex:1
    },
    portion:{
        fontWeight:'bold',
        margin:10,
        fontSize:30,

    },
    label:{
        margin:10,
        fontSize:20
    }

})