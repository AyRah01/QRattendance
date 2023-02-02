import { View, Text, Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import LogoWest from './../assets/westlogo.png';
import {headerStyle, colors} from './../config'
export default function Header({title, navigation}) {
  return (
    <View style={headerStyle.appHeader}>
        <View style={headerStyle.logoBox}>
        <Ionicons name='arrow-back-outline' size={40} color = {colors.warning} onTouchEnd = {()=>navigation.goBack()}/>
          <Text style={headerStyle.appTitle}>{title}</Text>
        </View>
        <Image source={LogoWest} style={headerStyle.logo} />
      </View>
  )
}