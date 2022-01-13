
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, ImageBackground, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Line, Circle } from 'react-native-svg';
import { Icon, ThemeContext } from 'react-native-elements'
import { useFonts } from 'expo-font';
import { theme } from '../theme';





export default function Home() {
    const navigation = useNavigation();
    const [token, setToken] = useState('');
    const [github, setGithub] = useState('');
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
            "displayName": "Ebtesam H.",
            "displayNameSetting": "name",
            "distanceUnit": "en_US",
            "encodedId": "66JB7Q",
            "features": {
                "exerciseGoal": true
            },
            "firstName": "Ebtesam",
            "fullName": "Ebtesam H",
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
    "ebtesam", "git": "20", "image": "bafybeieprkda4wgpvhblzzvit5wl5wbmvdpjrj6f2e566htkhfhbjacicm.ipfs.dweb.link"}]});
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
        "name": "ebtesam",
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
        "name": "ebtesam",
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

      const getGithub = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('@github')
          setGithub(jsonValue);
          return jsonValue != null ? JSON.parse(jsonValue) : null
        } catch(e) {
          // read error
        }
      
        console.log('Done.')
      
      }
    

    React.useEffect(() => {
        getToken();
        getGithub();
        if(token!=''){
            _getActivity(token);
        }
        
      }, []);


    return (
        <View style={styles.container}>
            <View style={{backgroundColor:"#000", borderRadius:20, padding:'5%'}}>
            <View style={{flexDirection:'row', justifyContent:'center'}}>
                <Icon name="github" type="ant-design" color="#FFF" size={30}></Icon>
                <Text style={{fontWeight:'bold', color:"#FFF", fontSize:25, textAlignVertical:'center', marginLeft:'2.5%'}}>Github</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:'5%'}}>
                <Text style={{ color:"#FFF", fontSize:13, textAlign:'center'}}>Handle</Text>
                <Text style={{ color:"#FFF", fontSize:13, textAlign:'center'}}>Activity/Goal</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:'1.5%'}}>
                <Text style={{fontWeight:'bold', color:"#FFF", fontSize:15, textAlign:'center'}}>@{github}</Text>
                <Text style={{fontWeight:'bold', color:"#FFF", fontSize:15, textAlign:'center'}}>{data.gits[0].actions}/50</Text>
            </View>
            </View>

            <View style={{marginTop:'5%'}}></View>

            <View style={{backgroundColor:"#00B0B9", borderRadius:20, padding:'5%'}}>
            <View style={{flexDirection:'row', justifyContent:'center'}}>
                <Icon name="google-fit" type="material-community" color="#FFF" size={30}></Icon>
                <Text style={{fontWeight:'bold', color:"#FFF", fontSize:25, textAlignVertical:'center', marginLeft:'2.5%'}}>Fitbit</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:'5%'}}>
                <Text style={{ color:"#FFF", fontSize:13, textAlign:'center'}}>Parameters</Text>
                <Text style={{ color:"#FFF", fontSize:13, textAlign:'center'}}>Achieved/Goal</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:'1.5%'}}>
                <Text style={{fontWeight:'bold', color:"#FFF", fontSize:15, textAlign:'center'}}>Steps</Text>
                <Text style={{fontWeight:'bold', color:"#FFF", fontSize:15, textAlign:'center'}}>{data.readings[0].steps}/{activity.goals.steps}</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:'1.5%'}}>
                <Text style={{fontWeight:'bold', color:"#FFF", fontSize:15, textAlign:'center'}}>Calories</Text>
                <Text style={{fontWeight:'bold', color:"#FFF", fontSize:15, textAlign:'center'}}>{data.readings[0].calories}/{activity.goals.caloriesOut}</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:'1.5%'}}>
                <Text style={{fontWeight:'bold', color:"#FFF", fontSize:15, textAlign:'center'}}>Active</Text>
                <Text style={{fontWeight:'bold', color:"#FFF", fontSize:15, textAlign:'center'}}>30/{activity.goals.activeMinutes}</Text>
            </View>
            <Text style={{fontWeight:'bold', color:"#FFF", fontSize:12, textAlign:'center', marginTop:'15%'}}>*BMR={data.readings[0].bmr}</Text>
            </View>

            <View style={{marginTop:'5%'}}></View>


            <View style={{backgroundColor:"#000", borderRadius:20, padding:'5%'}}>
            <View style={{flexDirection:'row', justifyContent:'center'}}>
                <Icon name="md-heart-circle" type="ionicon" color="#FFF" size={30}></Icon>
                <Text style={{fontWeight:'bold', color:"#FFF", fontSize:25, textAlignVertical:'center', marginLeft:'2.5%'}}>NFTs</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:'5%'}}>
                <Text style={{ color:"#FFF", fontSize:13, textAlign:'center'}}>Git</Text>
                <Text style={{ color:"#FFF", fontSize:13, textAlign:'center'}}>Steps</Text>
                <Text style={{ color:"#FFF", fontSize:13, textAlign:'center'}}>Calories</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:'1.5%'}}>
                <Text style={{fontWeight:'bold', color:"#FFF", fontSize:15, textAlign:'center'}}>20/40</Text>
                <Text style={{fontWeight:'bold', color:"#FFF", fontSize:15, textAlign:'center'}}>600/1000</Text>
                <Text style={{fontWeight:'bold', color:"#FFF", fontSize:15, textAlign:'center'}}>500/10000</Text>
            </View>
            <Image source={{uri:'http://bafybeieprkda4wgpvhblzzvit5wl5wbmvdpjrj6f2e566htkhfhbjacicm.ipfs.dweb.link'}} style={{width:200, height:100, resizeMode:'contain', alignSelf:'center', borderRadius:10}}></Image>
            </View>

            <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                <TouchableOpacity onPress={()=>_generateNFT()}><View style={{flexDirection:'row', justifyContent:'space-evenly', backgroundColor:"#000", borderRadius:10, padding:'2.5%', width:'65%', marginVertical:'5%', alignSelf:'center'}}>
                <Icon name="md-add-circle-sharp" type="ionicon" color="#FFF"></Icon>
                <Text style={{fontWeight:'bold', color:"#FFF", fontSize:15, textAlign:'center'}}>Generate NFT</Text>
            </View></TouchableOpacity>
            <TouchableOpacity onPress={()=>_mintNFT()}><View style={{flexDirection:'row', justifyContent:'space-evenly', backgroundColor:"#000", borderRadius:10, padding:'2.5%', width:'65%', marginVertical:'5%', alignSelf:'center'}}>
                <Icon name="heart-circle-sharp" type="ionicon" color="#FFF"></Icon>
                <Text style={{fontWeight:'bold', color:"#FFF", fontSize:15, textAlign:'center'}}>Mint NFT</Text>
            </View></TouchableOpacity>
            </View>

            
            
            <View style={{flexDirection:'row', justifyContent:'space-evenly', backgroundColor:"#000", borderRadius:20, padding:'3.5%'}}>
                <Icon name="home" type="ionicon" color="#FFF"></Icon>
                <Icon name="users" type="font-awesome-5" color="#666"></Icon>
                <Icon name="user-tag" type="font-awesome-5" color="#666"></Icon>
                <TouchableOpacity onPress={()=>navigation.navigate('Wallet')}><Icon name="wallet" type="font-awesome-5" color="#666"></Icon></TouchableOpacity>
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