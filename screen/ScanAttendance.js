import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert, ScrollView, ToastAndroid } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';
import { API_BASE } from '../config';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomBtn from '../components/CustomBtn/CustomBtn';
import {colors} from './../config'
import HeaderSmall from './HeaderSmall';
export default function ScanAttendance({ route, navigation }) {
  const classData = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    if(scanned !== data){
      fetchData(data);
    }
    setScanned(data);
  };
  const fetchData = async (id) => {
    try {
      const classsReq = await axios.post(API_BASE + '/checkAttendace', { id, classId:classData.course_number });
      const reqData = classsReq.data;
      console.log(reqData);
      if (reqData.success) {
        const student = reqData.result[0];
        const fullname = `${student.firstname}  ${student.middlename}  ${student.lastname}`;
        ToastAndroid.show('Attendance recorded for ' + fullname, ToastAndroid.SHORT);
      }else if(reqData.code === 11)ToastAndroid.show('Already Checked', ToastAndroid.SHORT);
       else ToastAndroid.show('This student is not enrolled in the current course',ToastAndroid.SHORT);
    } catch (error) {
      console.log(error);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1}}>
      <SafeAreaView style={styles.mainWrapper}>
        <HeaderSmall title={classData.course_title} subTitle = {classData.course_number} navigation = {navigation}/>
        <ScrollView>
          <View style={styles.body}>
            <View style={styles.header}>
              <Text style={styles.contentTitle}>ATTENDANCE</Text>
              <Text style = {styles.headerTip}>Make sure the QR code is within the center of the frame.</Text>
            </View>
            <View style={styles.container}>
              <BarCodeScanner
                onBarCodeScanned={handleBarCodeScanned}
                height={400} width = {500}
              />
            </View>
            {/* <View style={styles.footer}>
              {scanned && <CustomBtn title="Tap to Scan Again" type="primary" action={() => setScanned(false)} />}
            </View> */}
          </View>
        </ScrollView>
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
    fontSize: 18,
    fontWeight: 'bold',
    color:colors.warning

  },
  subTitle: {
    fontSize: 15,
    color:colors.warning

  },
  tittleWrapper: {
    flex: 0,
    height:"auto",
    width:"100%",
    paddingBottom:10,
    paddingTop:10,
    borderBottomColor:colors.warning,
    borderBottomWidth:10,
    justifyContent: 'center',
  },
  contentTitle:{
    fontSize: 29,
    fontWeight: 'bold',
    marginBottom:30
  },

  header: {
    flex:0,
    alignItems:"center",
    width:"80%"
  },
  headerTip:{
    textAlign:'center'
  },

  scrollList: {
    flex: 1,
  },
  container:{
    width:"100%",
    height:"auto",
    marginTop:30,
    flex:0,
    justifyContent:"center",
    alignItems:"center"
  },
  footer: {
    height: 50,
    width: '90%',
  },
});