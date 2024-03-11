import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, ScrollView ,ActivityIndicator} from 'react-native';
import React, { useState,useEffect} from "react";
import { useNavigation} from "@react-navigation/native";
import { auth,database} from '../config/firebase';
import Colors from '../colors';
import DateTimePicker from 'react-native-ui-datepicker';
import { FontAwesome } from '@expo/vector-icons';
import dayjs from 'dayjs';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';

function Forms() {
  const navigation = useNavigation();
  const [data,setdata]=useState([]);
  const [loading,setloading]=useState(false);
  const [value, setValue] = useState(dayjs());
  const [company, setcompany] = useState('');
  const [mode, setmode] = useState('');
  const [count, setcount] = useState('');
  const [drivername, setdrivername] = useState('');
  const [lan,setlan]=useState('');
  const [click,setclick]=useState(false);
  const isFocused = useIsFocused();


  useEffect(() => {
    if( click && data.length<parseInt(count)){
      setloading(true);
    }
  });

  useEffect(() => {
    if (isFocused) {
      // Reset the form fields or any other actions you need when the screen is focused again
      setcompany('');
      setmode('');
      setcount('');
      setlan('');
      setclick(false); // Reset click state to prevent automatic API calls
      setloading(false);
    }
  }, [isFocused]);

  const sendApiCall = async (company, mode, count, language) => {
    try {
      setclick(true);

        // URL of the API endpoint
        const response = await axios.post(
          'https://sentixbackend.onrender.com/get_news/',
          // '{\n  "text": "zomato",\n  "mode": "term",\n  "number": 10,\n  "language": "en"\n}',
          {
            'text': company,
            'mode': mode,
            'number': count,
            'language': language
          },
          {
            headers: {
              'accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }
        );
       
        // Check if the request was successful (status code 200)
        if (response.status === 200) {
            // Return the data
            console.log(response.data);
            setdata(response.data);
            setloading(false);
            setclick(false);
            navigation.navigate('Dashboard',{data:response.data,company:company}); 
           
            
        } else {
            // If the request was not successful, throw an error
            console.log("Failed to fetch data");
            Alert.alert('Sorry', 'Unable to Process your Request. Try Again Later', [
              {
                text: 'Ok',
              },
            ]);
            setloading(false);
            setclick(false);
        }
    } catch (error) {
        // Handle any errors
        console.error("Error:", error.message);
        Alert.alert(error.message, 'Unable to Process your Request. Try Again Later', [
          {
            text: 'Ok',
          },
        ]);
        setloading(false);
        setclick(false);
        return ;
    }
};

// sendApiCall('tesla','term',3,'en');
  return (
    <View style={styles.container}>
          
          <View
      style={{
        height: 90,
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        paddingTop: 15
      }}
    >
      <View style={{ justifyContent: 'center' }}>
        <Text
          style={{
            fontSize: 16,
            color: 'white',
            fontWeight: '300',
          }}
        >
          Analytics Page
        </Text>
        <Text
          style={{
            fontSize: 26,
            color: 'white',
            fontWeight: '500',
          }}
        >
          Enter the Details
        </Text>
      </View>

      <View>
       
      </View>
    </View>

    <View style={{ padding: 20 }}>
      
      {loading ? (
       <View>
         <ActivityIndicator size="large" color="#0000ff"  style={{justifyContent:'center',alignItems:"center"}}/>
        <Text style={{textAlign:'center',marginTop:15}}>Kindly Wait for 30 Seconds......</Text>
       </View>
      ) : (
        <ScrollView>
          <Text style={{ fontSize: 15, fontWeight: "bold", marginTop: 15, marginBottom: 5 }}>Enter your Social Media Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter the twitter name"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoFocus={true}
            value={company}
            onChangeText={(text) => setcompany(text)}
          />

<Text style={{ fontSize: 15, fontWeight: "bold", marginTop: 10, marginBottom: 5 }}>Mode</Text>

<TextInput
  style={styles.input}
  placeholder="Enter Mode"
  autoCapitalize="none"
  keyboardType="email-address"
  textContentType="emailAddress"
  autoFocus={true}
  value={mode}
  onChangeText={(text) => setmode(text)}
/>

<Text style={{ fontSize: 15, fontWeight: "bold", marginTop: 10, marginBottom: 5 }}>No of Tweets to Analyze</Text>

<TextInput
  style={styles.input}
  placeholder="Enter Number from  1-99"
  autoCapitalize="none"
  keyboardType="phone-pad"
  maxLength={2}
  autoFocus={true}
  value={count}
  onChangeText={setcount}
/>

<Text style={{ fontSize: 15, fontWeight: "bold", marginTop: 10, marginBottom: 5 }}>Language</Text>

<TextInput
  style={styles.input}
  placeholder="Enter language of Tweet"
  autoCapitalize="none"
  keyboardType="email-address"
  textContentType="emailAddress"
  autoFocus={true}
  value={lan}  
  onChangeText={setlan}
/>
          
          

          {/* <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Dashboard')}>
            <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>Submit</Text>
          </TouchableOpacity> */}

          <TouchableOpacity style={styles.button} onPress={() => sendApiCall(company, mode, count, lan)}>
            <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>  
    </View>
  );
}

export default Forms;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 50,
    fontSize: 16,
    borderRadius: 5,
    padding: 12,
    borderWidth: 0.5,
    borderColor: 'grey'
  },
  button: {
    backgroundColor: '#FFA33C',
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
});