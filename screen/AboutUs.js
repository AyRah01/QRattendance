import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from './Header';
import appLogo from './../assets/logo1.png';
import { colors } from './../config';
import HeaderSmall from './HeaderSmall';
import { Ionicons } from '@expo/vector-icons';
export default function AboutUs({ navigation }) {


    const TextItem = ({title, content}) => {
        return(
            <View style={styles.textListBox}>
          <Text style={styles.textLists}>{title} </Text>
          <Text style={styles.textLists}>{content}</Text>
        </View>
        )
    }
  return (
    <SafeAreaView style={styles.main}>
      <HeaderSmall title="About Us" navigation={navigation} />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}
      >
        <Image
          source={appLogo}
          style={{
            width: 300,
            height: 300,
            marginTop: 20,
          }}
        />
        <Text
          style={{
            margin: 10,
            textAlign: 'center',
            color: '#838485',
            justifyContent: 'space-evenly',
            lineHeight: 17,
            fontSize: 15,
            paddingLeft: 5,
            paddingRight: 5,
          }}
        >A system that automates the traditional or conventional way of monitoring class attendance through mobile
          devices using QR Code.
        </Text>
        <TextItem title={'1.'} content = 'Can monitor class attendance fast and easily through the use of QR Code'/>
        <TextItem title={'2.'} content = 'Can register student information accurately'/>
        <TextItem title={'3.'} content = 'To provide information security and authenticity'/>


        <View style = {{
            marginTop:'auto',
            marginBottom:30
        }}>
        <View style = {styles.contactBox}>
            <Ionicons name='call' size={20} color ="#838485"/>
            <Text style = {styles.textLists}>+639811558457</Text>
        </View>
        <View style = {styles.contactBox}>
            <Ionicons name='mail' size={20} color ="#838485"/>
            <Text style = {styles.textLists}>camviaqrcode@gmail.com</Text>
        </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  btnView: {
    width: '100%',
    padding: 10,
    borderRadius: 10,
  },
  textLists: {
    color: '#838485',
    lineHeight: 17,
    fontSize: 15,
  },
  textListBox: {
    flex: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems:'flex-start',
    paddingRight:20,
    paddingLeft:20,
    margin:5
  },
  contactBox:{
    flex:0,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    margin:10
  }
});
