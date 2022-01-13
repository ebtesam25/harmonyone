
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, ImageBackground, ScrollView, TouchableOpacity, Linking, FlatList, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Line, Circle } from 'react-native-svg';
import { Icon, ThemeContext } from 'react-native-elements'
import { useFonts } from 'expo-font';
import * as Crypto from 'expo-crypto';
import { theme } from '../theme';
import { TextInput } from 'react-native-gesture-handler';
import { RadioButton } from 'react-native-paper';










export default function Wallet() {
    const navigation = useNavigation();
    const [token, setToken] = useState('');
    const [harmony, setHarmony] = useState('');
    const [checked, setChecked] = React.useState('calories');
    const [profile, setProfile] = React.useState({
        "user": {
            "age": 23,
            "ambassador": false,
            "avatar": "https://static0.fitbit.com/images/profile/defaultProfile_100.png",
            "avatar150": "https://static0.fitbit.com/images/profile/defaultProfile_150.png",
            "avatar640": "https://static0.fitbit.com/images/profile/defaultProfile_640.png",
            "averageDailySteps": 0,
            "challengesBeta": true,
            "clockTimeDisplayFormat": "12hour",
            "corporate": false,
            "corporateAdmin": false,
            "dateOfBirth": "1998-07-25",
            "displayName": "Test H.",
            "displayNameSetting": "name",
            "distanceUnit": "en_US",
            "encodedId": "66JB7Q",
            "features": {
                "exerciseGoal": true
            },
            "firstName": "Test",
            "fullName": "Test H",
            "gender": "FEMALE",
            "glucoseUnit": "en_US",
            "height": 200.0,
            "heightUnit": "en_US",
            "isBugReportEnabled": false,
            "isChild": false,
            "isCoach": false,
            "languageLocale": "en_US",
            "lastName": "H",
            "legalTermsAcceptRequired": true,
            "locale": "en_US",
            "memberSince": "2017-12-20",
            "mfaEnabled": true,
            "offsetFromUTCMillis": -18000000,
            "phoneNumber": "+15710000000",
            "sdkDeveloper": false,
            "sleepTracking": "Normal",
            "startDayOfWeek": "SUNDAY",
            "strideLengthRunning": 94.5,
            "strideLengthRunningType": "manual",
            "strideLengthWalking": 66.0,
            "strideLengthWalkingType": "manual",
            "swimUnit": "en_US",
            "temperatureUnit": "en_US",
            "timezone": "America/New_York",
            "topBadges": [],
            "weight": 100.0,
            "weightUnit": "METRIC"
        }
    })
    const [data, setData] = useState({"status": "success", "readings": [{"steps": "10000", "ts": "1332042634", "calories": "100", "bmr": "1500"}], "gits":
    [{"actions": "30", "ts": "1332042634"}], "nfts": [{"steps": "1000", "ts": 174250898, "calories": "1300", "name":
    "Test", "git": "20", "image": "bafybeieprkda4wgpvhblzzvit5wl5wbmvdpjrj6f2e566htkhfhbjacicm.ipfs.dweb.link"}]});

    const [bets, setBets] = useState({"status": "results", "bets": [{"target": 2444, "amount": "100", "type": "calories", "betid": "2", "time":
    1641971323767, "status": "open"}]})
    const allBets = bets.bets.map((data) => {
        return(
        <View style={{marginHorizontal:'15%'}}>
            <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:'1.5%'}}>
                <Text style={{fontWeight:'bold', color:"#FFF", fontSize:15, textAlign:'left'}}>Target</Text>
                <Text style={{fontWeight:'bold', color:"#FFF", fontSize:15, textAlign:'right'}}>{data.target}</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:'1.5%'}}>
                <Text style={{fontWeight:'bold', color:"#FFF", fontSize:15, textAlign:'left'}}>Type</Text>
                <Text style={{fontWeight:'bold', color:"#FFF", fontSize:15, textAlign:'right'}}>{data.type}</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:'1.5%'}}>
                <Text style={{fontWeight:'bold', color:"#FFF", fontSize:15, textAlign:'left'}}>Amount</Text>
                <Text style={{fontWeight:'bold', color:"#FFF", fontSize:15, textAlign:'right'}}>{data.amount}</Text>
            </View>
            </View>
        )
    });

    const [activity, setActivity] = React.useState({
        "activities": [],
        "goals": {
            "activeMinutes": 30,
            "caloriesOut": 2444,
            "distance": 8.05,
            "steps": 10000
        },
        "summary": {
            "activeScore": -1,
            "activityCalories": 0,
            "caloriesBMR": 1477,
            "caloriesOut": 1477,
            "distances": [
                {
                    "activity": "total",
                    "distance": 0
                },
                {
                    "activity": "tracker",
                    "distance": 0
                },
                {
                    "activity": "loggedActivities",
                    "distance": 0
                },
                {
                    "activity": "veryActive",
                    "distance": 0
                },
                {
                    "activity": "moderatelyActive",
                    "distance": 0
                },
                {
                    "activity": "lightlyActive",
                    "distance": 0
                },
                {
                    "activity": "sedentaryActive",
                    "distance": 0
                }
            ],
            "fairlyActiveMinutes": 0,
            "lightlyActiveMinutes": 0,
            "marginalCalories": 0,
            "sedentaryMinutes": 1440,
            "steps": 0,
            "veryActiveMinutes": 0
        }
    })

        
        const _privateKey =  async () => {
            const digest = await Crypto.digestStringAsync(
              Crypto.CryptoDigestAlgorithm.SHA256,
              'teamzero'
            );
            console.log('Digest: ', digest);
            _createWallet(digest);
          };

        const getKey = async () => {
            
          
        }

        const _connectWallet = async () => {

            try {
                const jsonValue = await AsyncStorage.getItem('@harmony_pub')
                //setHarmony(jsonValue);
                if(!jsonValue){
                    navigation.navigate('Qr');
                }
              } catch(e) {
                // read error
              }
            
        }

    

    const [git, setGit] = useState('20');

    const _getActivity = (token) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
    
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
    
        var profile = {};
        var activity = {};
        
        fetch("https://api.fitbit.com/1/user/66JB7Q/activities/date/2022-01-01.json", requestOptions)
          .then(response => response.json())
          .then(result => {console.log(result); activity=result; setActivity(result)})
          .catch(error => console.log('error', error));
    
        fetch("https://api.fitbit.com/1/user/66JB7Q/profile.json", requestOptions)
          .then(response => response.json())
          .then(result => {console.log(result); profile=result;})
          .catch(error => console.log('error', error));
    
    
        _rawReadings();
    }

    const _rawReadings = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
          "action": "addraw",
          "userid": "2",
          "ts": Date.now(),
          "steps": activity.summary.steps,
          "calories": activity.summary.caloriesOut,
          "bmr": activity.summary.caloriesBMR
        });
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        console.log("Raw:",raw)
        
        fetch("https://us-central1-aiot-fit-xlab.cloudfunctions.net/newfit", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
      }

    const _generateNFT = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "name": "Test",
        "userid": "2",
        "git": git,
        "steps": activity.summary.steps,
        "calories": activity.summary.caloriesOut,
        "targetsteps": activity.goals.steps,
        "targetcals": activity.goals.caloriesOut,
        "targetgit": "40",
        "ts": 174250898
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://532b-173-251-116-226.ngrok.io/NFTize", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }

const _mintNFT = (uri) => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "action": "addnfts",
        "name": "Test",
        "userid": "2",
        "git": git,
        "steps": activity.summary.steps,
        "calories": activity.summary.caloriesOut,
        "targetsteps": activity.goals.steps,
        "image": uri,
        "ts": Date.now()
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("https://us-central1-aiot-fit-xlab.cloudfunctions.net/newfit", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    }

    const getToken = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('@fitbit_token')
          setToken(jsonValue);
          return jsonValue != null ? JSON.parse(jsonValue) : null
        } catch(e) {
          // read error
        }
      
        console.log('Done.')
      
      }

    const _createWallet = (pvtKey) => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "action": "createwallet",
        "userid": "1",
        "balance": "0",
        "privatekey": pvtKey,
        "currency": "USD"
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("https://us-central1-aiot-fit-xlab.cloudfunctions.net/helpinghands", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    }

    const _placeBet = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "action": "placebet",
        "userid": "1",
        "target": activity.goals.caloriesOut,
        "type": checked,
        "amount": "100",
        "time": Date.now()
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("https://us-central1-aiot-fit-xlab.cloudfunctions.net/helpinghands", requestOptions)
        .then(response => response.text())
        .then(result => {console.log(result);_getAllBets();})
        .catch(error => console.log('error', error));
    }

    const _getAllBets = () => {
        var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "action": "getbetsbyuser",
  "userid": "1"
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://us-central1-aiot-fit-xlab.cloudfunctions.net/helpinghands", requestOptions)
  .then(response => response.json())
  .then(result => {console.log(result);setBets(result);})
  .catch(error => console.log('error', error));
    }
    

    React.useEffect(() => {
        getToken();
        if(token!=''){
            
        }
        
      }, []);

      

      
    


    return (
        <View style={styles.container}>
            <View style={{backgroundColor:"#000", borderRadius:20, padding:'5%'}}>
            <View style={{flexDirection:'row', justifyContent:'center'}}>
                <Icon name="wallet" type="ant-design" color="#FFF" size={30}></Icon>
                <Text style={{fontWeight:'bold', color:"#FFF", fontSize:25, textAlignVertical:'center', marginLeft:'2.5%'}}>Wallet</Text>
            </View>
            <TouchableOpacity onPress={()=>navigation.navigate('Qr')}><View style={{flexDirection:'row', justifyContent:'space-around', marginTop:'5%', backgroundColor:"#FFF", borderRadius:5, paddingVertical:'1.5%'}}>
                <Text style={{ color:"#000", fontSize:15, textAlign:'center', fontWeight:'bold'}}>{harmony? "Connect Wallet":"Wallet Connected"}</Text>
            </View></TouchableOpacity>
            <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:'5%'}}>
                <Text style={{fontWeight:'bold', color:"#FFF", fontSize:12, textAlign:'center'}}>Powered by Harmony</Text>
            </View>
            </View>

            <View style={{marginTop:'5%'}}></View>

            <View style={{backgroundColor:"#00B0B9", borderRadius:20, padding:'5%'}}>
            <View style={{flexDirection:'row', justifyContent:'center'}}>
                <Icon name="google-fit" type="material-community" color="#FFF" size={30}></Icon>
                <Text style={{fontWeight:'bold', color:"#FFF", fontSize:25, textAlignVertical:'center', marginLeft:'2.5%'}}>FitBets</Text>
            </View>
      
            {allBets}
            
            <Text style={{fontWeight:'bold', color:'#FFF', marginTop:'15%', marginHorizontal:'15%', fontSize:18}}>Place a bet</Text>

            <TextInput placeholder='Bet Amount' style={{fontSize:15, marginHorizontal:'15%', fontWeight:'bold', color:'#FFF'}}></TextInput>
            <View style={{flexDirection:'row', marginHorizontal:'10%'}}><View style={{flexDirection:'row'}}><RadioButton
                value="calories"
                status={ checked === 'calories' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('calories')}
            /><Text style={{textAlignVertical:'center', fontWeight:'bold', color:"#FFF"}}>Calories</Text></View>
            <View style={{flexDirection:'row'}}><RadioButton
                value="steps"
                status={ checked === 'steps' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('steps')}
            /><Text style={{textAlignVertical:'center', fontWeight:'bold', color:"#FFF"}}>Steps</Text></View>
            </View>
            <TouchableOpacity onPress={()=>_placeBet()}>
                <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:'5%', backgroundColor:"#FFF", borderRadius:5, paddingVertical:'1.5%'}}>
                    <Text style={{ color:"#000", fontSize:15, textAlign:'center', fontWeight:'bold'}}>Place Bet</Text>
                </View>
            </TouchableOpacity>
            </View>


            

            <View style={{marginTop:'70%'}}></View>



           

            
            
            <View style={{flexDirection:'row', justifyContent:'space-evenly', backgroundColor:"#000", borderRadius:20, padding:'3.5%'}}>
                <Icon name="home" type="ionicon" color="#666"></Icon>
                <Icon name="users" type="font-awesome-5" color="#666"></Icon>
                <Icon name="user-tag" type="font-awesome-5" color="#666"></Icon>
                <Icon name="wallet" type="font-awesome-5" color="#FFF"></Icon>
            </View>
            


        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        position: 'relative',
        backgroundColor: theme.white,
        paddingHorizontal: '7.5%',
        paddingVertical: '10%'
    },
    header: {
        height: '55%',
        width: '100%',
        marginTop: '-5%',
        resizeMode: 'contain',
        alignSelf: 'center'
    },

});