import { StyleSheet, Text, TextInput, View, TouchableHighlight, Alert, ScrollView, Image, Linking, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth, database } from '../config/firebase';
import Colors from '../colors';
import DateTimePicker from 'react-native-ui-datepicker';
import { PieChart } from "react-native-gifted-charts";
import dayjs from 'dayjs';
import axios from 'axios';
import colors from '../colors';
import LottieView from 'lottie-react-native';
import * as XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { FontAwesome } from '@expo/vector-icons';
import { getStorage, ref, uploadBytesResumable, getDownloadURL ,uploadString,uploadBytes} from "firebase/storage";
import {collection,addDoc,orderBy,query,onSnapshot,updateDoc,doc,getDoc,setDoc} from 'firebase/firestore';
import { getAuth} from "firebase/auth";
const Preview = ({ route }) => {

  const { data } = route.params;
  const { company } = route.params;
  const currentmail=getAuth()?.currentUser.email;

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
  const { positive, neutral, negative } = calculateSentimentPercentage(data);

  const collectionRef = collection(database, `Users/${currentmail.split('@')[0]}/ReportHistory`);
  const collectionRef1 = doc(database, `Users`, currentmail.split("@")[0]);
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = date.getTime().toString();



const img = {
    'LABEL_0': require('../assets/sad.png'),
    'LABEL_1': require('../assets/neutral.png'),
    'LABEL_2': require('../assets/smile1.png')
  }

  const pieData = [
    { value: 3, color: '#FFA5BA', gradientCenterColor: '#FF7F97' },
    { value: positive, color: '#34ff06', gradientCenterColor: '#023020', focused: true },
    { value: neutral, color: '#ffa500', gradientCenterColor: 'red' },
    { value: negative, color: '#FF474D', gradientCenterColor: 'red' },
  ];
 

  const handledownload = async (data) => {
    try {
      const worksheet = XLSX.utils.json_to_sheet(data);
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
     


    } catch (error) {
      console.log('Error while generating the XLSX file:', error);
    }
  };

  function openLink(url) {
    Alert.alert('Tweet Link', 'Are you want to redirect to that link?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Ok',
        onPress: () => Linking.openURL(url),
      },
    ]);
  }

  const renderDot = color => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

  const renderLegendComponent = () => {
    return (
      <>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: 120, marginRight: 20 }}>
            {renderDot('#34ff06')}
            <Text style={{ color: 'white' }}>Positive: {positive}%</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
            {renderDot('#ffa500')}
            <Text style={{ color: 'white' }}>Neutral: {neutral}%</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: 120, marginRight: 20 }}>
            {renderDot('#FF474D')}
            <Text style={{ color: 'white' }}>Negative: {negative}%</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
            {renderDot('#FF7F97')}
            <Text style={{ color: 'white' }}>Others: {100 - (positive + negative + neutral)}%</Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <View style={{ flex: 1, }}>
      <View style={{ height: 80, backgroundColor: Colors.primary, flexDirection: 'row', justifyContent: 'space-between', padding: 15, paddingTop: 25 }}>
        <View style={{ justifyContent: 'center' }}>
          <Text style={{ fontSize: 16, color: 'white', fontWeight: '300' }}>Dashboard</Text>
          <Text style={{ fontSize: 26, color: 'white', fontWeight: '500' }}>Results</Text>
        </View>
        <TouchableOpacity onPress={() => handledownload(data)} style={{ marginLeft: 200, top: 15 }}>
          <FontAwesome name="download" size={25} color={'white'} />
        </TouchableOpacity>
        <View></View>
      </View>
      
        <View style={{ margin: 20, padding: 16, borderRadius: 20, backgroundColor: '#232B5D' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Social Media Reputation </Text>
            <View>
              <Text style={{ fontWeight: 'bold', color: 'white' }}>Company: <Text style={{ fontWeight: '400' }}>{company}</Text></Text>
              <Text style={{ fontWeight: 'bold', color: 'white' }}>Count: <Text style={{ fontWeight: '400' }}>{data.length}</Text></Text>
            </View>
          </View>
          <View style={{ padding: 20, alignItems: 'center' }}>
            <PieChart
              data={pieData}
              donut
              showGradient
              sectionAutoFocus
              focusOnPress
              showValuesAsLabels
              showTextBackground
              radius={90}
              innerRadius={60}
              innerCircleColor={'#232B5D'}
              centerLabelComponent={() => {
                return (
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 22, color: 'white', fontWeight: 'bold' }}>{positive}%</Text>
                    <Text style={{ fontSize: 14, color: 'white' }}>Reputation</Text>
                  </View>
                );
              }}
            />
          </View>
          {renderLegendComponent()}
        </View>
        <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 20 }}>
          {data.map((tweet, index) => (
            <TouchableHighlight key={index} underlayColor={colors.lightGray} onPress={() => openLink(tweet.twitter_link)}>
              <View style={{ backgroundColor: colors.primary, borderRadius: 10, marginBottom: 10, padding: 10, elevation: 2 }}>
                <Text style={{ fontWeight: 'bold' }}>Message:</Text>
                <Text style={{ textAlign: 'auto', marginBottom: 5 }}>{tweet.text}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
                  <View style={{ alignItems: 'center' }}>
                    <Image source={img[data[index].score[0].label]} style={{ width: 30, height: 30, marginBottom: 5 }} />
                    <Text>{Math.ceil(data[index].score[0].score * 100)}%</Text>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <Image source={img[data[index].score[1].label]} style={{ width: 30, height: 30, marginBottom: 5 }} />
                    <Text>{Math.ceil(data[index].score[1].score * 100)}%</Text>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <Image source={img[data[index].score[2].label]} style={{ width: 30, height: 30, marginBottom: 5 }} />
                    <Text>{Math.ceil(data[index].score[2].score * 100)}%</Text>
                  </View>
                </View>
              </View>
            </TouchableHighlight>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default Preview;
