import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View, TextInput, Button, TouchableOpacity } from 'react-native';
import React, {useImperativeHandle, forwardRef, useRef, useState} from 'react';

import Board from './Board';

import { useDispatch } from 'react-redux';

import {setBoardCountFunc} from './src/Redux/boardSlice'


const BoardGrid = (props, ref) => {
  const boardRef = useRef([])
  
  const [boardCount, setBoardCount] = useState(props.boardCount)
  const [cardCount, setCardCount] = useState(props.cardsPerBoard)
  const [focusBoard, setFocusBoard] = useState(1)
  const [focusCard, setFocusCard] = useState(0)


  const [hasBoard, setHasBoard] = useState(true)

  
  const dispatch = useDispatch()

  useImperativeHandle(ref, () => ({
    // methods connected to `ref`
    clearCards: () => { clearCards() },
    addCard: (cardValue) => {addCard(cardValue)},
    setBoardFocus: () => {setBoardFocus()},
    clearFocus: () => {fullClearFocus()},
    setEquity: (equity) => {setEquity(equity)},
    getCards: () => {getCards()},
    getBoardCount: (setAboveCount) => {getBoardCount(setAboveCount)},
    setCardsPerBoard: (newCardsPerBoard) => {setCardsPerBoard(newCardsPerBoard)},
    setBoardCount: (newBoardCount) => {setNewBoardCount(newBoardCount)}
  }))

  const setNewBoardCount = (newBoardCount) => {
    const oldBoardCount = boardCount
    let i
    if(oldBoardCount > newBoardCount) {
      for(i = oldBoardCount; i > newBoardCount; i--) {
        boardRef.current[i].removeShowBoard()
      }
      setBoardCount(newBoardCount)
      //dispatch(setBoardCountFunc({boardCount: newBoardCount}))
    }
    if(oldBoardCount < newBoardCount) {
      for(i = oldBoardCount + 1; i <= newBoardCount; i++) {
        boardRef.current[i].addShowBoard()
      }
      setBoardCount(newBoardCount)
      //dispatch(setBoardCountFunc({boardCount: newBoardCount}))
    }
  }
  
  const setCardsPerBoard = (newCardsPerBoard) => {
    //fill in if different amount of board cards
    //also set to 0 if draw game
  }

  const getBoardCount = (setAboveCount) => {
    setAboveCount(boardCount)
  }

  const setBoardFocus = () => {
    if(boardCount == 0) {
      return
    }
    if(focusBoard != 0)
      clearFocus(focusBoard, focusCard)
    addFocus(1,0)
  }

  const addCard = (cardValue) => {
    boardRef.current[focusBoard].setCard(cardValue, focusCard)
    setNextFocus()
  }

  const setNextFocus = () => {
    const currentFocusBoard = focusBoard
    const currentFocusCard = focusCard
    let newFocusBoard = focusBoard
    let newFocusCard = focusCard

    if(boardCount == 0) {
      return
    }

    if(currentFocusCard < cardCount - 1) {
      setFocusCard(currentFocusCard + 1)
      newFocusCard = 1 + currentFocusCard
    }
    else {
      if(currentFocusBoard < boardCount) {
        setFocusCard(0)
        setFocusBoard(currentFocusBoard - 1 + 2)
        newFocusBoard = currentFocusBoard - 1 + 2
        newFocusCard = 0
      }
      else {
        if(hasBoard) {
          clearFocus(currentFocusBoard, currentFocusCard)
          setFocusCard(0)
          setFocusBoard(0)
          props.setBoardFocus()
          return
        }
      }
    }
    
    if(currentFocusCard != newFocusCard || currentFocusBoard != newFocusBoard) {
      clearFocus(currentFocusBoard, currentFocusCard)
      if(newFocusBoard <= boardCount)
        addFocus(newFocusBoard, newFocusCard)
      else
        props.setBoardFocus()
    }
  }

  const fullClearFocus = () => { 
    if(boardCount == 0) {
      return
    }
    if(focusBoard != 0)
      clearFocus(focusBoard, focusCard)
  }

  const clearFocus = (currentFocusBoard, currentFocusCard) => {
    if(currentFocusBoard != 0)
      boardRef.current[currentFocusBoard].clearFocus(currentFocusCard)
  }
  
  const addFocus = (currentFocusBoard, currentFocusCard) => {
    boardRef.current[currentFocusBoard].addFocus(currentFocusCard)

    setFocusCard(currentFocusCard)
    setFocusBoard(currentFocusBoard)
  }


  const clearCards = () => {
    let i

    for(i = 1; i <= boardCount; i++) {
      boardRef.current[i].clearCards()
    }

    setBoardFocus()
  }

  const removeCard = (cardValue, board, card, shouldSetFocus) => {
    props.removeCard(cardValue)
    if(shouldSetFocus) {

      clearFocus(focusBoard, focusCard)
      setFocusBoard(board)
      setFocusCard(card)
      addFocus(board, card)
    }
  }
  
  return (
    <SafeAreaView>
      <Board boardNumber="1" cardCount={cardCount} removeCard={removeCard} showBoard={boardCount >= 1 ? true: false} 
        ref={el => boardRef.current[1] = el}></Board>
      <Board boardNumber="2" cardCount={cardCount} removeCard={removeCard} showBoard={boardCount >= 2 ? true: false} 
        ref={el => boardRef.current[2] = el}></Board>
      <Board boardNumber="3" cardCount={cardCount} removeCard={removeCard} showBoard={boardCount >= 3 ? true: false} 
        ref={el => boardRef.current[3] = el}></Board>
      <Board boardNumber="4" cardCount={cardCount} removeCard={removeCard} showBoard={boardCount >= 4 ? true: false} 
        ref={el => boardRef.current[4] = el}></Board>
      
      
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

  export default forwardRef(BoardGrid)




;
