import react from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, StyleSheet, ScrollView, StatusBar, Text, View, Button } from 'react-native';
import { colors } from './config';
import Home from './screen/Home';
import Menu from './screen/Menu';
import Attendance from './screen/Attendance';
import AttendanceDetails from './screen/AttendanceDetails';
import Students from './screen/Students';
import Enroll from './screen/Enroll';
import Authenticator from './screen/Authenticator';
import Report from './screen/Reports';
import Login from './screen/Login';
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
import AboutUs from './screen/AboutUs';
import ChangePassword from './screen/ChangePassword';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='authenticator' screenOptions={{headerShown:false}}>
        <Stack.Screen name="authenticator" component={Authenticator} options={{ headerShown: false }} />
        <Stack.Screen name="home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="addClass" component={AddClass} options={{ headerShown: false }} />
        <Stack.Screen name="menu" component={Menu} options={{ title: 'Menu' }} />
        <Stack.Screen name="aboutUs" component={AboutUs} />
        <Stack.Screen name="changePassword" component={ChangePassword} />

        <Stack.Screen name="attendance" component={Attendance} options={{ headerShown: false }} />
        <Stack.Screen name="attendance-details" component={AttendanceDetails} options={{ headerShown:false}} />
        <Stack.Screen name="students" component={Students} options={{ headerShown:false}} />
        <Stack.Screen name="enroll-student" component={Enroll} />
        <Stack.Screen name="classes" component={Classes} options={{ title: 'Classes' }} />
        <Stack.Screen name="reports" component={Report} options={{ title: 'Attendace Reports' }} />
        <Stack.Screen name="select-class" component={SelectClass} options={{ title: 'Select Class' }} />
        <Stack.Screen name="view-reports" component={ReportDetails} options={{ title: 'Report Details' }} />
        <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="view-class" component={ClassView} options={{ headerShown: false }} />
        <Stack.Screen name="add-student" component={AddStudent} options={{ headerShown:false}} />
        <Stack.Screen name="view-qrcode" component={QRGenerator} />
        <Stack.Screen name="save-qr" component={SaveQr} options={{ title: 'Save QR Code' , headerShown:true}} />
        <Stack.Screen
          name="check-attendance"
          component={ScanAttendance}
          options={{headerShown:false}}
        />
        <Stack.Screen name="view-attendance" component={AttendanceReport} options={{ headerShown: false }} />
        <Stack.Screen
          name="student-details"
          component={StudentInformation}
          options={{ headerShown:false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
