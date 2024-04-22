import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import React, {useImperativeHandle, forwardRef, useState, useRef} from 'react';



import getImageSource from './CardImageUtil';
import { useDispatch, useSelector } from 'react-redux';

import {setPlayerCards, setPlayerSliceCard, getPlayerEquity, getPlayerScoops} from './src/Redux/playerSlice'
import {getShowEquity, getEquity,  getScoop, getChops, hideEquity} from './src/Redux/equitySlice'

import UsableCard from './UsableCard';


const arr = [0,1,2,3,4,5,6,7,8,9]
const Player = (props, ref) => {

  

  const usableCardRef = useRef([])

  const [cardCount, setCardCount] = useState(props.cardCount)
  const [playerNumber, setPlayerNumber] = useState(props.playerNumber)
  const [showPlayer, setShowPlayer] = useState(props.showPlayer)

  const dispatch = useDispatch()

  const showEquity = useSelector((state) => getShowEquity(state))
  const equityText = useSelector((state) => getPlayerEquity(state, playerNumber))
  const scoopText = useSelector((state) => getPlayerScoops(state, playerNumber))
  const equityText2 = useSelector((state) => (getEquity, playerNumber))
  const scoopText2 = useSelector((state) => (getScoop, playerNumber))


  useImperativeHandle(ref, () => ({
    // methods connected to `ref`
    clearCards: () => { clearCards() },
    newCardCount: (cardCountParam) => {newCardCount(cardCountParam)},
    setCard: (cardValue, cardNumber) => {setCard(cardValue, cardNumber)},
    clearFocus: (cardNumber) => {clearFocus(cardNumber)},
    clearFocusAll: () => {clearFocusAll()},
    addFocus: (cardNumber) => {addFocus(cardNumber)},
    addPlayer: (cardCountParam) => {addPlayer(cardCountParam)},
    removePlayer: () => {removePlayer()},
    addShowPlayer: () => {addShowPlayer()},
    removeShowPlayer: () => {removeShowPlayer()}
  }))

  const addPlayer = (cardCountParam) => {
    addShowPlayer()
    newCardCount(cardCountParam)
  }

  const removePlayer = () => {
    removeShowPlayer()
    clearCards()
  }

  const addShowPlayer = () => {
    setShowPlayer(true)
  }

  const removeShowPlayer = () => {
    setShowPlayer(false)
  }

  const clearFocusAll = () => {
    let i
    for(let i = 0; i < 10; i++) {
      usableCardRef.current[i].removeFocus()
    }
  }

  const clearFocus = (cardNumber) => {
    usableCardRef.current[cardNumber].removeFocus()
  }

  const addFocus = (cardNumber) => {
    usableCardRef.current[cardNumber].addFocus()
  }


  const setCard = (cardValue, cardNumber) => {
    usableCardRef.current[cardNumber].setCard(cardValue)
    dispatch(setPlayerSliceCard({playerNumber: playerNumber, cardNumber: cardNumber, cardValue: cardValue}))
    dispatch(hideEquity())
  }

  const clearCards = () => {
    let i
    for(let i = 0; i < cardCount; i++) {
      usableCardRef.current[i].clearCard()
    }
  }

  const newCardCount = (cardCountParam) => {
    let i
    const oldCardCount = cardCount

    /*
    console.log(oldCardCount)
    console.log(cardCountParam)
    */
    
    if(cardCountParam > oldCardCount) {
      setCardCount(cardCountParam)

      for(i = oldCardCount; i < cardCountParam; i++) {
        //console.log((i + 0))
        usableCardRef.current[i].clearCard()
        usableCardRef.current[i].addShowCard()
      }
      
    }
    else if(cardCountParam < oldCardCount) {
      setCardCount(cardCountParam)

      for(i = cardCountParam; i < oldCardCount; i++) {
        //console.log("I " + i)
        usableCardRef.current[i].clearCard()
        usableCardRef.current[i].removeShowCard()
      }
    }
  }

  const removeCard = (cardValue, cardNumber, shouldSetFocus) => {
    props.removeCard(cardValue, playerNumber, cardNumber, shouldSetFocus)
    dispatch(setPlayerSliceCard({playerNumber: playerNumber, cardNumber: cardNumber, cardValue: ''}))
    dispatch(hideEquity())
  }


   
  
  return (
    <SafeAreaView>
    {showPlayer && 
        <View style={styles.flexContainer}>
          <UsableCard cardNumber={0} ref={el => usableCardRef.current[0] = el} removeCard={removeCard} cardCount={cardCount}
            setCardFocus={playerNumber == 1 ? true : false} />
          <UsableCard cardNumber={1} ref={el => usableCardRef.current[1] = el} removeCard={removeCard} cardCount={cardCount}/>
          <UsableCard cardNumber={2} ref={el => usableCardRef.current[2] = el} removeCard={removeCard} cardCount={cardCount}/>
          <UsableCard cardNumber={3} ref={el => usableCardRef.current[3] = el} removeCard={removeCard} cardCount={cardCount}/>
          <UsableCard cardNumber={4} ref={el => usableCardRef.current[4] = el} removeCard={removeCard} cardCount={cardCount}/>
          <UsableCard cardNumber={5} ref={el => usableCardRef.current[5] = el} removeCard={removeCard} cardCount={cardCount}/>
          <UsableCard cardNumber={6} ref={el => usableCardRef.current[6] = el} removeCard={removeCard} cardCount={cardCount}/>
          <UsableCard cardNumber={7} ref={el => usableCardRef.current[7] = el} removeCard={removeCard} cardCount={cardCount}/>
          <UsableCard cardNumber={8} ref={el => usableCardRef.current[8] = el} removeCard={removeCard} cardCount={cardCount}/>
          <UsableCard cardNumber={9} ref={el => usableCardRef.current[9] = el} removeCard={removeCard} cardCount={cardCount}/>

          {showEquity && <View><View><Text>Equity: {equityText}</Text></View>
          <View><Text>Scoop: {scoopText}</Text></View></View>}
        
        </View>
    }
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





