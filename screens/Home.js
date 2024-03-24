import React,{useEffect,useRef,useState}from 'react';
import { Modal, View, Image, Button,Text,StyleSheet, TouchableOpacity , Dimensions, Animated, Easing,Linking, Alert,StatusBar} from 'react-native';
import Colors from '../colors';
import { ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { auth, database } from '../config/firebase'
import {collection,addDoc,orderBy,query,onSnapshot,getDocs,docRef,getDoc,doc, QuerySnapshot,where} from 'firebase/firestore';
import colors from '../colors';
import { getAuth,signOut} from "firebase/auth";



const { width } = Dimensions.get('window');


const Home = () => {
  const navigation = useNavigation();
  const animationRef = useRef(null);
  const [name,SetName]=useState("");

  const currentmail=getAuth()?.currentUser.email;
  useEffect(() => {

    const collectionRef = collection(database, 'Users');
    const q = query(collectionRef, where("email", "==", currentmail));
  
  const unsubscribe = onSnapshot(q, querySnapshot => {
    console.log('querySnapshot unsusbscribe');
      SetName(
        querySnapshot.docs.map(doc => ({
          name: doc.data().name
        }))
      );
    });
  return unsubscribe;
  }, []);
  console.log(name);

  function bloglink(link){

    Alert.alert('Blog Link', 'Are you want to redirect to that link?', [
      {
        text: 'Ok',
        onPress: () => Linking.openURL(link) ,
      },
      {
        text: 'Cancel',
       
        style: 'cancel',
      },
    ]);
  }



  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary}/>
       
      <View
      style={{
        height: 60,
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
          Hello!
        </Text>
        <Text
          style={{
            fontSize: 26,
            color: 'white',
            fontWeight: '500',
          }}
        >
          {name[0]?.name}
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
       
        
        <View>
        
      <View
        style={{
          height: 50,
          backgroundColor: colors.primary,
          //borderRadius: 10,
         // width: width - 30, // Adjust the width according to the screen size
          //margin: 15,
          marginBottom:50,
          borderBottomStartRadius:10,
          borderBottomEndRadius:10
          //elevation:5
        }}
      > 

    
     <View style={{flexDirection:'row',justifyContent:'space-between',padding:20,bottom:10}}>
     <Image source={require('../animations/smile.gif')} style={{ width: 80, height: 80 }} />
      <Image source={require('../animations/neutral.gif')} style={{ width: 80, height: 80 }} />
      <Image source={require('../animations/anger.gif')} style={{ width: 80, height: 80 }} />

     </View>

     {/* <Text style={{fontSize:15,textAlign:'center',color:'white'}}>   Sensing  Sentiments  Swiftly..... </Text> */}
     

       
      </View>

   
        </View>



       <View style={{margin:5,flex:1,padding:10,bottom:10}}>

     



       <Text style={{fontSize:20,fontWeight:"500",marginLeft:5,marginBottom:10}}>Features</Text>

       <View style={{height:130,backgroundColor:Colors.primary,borderRadius:10,flexDirection:"row",padding:10,elevation:30,shadowColor:Colors.primary,justifyContent:"space-around"}}>


        

    <TouchableOpacity onPress={()=>navigation.navigate('Analytics')}>
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

    <TouchableOpacity onPress={()=>navigation.navigate('Analytics')} >

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


   <TouchableOpacity onPress={()=>navigation.navigate('Reports')}>
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
        <View  style={{}}  >

          <View style={{flexDirection:'row',justifyContent:'space-around'}}>

          
        
        <TouchableOpacity onPress={()=> bloglink('https://www.aimtechnologies.co/whats-sentiment-analysis-decoding-emotions-in-textual-data')}>
      
        <View style={{width:140,height:100,backgroundColor:Colors.primary,margin:5,borderRadius:10,marginRight:15,}}>
          <Image
          source={{uri:"https://www.aimtechnologies.co/wp-content/uploads/2023/08/Whats-Sentiment-Analysis-1.png"}}
          style={{height:"100%",width:"100%",borderRadius:10}}
          />
          {/* https://www.aimtechnologies.co/whats-sentiment-analysis-decoding-emotions-in-textual-data/ */}

        </View>
        <Text style={{marginTop:5,fontWeight:"500",marginBottom:10,marginLeft:5,fontSize:12}}>What is Sentiment Analysis?</Text>
        
        </TouchableOpacity>


     
       <TouchableOpacity onPress={()=>bloglink('https://medium.com/@moneytent/the-benefits-of-using-ai-for-online-reputation-management-619f3e95d846')}>
       <View>
        <View style={{width:140,height:100,backgroundColor:Colors.primary,margin:5,borderRadius:10,marginRight:15}}>
          <Image
          source={{uri:"https://miro.medium.com/v2/resize:fit:1400/1*Bifn6NJxT76s6c6A4mZx6w.png"}}
          style={{height:"100%",width:"100%",borderRadius:10}}
          />

        </View>
        <Text style={{marginTop:5,fontWeight:"500",marginLeft:10,fontSize:12}}>Social Media Reputation</Text>
        </View>
       </TouchableOpacity>

       </View>




        <View style={{flexDirection:'row',justifyContent:'space-around'}}>

      
        <TouchableOpacity onPress={()=> bloglink('https://www.searchenginejournal.com/twitter-analytics-marketing/457287/')}>
        <View>
        <View style={{width:140,height:100,backgroundColor:Colors.primary,margin:5,borderRadius:10,marginRight:15}}>
          <Image
          source={{uri:"https://www.searchenginejournal.com/wp-content/uploads/2022/07/twitter-analytics-62cebc3299b60-sej-1520x800.webp"}}
          style={{height:"100%",width:"100%",borderRadius:10}}
          />

        </View>
        <Text style={{marginTop:5,fontWeight:"500",marginLeft:10,fontSize:13}}>Twitter Analytics</Text>
        </View>
        </TouchableOpacity>
      

       

       <TouchableOpacity onPress={()=> bloglink('https://www.wsiworld.com/blog/improve-your-digital-reputation-with-social-media-and-content')}>
        <View>
        <View style={{width:140,height:100,backgroundColor:Colors.primary,margin:5,borderRadius:10,marginRight:15}}>
          <Image
          source={{uri:"https://www.wsiworld.com/hs-fs/hubfs/Imported_blog_featured_image/ReputationManagement.jpeg?width=837&height=465&name=ReputationManagement.jpeg"}}
          style={{height:"100%",width:"100%",borderRadius:10}}
          />

        </View>
        <Text style={{marginTop:5,fontWeight:"500",marginLeft:10,fontSize:13}}>Digital Management</Text>
        </View>
        </TouchableOpacity> 
        
        </View>

        <TouchableOpacity onPress={()=> bloglink('https://appinventiv.com/blog/ai-sentiment-analysis-in-business/')}>
        <View>
        <View style={{width:140,height:100,backgroundColor:Colors.primary,margin:5,borderRadius:10,marginRight:15,marginTop:15}}>
          <Image
          source={{uri:"data:image/png;base64,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"}}
          style={{height:"100%",width:"100%",borderRadius:10}}
          />

        </View>
        <Text style={{marginTop:5,fontWeight:"500",marginLeft:10,fontSize:12}}>Impact of Sentiment Analysis</Text>
        </View>
        </TouchableOpacity>

     

        {/* <TouchableOpacity onPress={()=> bloglink('https://www.precedenceresearch.com/artificial-intelligence-in-healthcare-market')}>
        <View>
        <View style={{width:140,height:100,backgroundColor:Colors.primary,margin:5,borderRadius:10,marginRight:15,marginTop:15}}>
          <Image
          source={{uri:"https://www.precedenceresearch.com/insightimg/Artificial-Intelligence-in-Healthcare-Market-Size-2021-to-2030.jpg"}}
          style={{height:"100%",width:"100%",borderRadius:10}}
          />

        </View>
        <Text style={{marginTop:5,fontWeight:"500",marginLeft:10,fontSize:12}}>Market of AI</Text>
        </View>
        </TouchableOpacity> */}


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