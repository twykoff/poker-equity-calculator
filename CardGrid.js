import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View, TextInput, Button, TouchableOpacity } from 'react-native';
import React, {useImperativeHandle, forwardRef, useRef} from 'react';

import Card from './Card';





const CardGrid = (props, ref) => {

  const cardGridRefAs = useRef();
  const cardGridRefKs = useRef();
  const cardGridRefQs = useRef();
  const cardGridRefJs = useRef();
  const cardGridRefTs = useRef();
  const cardGridRef9s = useRef();
  const cardGridRef8s = useRef();
  const cardGridRef7s = useRef();
  const cardGridRef6s = useRef();
  const cardGridRef5s = useRef();
  const cardGridRef4s = useRef();
  const cardGridRef3s = useRef();
  const cardGridRef2s = useRef();
    
  const cardGridRefAh = useRef();
  const cardGridRefKh = useRef();
  const cardGridRefQh = useRef();
  const cardGridRefJh = useRef();
  const cardGridRefTh = useRef();
  const cardGridRef9h = useRef();
  const cardGridRef8h = useRef();
  const cardGridRef7h = useRef();
  const cardGridRef6h = useRef();
  const cardGridRef5h = useRef();
  const cardGridRef4h = useRef();
  const cardGridRef3h = useRef();
  const cardGridRef2h = useRef();
  
  const cardGridRefAc = useRef();
  const cardGridRefKc = useRef();
  const cardGridRefQc = useRef();
  const cardGridRefJc = useRef();
  const cardGridRefTc = useRef();
  const cardGridRef9c = useRef();
  const cardGridRef8c = useRef();
  const cardGridRef7c = useRef();
  const cardGridRef6c = useRef();
  const cardGridRef5c = useRef();
  const cardGridRef4c = useRef();
  const cardGridRef3c = useRef();
  const cardGridRef2c = useRef();
  
  const cardGridRefAd = useRef();
  const cardGridRefKd = useRef();
  const cardGridRefQd = useRef();
  const cardGridRefJd = useRef();
  const cardGridRefTd = useRef();
  const cardGridRef9d = useRef();
  const cardGridRef8d = useRef();
  const cardGridRef7d = useRef();
  const cardGridRef6d = useRef();
  const cardGridRef5d = useRef();
  const cardGridRef4d = useRef();
  const cardGridRef3d = useRef();
  const cardGridRef2d = useRef();

  useImperativeHandle(ref, () => ({
    // methods connected to `ref`
    clearCards: () => { clearCards() },
    clearShortDeck: () => { clearShortDeck() },
    addCardBack: (cardValue) => {addCardBack(cardValue)}
  }))

  
  const pressedButton = (cardValue) => {
    //console.log("cardGrid " + cardValue)
  }

   
  const clearShortDeck = () => {
    //console.log("clear cards")
    cardGridRef5s.current.disableCard();
    cardGridRef4s.current.disableCard();
    cardGridRef3s.current.disableCard();
    cardGridRef2s.current.disableCard();
    
    cardGridRef5h.current.disableCard();
    cardGridRef4h.current.disableCard();
    cardGridRef3h.current.disableCard();
    cardGridRef2h.current.disableCard();
    
    cardGridRef5c.current.disableCard();
    cardGridRef4c.current.disableCard();
    cardGridRef3c.current.disableCard();
    cardGridRef2c.current.disableCard();
    
    cardGridRef5d.current.disableCard();
    cardGridRef4d.current.disableCard();
    cardGridRef3d.current.disableCard();
    cardGridRef2d.current.disableCard();
  }

  
  const clearCards = () => {
    //console.log("clear cards")
    cardGridRefAs.current.clearCard();
    cardGridRefKs.current.clearCard();
    cardGridRefQs.current.clearCard();
    cardGridRefJs.current.clearCard();
    cardGridRefTs.current.clearCard();
    cardGridRef9s.current.clearCard();
    cardGridRef8s.current.clearCard();
    cardGridRef7s.current.clearCard();
    cardGridRef6s.current.clearCard();
    cardGridRef5s.current.clearCard();
    cardGridRef4s.current.clearCard();
    cardGridRef3s.current.clearCard();
    cardGridRef2s.current.clearCard();
    
    cardGridRefAh.current.clearCard();
    cardGridRefKh.current.clearCard();
    cardGridRefQh.current.clearCard();
    cardGridRefJh.current.clearCard();
    cardGridRefTh.current.clearCard();
    cardGridRef9h.current.clearCard();
    cardGridRef8h.current.clearCard();
    cardGridRef7h.current.clearCard();
    cardGridRef6h.current.clearCard();
    cardGridRef5h.current.clearCard();
    cardGridRef4h.current.clearCard();
    cardGridRef3h.current.clearCard();
    cardGridRef2h.current.clearCard();
    
    cardGridRefAc.current.clearCard();
    cardGridRefKc.current.clearCard();
    cardGridRefQc.current.clearCard();
    cardGridRefJc.current.clearCard();
    cardGridRefTc.current.clearCard();
    cardGridRef9c.current.clearCard();
    cardGridRef8c.current.clearCard();
    cardGridRef7c.current.clearCard();
    cardGridRef6c.current.clearCard();
    cardGridRef5c.current.clearCard();
    cardGridRef4c.current.clearCard();
    cardGridRef3c.current.clearCard();
    cardGridRef2c.current.clearCard();
    
    cardGridRefAd.current.clearCard();
    cardGridRefKd.current.clearCard();
    cardGridRefQd.current.clearCard();
    cardGridRefJd.current.clearCard();
    cardGridRefTd.current.clearCard();
    cardGridRef9d.current.clearCard();
    cardGridRef8d.current.clearCard();
    cardGridRef7d.current.clearCard();
    cardGridRef6d.current.clearCard();
    cardGridRef5d.current.clearCard();
    cardGridRef4d.current.clearCard();
    cardGridRef3d.current.clearCard();
    cardGridRef2d.current.clearCard();
  }

  const addCardBack = (cardValue) => {
    //console.log("clear cards")
    cardGridRefAs.current.clearSpecificCard(cardValue);
    cardGridRefKs.current.clearSpecificCard(cardValue);
    cardGridRefQs.current.clearSpecificCard(cardValue);
    cardGridRefJs.current.clearSpecificCard(cardValue);
    cardGridRefTs.current.clearSpecificCard(cardValue);
    cardGridRef9s.current.clearSpecificCard(cardValue);
    cardGridRef8s.current.clearSpecificCard(cardValue);
    cardGridRef7s.current.clearSpecificCard(cardValue);
    cardGridRef6s.current.clearSpecificCard(cardValue);
    cardGridRef5s.current.clearSpecificCard(cardValue);
    cardGridRef4s.current.clearSpecificCard(cardValue);
    cardGridRef3s.current.clearSpecificCard(cardValue);
    cardGridRef2s.current.clearSpecificCard(cardValue);
    
    cardGridRefAh.current.clearSpecificCard(cardValue);
    cardGridRefKh.current.clearSpecificCard(cardValue);
    cardGridRefQh.current.clearSpecificCard(cardValue);
    cardGridRefJh.current.clearSpecificCard(cardValue);
    cardGridRefTh.current.clearSpecificCard(cardValue);
    cardGridRef9h.current.clearSpecificCard(cardValue);
    cardGridRef8h.current.clearSpecificCard(cardValue);
    cardGridRef7h.current.clearSpecificCard(cardValue);
    cardGridRef6h.current.clearSpecificCard(cardValue);
    cardGridRef5h.current.clearSpecificCard(cardValue);
    cardGridRef4h.current.clearSpecificCard(cardValue);
    cardGridRef3h.current.clearSpecificCard(cardValue);
    cardGridRef2h.current.clearSpecificCard(cardValue);
    
    cardGridRefAc.current.clearSpecificCard(cardValue);
    cardGridRefKc.current.clearSpecificCard(cardValue);
    cardGridRefQc.current.clearSpecificCard(cardValue);
    cardGridRefJc.current.clearSpecificCard(cardValue);
    cardGridRefTc.current.clearSpecificCard(cardValue);
    cardGridRef9c.current.clearSpecificCard(cardValue);
    cardGridRef8c.current.clearSpecificCard(cardValue);
    cardGridRef7c.current.clearSpecificCard(cardValue);
    cardGridRef6c.current.clearSpecificCard(cardValue);
    cardGridRef5c.current.clearSpecificCard(cardValue);
    cardGridRef4c.current.clearSpecificCard(cardValue);
    cardGridRef3c.current.clearSpecificCard(cardValue);
    cardGridRef2c.current.clearSpecificCard(cardValue);
    
    cardGridRefAd.current.clearSpecificCard(cardValue);
    cardGridRefKd.current.clearSpecificCard(cardValue);
    cardGridRefQd.current.clearSpecificCard(cardValue);
    cardGridRefJd.current.clearSpecificCard(cardValue);
    cardGridRefTd.current.clearSpecificCard(cardValue);
    cardGridRef9d.current.clearSpecificCard(cardValue);
    cardGridRef8d.current.clearSpecificCard(cardValue);
    cardGridRef7d.current.clearSpecificCard(cardValue);
    cardGridRef6d.current.clearSpecificCard(cardValue);
    cardGridRef5d.current.clearSpecificCard(cardValue);
    cardGridRef4d.current.clearSpecificCard(cardValue);
    cardGridRef3d.current.clearSpecificCard(cardValue);
    cardGridRef2d.current.clearSpecificCard(cardValue);
  }
 
  return (
    <SafeAreaView>
      <View style={styles.flexContainer}>
        <Card cardValue="As" pressedButton={props.pressedButton} ref={cardGridRefAs}></Card>
        <Card cardValue="Ks" pressedButton={props.pressedButton} ref={cardGridRefKs}></Card>
        <Card cardValue="Qs" pressedButton={props.pressedButton} ref={cardGridRefQs}></Card>
        <Card cardValue="Js" pressedButton={props.pressedButton} ref={cardGridRefJs}></Card>
        <Card cardValue="Ts" pressedButton={props.pressedButton} ref={cardGridRefTs}></Card>
        <Card cardValue="9s" pressedButton={props.pressedButton} ref={cardGridRef9s}></Card>
        <Card cardValue="8s" pressedButton={props.pressedButton} ref={cardGridRef8s}></Card>
        <Card cardValue="7s" pressedButton={props.pressedButton} ref={cardGridRef7s}></Card>
        <Card cardValue="6s" pressedButton={props.pressedButton} ref={cardGridRef6s}></Card>
        <Card cardValue="5s" pressedButton={props.pressedButton} ref={cardGridRef5s}></Card>
        <Card cardValue="4s" pressedButton={props.pressedButton} ref={cardGridRef4s}></Card>
        <Card cardValue="3s" pressedButton={props.pressedButton} ref={cardGridRef3s}></Card>
        <Card cardValue="2s" pressedButton={props.pressedButton} ref={cardGridRef2s}></Card>
      </View>
      
      <View style={styles.flexContainer}>
        <Card cardValue="Ah" pressedButton={props.pressedButton} ref={cardGridRefAh}></Card>
        <Card cardValue="Kh" pressedButton={props.pressedButton} ref={cardGridRefKh}></Card>
        <Card cardValue="Qh" pressedButton={props.pressedButton} ref={cardGridRefQh}></Card>
        <Card cardValue="Jh" pressedButton={props.pressedButton} ref={cardGridRefJh}></Card>
        <Card cardValue="Th" pressedButton={props.pressedButton} ref={cardGridRefTh}></Card>
        <Card cardValue="9h" pressedButton={props.pressedButton} ref={cardGridRef9h}></Card>
        <Card cardValue="8h" pressedButton={props.pressedButton} ref={cardGridRef8h}></Card>
        <Card cardValue="7h" pressedButton={props.pressedButton} ref={cardGridRef7h}></Card>
        <Card cardValue="6h" pressedButton={props.pressedButton} ref={cardGridRef6h}></Card>
        <Card cardValue="5h" pressedButton={props.pressedButton} ref={cardGridRef5h}></Card>
        <Card cardValue="4h" pressedButton={props.pressedButton} ref={cardGridRef4h}></Card>
        <Card cardValue="3h" pressedButton={props.pressedButton} ref={cardGridRef3h}></Card>
        <Card cardValue="2h" pressedButton={props.pressedButton} ref={cardGridRef2h}></Card>
      </View>

      <View style={styles.flexContainer}>
        <Card cardValue="Ac" pressedButton={props.pressedButton} ref={cardGridRefAc}></Card>
        <Card cardValue="Kc" pressedButton={props.pressedButton} ref={cardGridRefKc}></Card>
        <Card cardValue="Qc" pressedButton={props.pressedButton} ref={cardGridRefQc}></Card>
        <Card cardValue="Jc" pressedButton={props.pressedButton} ref={cardGridRefJc}></Card>
        <Card cardValue="Tc" pressedButton={props.pressedButton} ref={cardGridRefTc}></Card>
        <Card cardValue="9c" pressedButton={props.pressedButton} ref={cardGridRef9c}></Card>
        <Card cardValue="8c" pressedButton={props.pressedButton} ref={cardGridRef8c}></Card>
        <Card cardValue="7c" pressedButton={props.pressedButton} ref={cardGridRef7c}></Card>
        <Card cardValue="6c" pressedButton={props.pressedButton} ref={cardGridRef6c}></Card>
        <Card cardValue="5c" pressedButton={props.pressedButton} ref={cardGridRef5c}></Card>
        <Card cardValue="4c" pressedButton={props.pressedButton} ref={cardGridRef4c}></Card>
        <Card cardValue="3c" pressedButton={props.pressedButton} ref={cardGridRef3c}></Card>
        <Card cardValue="2c" pressedButton={props.pressedButton} ref={cardGridRef2c}></Card>
      </View>

      <View style={styles.flexContainer}>
        <Card cardValue="Ad" pressedButton={props.pressedButton} ref={cardGridRefAd}></Card>
        <Card cardValue="Kd" pressedButton={props.pressedButton} ref={cardGridRefKd}></Card>
        <Card cardValue="Qd" pressedButton={props.pressedButton} ref={cardGridRefQd}></Card>
        <Card cardValue="Jd" pressedButton={props.pressedButton} ref={cardGridRefJd}></Card>
        <Card cardValue="Td" pressedButton={props.pressedButton} ref={cardGridRefTd}></Card>
        <Card cardValue="9d" pressedButton={props.pressedButton} ref={cardGridRef9d}></Card>
        <Card cardValue="8d" pressedButton={props.pressedButton} ref={cardGridRef8d}></Card>
        <Card cardValue="7d" pressedButton={props.pressedButton} ref={cardGridRef7d}></Card>
        <Card cardValue="6d" pressedButton={props.pressedButton} ref={cardGridRef6d}></Card>
        <Card cardValue="5d" pressedButton={props.pressedButton} ref={cardGridRef5d}></Card>
        <Card cardValue="4d" pressedButton={props.pressedButton} ref={cardGridRef4d}></Card>
        <Card cardValue="3d" pressedButton={props.pressedButton} ref={cardGridRef3d}></Card>
        <Card cardValue="2d" pressedButton={props.pressedButton} ref={cardGridRef2d}></Card>
      </View>

    </SafeAreaView>
  )}

  
  const styles = StyleSheet.create({
    flexContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: 2,
    },
  });

  export default forwardRef(CardGrid)




;
