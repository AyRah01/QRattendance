import { View, Text } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import useStorage from './useStorage';
export default function useGenerateReport(classData, subjectData) {

  const {getValueFor} = useStorage()
  const generateDailyReport = async (attendance) => {
    let content = '';

    for (let i = 0; i < attendance.length; i++) {
      const date = attendance[i].date;

      const classsReq = await axios.post(API_BASE + '/classAttendanceDetails', {
        date,
        classId: subjectData.course_number,
        yearSection: classData.yearsection,
      });

      const studentsData = classsReq.data;
      console.log(studentsData);
      let tbody = '<tbody>';

      for (let i = 0; i < studentsData.length; i++) {
        const attendanceData = studentsData[i];
        tbody += '<tr>';
        tbody += '<td>';
        tbody += i + 1;
        tbody += '</td>';
        tbody += '<td>';
        tbody += attendanceData.student_id;
        tbody += '</td>';
        tbody += '<td>';
        tbody += attendanceData.firstname + ' ' + attendanceData.middlename + ' ' + attendanceData.lastname;
        tbody += '</td>';
        tbody += '<td>';
        tbody += attendanceData.time_in;
        tbody += '</td>';
        tbody += '<td>';
        tbody += attendanceData.present ? 'Present' : 'Absent';
        tbody += '</td>';
        tbody += '</tr>';
      }
      tbody += '</tbody>';

      content += `
       <div class="header">
              <div class="col">
                <p>COURSE/YEAR/SECTION: <strong>${classData.yearsection}</strong></p>
                <p>SUBJECT: <strong>${subjectData.course_number + '-' + subjectData.course_title}</strong></p>
              </div>
              <div class="col">
                <p>Date: <strong>${date}</strong></p>
                <p>School Year: <strong>${subjectData.school_year + '-' + subjectData.semester}</strong></p>
              </div>
            </div>
            <table>
                <thead>
                  <tr>
                      <th colspan = "2">ID Number</th>
                      <th>STUDENT NAME</th>
                      <th>Time In</th>
                      <th>REMARKS</th>
                    </tr>
                </thead>
                <tbody>
                  ${tbody}
                </tbody>
            </table>
       `;
    }

    const html = `
        <html>
        <head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
          />
          <style>
            body {
              margin: 0;
              padding: 0;
            }
            .main {
              margin-top: 50px;
              margin-left: 50px;
              margin-right: 50px;
            }
            .header {
              display: flex;
              justify-content: space-between;
              flex-direction: row;
            }
            table {
              font-family: arial, sans-serif;
              border-collapse: collapse;
              width: 100%;
            }
      
            td,
            th {
              border: 1px solid #dddddd;
              text-align: left;
              padding: 8px;
            }
          </style>
        </head>
        <body>
          <div class="main">
            <h1 style="text-align: center; font-size: 50px; font-family: Helvetica Neue; font-weight: normal">
              ATTENDANCE SHEET
            </h1>
            ${content}
          </div>
        </body>
      </html>
            `;
    const { uri } = await Print.printToFileAsync({ html });
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  };

  const generateStudentReport = async () => {
    let content = '';
    const teacherId = await getValueFor('user_id')
    const studentsReq = await axios.post(API_BASE + '/getStudentsByYearSection', {
      teacherId,
      classId: subjectData.course_number,
      yearSection: classData.yearsection,
    });

    const students = studentsReq.data
    console.log(students)

    for (let i = 0; i < students.length; i++) {
      const student = students[i];

      const classsReq = await axios.post(API_BASE + '/studentAttendanceDetails  ', {
        classId: subjectData.course_number,
        studendId: student.student_id,
      });

      const classAttendanceData = classsReq.data;
      console.log(classAttendanceData);
      let tbody = '<tbody>';

      for (let i = 0; i < classAttendanceData.length; i++) {
        const attendanceData = classAttendanceData[i];
        tbody += '<tr>';
        tbody += '<td>';
        tbody += i + 1;
        tbody += '</td>';
        tbody += '<td>';
        tbody += attendanceData.date;
        tbody += '</td>';
        tbody += '<td>';
        tbody += attendanceData.time_in
        tbody += '</td>';
        tbody += '<td>';
        tbody += attendanceData.present ? 'Present' : 'Absent';
        tbody += '</td>';
        tbody += '</tr>';
      }
      tbody += '</tbody>';

      content += `
       <div class="header">
              <div class="col">
                <p>Fullname: <strong>${student.firstname + ' ' + student.middlename + ' ' + student.lastname}</strong></p>
                <p>SUBJECT: <strong>${subjectData.course_number + '-' + subjectData.course_title}</strong></p>
              </div>
              <div class="col">
                <p>Course: <strong>${student.course}</strong></p>
                <p>Year/Section: <strong>${student.year+" "+student.section}</strong></p>
              </div>
            </div>
            <table>
                <thead>
                  <tr>
                      <th colspan = "2">Date</th>
                      <th>Time In</th>
                      <th>REMARKS</th>
                    </tr>
                </thead>
                <tbody>
                  ${tbody}
                </tbody>
            </table>
       `;
    }

    const html = `
        <html>
        <head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
          />
          <style>
            body {
              margin: 0;
              padding: 0;
            }
            .main {
              margin-top: 50px;
              margin-left: 50px;
              margin-right: 50px;
            }
            .header {
              display: flex;
              justify-content: space-between;
              flex-direction: row;
            }
            table {
              font-family: arial, sans-serif;
              border-collapse: collapse;
              width: 100%;
              margin-bottom:30px
            }
      
            td,
            th {
              border: 1px solid #dddddd;
              text-align: left;
              padding: 8px;
            }
          </style>
        </head>
        <body>
          <div class="main">
            <h1 style="text-align: center; font-size: 50px; font-family: Helvetica Neue; font-weight: normal">
              ATTENDANCE SHEET
            </h1>
            ${content}
          </div>
        </body>
      </html>
            `;
    const { uri } = await Print.printToFileAsync({ html });
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  };

  return {
    generateDailyReport,
    generateStudentReport
  };
}
