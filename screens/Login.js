import { StyleSheet, Text, TextInput, View ,TouchableOpacity,Image,Alert ,StatusBar} from 'react-native';
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import colors from '../colors';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";


function Login(){

    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  const onHandleLogin = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => console.log("Login success"))
        .catch((err) => Alert.alert("Login error", err.message));
    }
  };
    return(
        <View style={styles.container}>
            <StatusBar backgroundColor={"black"}/>
            <View style={styles.container1}>
                
            <Image
               source={require('../assets/img.jpg')}
                style={{width:"100%", height: 300,alignSelf:"center",bottom:15}}
            /> 
            </View>

            <View style={styles.container3}>
            <View style={{marginTop:30}}>
            <Text style={{fontWeight:"bold",fontSize:30,textAlign:"center",color:'white',fontStyle:"italic"}}>Login Page</Text>
            
        <TextInput
            style={styles.input}
            placeholder="Enter email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoFocus={true}
            value={email}
            onChangeText={(text) => setEmail(text)}
            />

          

        <TextInput
            style={styles.input}
            placeholder="Enter Password"
            autoCapitalize="none"
            textContentType="password"
            secureTextEntry={true}
            autoCorrect={false}
            autoFocus={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
        />

      
            {/* <View style={{height:50,width:130,backgroundColor:"red",borderRadius:10,alignSelf:"center",marginTop:40}}>
                   <Text style={{textAlign:"center",marginTop:12,fontWeight:"bold",color:"white"}}>Submit</Text>
            </View> */}

        <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
        <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}> Log In</Text>
        </TouchableOpacity>

            <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
                <   Text style={{color: 'white', fontWeight: '400', fontSize: 14}}>Don't have an account? </Text>
            <TouchableOpacity onPress={()=> navigation.navigate('Signup')}>
            <Text style={{color: '#232B5D', fontWeight: '600', fontSize: 14}}> Sign Up</Text>
            </TouchableOpacity>
            </View>
            </View>
            
            </View>
        </View>
    )
}
export default Login;

const styles = StyleSheet.create({
    container: {
       flex:1, 
      backgroundColor:"#ffc62f"

    },
    container2:{
        height:40,
        //backgroundColor:"blue",
    },
    container1: {
       // marginTop:100,
        height:100,
        //backgroundColor:"yellow"
     },
     container3: {
        marginTop:150,
        height:500,
        width:"90%",
        alignSelf:"center",
        //backgroundColor:"green", 
        borderRadius:10,

     },
     heading1:{
        fontSize:18,
        fontWeight:"bold",
        color:"white"
     },
     heading:{
        fontSize:40, 
        fontWeight:"bold", 
        textAlign:"center",
        color:"white"
     }, 
     input: {
        backgroundColor: "#F6F7FB",
        height: 50,
        marginTop: 30,
        marginBottom:20,
        fontSize: 16,
        borderRadius: 10,
        padding: 12,
        borderColor:colors.primary, 

        
      },
      button: {
        backgroundColor: '#232B5D',
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
      },
  });