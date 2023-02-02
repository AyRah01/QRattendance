import { Alert, BackHandler, Button, Image, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CustomBtn from '../components/CustomBtn/CustomBtn';
import { SafeAreaView } from 'react-native-safe-area-context';
import useStorage from '../helper/useStorage';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors, headerStyle } from './../config';
import LogoWest from './../assets/westlogo.png';
import Sample from './../assets/sample.jpg'
import { LinearGradient } from 'react-native-svg';
import Student from './../assets/icons/students.png'
import Class from './../assets/icons/class.png'
import Reports from './../assets/icons/reports.png'
import Attendance from './../assets/icons/attendance.png';

export default function Home({ navigation }) {
  const { save, getValueFor } = useStorage();

  const [teacher, setTeacher] = useState('');

  React.useEffect(() => {

  }, [navigation]);
  useFocusEffect(
    useCallback(() => {
      getValueFor('teacher').then((val) => setTeacher(val));
      const backActionHandler = () => {
        Alert.alert('Exit?', 'Are you sure you want to close the app?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'YES', onPress: () => (BackHandler !== undefined ? BackHandler.exitApp() : ''()) },
        ]);
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', backActionHandler);

      return () => BackHandler.removeEventListener('hardwareBackPress', backActionHandler);
    }, [navigation]),
  );
  const Item = ({ title, target, icon }) => {
    return (
      <View style={styles.item} onTouchEnd={() => navigation.navigate(target)}>
        <Image source={icon} style = {styles.itemIcon}/>
        <Text style={styles.itemTitle}>{title}</Text>
        <Ionicons name='chevron-forward-outline' size={30} color="white" style={{marginLeft:'auto'}}/>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.main}>
      <View style={headerStyle.appHeader}>
        <View style={headerStyle.logoBox}>
        <Ionicons name='apps-outline' size={30} color = {colors.warning} onPress = {()=>navigation.navigate('menu')} />
       
          <Text style={headerStyle.appTitle}>Dashboard</Text>
        </View>
        <Image source={LogoWest} style={headerStyle.logo} />

      </View>

      <View style={styles.body}>
        <View style={styles.wellcomeBox}>
          <Text style={styles.wellcomeText}>Hi {teacher?.toUpperCase()}</Text>
        </View>
        <View style={styles.itemsWrapper}>
          <Item title="Attendance" icon = {Attendance} target="attendance" />
          <Item title="Students" icon = {Student} target="students" />
          <Item title="Class" icon = {Class} target="classes" />
          <Item title="Reports" icon = {Reports} target="reports" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 10,
  },
  mainWrapper: {
    flex: 0,
  },
  body: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: '#94dff5',
  },
  tittleWrapper: {
    width: '100%',
    marginTop: 50,
    height: 80,
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemsWrapper: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: 400,
  },
  item: {
    width: '90%',
    height: 80,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderRadius: 20,
    marginBottom: 20,
    padding: 20,
    borderTopWidth: 10,
    borderWidth: 0,
    borderRadius: 10,
    borderColor: colors.warning,
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 0,
    padding: 0,
    color: 'white',
  },
  itemIcon:{
    width:40,
    height:40,
    marginRight:10
  },  
  itemsubtitle: {
    color: 'white',
  },
  btnWrapper: {
    width: '90%',
    height: 30,
  },
  header: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },
  wellcomeBox: {
    width: '100%',
    height: 80,
    flex: 0,
    borderColor: colors.warning,
    justifyContent: 'flex-start',
    paddingLeft: 20,
    alignItems: 'flex-start',
    marginBottom: 50,
    marginTop:10,
    borderBottomWidth: 1,
  },
  wellcomeText: {
    textAlign: 'left',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 50,
  },
});
