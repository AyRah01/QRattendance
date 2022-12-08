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
import Report from './screen/Reports';
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
import ReportDetails from './screen/ReportsDetails';
import SelectClass from './screen/SelectClass';

const Stack = createNativeStackNavigator();
const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'authenticator'
        
      }
      >
        <Stack.Screen name="authenticator" component={Authenticator} options={{headerShown:false}} />
        <Stack.Screen name="home" component={Home} options={{title:"Attendance Monitoring"}} />
        <Stack.Screen name="addClass"  component={AddClass} options={{title:"Add Class"}}/>

        <Stack.Screen name="menu" component={Menu} options={{title:"Menu"}} />
        <Stack.Screen name="attendance" component={Attendance} />
        <Stack.Screen name='attendance-details' component={AttendanceDetails} options={{title:"Attendace Record"}}/>
        <Stack.Screen name='students' component={Students}/>
        <Stack.Screen name='enroll-student' component={Enroll}/>
        <Stack.Screen name="classes" component={Classes} options={{title:"Classes"}}  />
        <Stack.Screen name="reports" component={Report} options={{title:"Attendace Reports"}}/>
        <Stack.Screen name="select-class" component={SelectClass} options={{title:"Select Class"}}/>
        <Stack.Screen name="view-reports" component={ReportDetails} options={{title:"Report Details"}}/>
        <Stack.Screen name="login" component={Login} options={{headerShown:false}} />
        <Stack.Screen name='register' component={Register} options={{headerShown:false}}/>
        <Stack.Screen name="view-class" component={ClassView} options={{headerShown:true}} />
        <Stack.Screen name="add-student" component={AddStudent} options={{title:"Add Student"}} />
        <Stack.Screen name = "view-qrcode" component={QRGenerator}/>
        <Stack.Screen name="save-qr" component={SaveQr} options={{title:"Save QR Code"}}/>
        <Stack.Screen name = "check-attendance" component={ScanAttendance}/>
        <Stack.Screen name = "view-attendance" component={AttendanceReport} options={{title:"Attendance"}}/>
        <Stack.Screen name='student-details' component={StudentInformation} options={{title:"Student Information"}}/>



      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
