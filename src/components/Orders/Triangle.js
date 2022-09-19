import { useTheme } from '@/hooks'
import React from 'react'
import { View } from 'react-native'

const Triangle = () => {
  const { Common } = useTheme()
  return <View style={Common.orders.triangle} />
}

export default Triangle
