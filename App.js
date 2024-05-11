import { useState, useRef} from 'react'
//mport { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, TextInput, Button, ScrollView, Platform, StatusBar, Modal} from 'react-native';




import { store } from './src/Redux/store';
import { Provider } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import {getPlayerCards, getPlayerCount, getPlayerCountSet, getPlayersSet, setCardsPerPlayerSlice} from './src/Redux/playerSlice'
import {getBoardCards, getBoardsSet, setCardsPerBoard, setBoardCountFunc} from './src/Redux/boardSlice'
import { getNumTrials, getShowEquity } from './src/Redux/equitySlice';


import CardGrid from './CardGrid';

import PlayerGrid from './PlayerGrid';

import BoardGrid from './BoardGrid';
import GameWrapper from './GameWrapper';
import { getPlayerCardCount, getBoardCount, getCardsPerBoard } from './GameUtils';

import { testNLHE, testOmaha6, testLow, testLow8, testStudRegLow, testNLHEFull } from './Test/BasicTest';
import { showEquity } from './src/Redux/equitySlice';

const gameUtils = require('./GameUtilsNJS.js')
const {gameNames} = require('./GameProperties.js')
const {gameProperties} = require('./GameProperties.js')




const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App/>
    </Provider>
  )
}



const App = () => {
  
  const cardGridRef = useRef();
  const playerGridRef = useRef();
  const boardGridRef = useRef();

  
  const gameRef = useRef();

  const dispatch = useDispatch()

  const [isGameChangeVisible, setGameChangeVisible] = useState(false)

  const numTrials = useSelector((state) => getNumTrials(state))

  const showEquity = useSelector((state) => getShowEquity(state))
  
  //console.log("GN" + gameNames)
  const initialGame = gameNames.holdEm
  console.log("INI GAME: " + initialGame)

  console.log(initialGame)

  const [currentGame, setCurrentGame] = useState(initialGame)
  
  const [cardsPerPlayer, setCardsPerPlayer] = useState(gameUtils.getPlayerCardCount(initialGame))
  const [boardCount, setBoardCount] = useState(gameUtils.getBoardCount(initialGame))
  const [cardsPerBoard, setCPB] = useState(gameUtils.getCardsPerBoard(initialGame))
  const [focusOnBoard, setFocusOnBoard] = useState(false)


  console.log(cardsPerPlayer)
  console.log(boardCount)
  console.log(cardsPerBoard)
  const [equity, setEquity] = useState(null)

  const remotePath = 'http://18.188.193.162:3000/'
  const localPath = 'http://localhost:3000/'

  const [ranAlready, setRanAlready] = useState(false)

  function test() {
    testNLHEFull()
  }

  
  function calculateEquityLocal() {
    
    gameRef.current.calculateEquity(currentGame, localPath)

  }  
  
  function calculateEquityRemote() {
    
    gameRef.current.calculateEquity(currentGame, remotePath)

  }  

  function calculateEquityOnHardware() {
    
    gameRef.current.calculateEquityOnHardware(currentGame)

  }

  function chooseGame(props) {
    if(props == currentGame) {
    }
    else {
      setCurrentGame(props)
      clearCards()

      const newCardCount = gameUtils.getPlayerCardCount(props)
      setCardsPerPlayer(newCardCount)
      dispatch(setCardsPerPlayerSlice({cardsPerPlayer:newCardCount}))
      playerGridRef.current.setCardsPerPlayer(newCardCount)
      
      const newBoardCount = gameUtils.getBoardCount(props)
      setBoardCount(newBoardCount)
      dispatch(setBoardCountFunc({boardCount:newBoardCount}))
      boardGridRef.current.setBoardCount(newBoardCount)

      
      const newCardsPerBoard = gameUtils.getCardsPerBoard(props)
      setCPB(newCardsPerBoard)
      dispatch(setCardsPerBoard({cardsPerBoard:newCardsPerBoard}))
      boardGridRef.current.setCardsPerBoard(newCardsPerBoard)

      setPlayerFocus()
    }

    setGameChangeVisible(false)
  }




  const showGameChange = () => {
    setGameChangeVisible(true)
  }
  const hideGameChange = () => {
    setGameChangeVisible(false)
  }

  const clearCards = () => {
    //testNLHE()
    //testOmaha6()
    //testLow()
    //testLow8()
    cardGridRef.current.clearCards()
    playerGridRef.current.clearCards()
    boardGridRef.current.clearCards()
    setPlayerFocus()
  }

  const pressedButton = (cardValue) => {
    if(focusOnBoard) {
      boardGridRef.current.addCard(cardValue)

    }
    else {
      const switchToBoard = playerGridRef.current.addCard(cardValue)
      if(switchToBoard) {
        setFocusOnBoard(true)
        setBoardFocus()
      }
    }
  }
  
  
  const removeCardPlayer = (cardValue) => {
    cardGridRef.current.addCardBack(cardValue)
    boardGridRef.current.clearFocus()
    setFocusOnBoard(false)
    
  } 
   
  
  const removeCardBoard = (cardValue) => {
    cardGridRef.current.addCardBack(cardValue)
    playerGridRef.current.clearFocus()
    setFocusOnBoard(true)
  }

  const setBoardFocus = () => {
    boardGridRef.current.setBoardFocus()
    playerGridRef.current.clearFocus()
    setFocusOnBoard(true)
  }
  const setPlayerFocus = () => {
    playerGridRef.current.setPlayerFocus()
    boardGridRef.current.clearFocus()
    setFocusOnBoard(false)
  }
  

  return (
      <SafeAreaView style={styles.container}>
        <ScrollView>

          <Text>GAME: {currentGame} </Text>

          <PlayerGrid removeCard={removeCardPlayer} setBoardFocus={setBoardFocus} setPlayerFocus={setPlayerFocus} 
            cardsPerPlayer={cardsPerPlayer} ref={playerGridRef}></PlayerGrid>
          <Text visible={showEquity}>Number of Trials: {numTrials}</Text>

          <BoardGrid removeCard={removeCardBoard} setBoardFocus={setBoardFocus} ref={boardGridRef} boardCount={boardCount} cardsPerBoard="5"></BoardGrid>

        {/**/}
          <Button title="Calculate Equity from Server" onPress={() => calculateEquityRemote()}></Button>
          <Button title="Calculate Equity from Local" onPress={() => calculateEquityLocal()}></Button>
        {/**/}
          <Button title="Calculate Equity" onPress={() => calculateEquityOnHardware()}></Button>
          <Button title="Clear Cards" onPress={() => clearCards()}></Button>
          <Button title="Change Game" onPress={() => showGameChange()} ></Button>    
          <Button title="Test" onPress={() => test()} ></Button>       
            
          <CardGrid pressedButton={pressedButton} ref={cardGridRef}></CardGrid>
          <Modal visible={isGameChangeVisible} onRequestClose={() => hideGameChange()}>
            <ScrollView>
              <Button title={"Play " + gameNames.holdEm} onPress={() => chooseGame(gameNames.holdEm)}></Button>
              
              <Button title={"Play " + gameNames.omahaHigh4} onPress={() => chooseGame(gameNames.omahaHigh4)}></Button>
              <Button title={"Play " + gameNames.omahaDBHigh4} onPress={() => chooseGame(gameNames.omahaDBHigh4)}></Button>
              <Button title={"Play " + gameNames.badacey} onPress={() => chooseGame(gameNames.badacey)}></Button>
              <Button title={"Play " + gameNames.badeucey} onPress={() => chooseGame(gameNames.badeucey)}></Button>
              <Button title={"Play " + gameNames.badugi} onPress={() => chooseGame(gameNames.badugi)}></Button>
              <Button title={"Play " + gameNames.stud} onPress={() => chooseGame(gameNames.stud)}></Button>
              <Button title={"Play " + gameNames.stud8} onPress={() => chooseGame(gameNames.stud8)}></Button>
              <Button title={"Play " + gameNames.studHL} onPress={() => chooseGame(gameNames.studHL)}></Button>
              <Button title="Close" onPress={() => hideGameChange()}></Button>
            </ScrollView>
          </Modal>
          <GameWrapper ref={gameRef}/>
          
        </ScrollView>
      </SafeAreaView>
  )


}

const styles = StyleSheet.create({
  container: {
    //flex:1,w
     paddingTop:Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
})
;

export default AppWrapper



