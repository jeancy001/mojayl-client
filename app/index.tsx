import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Didaticiel = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="light"/>
       <View style={styles.wrapContent}>
         <View style={styles.whatCircle}></View>
         <Text style={styles.mojaylText}>Mojayl</Text>
       </View>
    </View>
  )
}

export default Didaticiel

const styles = StyleSheet.create({
container:{
flex:1,
alignItems:'center',
backgroundColor:"#FF455B",
},
wrapContent:{
flex:1,
flexDirection:'row',
justifyContent:'center',
alignItems:'center',
gap:10,

},
whatCircle:{
   width:50,
   height:50,
   backgroundColor:"#fff",
   borderRadius:"100%"
  },
mojaylText:{
  fontSize:18,
  fontWeight:"600",
  color:"#fff"
}
})