import react from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, StyleSheet, ScrollView, StatusBar, Text, View, Button } from 'react-native';

import Home from './screen/Home';
import Menu from './screen/menu';
import Attendance from './screen/Attendance';
import AttendanceDetails from './screen/AttendanceDetails';
import Students from './screen/Students';
import Enroll from './screen/Enroll';
import Authenticator from './screen/Authenticator';
import Report from './screen/report';
import Login from './screen/login';
import AddClass from './screen/AddClass';
import ClassView from './screen/ClassView';
import AddStudent from './screen/AddStudent';
import QRGenerator from './screen/QRGenerator';
import ScanAttendance from './screen/ScanAttendance';
import StudentInformation from './screen/StudentInformation';
import AttendanceReport from './screen/AttendanceReport';
import Register from './screen/Register';
import Classes from './screen/Classes';
import SaveQr from './screen/SaveQr';

const Stack = createNativeStackNavigator();
const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={'authenticator'
        
      }
      >
        <Stack.Screen name="authenticator" component={Authenticator} />
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="addClass"  component={AddClass}/>


        <Stack.Screen name="menu" component={Menu} />
        <Stack.Screen name="attendance" component={Attendance} />
        <Stack.Screen name='attendance-details' component={AttendanceDetails}/>
        <Stack.Screen name='students' component={Students}/>
        <Stack.Screen name='enroll-student' component={Enroll}/>
        <Stack.Screen name="classes" component={Classes} />
        <Stack.Screen name="report" component={Report} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name='register' component={Register}/>
        <Stack.Screen name="view-class" component={ClassView} />
        <Stack.Screen name="add-student" component={AddStudent} />
        <Stack.Screen name = "view-qrcode" component={QRGenerator}/>
        <Stack.Screen name="save-qr" component={SaveQr} />
        <Stack.Screen name = "check-attendance" component={ScanAttendance}/>
        <Stack.Screen name = "view-attendance" component={AttendanceReport}/>
        <Stack.Screen name='student-details' component={StudentInformation}/>



      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
