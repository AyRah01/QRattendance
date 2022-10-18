import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'
import { API_BASE } from '../config'

export default function AddStudent({route, navigation}) {
    const {classId} = route.params
    const [id, setId] = useState("")
    const [firstname, setFirstname] = useState("")
    const [middlename, setMiddlename] = useState("")
    const [lastname, setLastname] = useState("")

    const [yearSection, setYearSec] = useState("")


     const submit = async() => {
        const submitReq = await axios.post(API_BASE+"/AddStudent", {
            id:id,
            firstname:firstname,
            middlename, middlename,
            lastname, lastname,
            yearSection:yearSection,
            classId: classId

        })
        const classReq = submitReq.data

        if(classReq.success){
            Alert.alert("Success","Class is  successfully added")
            navigation.navigate("view-qrcode",{
                studentId : id,
                firstname : firstname,
                middlename : middlename,
                lastname : lastname
             })
        }
        else Alert.alert("Failed","failed while saving class")
     }


  return (
    <View>
      <Text style = {styles.title} >Add Student</Text>
      <Text style = {styles.label}>ID Number</Text>
      <View style = {styles.inputWrapper}>
        <TextInput style = {styles.input} defaultValue = {id} onChangeText = {(e)=>setId(e)}/>
      </View>
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
      <Text style = {styles.label}>Yearh and Section</Text>
      <View style = {styles.inputWrapper}>
        <TextInput style = {styles.input} defaultValue = {yearSection} onChangeText = {(e)=>setYearSec(e)}/>
      </View>
      <Button style = {styles.btn} title='Save Student' onPress={submit}/>
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
        borderRadius:10
    },
    btnWrapper:{
        width:"95%",
        flex:1
    },
    btn:{
        flex:1
    },
    label:{
        margin:10,
    }

})