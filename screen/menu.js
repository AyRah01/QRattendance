import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

export default function Menu({ navigation }) {
  return (
    <View style={styles.main}>
      <View style={styles.btnView}>
        <Button
          style={styles.btn}
          title="Attendance"
          onPress={() => navigation.navigate("attendance")}
        />
      </View>
      <View style={styles.btnView}>
        <Button
          style={styles.btn}
          title="Student"
          onPress={() => navigation.navigate("student")}
        />
      </View>
      <View style={styles.btnView}>
        <Button
          style={styles.btn}
          title="Subject"
          onPress={() => navigation.navigate("subject")}
        />
      </View>
      <View style={styles.btnView}>
        <Button
          style={styles.btn}
          title="Class"
          onPress={() => navigation.navigate("classgen")}
        />
      </View>
      <View style={styles.btnView}>
        <Button
          style={styles.btn}
          title="Report"
          onPress={() => navigation.navigate("report")}
        />
      </View>
      
      <Text></Text>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  btnView: {
    width: "100%",
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  btn:{
    backgroundColor:"not yet change",
    
  }

});
