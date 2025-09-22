import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

interface ButtonProps {
  onPress: () => void
}

const ArrowBackButton = ({ onPress }: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button} activeOpacity={0.7}>
      <Ionicons size={24} name="arrow-back" style={styles.icon} />
    </TouchableOpacity>
  )
}

export default ArrowBackButton

const styles = StyleSheet.create({
  button: {
    margin: 10,
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  icon: {
    color: '#333333',
  },
})
