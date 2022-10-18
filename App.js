import react from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, StyleSheet, ScrollView, StatusBar, Text, View, Button } from 'react-native';

import Home from './screen/home';
import Menu from './screen/menu';
import Attendance from './screen/attendance';
import Classgen from './screen/classgen';
import Report from './screen/report';
import Login from './screen/login';
import AddClass from './screen/AddClass';
import ClassView from './screen/ClassView';
import AddStudent from './screen/AddStudent';
import QRGenerator from './screen/QRGenerator';
import StudentInformation from './screen/StudentInformation';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOption={{
          headerStyle: {
            backgroundColor: '#009387',
            headerTintColor: '#fff',
          },
          headerTitleStyle: { fontWeight: 'bold' },
        }}
        initialRouteName={'login'}
      >
        <Stack.Screen name="home" component={Home} />
    <Stack.Screen name="addClass"  component={AddClass}
        />

        <Stack.Screen name="menu" component={Menu} />
        <Stack.Screen name="attendance" component={Attendance} />
        <Stack.Screen name="classgen" component={Classgen} />
        <Stack.Screen name="report" component={Report} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="view-class" component={ClassView} />
        <Stack.Screen name="add-student" component={AddStudent} />
        <Stack.Screen name = "view-qrcode" component={QRGenerator}/>
        <Stack.Screen name='student-details' component={StudentInformation}/>


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
