import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import React, {useImperativeHandle, forwardRef, useState} from 'react';



import getImageSource from './CardImageUtil';
import { useDispatch, useSelector } from 'react-redux';

import {setPlayerCards, setPlayerSliceCard} from './src/Redux/playerSlice'
import {getShowEquity, getEquity,  getScoop, getChops} from './src/Redux/equitySlice'





const Player = (props, ref) => {

  const [card1, setCard1] = useState({showCard: props.cardCount >= 1 ? true : false, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
  const [card2, setCard2] = useState({showCard: props.cardCount >= 2 ? true : false, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
  const [card3, setCard3] = useState({showCard: props.cardCount >= 3 ? true : false, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
  const [card4, setCard4] = useState({showCard: props.cardCount >= 4 ? true : false, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
  const [card5, setCard5] = useState({showCard: props.cardCount >= 5 ? true : false, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
  const [card6, setCard6] = useState({showCard: props.cardCount >= 6 ? true : false, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
  const [card7, setCard7] = useState({showCard: props.cardCount >= 7 ? true : false, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
  const [card8, setCard8] = useState({showCard: props.cardCount >= 8 ? true : false, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
  const [card9, setCard9] = useState({showCard: props.cardCount >= 9 ? true : false, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
  const [card10, setCard10] = useState({showCard: props.cardCount >= 10 ? true : false, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
  
  const [card1Focus, setCard1Focus] = useState(props.playerNumber == 1?true:false)
  const [card2Focus, setCard2Focus] = useState(false)
  const [card3Focus, setCard3Focus] = useState(false)
  const [card4Focus, setCard4Focus] = useState(false)
  const [card5Focus, setCard5Focus] = useState(false)
  const [card6Focus, setCard6Focus] = useState(false)
  const [card7Focus, setCard7Focus] = useState(false)
  const [card8Focus, setCard8Focus] = useState(false)
  const [card9Focus, setCard9Focus] = useState(false)
  const [card10Focus, setCard10Focus] = useState(false)

  const [cardCount, setCardCount] = useState(props.cardCount)
  const [playerNumber, setPlayerNumber] = useState(props.playerNumber)

  const dispatch = useDispatch()

  const showEquity = useState(true)//useSelector((state) => getShowEquity(state))
  const equityText = useSelector((state) => getEquity(state, playerNumber))
  const scoopText = useSelector((state) => getScoop(state, playerNumber))


  useImperativeHandle(ref, () => ({
    // methods connected to `ref`
    clearCards: () => { clearCards() },
    newCardCount: (cardCount2) => {newCardCount(cardCount2)},
    setCard: (cardValue, cardNumber) => {setCard(cardValue, cardNumber)},
    getCards: (playerNumber) => {getCards(playerNumber)},
    clearFocus: (cardNumber) => {clearFocus(cardNumber)},
    clearFocusAll: () => {clearFocusAll()},
    addFocus: (cardNumber) => {addFocus(cardNumber)},
    setEquity: (equity) => {setEquity(equity)}
  }))

  const clearFocusAll = () => {
    let i
    console.log("CLEAR FOCUS: " + playerNumber)
    for(i = 1; i <= 10; i++)
      clearFocus(i)
  }

  const clearFocus = (cardNumber) => {
    if(cardNumber == 1)
      setCard1Focus(false)
    if(cardNumber == 2)
      setCard2Focus(false)
    if(cardNumber == 3)
      setCard3Focus(false)
    if(cardNumber == 4)
      setCard4Focus(false)
    if(cardNumber == 5)
      setCard5Focus(false)
    if(cardNumber == 6)
      setCard6Focus(false)
    if(cardNumber == 7)
      setCard7Focus(false)
    if(cardNumber == 8)
      setCard8Focus(false)
    if(cardNumber == 9)
      setCard9Focus(false)
    if(cardNumber == 10)
      setCard10Focus(false)
  }
  const addFocus = (cardNumber) => {
    if(cardNumber == 1)
      setCard1Focus(true)
    if(cardNumber == 2)
      setCard2Focus(true)
    if(cardNumber == 3)
      setCard3Focus(true)
    if(cardNumber == 4)
      setCard4Focus(true)
    if(cardNumber == 5)
      setCard5Focus(true)
    if(cardNumber == 6)
      setCard6Focus(true)
    if(cardNumber == 7)
      setCard7Focus(true)
    if(cardNumber == 8)
      setCard8Focus(true)
    if(cardNumber == 9)
      setCard9Focus(true)
    if(cardNumber == 10)
      setCard10Focus(true)
  }


  const setCard = (cardValue, cardNumber) => {
    console.log("CV: " + cardValue)
    console.log(getImageSource.getImageSource(cardValue))
    if(cardNumber == 1) {
      const currentCardValue = card1.cardValue
      if(currentCardValue != "")
        props.removeCard(currentCardValue, parseInt(playerNumber), 1)
      setCard1({showCard: true, cardValue: cardValue, imageSource: getImageSource.getImageSource(cardValue).imageSource})
      dispatch(setPlayerSliceCard({playerNumber: playerNumber, cardNumber: 1, cardValue: cardValue}))
    }

    if(cardNumber == 2) {
      const currentCardValue = card2.cardValue
      if(currentCardValue != "")
        props.removeCard(currentCardValue, parseInt(playerNumber), 2)
      setCard2({showCard: true, cardValue: cardValue, imageSource: getImageSource.getImageSource(cardValue).imageSource})
      dispatch(setPlayerSliceCard({playerNumber: playerNumber, cardNumber: 2, cardValue: cardValue}))
    }
    
    if(cardNumber == 3) {
      const currentCardValue = card3.cardValue
      if(currentCardValue != "")
        props.removeCard(currentCardValue, playerNumber, 3)
      setCard3({showCard: true, cardValue: cardValue, imageSource: getImageSource.getImageSource(cardValue).imageSource})
      dispatch(setPlayerSliceCard({playerNumber: playerNumber, cardNumber: 3, cardValue: cardValue}))
    }
    
    if(cardNumber == 4) {
      const currentCardValue = card4.cardValue
      if(currentCardValue != "")
        props.removeCard(currentCardValue, playerNumber, 4)
      setCard4({showCard: true, cardValue: cardValue, imageSource: getImageSource.getImageSource(cardValue).imageSource})
      dispatch(setPlayerSliceCard({playerNumber: playerNumber, cardNumber: 4, cardValue: cardValue}))
    }
    
    if(cardNumber == 5) {
      const currentCardValue = card5.cardValue
      if(currentCardValue != "")
        props.removeCard(currentCardValue, playerNumber, 5)
      setCard5({showCard: true, cardValue: cardValue, imageSource: getImageSource.getImageSource(cardValue).imageSource})
      dispatch(setPlayerSliceCard({playerNumber: playerNumber, cardNumber: 5, cardValue: cardValue}))
    }
    
    if(cardNumber == 6) {
      const currentCardValue = card6.cardValue
      if(currentCardValue != "")
        props.removeCard(currentCardValue, playerNumber, 6)
      setCard6({showCard: true, cardValue: cardValue, imageSource: getImageSource.getImageSource(cardValue).imageSource})
      dispatch(setPlayerSliceCard({playerNumber: playerNumber, cardNumber: 6, cardValue: cardValue}))
    }
    
    if(cardNumber == 7) {
      const currentCardValue = card7.cardValue
      if(currentCardValue != "")
        props.removeCard(currentCardValue, playerNumber, 7)
      setCard7({showCard: true, cardValue: cardValue, imageSource: getImageSource.getImageSource(cardValue).imageSource})
      dispatch(setPlayerSliceCard({playerNumber: playerNumber, cardNumber: 7, cardValue: cardValue}))
    }
    
    if(cardNumber == 8) {
      const currentCardValue = card8.cardValue
      if(currentCardValue != "")
        props.removeCard(currentCardValue, playerNumber, 8)
      setCard8({showCard: true, cardValue: cardValue, imageSource: getImageSource.getImageSource(cardValue).imageSource})
      dispatch(setPlayerSliceCard({playerNumber: playerNumber, cardNumber: 8, cardValue: cardValue}))
    }
    
    if(cardNumber == 9) {
      const currentCardValue = card9.cardValue
      if(currentCardValue != "")
        props.removeCard(currentCardValue, playerNumber, 9)
      setCard9({showCard: true, cardValue: cardValue, imageSource: getImageSource.getImageSource(cardValue).imageSource})
      dispatch(setPlayerSliceCard({playerNumber: playerNumber, cardNumber: 9, cardValue: cardValue}))
    }
    
    if(cardNumber == 10) {
      const currentCardValue = card10.cardValue
      if(currentCardValue != "")
        props.removeCard(currentCardValue, playerNumber, 10)
      setCard10({showCard: true, cardValue: cardValue, imageSource: getImageSource.getImageSource(cardValue).imageSource})
      dispatch(setPlayerSliceCard({playerNumber: playerNumber, cardNumber: 10, cardValue: cardValue}))
    }    
    //getCards(playerNumber)
  }

  const getCards = (playerNumber) => {
    dispatch(setPlayerCards({playerNumber: playerNumber, playerCards: [card1.cardValue, card2.cardValue, card3.cardValue, card4.cardValue, card5.cardValue,
      card6.cardValue, card7.cardValue, card8.cardValue, card9.cardValue, card10.cardValue]}))
    return [card1.cardValue, card2.cardValue, card3.cardValue, card4.cardValue, card5.cardValue,
        card6.cardValue, card7.cardValue, card8.cardValue, card9.cardValue, card10.cardValue]
      //card1.cardValue, card2.cardValue, card3.cardValue, card4.cardValue, card5.cardValue]))
    /*
    if(cardCount == 1)
      return [card1.cardValue]
    if(cardCount == 2)
      return [card1.cardValue, card2.cardValue]
    if(cardCount == 3)
      return [card1.cardValue, card2.cardValue, card3.cardValue]
    if(cardCount == 4)
      return [card1.cardValue, card2.cardValue, card3.cardValue, card4.cardValue]
    if(cardCount == 5)
      return [card1.cardValue, card2.cardValue, card3.cardValue, card4.cardValue, card5.cardValue]
  
    if(cardCount == 6)
      return [card1.cardValue, card2.cardValue, card3.cardValue, card4.cardValue, card5.cardValue,
        card6.cardValue]
        
    if(cardCount == 7)
      return [card1.cardValue, card2.cardValue, card3.cardValue, card4.cardValue, card5.cardValue,
        card6.cardValue, card7.cardValue]
    if(cardCount == 8)
      return [card1.cardValue, card2.cardValue, card3.cardValue, card4.cardValue, card5.cardValue,
        card6.cardValue, card7.cardValue, card8.cardValue]
    if(cardCount == 9)
      return [card1.cardValue, card2.cardValue, card3.cardValue, card4.cardValue, card5.cardValue,
        card6.cardValue, card7.cardValue, card8.cardValue, card9.cardValue]
    if(cardCount == 10)
      return [card1.cardValue, card2.cardValue, card3.cardValue, card4.cardValue, card5.cardValue,
        card6.cardValue, card7.cardValue, card8.cardValue, card9.cardValue, card10.cardValue]
        */
  
   }

  const clearCards = () => {
    if(cardCount >= 1) {
      setCard1({showCard: card1.showCard, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
      clearFocus(1)
      dispatch(setPlayerSliceCard({playerNumber: playerNumber, cardNumber: 1, cardValue: ""}))

    }

    if(cardCount >= 2) {
      setCard2({showCard: card2.showCard, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
      clearFocus(2)
      dispatch(setPlayerSliceCard({playerNumber: playerNumber, cardNumber: 2, cardValue: ""}))
    }
    
    if(cardCount >= 3) {
      setCard3({showCard: card3.showCard, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
      clearFocus(3)
      dispatch(setPlayerSliceCard({playerNumber: playerNumber, cardNumber: 3, cardValue: ""}))
    }
    
    if(cardCount >= 4) {
      setCard4({showCard: card4.showCard, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
      clearFocus(4)
      dispatch(setPlayerSliceCard({playerNumber: playerNumber, cardNumber: 4, cardValue: ""}))
    }
    
    if(cardCount >= 5) {
      setCard5({showCard: card5.showCard, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
      clearFocus(5)
      dispatch(setPlayerSliceCard({playerNumber: playerNumber, cardNumber: 5, cardValue: ""}))
    }
    
    if(cardCount >= 6) {
      setCard6({showCard: card6.showCard, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
      clearFocus(6)
      dispatch(setPlayerSliceCard({playerNumber: playerNumber, cardNumber: 6, cardValue: ""}))
    }
    
    if(cardCount >= 7) {
      setCard7({showCard: card7.showCard, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
      clearFocus(7)
      dispatch(setPlayerSliceCard({playerNumber: playerNumber, cardNumber: 7, cardValue: ""}))
    }
    
    if(cardCount >= 8) {
      setCard8({showCard: card8.showCard, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
      clearFocus(8)
      dispatch(setPlayerSliceCard({playerNumber: playerNumber, cardNumber: 8, cardValue: ""}))
    }
    
    if(cardCount >= 9) {
      setCard9({showCard: card9.showCard, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
      clearFocus(9)
      dispatch(setPlayerSliceCard({playerNumber: playerNumber, cardNumber: 9, cardValue: ""}))
    }
    
    if(cardCount >= 10) {
      setCard10({showCard: card10.showCard, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
      clearFocus(10)
      dispatch(setPlayerSliceCard({playerNumber: playerNumber, cardNumber: 10, cardValue: ""}))
    }

  }

  const newCardCount = (cardCount2) => {
    const oldCardCount = cardCount
    console.log("OLD CARDS: " + oldCardCount)
    console.log("NEW CARDS: " + cardCount2)
    
    if(cardCount2 > oldCardCount) {
      setCardCount(cardCount2)

      if(oldCardCount < 1 && cardCount2 >= 1) {
        props.removeCard(card1.cardValue, playerNumber, 1)
        setCard1({showCard: true, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
      }

      if(oldCardCount < 2 && cardCount2 >= 2) {
        props.removeCard(card2.cardValue, playerNumber, 2)
        setCard2({showCard: true, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
      }
      
      if(oldCardCount < 3 && cardCount2 >= 3) {
        props.removeCard(card3.cardValue, playerNumber, 3)
        setCard3({showCard: true, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
      }
      
      if(oldCardCount < 4 && cardCount2 >= 4) {
        props.removeCard(card4.cardValue, playerNumber, 4)
        setCard4({showCard: true, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
      }
      
      if(oldCardCount < 5 && cardCount2 >= 5) {
        props.removeCard(card5.cardValue, playerNumber, 5)
        setCard5({showCard: true, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
      }
      
      if(oldCardCount < 6 && cardCount2 >= 6) {
        props.removeCard(card6.cardValue, playerNumber, 6)
        setCard6({showCard: true, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
      }
      
      if(oldCardCount < 7 && cardCount2 >= 7) {
        props.removeCard(card7.cardValue, playerNumber, 7)
        setCard7({showCard: true, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
      }
      
      if(oldCardCount < 8 && cardCount2 >= 8) {
        props.removeCard(card8.cardValue, playerNumber, 8)
        setCard8({showCard: true, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
      }
      
      if(oldCardCount < 9 && cardCount2 >= 9) {
        props.removeCard(card9.cardValue, playerNumber, 9)
        setCard9({showCard: true, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
      }
      
      if(oldCardCount < 10 && cardCount2 >= 10) {
        props.removeCard(card10.cardValue, playerNumber, 10)
        setCard10({showCard: true, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
      }
    }
    else if(cardCount2 < oldCardCount) {
      setCardCount(cardCount2)

      if(oldCardCount >= 1 && cardCount2 < 1) {
        props.removeCard(card1.cardValue, playerNumber, 1)
        setCard1({showCard: false, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
      }

      if(oldCardCount >= 2 && cardCount2 < 2) {
        props.removeCard(card2.cardValue, playerNumber, 2)
        setCard2({showCard: false, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
      }
      
      if(oldCardCount >= 3 && cardCount2 < 3) {
        props.removeCard(card3.cardValue, playerNumber, 3)
        setCard3({showCard: false, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
      }
      
      if(oldCardCount >= 4 && cardCount2 < 4) {
        props.removeCard(card4.cardValue, playerNumber, 4)
        setCard4({showCard: false, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
      }
      
      if(oldCardCount >= 5 && cardCount2 < 5) {
        props.removeCard(card5.cardValue, playerNumber, 5)
        setCard5({showCard: false, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
      }
      
      if(oldCardCount >= 6 && cardCount2 < 6) {
        props.removeCard(card6.cardValue, playerNumber, 6)
        setCard6({showCard: false, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
      }
      
      if(oldCardCount >= 7 && cardCount2 < 7) {
        props.removeCard(card7.cardValue, playerNumber, 7)
        setCard7({showCard: false, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
      }
      
      if(oldCardCount >= 8 && cardCount2 < 8) {
        props.removeCard(card8.cardValue, playerNumber, 8)
        setCard8({showCard: false, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
      }
      
      if(oldCardCount >= 9 && cardCount2 < 9) {
        props.removeCard(card9.cardValue, playerNumber, 9)
        setCard9({showCard: false, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
      }
      
      if(oldCardCount >= 10 && cardCount2 < 10) {
        props.removeCard(card10.cardValue, playerNumber, 10)
        setCard10({showCard: false, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
      }
        

    }


  }

  
  
  const pressedButton = (cardValue, cardNumber) => {
    console.log("player " + playerNumber + ": " + cardValue)

    //passed from above
    console.log(JSON.stringify(props.removeCard, null, 2))
    props.removeCard(cardValue, playerNumber, cardNumber)


    if(cardNumber == 1) {
      setCard1({showCard: card1.showCard, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
      dispatch(setPlayerSliceCard({playerNumber: playerNumber, cardNumber: cardNumber, cardValue: ""}))
    }
    if(cardNumber == 2) {
      setCard2({showCard: card2.showCard, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
      dispatch(setPlayerSliceCard({playerNumber: playerNumber, cardNumber: cardNumber, cardValue: ""}))
    }
    if(cardNumber == 3) {
      setCard3({showCard: card3.showCard, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
      dispatch(setPlayerSliceCard({playerNumber: playerNumber, cardNumber: cardNumber, cardValue: ""}))
    }
    if(cardNumber == 4) {
      setCard4({showCard: card4.showCard, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
      dispatch(setPlayerSliceCard({playerNumber: playerNumber, cardNumber: cardNumber, cardValue: ""}))
    }
    if(cardNumber == 5) {
      setCard5({showCard: card5.showCard, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
      dispatch(setPlayerSliceCard({playerNumber: playerNumber, cardNumber: cardNumber, cardValue: ""}))
    }
    if(cardNumber == 6) {
      setCard6({showCard: card6.showCard, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
      dispatch(setPlayerSliceCard({playerNumber: playerNumber, cardNumber: cardNumber, cardValue: ""}))
    }
    if(cardNumber == 7) {
      setCard7({showCard: card7.showCard, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
      dispatch(setPlayerSliceCard({playerNumber: playerNumber, cardNumber: cardNumber, cardValue: ""}))
    }
    if(cardNumber == 8) {
      setCard8({showCard: card8.showCard, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
      dispatch(setPlayerSliceCard({playerNumber: playerNumber, cardNumber: cardNumber, cardValue: ""}))
    }
    if(cardNumber == 9) {
      setCard9({showCard: card9.showCard, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
      dispatch(setPlayerSliceCard({playerNumber: playerNumber, cardNumber: cardNumber, cardValue: ""}))
    }
    if(cardNumber == 10) {
      setCard10({showCard: card10.showCard, cardValue: "", imageSource: getImageSource.getImageSource("").imageSource})
      dispatch(setPlayerSliceCard({playerNumber: playerNumber, cardNumber: cardNumber, cardValue: ""}))
    }
  }


   
  
  return (
    <SafeAreaView>
      <View style={styles.flexContainer}>
        {card1.showCard && <TouchableOpacity onPress={() => pressedButton(card1.cardValue, 1)} style={card1Focus?styles.onFocus:styles.notOnFocus}>
            <Image source={card1.imageSource} style={styles.card} />
        </TouchableOpacity>}
        {card2.showCard && <TouchableOpacity onPress={() => pressedButton(card2.cardValue, 2)} style={card2Focus?styles.onFocus:styles.notOnFocus}>
            <Image source={card2.imageSource} style={styles.card} />
        </TouchableOpacity>}
        {card3.showCard && <TouchableOpacity onPress={() => pressedButton(card3.cardValue, 3)} style={card3Focus?styles.onFocus:styles.notOnFocus}>
            <Image source={card3.imageSource} style={styles.card} />
        </TouchableOpacity>}
        {card4.showCard && <TouchableOpacity onPress={() => pressedButton(card4.cardValue, 4)} style={card4Focus?styles.onFocus:styles.notOnFocus}>
            <Image source={card4.imageSource} style={styles.card} />
        </TouchableOpacity>}
        {card5.showCard && <TouchableOpacity onPress={() => pressedButton(card5.cardValue, 5)} style={card5Focus?styles.onFocus:styles.notOnFocus}>
            <Image source={card5.imageSource} style={styles.card} />
        </TouchableOpacity>}
        {card6.showCard && <TouchableOpacity onPress={() => pressedButton(card6.cardValue, 6)} style={card6Focus?styles.onFocus:styles.notOnFocus}>
            <Image source={card6.imageSource} style={styles.card} />
        </TouchableOpacity>}
        {card7.showCard && <TouchableOpacity onPress={() => pressedButton(card7.cardValue, 7)} style={card7Focus?styles.onFocus:styles.notOnFocus}>
            <Image source={card7.imageSource} style={styles.card} />
        </TouchableOpacity>}
        {card8.showCard && <TouchableOpacity onPress={() => pressedButton(card8.cardValue, 8)} style={card8Focus?styles.onFocus:styles.notOnFocus}>
            <Image source={card8.imageSource} style={styles.card} />
        </TouchableOpacity>}
        {card9.showCard && <TouchableOpacity onPress={() => pressedButton(card9.cardValue, 9)} style={card9Focus?styles.onFocus:styles.notOnFocus}>
            <Image source={card9.imageSource} style={styles.card} />
        </TouchableOpacity>}
        {card10.showCard && <TouchableOpacity onPress={() => pressedButton(card10.cardValue, 10)} style={card10Focus?styles.onFocus:styles.notOnFocus}>
            <Image source={card10.imageSource} style={styles.card} />
        </TouchableOpacity>}
        {showEquity && <View><View><Text>Equity: {equityText}</Text></View>
        <View><Text>Scoop: {scoopText}</Text></View></View>}
      </View>
    </SafeAreaView>
  )}
  
  const styles = StyleSheet.create({
    flexContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: 2,
    },
    buttonStyle: {
      minWidth: '13%',
      maxWidth: '13%',
    },    
    card: { 
      width: 27,
      height:37,
      paddingLeft: 2,
    },
    onFocus: {
      backgroundColor: '#00ff00',
      width: 30,
      height:40,
    },
    notOnFocus: {
      width: 30,
      height:40,
    },
  });

  export default forwardRef(Player)




;
