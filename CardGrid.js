import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View, TextInput, Button } from 'react-native';
import App from './App';





export default function CardGrid(pressFunction) {
  function pressedButton(card) {
    pressFunction(card);
  }
  return (
    <SafeAreaView>
      <View style={styles.flexContainer}>
        <Button style={styles.buttonStyle} title="2c" onPress={() => pressedButton("2c")}/>
        <Button style={styles.buttonStyle} title="3c" onPress={() => pressedButton("3c")}/>
        <Button style={styles.buttonStyle} title="4c" onPress={() => pressedButton("4c")}/>
        <Button style={styles.buttonStyle} title="5c" onPress={() => pressedButton("5c")}/>
        <Button style={styles.buttonStyle} title="6c" onPress={() => pressedButton("6c")}/>
        <Button style={styles.buttonStyle} title="7c" onPress={() => pressedButton("7c")}/>
        <Button style={styles.buttonStyle} title="8c" onPress={() => pressedButton("8c")}/>
      </View>

      <View style={styles.flexContainer}>    
        <Button style={styles.buttonStyle} title="9c" onPress={() => pressedButton("9c")}/>
        <Button style={styles.buttonStyle} title="Tc" onPress={() => pressedButton("Tc")}/>
        <Button style={styles.buttonStyle} title="Jc" onPress={() => pressedButton("Jc")}/>
        <Button style={styles.buttonStyle} title="Qc" onPress={() => pressedButton("Qc")}/>
        <Button style={styles.buttonStyle} title="Kc" onPress={() => pressedButton("Kc")}/>
        <Button style={styles.buttonStyle} title="Ac" onPress={() => pressedButton("Ac")}/>
      </View>

      <View style={styles.flexContainer}>
        <Button style={styles.buttonStyle} title="2d" onPress={() => pressedButton("2d")}/>
        <Button style={styles.buttonStyle} title="3d" onPress={() => pressedButton("3d")}/>
        <Button style={styles.buttonStyle} title="4d" onPress={() => pressedButton("4d")}/>
        <Button style={styles.buttonStyle} title="5d" onPress={() => pressedButton("5d")}/>
        <Button style={styles.buttonStyle} title="6d" onPress={() => pressedButton("6d")}/>
        <Button style={styles.buttonStyle} title="7d" onPress={() => pressedButton("7d")}/>
        <Button style={styles.buttonStyle} title="8d" onPress={() => pressedButton("8d")}/>
      </View>

      <View style={styles.flexContainer}>    
        <Button style={styles.buttonStyle} title="9d" onPress={() => pressedButton("9d")}/>
        <Button style={styles.buttonStyle} title="Td" onPress={() => pressedButton("Td")}/>
        <Button style={styles.buttonStyle} title="Jd" onPress={() => pressedButton("Jd")}/>
        <Button style={styles.buttonStyle} title="Qd" onPress={() => pressedButton("Qd")}/>
        <Button style={styles.buttonStyle} title="Kd" onPress={() => pressedButton("Kd")}/>
        <Button style={styles.buttonStyle} title="Ad" onPress={() => pressedButton("Ad")}/>
      </View>

      <View style={styles.flexContainer}>  
        <Button style={styles.buttonStyle} title="2h" onPress={() => pressedButton("2h")}/>
        <Button style={styles.buttonStyle} title="3h" onPress={() => pressedButton("3h")}/>
        <Button style={styles.buttonStyle} title="4h" onPress={() => pressedButton("4h")}/>
        <Button style={styles.buttonStyle} title="5h" onPress={() => pressedButton("5h")}/>
        <Button style={styles.buttonStyle} title="6h" onPress={() => pressedButton("6h")}/>
        <Button style={styles.buttonStyle} title="7h" onPress={() => pressedButton("7h")}/>
        <Button style={styles.buttonStyle} title="8h" onPress={() => pressedButton("8h")}/>
      </View>

      <View style={styles.flexContainer}>    
        <Button style={styles.buttonStyle} title="9h" onPress={() => pressedButton("9h")}/>
        <Button style={styles.buttonStyle} title="Th" onPress={() => pressedButton("Th")}/>
        <Button style={styles.buttonStyle} title="Jh" onPress={() => pressedButton("Jh")}/>
        <Button style={styles.buttonStyle} title="Qh" onPress={() => pressedButton("Qh")}/>
        <Button style={styles.buttonStyle} title="Kh" onPress={() => pressedButton("Kh")}/>
        <Button style={styles.buttonStyle} title="Ah" onPress={() => pressedButton("Ah")}/>
      </View>

      <View style={styles.flexContainer}>    
        <Button style={styles.buttonStyle} title="2s" onPress={() => pressedButton("2s")}/>
        <Button style={styles.buttonStyle} title="3s" onPress={() => pressedButton("3s")}/>
        <Button style={styles.buttonStyle} title="4s" onPress={() => pressedButton("4s")}/>
        <Button style={styles.buttonStyle} title="5s" onPress={() => pressedButton("5s")}/>
        <Button style={styles.buttonStyle} title="6s" onPress={() => pressedButton("6s")}/>
        <Button style={styles.buttonStyle} title="7s" onPress={() => pressedButton("7s")}/>
        <Button style={styles.buttonStyle} title="8s" onPress={() => pressedButton("8s")}/>
      </View>

      <View style={styles.flexContainer}>    
        <Button style={styles.buttonStyle} title="9s" onPress={() => pressedButton("9s")}/>
        <Button style={styles.buttonStyle} title="Ts" onPress={() => pressedButton("Ts")}/>
        <Button style={styles.buttonStyle} title="Js" onPress={() => pressedButton("Js")}/>
        <Button style={styles.buttonStyle} title="Qs" onPress={() => pressedButton("Qs")}/>
        <Button style={styles.buttonStyle} title="Ks" onPress={() => pressedButton("Ks")}/>
        <Button style={styles.buttonStyle} title="As" onPress={() => pressedButton("As")}/>
      </View>
    </SafeAreaView>
  )}
  
  const styles = StyleSheet.create({
    flexContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    buttonStyle: {
      minWidth: '13%',
      maxWidth: '13%',
    },
  });




;
