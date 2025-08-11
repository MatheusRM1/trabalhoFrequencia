import { HeaderTitle } from '@react-navigation/elements';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { Platform } from 'react-native';


export default function TabLayout() {


  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Drawer.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Drawer.Screen
        name="faltas"
        options={{
          title: 'Faltas',
        }}
      />
      <Drawer.Screen
        name="scanner"
        options={{
          title: 'Scanner',
        }}
      />
    </Drawer>
  );
}
