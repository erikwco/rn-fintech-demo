import { Text, View } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'

const WaitForData = ({ message }: { message: string }) => {
  return (
    <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.background }}>
      <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{message}</Text>
    </View>
  )
}

export default WaitForData
