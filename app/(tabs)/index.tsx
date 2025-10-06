import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
      <View  style={styles.container}>
        <View style ={styles.contentWrapper}>
         <View style ={styles.headContent}>
          <View style={{margin:10,width:100, height:100, backgroundColor:'#ff55d3',padding:10,borderRadius:"100%" }}>

          </View>
          <Text style={{color:"#fff", textAlign:'center',fontWeight:'bold'}}> Profile </Text>
         </View>
        </View>
      
        </View>
  );
}

const styles = StyleSheet.create({

container:{
  flex:1, 
  
},
contentWrapper:{
  flex:1
},
headContent:{
  alignItems:"center",
  justifyContent:'center',
  backgroundColor:"#4545BB",
  
}
});
