import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import useStorage from "../helper/useStorage";

export default function Menu({ navigation }) {

  const {save} = useStorage()
  const logout = ()=>{
    save("user_id","")
    navigation.reset({
      index: 0,
      routes: [{ name: 'login' }],
    });    
}
  return (
    <View style={styles.main}>
      <View style={styles.btnView}>
        <Button
          style={styles.btn}
          title="Logout"
          onPress={logout}
          color={"black"}
        />
      </View>
      <View style={styles.btnView}>
        <Button
          style={styles.btn}
          title="Profile"
          color={"black"}
        />
      </View>
      <View style={styles.btnView}>
        <Button
          style={styles.btn}
          title="Settings"
          color={"black"}
        />
      </View>
  
      
      <Text></Text>
    </View>
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
