import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function CustomBtn({title, height, width, action, outlined, type}) {
  
  return (
    <View style = {outlined?styles.outlined:type==="primary"?styles.primary:styles.secondary}
    onTouchEnd = {action}>
      <Text style={{
        fontWeight:"bold",
        color:outlined?"#e8d5c5":""
      }}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  outlined:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    height:30,
    color:"#e8d5c5",
    borderRadius : 3,
    backgroundColor:"transparent",
    borderWidth:1,
    borderColor:"#e8d5c5",

  },
  primary:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    height:30,
    backgroundColor:"#94dff5",
    borderRadius : 3,
  },
  secondary:{
    color:"#000104",
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    height:30,
    backgroundColor:"#e8d5c5",
    borderRadius : 3,
  }
})

