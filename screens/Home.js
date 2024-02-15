import React,{useEffect,useRef }from 'react';
import { Modal, View, Image, Button,Text,StyleSheet, TouchableOpacity , Dimensions, Animated, Easing,Linking} from 'react-native';
import Colors from '../colors';
import { ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import colors from '../colors';



const { width } = Dimensions.get('window');


const Home = () => {
  const navigation = useNavigation();
  const animationRef = useRef(null);



  return (
    <View style={styles.container}>
       
      <View
      style={{
        height: 113,
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        paddingTop: 50
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
          Hello!
        </Text>
        <Text
          style={{
            fontSize: 26,
            color: 'white',
            fontWeight: '500',
          }}
        >
          Prithvi PK
        </Text>
      </View>

      <View>
        {/* <Image
          source={require('../assets/teethHome.png')}
          style={{ width: 80, height: 80 }}
        /> */}
      </View>
    </View>

        {/* <Text style={styles.heading}>Products</Text> */}
       
        <Text style={{fontSize:20,fontWeight:"500",marginLeft:20,marginTop:10,top:8}}>Welcome to Sentix!!</Text>
        <View>
        
      <View
        style={{
          height: 150,
          backgroundColor: colors.primary,
          borderRadius: 15,
          width: width - 30, // Adjust the width according to the screen size
          margin: 15,
        }}
      >

      
     <View style={{flexDirection:'row',justifyContent:'space-between',padding:20,marginTop:10}}>
     <Image source={require('../animations/smile.gif')} style={{ width: 100, height: 100 }} />
      <Image source={require('../animations/neutral.gif')} style={{ width: 100, height: 100 }} />
      <Image source={require('../animations/anger.gif')} style={{ width: 100, height: 100 }} />

     </View>

     {/* <Text style={{fontSize:15,textAlign:'center',color:'white'}}>   Sensing  Sentiments  Swiftly..... </Text> */}
     

       
      </View>

   
        </View>



       <View style={{margin:5,flex:1,padding:10,bottom:10}}>

     



       <Text style={{fontSize:20,fontWeight:"500",marginLeft:5,marginBottom:10}}>Features</Text>

       <View style={{height:130,backgroundColor:Colors.primary,borderRadius:10,flexDirection:"row",padding:10,elevation:30,shadowColor:Colors.primary,justifyContent:"space-around"}}>


        

    <TouchableOpacity>
    <View style={{height:"100%",backgroundColor:Colors.primary,width:90,justifyContent:"center",alignItems:"center",}}>

          
<View style={{width:60,height:60,backgroundColor:Colors.lightblue,borderRadius:16,justifyContent:"center",alignItems:"center"}}>

     <Image
     source={require('../assets/analytics.png')}
     style={{ width: 40, height: 40 ,marginLeft:5}}
     /> 
 </View>

<Text style={{marginTop:10,fontSize:12,color:"white"}}>Analytics</Text>
</View>
    </TouchableOpacity>

    <TouchableOpacity onPress={()=> navigation.navigate('ScanTeeth')}>

    <View style={{height:"100%",backgroundColor:Colors.primary,width:90,justifyContent:"center",alignItems:"center",}}>

          
       <View style={{width:60,height:60,backgroundColor:Colors.lightblue,borderRadius:16,justifyContent:"center",alignItems:"center"}}>

            <Image
            source={require('../assets/dashboard.png')}
            style={{ width: 40, height: 40 ,}}
            /> 

     
        </View>

      <Text style={{marginTop:10,fontSize:12,color:"white"}}>Dashboard</Text>
    </View>
    </TouchableOpacity>


   <TouchableOpacity>
   <View style={{height:"100%",backgroundColor:Colors.primary,width:90,justifyContent:"center",alignItems:"center",}}>

          
<View style={{width:60,height:60,backgroundColor:Colors.lightblue,borderRadius:16,justifyContent:"center",alignItems:"center"}}>

            <Image
            source={require('../assets/report.png')}
            style={{ width: 40, height: 40 ,marginLeft:5}}
            /> 
 </View>

<Text style={{marginTop:10,fontSize:12,color:"white",textAlign:"center"}}>Reports</Text>
</View>
   </TouchableOpacity >


       </View> 

       <Text style={{fontSize:20,fontWeight:"500",marginLeft:5,marginTop:15,marginBottom:10}}>Discover</Text>

        <ScrollView>
        <View  style={{flexDirection:'row',flexWrap:'wrap'}}  >
        
        <TouchableOpacity onPress={()=> Linking.openURL('https://www.aimtechnologies.co/whats-sentiment-analysis-decoding-emotions-in-textual-data/')}>
        <View>
        <View style={{width:180,height:130,backgroundColor:Colors.primary,margin:5,borderRadius:10,marginRight:15,}}>
          <Image
          source={{uri:"https://www.aimtechnologies.co/wp-content/uploads/2023/08/Whats-Sentiment-Analysis-1.png"}}
          style={{height:"100%",width:"100%",borderRadius:10}}
          />
          {/* https://www.aimtechnologies.co/whats-sentiment-analysis-decoding-emotions-in-textual-data/ */}

        </View>
        <Text style={{marginTop:5,fontWeight:"500",marginLeft:10,marginBottom:10}}>What is Sentiment Analysis?</Text>
        </View>
        </TouchableOpacity>


        <TouchableOpacity onPress={()=>Linking.openURL('https://medium.com/@moneytent/the-benefits-of-using-ai-for-online-reputation-management-619f3e95d846')}>
       <View>
        <View style={{width:175,height:130,backgroundColor:Colors.primary,margin:5,borderRadius:10,marginRight:15}}>
          <Image
          source={{uri:"https://miro.medium.com/v2/resize:fit:1400/1*Bifn6NJxT76s6c6A4mZx6w.png"}}
          style={{height:"100%",width:"100%",borderRadius:10}}
          />

        </View>
        <Text style={{marginTop:5,fontWeight:"500",marginLeft:10}}>Social Media Reputation</Text>
        </View>
       </TouchableOpacity>

        <TouchableOpacity onPress={()=> Linking.openURL('https://www.searchenginejournal.com/twitter-analytics-marketing/457287/')}>
        <View>
        <View style={{width:180,height:130,backgroundColor:Colors.primary,margin:5,borderRadius:10,marginRight:15}}>
          <Image
          source={{uri:"https://www.searchenginejournal.com/wp-content/uploads/2022/07/twitter-analytics-62cebc3299b60-sej-1520x800.webp"}}
          style={{height:"100%",width:"100%",borderRadius:10}}
          />

        </View>
        <Text style={{marginTop:5,fontWeight:"500",marginLeft:10}}>Twitter Analytics</Text>
        </View>
        </TouchableOpacity>

       

       

    
        <TouchableOpacity onPress={()=> Linking.openURL('https://www.searchenginejournal.com/twitter-analytics-marketing/457287/')}>
        <View>
        <View style={{width:175,height:130,backgroundColor:Colors.primary,margin:5,borderRadius:10,marginRight:15}}>
          <Image
          source={{uri:"https://www.searchenginejournal.com/wp-content/uploads/2022/07/twitter-analytics-62cebc3299b60-sej-1520x800.webp"}}
          style={{height:"100%",width:"100%",borderRadius:10}}
          />

        </View>
        <Text style={{marginTop:5,fontWeight:"500",marginLeft:10}}>Twitter Analytics</Text>
        </View>
        </TouchableOpacity>


       </View>
        </ScrollView>

       

       </View>

       {/* <Text style={{fontSize:22,fontWeight:"500",marginTop:15,marginLeft:5}}>Scan Now</Text>

<View style={{height:100,backgroundColor:Colors.primary,marginTop:10,borderRadius:10}}>


</View> */}

      
        

    

        
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width:"100%", 
  },
  
  heading:{
  textAlign:"center",
  fontSize:22,
  marginTop:15,
  fontWeight:"500"  
}
});