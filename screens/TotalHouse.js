import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../colors';




export default function TotalHouse() {

  return (
    <View style={{padding:20,flex:1}}>
        <Text style={{fontSize:20,fontWeight:"bold"}}>Total House</Text>
        <Text style={{fontSize:15,marginTop:20}}>1.    Vatten ID : VT001          Yashwanth Krishnan</Text>
        <Text style={{fontSize:15,marginTop:20}}>2.    Vatten ID : VT002          Pravin Kumar P</Text>
        <Text style={{fontSize:15,marginTop:20}}>3.    Vatten ID : VT003          LogeshWar SB</Text>

        
    </View>
   
  );
}
const styles=StyleSheet.create({

    card:{
        margin:15,
        backgroundColor: '#F6F7FB', 
        flexDirection:"row",
        justifyContent:"space-between",
        paddingLeft:10,
        paddingRight:10,
    }
})

