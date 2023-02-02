import {
  Alert,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CustomBtn from '../components/CustomBtn/CustomBtn';
import { SafeAreaView } from 'react-native-safe-area-context';
import useStorage from '../helper/useStorage';
import { Ionicons } from '@expo/vector-icons';
import { colors } from './../config';
import Header from './Header';
export default function SelectClass({ navigation, route }) {
  const { getValueFor } = useStorage();
  const [classes, setClasses] = useState([]);
  const subjectData = route.params.classData;

  useEffect(() => {
    const reqClasses = async () => {
      const email = await getValueFor('user_id');
      const classsReq = await axios.get(API_BASE + '/getClasses/' + email + '/' + subjectData.course_number);

      const classesData = classsReq.data;
      setClasses(classesData);
      console.log(classesData);
    };
    reqClasses();
  }, []);

  const Item = ({ data, target }) => {
    return (
      <TouchableOpacity style={{ width: '100%' }}>
        <View
          style={styles.item}
          onTouchEnd={() => navigation.navigate('view-reports', { classData: data, subjectData: subjectData })}
        >
          <Text style={styles.itemTitle}>{data.yearsection.toUpperCase()}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.mainWrapper}>
      <Header title="Reports" navigation={navigation} />
      <View style={styles.titleBox}>
        <Text style={styles.title}>Choose a Subject </Text>
      </View>
      {/* <ScrollView>
          <View style={styles.body}>
            <View style={styles.itemsWrapper}>
              {classes.map((data, idx) => (
                <Item data={data} key={idx} />
              ))}
            </View>
          </View>
        </ScrollView> */}
      <ScrollView>
        <View style={styles.body}>
          <View style={styles.itemsWrapper}>
            {classes.map((data, idx) => (
              <Item data={data} key={idx} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
  },
  body: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  titleBox: {
    width: '100%',
    height: 60,
    flex: 0,
    backgroundColor: colors.primary,
    borderColor: colors.warning,
    justifyContent: 'flex-start',
    paddingLeft: 20,
    paddingBottom: 10,
    alignItems: 'flex-start',
    marginBottom: 20,
    borderBottomWidth: 10,
  },
  title: {
    textAlign: 'left',
    color: 'white',
    fontSize: 20,
    marginTop: 'auto',
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
  },
  scrollList: {
    flex: 1,
  },
  itemsWrapper: {
    padding:10,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
  },
  item: {
    width: '100%',
    height: 60,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderRadius: 20,
    marginBottom: 20,
    padding: 20,
    borderWidth: 0,
    borderRadius: 5,
    borderColor: colors.warning,
  },
  itemTitle: {
    fontSize: 15,
    margin: 0,
    padding: 0,
    color: 'white',
  },
  itemIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  footer: {
    height: 'auto',
    width: '90%',
  },
});
