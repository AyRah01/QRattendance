import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useStorage from "../helper/useStorage";
import HeaderSmall from "./HeaderSmall";
import {API_BASE, colors} from './../config'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import axios from "axios";
export default function ChangePassword({ navigation }) {
    const[currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [retyped, setRetyped] = useState('')
    const [showCurrent, setShowCurrent] = useState(false)
    const [showNew, setShowNew] = useState(false) 

    const {getValueFor} = useStorage()
  const {save} = useStorage()
  const logout = ()=>{
    save("user_id","")
    navigation.reset({
      index: 0,
      routes: [{ name: 'login' }],
    });    
}
const submit = async()=>{
  const accountId = await getValueFor("user_id")

  if(newPassword !== retyped)return Alert.alert("Not Match","Your passwords do not match")
    const changePassReq = await axios.post(API_BASE+"/changePassword",{
      accountId,
      newPassword,
      currentPassword
    })
    if(changePassReq.data.success){Alert.alert("Successful!","Password changed successfully.")
    navigation.goBack()
  }
  else{
     Alert.alert("Wrong Password!","Incorrect current password.")
    }

}
  return (
    <SafeAreaView style={styles.main}>
      <HeaderSmall title='Change Password' navigation = {navigation}/>
      <View style={styles.btnView}>
      <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              defaultValue={currentPassword}
              onChangeText={(e) => setCurrentPassword(e)}
              placeholder={'Current Password:'}
              secureTextEntry = {!showCurrent}
            />
          </View>
          <View style={styles.inputWrapper}>
          <BouncyCheckbox style={styles.checkBox} onPress={()=>setShowCurrent(!showCurrent)} text="Show" isChecked = {showCurrent} size = {20}/>

          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              defaultValue={newPassword}
              onChangeText={(e) => setNewPassword(e)}
              placeholder={'New Password:'}
              secureTextEntry = {!showNew}
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              defaultValue={setRetyped}
              onChangeText={(e) => setRetyped(e)}
              placeholder={'Retype Password:'}
              secureTextEntry = {!showNew}
            />
          </View>
          <View style={styles.inputWrapper}>
          <BouncyCheckbox style={styles.checkBox} onPress={()=>setShowNew(!showNew)} text="Show" isChecked = {showNew} size = {20}/>

          </View>
          <View style={styles.btnWrapper}>
              <Button width={100} color={colors.primary}  title="Submit" outlined={true} onPress = {submit} />
            </View>

      </View>

      
      <Text></Text>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  btnView: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
  },
  inputWrapper: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection:'row',
    width: '100%',
    height: 40,
    marginBottom: 0,
  },
  input: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    flex: 1,
    width: '70%',
    borderRadius: 10,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 10,
  },
  btnWrapper: {
    width: '100%',
    height: 40,
    marginTop: 30,
  },
  btn: {
    flex: 1,
  },
  checkBox:{
    margin:10
  },
  checkBoxText:{
    marginLeft:4,
  },
});
