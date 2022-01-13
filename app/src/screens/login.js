import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Line, Circle } from 'react-native-svg';
import { Icon } from 'react-native-elements'
import { useFonts } from 'expo-font';





export default function Login({route}) {
    const navigation = useNavigation();
    

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   
      
    const loggedIn = (email, password) => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "action": "login",
        "email": email,
        "password": password
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("https://us-central1-aiot-fit-xlab.cloudfunctions.net/helpinghands", requestOptions)
        .then(response => response.json())
        .then(result => {console.log(result.status);
            if(result.status=="success"){
                navigation.navigate('Home');
            }})
        .catch(error => console.log('error', error));
        
        
    }
   
    return (
        <View style={styles.container}>
            <View style={{ marginTop: '15%'}}>
            <View style={{flexDirection:'row', display:'flex', marginHorizontal:'10%'}}>
                <TouchableOpacity onPress={()=>navigation.navigate('Register')}><Icon name="chevron-left" type="entypo" color="#00B0B9" size={30}></Icon></TouchableOpacity>
                <Text style={{color:"#00B0B9", textAlignVertical:'center', fontSize:18, fontWeight:'bold'}}>Sign up</Text>
              </View>
              <View style={{position:'relative', marginLeft:'10%', marginTop:'20%'}}>
                <Text style={{ fontSize:30, color:'#00B0B9', fontWeight:'bold'}}>Sign In</Text>
                <TextInput value={email} onChangeText={setEmail} style={{backgroundColor:'#FFF',fontWeight:'bold', borderRadius:10, width:'90%', height:50, marginTop:'5%', paddingLeft:'5%'}} placeholder="Email address" placeholderTextColor="#00B0B9"></TextInput>
                <TextInput value={password} onChangeText={setPassword} secureTextEntry style={{backgroundColor:"#FFF", fontWeight:'bold',borderRadius:10, width:'90%', height:50, marginTop:'5%', paddingLeft:'5%'}} placeholder="Password" placeholderTextColor="#00B0B9"></TextInput>
              </View>
              <View style={{backgroundColor:'#00B0B9', marginTop:'15%', width:'70%', alignSelf:'center', paddingVertical:'3.5%', borderRadius:15}}>
                <TouchableOpacity onPress={()=> loggedIn(email,password)}><Text style={{textAlign:'center', color:'#FFF',  fontSize:18, fontWeight:'bold'}}>Sign In</Text></TouchableOpacity>
              </View>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        position: 'relative',
        backgroundColor: '#EDF2F6'
    },
    header: {
        height:'34%',
        width:'34%',
        resizeMode:'contain',
        marginLeft:'10%'
    },

});