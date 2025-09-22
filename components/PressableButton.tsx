import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

interface ButtonPros{
    title:string,
    onPress:()=>void
}
const PressableButton = ({title, onPress}:ButtonPros) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonWrapper}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

export default PressableButton

const styles = StyleSheet.create({
 buttonWrapper:{
    alignItems:"center",
    padding:15,
    margin:10,
    backgroundColor:"#FF455B",
    borderRadius:15, 
    width:"40%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation:2
 },
 text:{
    fontSize:20,
    color:"#fff"
 }
})