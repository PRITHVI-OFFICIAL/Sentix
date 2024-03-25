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
  };


const currentmail=getAuth()?.currentUser.email;


    return (
      <View style={styles.container}>

        <View style={{flexDirection:"row"}}>
        <Text style={{fontSize:20,fontWeight:"bold",alignSelf:"center",marginLeft:"35%"}}>UserProfile</Text>
        {/* <TouchableOpacity onPress={onSignOut}>
        <FontAwesome name="sign-out" size={25} color={colors.primary} style={{marginLeft:130}} />

        </TouchableOpacity> */}
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
            <Text>{getAuth().currentUser.email}</Text>
          </View>
        </View>


        <View style={{  borderBottomColor: 'grey', borderBottomWidth: StyleSheet.hairlineWidth}}/>

        <View style={styles.body}>

<View style={{height:100,marginLeft: 20,marginTop:30}}>
<Text style={{color: "#5e5e5e" ,fontSize:13,marginBottom:5,}}>P R O F I L E</Text>

      <TouchableOpacity style={{borderColor:"blue",borderColor:"green", marginTop:10}}>
            <View style={{width: "100%",height:50,borderColor: "black",flexDirection:"row",}}>
            <FontAwesome name="gear" size={25} color={"#5e5e5e"} style={{marginLeft: 10,marginTop:10}}/> 
            <Text style={{ color: "#5e5e5e", fontSize: 16,marginLeft:10 ,marginTop:10}}>Settings</Text>
            </View>
      </TouchableOpacity>


      <TouchableOpacity style={{borderColor:"blue",borderColor:"green", marginTop:10}}>
          <View
          style={{width: "100%",height:50,borderColor: "black",flexDirection:"row",}}>
          <FontAwesome name="legal" size={25} color={"#5e5e5e"} style={{marginLeft: 10,marginTop:10}}/> 
          <Text style={{ color: "#5e5e5e", fontSize: 16,marginLeft:10 ,marginTop:10}}>Legal Information</Text>
          </View>
      </TouchableOpacity>

        <TouchableOpacity style={{borderColor:"blue",borderColor:"green", marginTop:10}}>
        <View
        style={{width: "100%",height:50,borderColor: "black",flexDirection:"row",}}>
        <FontAwesome name="phone" size={25} color={"#5e5e5e"} style={{marginLeft: 10,marginTop:10}}/> 
        <Text style={{ color: "#5e5e5e", fontSize: 16,marginLeft:10 ,marginTop:10}}>Contact Us</Text>
        </View>
        </TouchableOpacity>


    <View
    style={{
      backgroundColor: colors.primary,
      width: 120,
      height: 40,
      borderRadius:15,
      justifyContent: "center",
      alignItems:"center",
      flexDirection:"row",
      marginTop:40,
      marginLeft:"30%",
    }}
    >
    <TouchableOpacity onPress={onSignOut} style={{flexDirection:'row'}}>
    <FontAwesome name="sign-out" size={22} color={"white"} style={{marginRight:10,justifyContent:"center"}}/>
    <Text style={{ color: "white", fontSize: 13, justifyContent:"center",alignItems:"center",}}>LogOut</Text>
    </TouchableOpacity>
    </View>
    <Text style={{color: "#5e5e5e" ,fontSize:13,marginTop:5,textAlign:"center"}}>Do you want to Signout?</Text>


</View>
</View>

  
      </View>
    );
  };
  
  const styles = StyleSheet.create({

  container:{
    flex:1, 
    marginTop:25,
    padding:20,

  },
  button: {
    borderRadius: 10,
    padding: 10,
    backgroundColor:colors.primary,
    marginTop:20

  },
  body:{
   


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
        