import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'
import { API_BASE } from '../config'

export default function StudentInformation({route, navigation}) {
    const {data} = route.params
    const [id, setId] = useState(data.student_id)
    const [firstname, setFirstname] = useState(data.firstname)
    const [middlename, setMiddlename] = useState(data.middlename)
    const [lastname, setLastname] = useState(data.lastname)
    const [yearSection, setYearSec] = useState(data.year_section)

  return (
    <View>
      <Text style = {styles.title} >Student Information</Text>
      <Text style = {styles.label}>ID Number</Text>
      <View style = {styles.inputWrapper}>
        <TextInput selectTextOnFocus = {false} editable = {false} style = {styles.input} defaultValue = {id} />
      </View>
      <Text style = {styles.label}>Firstname</Text>
      <View style = {styles.inputWrapper}>
        <TextInput selectTextOnFocus = {false} editable = {false} style = {styles.input} defaultValue = {firstname} />
      </View>
      <Text style = {styles.label}>Middlename</Text>
      <View style = {styles.inputWrapper}>
        <TextInput selectTextOnFocus = {false} editable = {false} style = {styles.input} defaultValue = {middlename} />
      </View>
      <Text style = {styles.label}>Lastname</Text>
      <View style = {styles.inputWrapper}>
        <TextInput selectTextOnFocus = {false} editable = {false} style = {styles.input} defaultValue = {lastname} />
      </View>
      <Text style = {styles.label}>Yearh and Section</Text>
      <View style = {styles.inputWrapper}>
        <TextInput selectTextOnFocus = {false} editable = {false} style = {styles.input} defaultValue = {yearSection} />
      </View>
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
        borderRadius:5,
        fontSize:20,
        padding:10,
        fontWeight:'bold'
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
        fontSize:20
    }

})