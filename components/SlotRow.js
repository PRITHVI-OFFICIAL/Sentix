import React from 'react';
import { View, Text, TouchableOpacity, Image , Alert} from 'react-native';
import { auth, database } from "../config/firebase";
import {collection,addDoc,orderBy,query,onSnapshot,setDoc,doc,getDoc,where, updateDoc} from 'firebase/firestore';

const BookSeat=(id,email)=>{
    const slotbook = doc(database, "Slot", id);
    updateDoc(slotbook,{
      booked:true,
    });

    const collectionRef = collection(database, `Users/${email}/BookedTickets`);
  
        setDoc(doc(collectionRef,`${id}:${email}` ), {
          slotid:id,
          bookingtime:new Date().toLocaleString(),  
          cancelled:false
}) 

    Alert.alert(
        'All Set!!!',
        'Your Parking Slot is Booked Successfully',
        [
          { text: 'Ok', style: 'cancel' },
          
        ],
        { cancelable: false }
      );




}


const handleBookSeat = (id,email) => {
    Alert.alert(
      'Book Slot',
      'Are you sure you want to book this Park Slot?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => BookSeat(id,email) },
      ],
      { cancelable: false }
    );
  };
  

const SlotRow = ({slot1,slot2,slotid1,slotid2,email}) => {

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
    <TouchableOpacity onPress={()=>handleBookSeat(slotid1,email)} disabled={slot1}>
      <View
        style={{
          width: 120,
          height: 60,
          borderWidth: 1,
          borderColor: '#1a73e8',
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: slot1 ? '#1a73e8' : 'transparent',
        }}
      >
        {slot1 ? (
           <Image source={require('../assets/car.png')} style={{ width: 70, height: 70, transform: [{ rotate: '270deg' }] }} />
        ) : (
          <Text style={{ fontWeight: 'bold' }}>{slotid1}</Text>
        )}
      </View>
    </TouchableOpacity>
    <View style={{ height: '100%', width: 1, backgroundColor: '#909090' }}></View>
    <TouchableOpacity onPress={()=>handleBookSeat(slotid2,email)} disabled={slot2}>
      <View
        style={{
          width: 120,
          height: 60,
          borderWidth: 1,
          borderColor: '#1a73e8',
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: slot2 ? '#1a73e8' : 'transparent',
        }}
      >
        {slot2 ? (
          <Image source={require('../assets/car.png')} style={{ width: 70, height: 70, transform: [{ rotate: '90deg' }] }} />
        ) : (
          <Text style={{ fontWeight: 'bold' }}>{slotid2}</Text>
        )}
      </View>
    </TouchableOpacity>
  </View>
    
  );
};



export default SlotRow;
