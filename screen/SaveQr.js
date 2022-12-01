import { StyleSheet, Text, ScrollView, View, TextInput, Button, Alert, ToastAndroid, PermissionsAndroid } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomBtn from '../components/CustomBtn/CustomBtn';

import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';
import expoCameraroll from 'expo-cameraroll';

export default function SaveQr({ route, navigation }) {
  const { data } = route.params;
  const viewshot = useRef()

  const [qrRef, setQrRef] = useState(null);


  const saveQrCode = async () => {
    const uri = await viewshot.current.capture()
    if (Platform.OS === 'android') {
        const granted = await hasAndroidPermission();
        if (!granted) {
            return;
        }
    }
    const image = expoCameraroll.save(uri,"jpg");
    if (image) {
          Alert.alert('Image saved', 'Successfully saved image to your gallery.',
              [{text: 'OK', onPress: () => {}}],
              {cancelable: false},
          );
    }
  };
  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
  
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }
  
    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <SafeAreaView style={styles.mainWrapper}>
        <ScrollView>
          <View style={styles.body}>
            <View style={styles.headerWrapper}>
              <Text style={styles.header}>QR ATTENDANCE</Text>
            </View>
            <View style={styles.tittleWrapper}></View>
            <ViewShot ref={viewshot} options={{ format: "jpg", quality: 0.9 }} style = {{width:"100%"}}>
            <View style={styles.detailsWrapper}>
              <View style={styles.qrContainer}>
                <QRCode value="Just some string value" getRef={(c) => setQrRef(c)} size={200} />
              </View>
              <Text style = {styles.info}>
                {
                data.lastname.toUpperCase()+ ", "+ 
                data.firstname.toUpperCase()+ " "+
                data.middlename.substring(0,1).toUpperCase()+ ". "+
                data.gender.toUpperCase()+ ", "+
                data.student_id.toUpperCase() + ", "+
                data.year_section.toUpperCase()}</Text>
            </View>
            </ViewShot>
            <View style={styles.btnWrapper}>
                <CustomBtn title="Save" type={'primary'} action={saveQrCode} />
              </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  mainWrapper: {
    flex: 0,
    backgroundColor: 'white',
  },
  body: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#000104',
  },
  title: {
    fontSize: 30,
    color: '#94dff5',
  },
  tittleWrapper: {
    width: '100%',
    height: 70,
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },
  headerWrapper: {
    width: '100%',
    height: 50,
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8d5c5',
  },
    detailsWrapper: {
    flex: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
  },
  info:{
    flex:1,
    color:"#e8d5c5",
    fontWeight:"bold",
    fontSize:20,
    width:"90%",
    textAlign:"center",
    margin:10
  },
  qrContainer: {
    width: 'auto',
    height: 'auto',
    padding: 10,
    borderColor: 'white',
    marginTop: 50,
  },
  btnWrapper: {
    width: 100,
    margin: 10,
  },
});
