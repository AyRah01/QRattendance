import { StyleSheet, Text, View } from 'react-native'
import React, { Component, useEffect } from 'react'
import {colors} from './../config'
import { Ionicons } from '@expo/vector-icons'

export default function HeaderSmall({title, subTitle, navigation, Component, payload}) {
    useEffect(()=>{
        console.log("class data",payload)
    },[])
    return (
        <View style={styles.headerWrapper}>
            <Ionicons name='arrow-back-outline' size={30} color = {colors.warning} onPress = {()=>navigation.goBack()}/>
        <View style ={styles.titleWrapper}>
        <Text style={styles.title}>{title.toUpperCase()}</Text>
        {subTitle?(<Text style={styles.subTitle}>
          {subTitle}
        </Text>):""}
        </View>
        {Component?<Component pyload = {payload}/>:""}
      </View>
    )
}
const styles = StyleSheet.create({
    headerWrapper: {
        width: '100%',
        height: 'auto',
        flex: 0,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection:'row',
        backgroundColor:colors.primary,
        padding:10,
        borderBottomColor:colors.warning,
        borderBottomWidth:10,
        marginBottom:10,
      },
      titleWrapper:{
        flex: 0,
        paddingLeft:10,
        justifyContent: 'flex-start',
        marginRight:'auto',
        alignItems: 'flex-start',
        backgroundColor:colors.primary,
        paddingTop:5,
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        color:colors.warning
    
      },
      subTitle: {
        fontSize: 15,
        color:colors.warning
    
      },
})