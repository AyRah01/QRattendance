import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';
import { API_BASE } from '../config';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomBtn from '../components/CustomBtn/CustomBtn';

export default function ScanAttendance({ route, navigation }) {
  const params = route.params;
  const classId = params.classId;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    fetchData(data);
  };
  const fetchData = async (id) => {
    try {
      const classsReq = await axios.post(API_BASE + '/checkAttendace', { id, classId });
      const reqData = classsReq.data;
      console.log(reqData);
      if (reqData.success) {
        const student = reqData.result[0];
        const fullname = `${student.firstname}  ${student.middlename}  ${student.lastname}`;
        Alert.alert('Present', fullname);
      }else if(reqData.code === "duplicate")Alert.alert('Already Checked', 'This student is done checking attendance');
       else Alert.alert('Not Enrolled', 'The student is not enrolled in the current course');
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
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <SafeAreaView style={styles.mainWrapper}>
        <ScrollView>
          <View style={styles.body}>
            <View style={styles.headerWrapper}>
              <Text style={styles.header}>QR ATTENDANCE</Text>
            </View>
            <View style={styles.tittleWrapper}>
              <Text style={styles.title}>ATTENDANCE</Text>
              <Text style = {styles.subTitle}>Make sure the QR code is within the center of the frame.</Text>
            </View>
            <View style={styles.container}>
              <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                height={400} width = {500}
              />
            </View>
            <View style={styles.footer}>
              {scanned && <CustomBtn title="Tap to Scan Again" type="primary" action={() => setScanned(false)} />}
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
  subTitle:{
    fontSize:10,
    color: '#94dff5',
  },
  tittleWrapper: {
    width: '100%',
    height: "auto",
    marginTop:50,
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