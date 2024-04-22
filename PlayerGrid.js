import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View, TextInput, Button, TouchableOpacity } from 'react-native';
import React, {useImperativeHandle, forwardRef, useRef, useState} from 'react';

import Player from './Player';

import { useDispatch } from 'react-redux';

import {setPlayerCountFunc, setCardsPerPlayer} from './src/Redux/playerSlice'


const PlayerGrid = (props, ref) => {

  const playerRef = useRef([])
  
  const [playerCount, setPlayerCount] = useState(2)
  const [cardCount, setCardCount] = useState(props.cardsPerPlayer)
  const [focusPlayer, setFocusPlayer] = useState(1)
  const [focusCard, setFocusCard] = useState(0)

  const [addDisabled, setAddDisabled] = useState(false)
  const [removeDisabled, setRemoveDisabled] = useState(true)


  const [hasBoard, setHasBoard] = useState(true)

  
  const dispatch = useDispatch()

  useImperativeHandle(ref, () => ({
    // methods connected to `ref`
    clearCards: () => { clearCards() },
    addCard: (cardValue) => {addCard(cardValue)},
    setPlayerFocus: () => {setPlayerFocus()},
    clearFocus: () => {fullClearFocus()},
    setEquity: (equity) => {setEquity(equity)},
    getCards: () => {getCards()},
    getPlayerCount: (setAboveCount) => {getPlayerCount(setAboveCount)},
    setCardsPerPlayer: (newCardsPerPlayer) => {setCardsPerPlayer(newCardsPerPlayer)}
  }))

  const setCardsPerPlayer = (newCardsPerPlayer) => {
    let i
    setCardCount(newCardsPerPlayer)
    //dispatch(setCardsPerPlayer({cardsPerPlayer: newCardsPerPlayer}))
    for(i = 1; i <= playerCount; i++)
      playerRef.current[i].newCardCount(newCardsPerPlayer)
  }

  const getPlayerCount = (setAboveCount) => {
    setAboveCount(playerCount)
  }

  const setPlayerFocus = () => {
    if(focusPlayer != 0)
      clearFocus(focusPlayer, focusCard)
    addFocus(1,0)
  }

  const addCard = (cardValue) => {
    playerRef.current[focusPlayer].setCard(cardValue, focusCard)
    setNextFocus()
  }

  const setNextFocus = () => {
    const currentFocusPlayer = focusPlayer
    const currentFocusCard = focusCard
    let newFocusPlayer = focusPlayer
    let newFocusCard = focusCard


    if(currentFocusCard < cardCount - 1) {
      setFocusCard(currentFocusCard + 1)
      newFocusCard = 1 + currentFocusCard
    }
    else {
      if(currentFocusPlayer < playerCount) {
        setFocusCard(0)
        setFocusPlayer(currentFocusPlayer - 1 + 2)
        newFocusPlayer = currentFocusPlayer - 1 + 2
        newFocusCard = 0
      }
      else {
        if(hasBoard) {
          clearFocus(currentFocusPlayer, currentFocusCard)
          setFocusCard(0)
          setFocusPlayer(0)
          props.setBoardFocus()
          return
        }
      }
    }
    
    if(currentFocusCard != newFocusCard || currentFocusPlayer != newFocusPlayer) {
      clearFocus(currentFocusPlayer, currentFocusCard)
      if(newFocusPlayer <= playerCount)
        addFocus(newFocusPlayer, newFocusCard)
      else
        props.setBoardFocus()
    }

  }

  const fullClearFocus = () => { 
    if(focusPlayer != 0)
      clearFocus(focusPlayer, focusCard)
  }

  const clearFocus = (currentFocusPlayer, currentFocusCard) => {
    if(currentFocusPlayer != 0)
      playerRef.current[currentFocusPlayer].clearFocus(currentFocusCard)
  }
  
  const addFocus = (currentFocusPlayer, currentFocusCard) => {
    playerRef.current[currentFocusPlayer].addFocus(currentFocusCard)

    setFocusCard(currentFocusCard)
    setFocusPlayer(currentFocusPlayer)
  }


  const clearCards = () => {
    let i
    for(i = 1; i <= playerCount; i++) {
      playerRef.current[i].clearCards()
    }

    setPlayerFocus()
  }

  const removeCard = (cardValue, player, card, shouldSetFocus) => {
    props.removeCard(cardValue)
    if(shouldSetFocus) {

      clearFocus(focusPlayer, focusCard)
      setFocusPlayer(player)
      setFocusCard(card)
      addFocus(player, card)
    }
  }

  const addPlayer = () => {
    setRemoveDisabled(false);

    const oldPlayerCount = playerCount
    if(oldPlayerCount == 8) 
      return
  

    const newPlayerCount = oldPlayerCount + 1
  
    setPlayerCount(newPlayerCount)
    dispatch(setPlayerCountFunc({playerCount: newPlayerCount}))
    
    if(newPlayerCount == 8) 
      setAddDisabled(true);

    playerRef.current[newPlayerCount].addPlayer(cardCount)
  }

  const removePlayer = () => {
    setAddDisabled(false);

    const oldPlayerCount = playerCount

    if(oldPlayerCount == 2) 
      return
    
    const newPlayerCount = oldPlayerCount - 1

    setPlayerCount(newPlayerCount)
    dispatch(setPlayerCountFunc({playerCount: newPlayerCount}))
    //console.log("NPC : " + newPlayerCount)
    
    if(newPlayerCount == 2) 
      setRemoveDisabled(true);

    playerRef.current[oldPlayerCount].removePlayer()
    
    if(oldPlayerCount == focusPlayer) {
      props.setBoardFocus()      
      clearFocus(focusPlayer, focusCard)
      setFocusPlayer(0)
      setFocusCard(0)
    }
  }


  
  
  return (
    <SafeAreaView>
      <Player playerNumber="1" cardCount={cardCount} removeCard={removeCard} showPlayer={true} 
        ref={el => playerRef.current[1] = el}></Player>
      <Player playerNumber="2" cardCount={cardCount} removeCard={removeCard} showPlayer={true} 
        ref={el => playerRef.current[2] = el}></Player>
      <Player playerNumber="3" cardCount={cardCount} removeCard={removeCard} showPlayer={false} 
        ref={el => playerRef.current[3] = el}></Player>
      <Player playerNumber="4" cardCount={cardCount} removeCard={removeCard} showPlayer={false} 
        ref={el => playerRef.current[4] = el}></Player>
      <Player playerNumber="5" cardCount={cardCount} removeCard={removeCard} showPlayer={false} 
        ref={el => playerRef.current[5] = el}></Player>
      <Player playerNumber="6" cardCount={cardCount} removeCard={removeCard} showPlayer={false} 
        ref={el => playerRef.current[6] = el}></Player>
      <Player playerNumber="7" cardCount={cardCount} removeCard={removeCard} showPlayer={false} 
        ref={el => playerRef.current[7] = el}></Player>
      <Player playerNumber="8" cardCount={cardCount} removeCard={removeCard} showPlayer={false} 
        ref={el => playerRef.current[8] = el}></Player>
      
      
      <Button title="Add Player" onPress={() => addPlayer()} disabled={addDisabled}></Button>
      <Button title="Remove Player" onPress={() => removePlayer()} disabled={removeDisabled}></Button>
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
  });

  export default forwardRef(PlayerGrid)




;
