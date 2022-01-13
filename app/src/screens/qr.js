import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function Qr() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const _storePvtKey = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@harmony_pvt', jsonValue)
    } catch (e) {
      // saving error
    }
  }
  const _storePubKey = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@harmony_pub', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  const _createWallet = (pvtKey) => {
      _storePvtKey(pvtKey);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "action": "createwallet",
    "userid": "1",
    "balance": "0",
    "privatekey": pvtKey,
    "currency": "ONE"
    });

    console.log(raw);

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

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log(JSON.parse(data).private);
    _storePubKey(JSON.parse(data).public);
    _createWallet(JSON.parse(data).private);
    alert(`Wallet added successfully ${data}`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
