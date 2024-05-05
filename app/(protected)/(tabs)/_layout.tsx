import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '@/constants/Colors'

const ProtectedLayoutPage = () => {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: Colors.primary,
    }}>
      <Tabs.Screen name='home' options={{
        title: 'Home',
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name='registered' size={size} color={color} />
        )
      }} />
      <Tabs.Screen name='invest' options={{
        title: 'Invest',
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name='line-chart' size={size} color={color} />
        )
      }} />
      <Tabs.Screen name='transfers' options={{
        title: 'Transfers',
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name='exchange' size={size} color={color} />
        )
      }} />
      <Tabs.Screen name='lifestyle' options={{
        title: 'LifeStyle',
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name='th' size={size} color={color} />
        )
      }} />
      <Tabs.Screen name='crypto' options={{
        title: 'Crypto',
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name='bitcoin' size={size} color={color} />
        )
      }} />
    </Tabs>
  )
}

export default ProtectedLayoutPage