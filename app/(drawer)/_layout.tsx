import { Drawer } from 'expo-router/drawer';
import React from 'react';

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
      }}>
      <Drawer.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Drawer.Screen
        name="scanner"
        options={{
          title: 'Registrar Presença',
        }}
      />
      <Drawer.Screen
        name="faltas"
        options={{
          title: 'Minhas Faltas',
        }}
      />
      <Drawer.Screen
        name="alunos-presentes"
        options={{
          title: 'Alunos Presentes',
        }}
      />
    </Drawer>
  );
}
