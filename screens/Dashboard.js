import { StyleSheet, Text, TextInput, View, TouchableHighlight, Alert, ScrollView ,Image,Linking, TouchableOpacity,Dimensions } from 'react-native';
import React, { useState,useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth,database} from '../config/firebase';
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

const Dashboard = ({route})=>{

  const {data}=route.params;
  const {company}=route.params;

  // const [data,setdata]=useState([
  //   {
  //     "twitter_link": "https://twitter.com/skilly_tweet/status/1758516801502093658#m",
  //     "text": "Someone or a group is buying $TSLA like there’s no tomorrow… the stock should have been down massively based on multiple technical analysis guys… who’s buying #TESLA STOCK 👀?!?",
  //     "score": [
  //       {
  //         "label": "LABEL_0",
  //         "score": 0.6337720155715942
  //       },
  //       {
  //         "label": "LABEL_1",
  //         "score": 0.3359425365924835
  //       },
  //       {
  //         "label": "LABEL_2",
  //         "score": 0.030285466462373734
  //       }
  //     ]
  //   },
  //   {
  //     "twitter_link": "https://twitter.com/chris_robb1/status/1755527982792524215#m",
  //     "text": "Elvis was the King of Rock N' Roll. @ElonMusk is Ketaqueen of the Valley but still gives off major Elvis in 1976 at the International Hotel vibes. I'm downgrading $TSLA to a HOLD.   https://medium.com/@christophermrobb9/tesla-the-elon-phant-in-the-room-2f7862789b7c #Tesla #ElonMusk #SiliconValley #LeadershipMatters #ElectricVehicles",
  //     "score": [
  //       {
  //         "label": "LABEL_1",
  //         "score": 0.5439004898071289
  //       },
  //       {
  //         "label": "LABEL_2",
  //         "score": 0.38279056549072266
  //       },
  //       {
  //         "label": "LABEL_0",
  //         "score": 0.07330888509750366
  //       }
  //     ]
  //   },
  //   {
  //     "twitter_link": "https://twitter.com/al_koii/status/1711448529745416639#m",
  //     "text": "It's safe to say this team ships   6 products in 2 years  You guys rock @ghazanfer_anwar @SmithAndWeb @KoiiNetwork #Web3 #Blockchain #Tesla @elonmusk",
  //     "score": [
  //       {
  //         "label": "LABEL_2",
  //         "score": 0.9736248850822449
  //       },
  //       {
  //         "label": "LABEL_1",
  //         "score": 0.025080304592847824
  //       },
  //       {
  //         "label": "LABEL_0",
  //         "score": 0.0012947829673066735
  //       }
  //     ]
  //   },
  //   {
  //     "twitter_link": "https://twitter.com/MalikHa22235727/status/1758516092052308152#m",
  //     "text": "Would u like a #Cybertruck home for your #Doge??? 💯🔥 #Tesla #Dogecoin #ElonMusk",
  //     "score": [
  //       {
  //         "label": "LABEL_1",
  //         "score": 0.630058228969574
  //       },
  //       {
  //         "label": "LABEL_2",
  //         "score": 0.3614497482776642
  //       },
  //       {
  //         "label": "LABEL_0",
  //         "score": 0.008492023684084415
  //       }
  //     ]
  //   },
  //   {
  //     "twitter_link": "https://twitter.com/not_a_cricketr/status/1758516052244234511#m",
  //     "text": "Tesla World #tesla",
  //     "score": [
  //       {
  //         "label": "LABEL_1",
  //         "score": 0.679018497467041
  //       },
  //       {
  //         "label": "LABEL_2",
  //         "score": 0.2862919270992279
  //       },
  //       {
  //         "label": "LABEL_0",
  //         "score": 0.03468963876366615
  //       }
  //     ]
  //   },
  //   {
  //     "twitter_link": "https://twitter.com/GreenCarStocks/status/1758515354207236271#m",
  //     "text": "Stellantis Announces Plan to Adopt Charging Plug from Tesla $LCID https://ibn.fm/vJc0V #greencarstocks #tesla",
  //     "score": [
  //       {
  //         "label": "LABEL_1",
  //         "score": 0.54436856508255
  //       },
  //       {
  //         "label": "LABEL_2",
  //         "score": 0.45124298334121704
  //       },
  //       {
  //         "label": "LABEL_0",
  //         "score": 0.004388459958136082
  //       }
  //     ]
  //   },
  //   {
  //     "twitter_link": "https://twitter.com/VickieMacFadden/status/1758515240843522184#m",
  //     "text": "Read the 2nd paragraph. Irrational seems an understatement. #Tesla #OTAUpdates #NHTSA",
  //     "score": [
  //       {
  //         "label": "LABEL_1",
  //         "score": 0.632275402545929
  //       },
  //       {
  //         "label": "LABEL_2",
  //         "score": 0.19473731517791748
  //       },
  //       {
  //         "label": "LABEL_0",
  //         "score": 0.17298729717731476
  //       }
  //     ]
  //   },
  //   {
  //     "twitter_link": "https://twitter.com/DogeINTHEBOX/status/1758514772729815437#m",
  //     "text": "Would u like a #Cybertruck home for your #Doge??? 💯🔥 #Tesla #Dogecoin #ElonMusk",
  //     "score": [
  //       {
  //         "label": "LABEL_1",
  //         "score": 0.630058228969574
  //       },
  //       {
  //         "label": "LABEL_2",
  //         "score": 0.3614497482776642
  //       },
  //       {
  //         "label": "LABEL_0",
  //         "score": 0.008492023684084415
  //       }
  //     ]
  //   },
  //   {
  //     "twitter_link": "https://twitter.com/towhid_s/status/1758514519234482238#m",
  //     "text": "@Tesla @elonmusk  Can you guys pleaseeee release the Model 3 Performance Refresh already god damn ittt!! I need to get a car ASAP and I can’t wait much longer and I want to get the new m3 performance. PLEASEEEEEEE #tesla #ElonMusk #model3 #performance",
  //     "score": [
  //       {
  //         "label": "LABEL_2",
  //         "score": 0.8896565437316895
  //       },
  //       {
  //         "label": "LABEL_1",
  //         "score": 0.08445757627487183
  //       },
  //       {
  //         "label": "LABEL_0",
  //         "score": 0.025885863229632378
  //       }
  //     ]
  //   },
  //   {
  //     "twitter_link": "https://twitter.com/Zxcxz_xyz/status/1758514428562018326#m",
  //     "text": "10 Reasons To Consider An Electric Car In 2024 https://ift.tt/tqr28aB #ElectricVehicles #Tesla #EV #Renewables #ClimateChange #RenewableEnergy",
  //     "score": [
  //       {
  //         "label": "LABEL_2",
  //         "score": 0.5675545334815979
  //       },
  //       {
  //         "label": "LABEL_1",
  //         "score": 0.42751413583755493
  //       },
  //       {
  //         "label": "LABEL_0",
  //         "score": 0.004931305069476366
  //       }
  //     ]
  //   }
  // ]);

  // const [windowHeight, setWindowHeight] = useState(0);

  // useEffect(() => {
  //   const updateWindowHeight = () => {
  //     const { height } = Dimensions.get('window');
  //     setWindowHeight(height);
  //   };

  //   Dimensions.addEventListener('change', updateWindowHeight);
  //   updateWindowHeight(); // Set initial height
  //   return () => {
  //     Dimensions.removeEventListener('change', updateWindowHeight);
  //   };
  // }, []);
  // console.log(windowHeight,"------aaaa");

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

  const img={
    'LABEL_0': require('../assets/sad.png'),
    'LABEL_1': require('../assets/neutral.png'), 
    'LABEL_2': require('../assets/smile1.png')
  }

  const pieData = [

    {value: 3, color: '#FFA5BA', gradientCenterColor: '#FF7F97'},
    {
      value: positive,
      color: '#34ff06',
      gradientCenterColor: '#023020',
      focused: true,
    },
    {value: neutral, color: '#ffa500', gradientCenterColor: 'red'},
    {value: negative, color: '#FF474D', gradientCenterColor: 'red'},
   
  ];

  console.log(img['LABEL_0'],"-->");




  const handledownload = async (data) => {
    // const filteredReport = report.filter((item) => item.routeid === `${routeid}`);
    // if (filteredReport.length === 0) {

    //   Alert.alert('Download Failed', `No Booking Occurs`, [
    //     { text: 'OK' },
    //   ])
    //   console.log('No data to download');
    //   return;
    // }
    try {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      const wbout = XLSX.write(workbook, { type: 'base64', bookType: 'xlsx' });

      const date = new Date();

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let currentDate = `${day}-${month}-${year}`;

      const fileName = `ReputationReport_ ${currentDate}.xlsx`;

      const fileUri = `${FileSystem.documentDirectory}${fileName}`;
      await FileSystem.writeAsStringAsync(fileUri, wbout, {
        encoding: FileSystem.EncodingType.Base64,
      });

      await Sharing.shareAsync(fileUri, { mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', dialogTitle: 'Download File' });
    } catch (error) {
      console.log('Error while generating the XLSX file:', error);
    }


  };
//  handledownload(data);


  function openLink(url){

    Alert.alert('Tweet Link', 'Are you want to redirect to that link?', [

      {
        text: 'Cancel',
       
        style: 'cancel',
      },
      {
        text: 'Ok',
        onPress: () => Linking.openURL(url) ,
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 120,
              marginRight: 20,
            }}>
            {renderDot('#34ff06')}
            <Text style={{color: 'white'}}>Positive: {positive}%</Text>
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
            {renderDot('#ffa500')}
            <Text style={{color: 'white'}}>Neutral: {neutral}%</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 120,
              marginRight: 20,
            }}>
            {renderDot('#be2239')}
            <Text style={{color: 'white'}}>Negative: {negative}%</Text>
          </View>

          <View
            style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
            {renderDot('#FF7F97')}
            <Text style={{color: 'white'}}>Others: {100-(positive+negative+neutral)}%</Text>
          </View>
        </View>
      </>
    );
  };










    return(
        <View>
            <View
      style={{
        height: 80,
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        paddingTop: 25
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
          Dashboard
        </Text>
        <Text
          style={{
            fontSize: 26,
            color: 'white',
            fontWeight: '500',
          }}
        >
          Results
        </Text>
      </View>


      <TouchableOpacity  onPress={()=> handledownload(data)} style={{marginLeft:260,top:15}}>
      <FontAwesome name="download" size={25} color={'white'} />
      </TouchableOpacity>

      <View>
       
      </View>
    </View>


    <View
    style={{
      // paddingVertical: 50,
      // backgroundColor: '#34448B',
      // //flex: 1,
    }}>
    <View
      style={{
        margin: 20,
        padding: 16,
        borderRadius: 20,
        backgroundColor: '#232B5D',
      }}>

      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>Social Media Reputation </Text>

      <View>
      <Text style={{fontWeight:'bold',color:'white'}} >Company: <Text style={{fontWeight:'400'}}>{company}</Text></Text>
      <Text style={{fontWeight:'bold',color:'white'}} >Count:  <Text style={{fontWeight:'400'}}>{data.length}</Text></Text>

      </View>
      </View>
      
      
      <View style={{padding: 20, alignItems: 'center'}}>
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
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{fontSize: 22, color: 'white', fontWeight: 'bold'}}>
                  {positive}%
                </Text>
                <Text style={{fontSize: 14, color: 'white'}}>Reputation</Text>
              </View>
            );
          }}
        />
      </View>
      {renderLegendComponent()}
    </View>

    {/* <View style={{height:100,backgroundColor:"darkblue",width:"90%",alignSelf:"center",borderRadius:10}}>
    <Text>Text: {data.length}</Text>
    </View> */}
    <ScrollView style={{height:((100*data.length)*0.8)}}>
    <View style={{padding:20}}>
    {/* <Text style={{fontSize:18,fontWeight:'bold',color:'black'}}>No of Tweets Scraped</Text> */} 

    {/* <View style={{height:100,backgroundColor:'grey',borderRadius:10,marginBottom:10}}>

        <Text>Hi</Text>
    
    
    </View>  */}

    

    
      <View>

      {data.map((tweet, index) => (

<TouchableHighlight key={index}  underlayColor={colors.lightGray} onPress={()=>openLink(tweet.twitter_link)}>
 <View key={index} style={{backgroundColor:colors.primary,borderRadius:10,marginBottom:10,padding:10,elevation:2}}>
{/* <Text>{index}</Text> */}
<Text style={{fontWeight:'bold'}}>Message:</Text>
<Text style={{textAlign:'auto',marginBottom:5}}>{tweet.text}</Text>

<View style={{flexDirection:'row',justifyContent:'space-between',padding:20}}>
 
<View style={{alignItems:'center'}}>
<Image source={img[data[index].score[0].label]} style={{ width: 30, height: 30 ,marginBottom:5}} />
<Text>{Math.ceil(data[index].score[0].score*100)}%</Text>
</View>

<View style={{alignItems:'center'}}>
<Image source={img[data[index].score[1].label]} style={{ width: 30, height: 30,marginBottom:5 }} />
<Text>{Math.ceil(data[index].score[1].score*100)}%</Text>
</View>

<View style={{alignItems:'center'}}>
<Image source={img[data[index].score[2].label]} style={{ width: 30, height: 30,marginBottom:5 }} />
<Text>{Math.ceil(data[index].score[2].score*100)}%</Text>
</View>



</View>

</View>
</TouchableHighlight>
))}
      </View>
    


    



    </View>
    </ScrollView>

  </View>


 


    </View>

    );


}
export default Dashboard;



const styles = StyleSheet.create({
  container: {


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