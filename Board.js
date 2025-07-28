import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import React, {useImperativeHandle, forwardRef, useState, useRef} from 'react';



import getImageSource from './CardImageUtil';
import { useDispatch, useSelector } from 'react-redux';

import {setBoardCards, setBoardSliceCard} from './src/Redux/boardSlice'
import {getShowEquity, getEquity,  getScoop, getChops, hideEquity} from './src/Redux/equitySlice'

import UsableCard from './UsableCard';


const arr = [0,1,2,3,4,5,6,7,8,9]
const Board = (props, ref) => {

  

  const usableCardRef = useRef([])

  const [cardCount, setCardCount] = useState(props.cardCount)
  const [boardNumber, setBoardNumber] = useState(props.boardNumber)
  const [showBoard, setShowBoard] = useState(props.showBoard)



  const dispatch = useDispatch()



  useImperativeHandle(ref, () => ({
    // methods connected to `ref`
    clearCards: () => { clearCards() },
    newCardCount: (cardCountParam) => {newCardCount(cardCountParam)},
    setCard: (cardValue, cardNumber) => {setCard(cardValue, cardNumber)},
    clearFocus: (cardNumber) => {clearFocus(cardNumber)},
    clearFocusAll: () => {clearFocusAll()},
    addFocus: (cardNumber) => {addFocus(cardNumber)},
    addShowBoard: () => {addShowBoard()},
    removeShowBoard: () => {removeShowBoard()}
  }))

  const addShowBoard = () => {
    setShowBoard(true)
  }

  const removeShowBoard = () => {
    setShowBoard(false)
  }

  const clearFocusAll = () => {
    let i
    for(i = 0; i < 10; i++) {
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
    dispatch(setBoardSliceCard({boardNumber: boardNumber, cardNumber: cardNumber, cardValue: cardValue}))
    dispatch(hideEquity())
  }

  const clearCards = () => {
    let i
    for(i = 0; i < cardCount; i++) {
      usableCardRef.current[i].clearCard()
    }
  }

  const newCardCount = (cardCountParam) => {
    const oldCardCount = cardCount
    let i

    if(cardCountParam > oldCardCount) {
      setCardCount(cardCountParam)

      for(i = oldCardCount; i < cardCountParam; i++) {
        usableCardRef.current[i].addShowCard()
      }
      
    }
    else if(cardCountParam < oldCardCount) {
      setCardCount(cardCountParam)

      for(i = cardCountParam; i < oldCardCount; i++) {
        usableCardRef.current[i].clearCard()
        usableCardRef.current[i].removeShowCard()
      }
    }
  }

  const removeCard = (cardValue, cardNumber, shouldSetFocus) => {
    props.removeCard(cardValue, boardNumber, cardNumber, shouldSetFocus)
    dispatch(setBoardSliceCard({boardNumber: boardNumber, cardNumber: cardNumber, cardValue: ''}))
    dispatch(hideEquity())
  }
  
  return (
    <SafeAreaView>

      {/*showBoard && 
        <View><Text>Board {boardNumber}</Text></View>
      */}
      {showBoard && 
          <View style={styles.flexContainer}>
            <UsableCard cardNumber={0} ref={el => usableCardRef.current[0] = el} removeCard={removeCard} cardCount={cardCount}/>
            <UsableCard cardNumber={1} ref={el => usableCardRef.current[1] = el} removeCard={removeCard} cardCount={cardCount}/>
            <UsableCard cardNumber={2} ref={el => usableCardRef.current[2] = el} removeCard={removeCard} cardCount={cardCount}/>
            <UsableCard cardNumber={3} ref={el => usableCardRef.current[3] = el} removeCard={removeCard} cardCount={cardCount}/>
            <UsableCard cardNumber={4} ref={el => usableCardRef.current[4] = el} removeCard={removeCard} cardCount={cardCount}/>
            <UsableCard cardNumber={5} ref={el => usableCardRef.current[5] = el} removeCard={removeCard} cardCount={cardCount}/>
            <UsableCard cardNumber={6} ref={el => usableCardRef.current[6] = el} removeCard={removeCard} cardCount={cardCount}/>
            <UsableCard cardNumber={7} ref={el => usableCardRef.current[7] = el} removeCard={removeCard} cardCount={cardCount}/>
            <UsableCard cardNumber={8} ref={el => usableCardRef.current[8] = el} removeCard={removeCard} cardCount={cardCount}/>
            <UsableCard cardNumber={9} ref={el => usableCardRef.current[9] = el} removeCard={removeCard} cardCount={cardCount}/>
          
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

  export default forwardRef(Board)





