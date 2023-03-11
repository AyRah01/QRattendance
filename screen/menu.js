import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useStorage from "../helper/useStorage";
import HeaderSmall from "./HeaderSmall";
import {colors} from '../config'

export default function Menu({ navigation }) {

  const {save} = useStorage()
  const logout = ()=>{
    save("user_id","")
    navigation.reset({
      index: 0,
      routes: [{ name: 'login' }],
    });    
}
const MyButton = ({title, icon, action}) => {
  return(
    <TouchableOpacity>
    <View style={{
      flex:0,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      height:'auto',
      width:'100%',
      padding:10,
      borderBottomWidth:1,
      borderColor:colors.primary
    }} onTouchEnd = {action}>
      <Text style ={{color:colors.primary, fontSize:18}}>{title}</Text>
      <Ionicons name={icon} size={30} color={colors.primary}/>
    </View>
    </TouchableOpacity>
  )
}
  return (
    <SafeAreaView style={styles.main}>
      <HeaderSmall title='Menu' navigation = {navigation}/>
      <View style={styles.btnView}>
        <MyButton title='About Us' icon={'information-circle-outline'} action = {()=>navigation.navigate('aboutUs')}/>
        <MyButton title='Change Password' icon='key-outline' action={()=>navigation.navigate('changePassword')}/>
        <MyButton title='Logout' icon={'log-out-outline'} action={logout}/>

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

});
