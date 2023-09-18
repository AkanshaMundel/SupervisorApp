import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AuthGuard from './src/auth/AuthGuard';

import FlashMessage from 'react-native-flash-message';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DashBoard from './src/screens/DashBoard/DashBoard';
import QrScanner from './src/screens/QrScanner/QrScanner';
import EmployeeDetail from './src/screens/EmployeeDetail/EmployeeDetail';
import ApprovalLogs from './src/screens/ApprovalLogs/ApprovalLogs';
import Camera from './src/screens/Camera/Camera';
import Internet from './src/InternetCheck/Internet'

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <>
      <FlashMessage position="top" />
      <NavigationContainer>
        <AuthGuard>
          <Stack.Navigator initialRouteName="DashBoard">
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="DashBoard"
              component={DashBoard}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="QrScanner"
              component={QrScanner}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="EmployeeDetail"
              component={EmployeeDetail}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="ApprovalLogs"
              component={ApprovalLogs}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Camera"
              component={Camera}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Internet"
              component={Internet}
            />
          </Stack.Navigator>
        </AuthGuard>
      </NavigationContainer>
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
