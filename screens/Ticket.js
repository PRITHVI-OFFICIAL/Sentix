import React, { useState,useLayoutEffect } from 'react';
import { Alert, StyleSheet, View, Text, Button, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, database } from "../config/firebase";
import {collection,addDoc,orderBy,query,onSnapshot,setDoc,doc,getDoc,where, updateDoc} from 'firebase/firestore';
import DropCard from '../components/Dropcard';



export default function Ticket() {


    const [ticket,setTicket]=useState([]);
  const [BookedTime,SetBookedTime]=useState("");
  const [area,SetArea]=useState("");


const currentmail=auth.currentUser.email;
const id=currentmail.split("@")[0];


const collectionRef = collection(database, `Users/${id}/BookedTickets`);
    useLayoutEffect(() => {

        const unsubscribe = onSnapshot(collectionRef, querySnapshot => {
          setTicket(
            querySnapshot.docs.map(doc => 
              (
              {
                slotid:doc.data().slotid,
                bookingtime:doc.data().bookingtime,
                cancelled:doc.data().cancelled
            }))
          )
          
          console.log(querySnapshot.size);
        });        
      
      return unsubscribe;
      }, 
      
      []); 


      const collectionRef1 = collection(database, "Area");
    useLayoutEffect(() => {

        const unsubscribe = onSnapshot(collectionRef, querySnapshot => {
          SetArea(
            querySnapshot.docs.map(doc => 
              (
              {
                place:doc.data().place,
            }))
          )
          
          console.log(querySnapshot.size);
        });        
      
      return unsubscribe;
      }, 
      
      []); 
      console.log(ticket);

  return (
    <View style={{paddingTop:40,flex:1,margin:20}}>
        <Text style={{fontSize:18,fontWeight:'bold',}}>Booked Tickets</Text>
        

        {
          (ticket.length==0) ?(<Text style={{textAlign:"center",padding:30,color:"black"}}>No Tickets Booked </Text>):

          (
            
              ticket.map((value,key)=>   
              
              <DropCard slotid={value.slotid}  time={value.bookingtime} status={!value.cancelled?'CNF':'CAN'} key={key} disable={value.cancelled} />
              )
              
          )
        }
 

      

        
    </View>
   
  );
}
const styles=StyleSheet.create({

    
})

