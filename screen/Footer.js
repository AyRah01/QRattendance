import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { colors } from './../config';
import { Ionicons } from '@expo/vector-icons';
import Attendance from './../assets/icons/attendance-light.png';
import AttendanceDark from './../assets/icons/attendance-dark.png';
import Class from './../assets/icons/class-light.png';
import ClassDark from './../assets/icons/class-dark.png';
import Student from './../assets/icons/student-light.png';
import StudentDark from './../assets/icons/student-dark.png';

export default function Footer({ active, navigation, action,actionIcon, actionTitle }) {
  return (
    <View style={styles.footer}>
      <View style={styles.footerItem} onTouchEnd={() => navigation.navigate('home')}>
        <Ionicons name="home" size={30} color={active === 'dashboard' ? colors.primary : colors.navColor} />
        <Text style={active === 'dashboard' ? styles.navTitleActive : styles.navTitle}>Dashboard</Text>
      </View>
      <View
        style={styles.footerItem}
        onTouchEnd={active === 'attendance' ? null : () => navigation.navigate('attendance')}
      >
        <Image source={active === 'attendance' ? AttendanceDark : Attendance} style={styles.navIcon} />
        <Text style={active === 'attendance' ? styles.navTitleActive : styles.navTitle}>Attendace</Text>
      </View>
      <View style={styles.footerItemCenter} onTouchEnd={action}>
        <Ionicons name={actionIcon} size={70} color={colors.primary} />
        <Text style={styles.navTitleActive}>{actionTitle}</Text>
      </View>
      <View style={styles.footerItem} onTouchEnd={active === 'class' ? null : () => navigation.navigate('classes')}>
        <Image source={active === 'class' ? ClassDark : Class} style={styles.navIcon} />
        <Text style={active === 'class' ? styles.navTitleActive : styles.navTitle}>Class</Text>
      </View>
      <View style={styles.footerItem} onTouchEnd={active === 'students' ? null : () => navigation.navigate('students')}>
        <Image source={active === 'students' ? StudentDark : Student} style={styles.navIcon} />
        <Text style={active === 'students' ? styles.navTitleActive : styles.navTitle}>Students</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  footer: {
    height: 80,
    width: '100%',
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: 'grey',
  },
  footerItem: {
    width: 70,
    flex: 0,
    alignItems: 'center',
    color: 'white',
  },
  footerItemCenter: {
    marginTop: -40,
    width: 70,
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  navTitle: {
    fontSize: 10,
    color: colors.navColor,
    fontWeight: 'bold',
    marginTop: 5,
  },
  navTitleActive: {
    fontSize: 10,
    color: colors.primary,
    fontWeight: 'bold',
    marginTop: 5,
  },
  navIcon: {
    width: 30,
    height: 30,
  },
});
