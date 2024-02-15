import { View, TextInput, Modal, FlatList, TouchableOpacity, Text ,StyleSheet,Pressable,Alert,Image} from 'react-native';
import React, { useState,useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { getAuth} from "firebase/auth";
import { FontAwesome } from '@expo/vector-icons';
import colors from '../colors';
import { auth, database } from '../config/firebase'
import { signOut } from 'firebase/auth';
import {collection,addDoc,orderBy,query,onSnapshot,setDoc,doc,getDoc,where, updateDoc} from 'firebase/firestore';

const UserProfile = () => {




  const navigation = useNavigation();
 const [modalVisible, setModalVisible] = useState(true);

   


const onSignOut = () => {
        signOut(auth).catch(error => console.log('Error logging out: ', error));
        //navigation.popToTop()
  };

  const currentmail=getAuth()?.currentUser.email;
console.log(currentmail);

  





    return (
      <View style={styles.container}>

        <View style={{flexDirection:"row"}}>
        <Text style={{fontSize:20,fontWeight:"bold",alignSelf:"center",marginLeft:"35%"}}>UserProfile</Text>
        <TouchableOpacity onPress={onSignOut}>
        <FontAwesome name="sign-out" size={25} color={colors.primary} style={{marginLeft:130}} />

        </TouchableOpacity>
        </View>

        <View style={{  borderBottomColor: 'grey', borderBottomWidth: StyleSheet.hairlineWidth,marginTop:10}}/>

        <View style={{flexDirection:"row",alignSelf:"center",margin:30}}>

          <View>
          <Image
               source={require('../assets/profile.png')}
                style={{width: 100, height: 100,borderRadius:100,borderWidth:2,borderColor:colors.primary}}
            />
          </View>

          <View style={{justifyContent:"center",marginLeft:35,marginBottom:10}}>
            <Text style={{fontSize:25,fontWeight:"bold",marginBottom:5}}>{currentmail.split('@')[0]}</Text>
            <Text>+91 7550005350</Text>
            <Text>{getAuth().currentUser.email}</Text>
          </View>
        </View>


        <View style={{  borderBottomColor: 'grey', borderBottomWidth: StyleSheet.hairlineWidth}}/>

  
      </View>
    );
  };
  
  const styles = StyleSheet.create({

  container:{
    flex:1, 
    marginTop:50,
    padding:20,

  },
  button: {
    borderRadius: 10,
    padding: 10,
    backgroundColor:colors.primary,
    marginTop:20

  },

  button1: {
    borderRadius: 10,
    padding: 10,
    backgroundColor:"red",
    marginTop:60,
    width:"50%", 
    alignSelf:"center"

  },


  
  });

  export default UserProfile;
        