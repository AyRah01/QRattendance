import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TextInput,
  Button,
  Alert,
  ToastAndroid,
  PermissionsAndroid,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomBtn from '../components/CustomBtn/CustomBtn';
import * as MediaLibrary from 'expo-media-library';

import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';
import expoCameraroll from 'expo-cameraroll';
import { Ionicons } from '@expo/vector-icons';

export default function SaveQr({ route, navigation }) {
  const { data } = route.params;
  const viewshot = useRef();

  const [qrRef, setQrRef] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <View style={{backgroundColor:"#3464f4",flex:0,flexDirection:'row',alignItems:"center",padding:5, borderRadius:5}} onTouchEnd={saveQrCode}>
        <Text style={{color:"white", fontWeight:"bold"}}>DOWNLOAD</Text>
        <Ionicons name="arrow-down" size={20} color="white"  />
      </View>,
    });
  }, []);

  const saveQrCode = async () => {
    const uri = await viewshot.current.capture();
    const granted = await hasAndroidPermission();
    if (!granted) {
      return;
    }
    const image = await expoCameraroll.save(uri, 'jpg');
    if (image) {
      Alert.alert('Image saved', 'Successfully saved image to your gallery.', [{ text: 'OK', onPress: () => {navigation.goBack()} }], {
        cancelable: false,
        
      });
    }
  };
  async function hasAndroidPermission() {
    const permitted = await MediaLibrary.getPermissionsAsync();

    if (permitted.status === 'granted') return true;

    const perms = await MediaLibrary.requestPermissionsAsync();
    if (perms.status !== 'granted') return false;
    return true;
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <SafeAreaView style={styles.mainWrapper}>
        <ScrollView>
          <View style={styles.body}>
            <View style={styles.tittleWrapper}></View>
            <ViewShot ref={viewshot} options={{ format: 'jpg', quality: 0.9 }} style={styles.viewshot}>
              <View style={styles.detailsWrapper}>
                <View style={styles.qrContainer}>
                  <QRCode value={data.student_id} size={200} />
                </View>
                <Text style={styles.info}>{data.student_id.toUpperCase()}</Text>
                <Text style={styles.info}>
                  {data.lastname.toUpperCase() +
                    ', ' +
                    data.firstname.toUpperCase() +
                    ' ' +
                    data.middlename.substring(0, 1).toUpperCase()}
                </Text>
                {data.gender? (<Text style={styles.info}>{data.gender?.toUpperCase()}</Text>):''}
                {data.type === 'irregular'?(
                  <Text style={styles.info}>{data.course} </Text>
                ):(<Text style={styles.info}>{data.course + ' ' + data.year + ' ' + data.section} </Text>)}
              </View>
            </ViewShot>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  body: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 30,
    color: 'black',
  },
  tittleWrapper: {
    width: '100%',
    height: 70,
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  viewshot: {
    width: '100%',
    backgroundColor: 'white',
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
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
  info: {
    flex: 1,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    margin: 0,
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
