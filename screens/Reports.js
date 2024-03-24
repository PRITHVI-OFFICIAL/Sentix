import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, ScrollView ,ActivityIndicator,TouchableHighlight,Image} from 'react-native';
import React, { useState,useEffect,useLayoutEffect} from "react";
import { useNavigation} from "@react-navigation/native";
import { auth,database} from '../config/firebase';
import Colors from '../colors';
import DateTimePicker from 'react-native-ui-datepicker';
import { FontAwesome } from '@expo/vector-icons';
import dayjs from 'dayjs';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import {collection,addDoc,orderBy,query,onSnapshot,setDoc,doc,getDoc} from 'firebase/firestore';
import { getAuth} from "firebase/auth";
import * as XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import colors from '../colors';

function Reports() {
  const navigation = useNavigation();
  const [data,setdata]=useState([]);
  const[res,setres]=useState([])


  const currentmail=getAuth()?.currentUser.email;

  const collectionRef = collection(database, `Users/${currentmail.split('@')[0]}/ReportHistory`);
  useLayoutEffect(() => {
    
      const unsubscribe = onSnapshot(collectionRef, querySnapshot => {
        setdata(
          querySnapshot.docs.map(doc => 
            (
            {
              name:doc.data().name, 
              count:doc.data().count,
              positive:doc.data().positive,
              neutral:doc.data().neutral,
              negative:doc.data().negative,
          }))
        )
        console.log(querySnapshot.size);
      });        
    
    return unsubscribe;
    }, 
    
    []);

    console.log(data);
  const sendApiCall = async (company, mode, count, language) => {
    try {
    

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
            setres(response.data);
            // setdata(response.data);
            // setloading(false);
            // setclick(false);
            // navigation.navigate('Dashboard',{data:response.data,company:company}); 

    const worksheet = XLSX.utils.json_to_sheet(response.data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      const wbout = XLSX.write(workbook, { type: 'base64', bookType: 'xlsx' });

     
      const blob = new Blob([wbout], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });


      const date = new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let currentDate = `${day}-${month}-${year}`;

      const fileName = `ReputationReport_${currentDate}.xlsx`;

      const fileUri = `${FileSystem.documentDirectory}${fileName}`;
      await FileSystem.writeAsStringAsync(fileUri, wbout, { encoding: FileSystem.EncodingType.Base64 });

      

      await Sharing.shareAsync(fileUri, { mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', dialogTitle: 'Download File' });

           
            
        } else {
            // If the request was not successful, throw an error
            console.log("Failed to fetch data");
            Alert.alert('Sorry', 'Unable to Process your Request. Try Again Later', [
              {
                text: 'Ok',
              },
            ]);
            
        }
    } catch (error) {
        // Handle any errors
        console.error("Error:", error.message);
        Alert.alert(error.message, 'Unable to Process your Request. Try Again Later', [
          {
            text: 'Ok',
          },
        ]);
    
        return ;
    }
};

const img = {
    'negative': require('../assets/sad.png'),
    'neutral': require('../assets/neutral.png'),
    'positive': require('../assets/smile1.png')
  }

const calculateSentimentPercentage = (data) => {
    let totalPositive = 0;
    let totalNeutral = 0;
    let totalNegative = 0;
    const totalCount = data.length;

    data.forEach((item) => {
      item.score.forEach((scoreItem) => {
        if (scoreItem.label === 'LABEL_0') {
          totalNegative += scoreItem.score;
        } else if (scoreItem.label === 'LABEL_1') {
          totalNeutral += scoreItem.score;
        } else if (scoreItem.label === 'LABEL_2') {
          totalPositive += scoreItem.score;
        }
      });
    });

    const positivePercentage = (totalPositive / totalCount) * 100;
    const neutralPercentage = (totalNeutral / totalCount) * 100;
    const negativePercentage = (totalNegative / totalCount) * 100;

    return {
      positive: parseInt(positivePercentage.toFixed(2)),
      neutral: parseInt(neutralPercentage.toFixed(2)),
      negative: parseInt(negativePercentage.toFixed(2)),
    };
  };
  const { positive, neutral, negative } = calculateSentimentPercentage(res);

  console.log(positive,negative,neutral);
function handleCardPress(name1,count) {
    // Example: Call the sendApiCall function with the name and count
    sendApiCall(name1, 'term', count, 'en');
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
        {/* <Text
          style={{
            fontSize: 16,
            color: 'white',
            fontWeight: '300',
          }}
        >
          Reports Page
        </Text> */}
        <Text
          style={{
            fontSize: 26,
            color: 'white',
            fontWeight: '500',
          }}
        >
          Reports Page
        </Text>
      </View>

      
      
    </View>  


    <View  style={{padding:15}}>
        {data.map((item,index) => (
        //   <TouchableOpacity
        //     key={item.id}
        //     style={styles.card}
        //     onPress={() => handleCardPress(item.name, item.count)}>
        //     <Text>Name: {item.name}</Text>
        //     <Text>Count: {item.count}</Text>
        //   </TouchableOpacity>
        <TouchableOpacity key={index} underlayColor={colors.lightGray} onPress={() => handleCardPress(item.name, item.count)} >
        <View style={{ backgroundColor: colors.primary, borderRadius: 10, marginBottom: 10, padding: 10, elevation: 2 }}>
         <View style={{flexDirection:'row'}}>
         <Text style={{ fontWeight: 'bold' }}>Company Name:  </Text>
          <Text style={{ textAlign: 'auto', marginBottom: 5 }}>  {item.name}</Text> 
         </View>

         <View style={{flexDirection:'row'}}>
         <Text style={{ fontWeight: 'bold' }}>Count of Tweets:  </Text>
          <Text style={{ textAlign: 'auto', marginBottom: 5 }}>  {item.count}</Text> 
         </View>
          <Text style={{ textAlign: 'auto', marginBottom: 5 ,fontWeight:'bold'}}>Score:</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
            <View style={{ alignItems: 'center' }}>
              <Image source={img['positive']} style={{ width: 30, height: 30, marginBottom: 5 }} />
              <Text>{Math.ceil(item.positive)}%</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Image source={img['neutral']} style={{ width: 30, height: 30, marginBottom: 5 }} />
              <Text>{Math.ceil(item.neutral)}%</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Image source={img['negative']} style={{ width: 30, height: 30, marginBottom: 5 }} />
              <Text>{Math.ceil(item.negative)}%</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
        ))}
      </View>


    </View>
  );
}

export default Reports;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 40,
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
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 3,
  },
});