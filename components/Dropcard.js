import { View, TextInput, Modal, FlatList, TouchableOpacity, Text ,StyleSheet,Pressable,Alert,Image} from 'react-native';
import React, { useState,useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import MapView from 'react-native-maps';
import DropDownPicker from 'react-native-dropdown-picker';
import { FontAwesome } from '@expo/vector-icons';
import { auth, database } from "../config/firebase";
import {collection,addDoc,orderBy,query,onSnapshot,setDoc,doc,getDoc,where, updateDoc} from 'firebase/firestore';
import colors from '../colors';


const DropCard = ({slotid,time,status,disable}) => {

   const[disabled,setdisabled]=useState(false);
    const currentmail=auth.currentUser.email;
    const emailid=currentmail.split("@")[0];

    const cancelticket = (id,emailid) => {
        // const slotcancel = doc(database, `Users/${id}/BookedTickets`);
        // updateDoc(slotcancel,{
        //   cancelled:true,
        // }); 

        const docRef = doc(database, `Users/${emailid}/BookedTickets`, `${id}:${emailid}`);

          getDoc(docRef).then((docSnap) => {
            if(docSnap.exists()){
              updateDoc(docRef, {
                cancelled:true
            });
           
            
            }
            else{

              Alert.alert(
                "Something Went Wrong",
                "Please Try Again Later",
                [
                  {
                    text: "Back",
                    onPress: () => {
                        
                    },
                  },
                ],
              )


            }
            
        })

        const cancel = doc(database, "Slot", id);
        updateDoc(cancel,{
          booked:false,
        });
      }; 
 

    const handlecancel = (slotid,emailid) => {
        Alert.alert(
          'Cancel Slot',
          'Are you sure you want to Cancel Slot ?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Yes', onPress: () => cancelticket(slotid,emailid) },
          ],
          { cancelable: false }
        );
      };
 

    return (
      
<TouchableOpacity disabled={disable} onPress={()=>handlecancel(slotid,emailid)} >
<View style={{height:100,backgroundColor:colors.primary,marginTop:20,borderRadius:10,elevation:4,flexDirection:"row",justifyContent:"space-around"}}>

<View style={{margin:20}}>
<Text style={{fontSize:30,fontWeight:"bold",color:"white"}}>{slotid}</Text>
<Text style={{fontWeight:'400',color:'white'}}>Booking Time : {time}</Text>

</View>

<View style={{height:"70%",width:1,backgroundColor:"white",alignSelf:"center"}}>

</View>

<View style={{margin:18,alignSelf:"center",}}>
<Text style={{fontSize:30,fontWeight:"bold",color:"white"}}>{status}</Text>

</View>

</View>
</TouchableOpacity>
    );
  };
  
  const styles = StyleSheet.create({

  container:{
    flex:1, 
    marginTop:50,
    padding:20,

  },






  
  });

  export default DropCard;


        