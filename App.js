import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import AccountScreen from './src/screens/AccountScreen';

import OwnerHomeScreen from './src/screens/owner/HomeScreen';
import OwnerActivityScreen from './src/screens/owner/ActivityScreen';
import OwnerEmployeeForm from './src/components/EmployeeForm'

import StockerHomeScreen from './src/screens/stocker/HomeScreen';
import StockScreen from './src/screens/stocker/StockScreen';
import { APP_COLOR } from './src/constants/constants'

const stack = createStackNavigator();
const tab = createBottomTabNavigator();

const OwnerFlow = ()=>{
  return(
    <tab.Navigator initialRouteName = "Home"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        if (route.name === 'Home') {
          return (
            <MaterialCommunityIcons
              name={
                focused
                  ? 'home-variant'
                  : 'home-variant'
              }
              size={size}
              color={color}
            />
          );
        } 
        else if(route.name == "Activity"){
          return (
            <Feather
              name={
                focused
                  ? 'activity'
                  : 'activity'
              }
              size={size}
              color={color}
            />
          );
        }else if (route.name === 'Account') {
          return (
            <MaterialCommunityIcons 
              name= {focused ? 'account' : 'account'} 
              size={size} 
              color= {color} />
          );
        }
      },
      tabBarInactiveTintColor: APP_COLOR,
      tabBarActiveTintColor: 'grey',
    })}
    >
      <tab.Screen
        name = "Activity"
        component = {OwnerActivityScreen}
        options = {{
          title: "ACTIVITIES",
          headerStyle:{
            backgroundColor: APP_COLOR
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center'
        }}
      />
      <tab.Screen
        name = "Home"
        component = {OwnerHomeScreen}
        options = {{
          title: "Home",
          headerStyle:{
            backgroundColor: APP_COLOR
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center'
        }}
      />

      <tab.Screen
        name = "Account"
        component = {AccountScreen}
        options = {{
          title: "MY ACCOUNT",
          headerStyle:{
            backgroundColor: APP_COLOR
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center'
        }}
      />
    </tab.Navigator>  
  )
};


const StockerFlow = ()=>{
  return(
    <tab.Navigator initialRouteName = "Home"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        if (route.name === 'Home') {
          return (
            <MaterialCommunityIcons
              name={
                focused
                  ? 'home-variant'
                  : 'home-variant'
              }
              size={size}
              color={color}
            />
          );
        } 
        else if(route.name == "Stock"){
          return (
            <Feather
              name={
                focused
                  ? 'command'
                  : 'command'
              }
              size={size}
              color={color}
            />
          );
        }else if (route.name === 'Account') {
          return (
            <MaterialCommunityIcons 
              name= {focused ? 'account' : 'account'} 
              size={size} 
              color= {color} />
          );
        }
      },
      tabBarInactiveTintColor: APP_COLOR,
      tabBarActiveTintColor: 'grey',
    })}
    >
      <tab.Screen
        name = "Stock"
        component = {StockScreen}
        options = {{
          title: "Stock",
          headerStyle:{
            backgroundColor: APP_COLOR
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center'
        }}
      />
      <tab.Screen
        name = "Home"
        component = {StockerHomeScreen}
        options = {{
          title: "Home",
          headerStyle:{
            backgroundColor: APP_COLOR
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center'
        }}
      />

      <tab.Screen
        name = "Account"
        component = {AccountScreen}
        options = {{
          title: "MY ACCOUNT",
          headerStyle:{
            backgroundColor: APP_COLOR
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center'
        }}
      />
    </tab.Navigator>  
  )
};


const App = ()=>{
  return(
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen
          name = "Signin"
          component = {SigninScreen}
          options = {{
            headerShown: false
          }}
        />
        <stack.Screen
          name = "Signup"
          component = {SignupScreen}
          options = {{
            headerShown: false
          }}
        />

        <stack.Screen
          name = "OwnerFlow"
          component = {OwnerFlow}
          options = {{
            headerShown: false
          }}
        />

        <stack.Screen
          name = "EmployeeForm"
          component = {OwnerEmployeeForm}
          options = {{
            title: "Employee Form",
            headerStyle:{
              backgroundColor: APP_COLOR
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center'
          }}
        />

        <stack.Screen
          name = "StockerFlow"
          component = {StockerFlow}
          options = {{
            headerShown: false
          }}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default ()=>{
  return(
    <App/>
  );
};