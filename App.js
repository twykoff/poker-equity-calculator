import { useState, useRef} from 'react'
//mport { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, TextInput, Button, ScrollView, Platform, StatusBar, Modal} from 'react-native';




import { store } from './src/Redux/store';
import { Provider } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import {getPlayerCards, getPlayerCount, getPlayerCountSet, getPlayersSet, setCardsPerPlayerSlice} from './src/Redux/playerSlice'
import {getBoardCards, getBoardsSet, setCardsPerBoard, setBoardCountFunc} from './src/Redux/boardSlice'


import CardGrid from './CardGrid';

import PlayerGrid from './PlayerGrid';

import BoardGrid from './BoardGrid';
import Game from './Game';
import { getPlayerCardCount, getBoardCount, getCardsPerBoard } from './GameUtils';

import { testNLHE, testOmaha6, testLow, testLow8 } from './Test/BasicTest';




const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App/>
    </Provider>
  )
}



const App = () => {
  
  /*
  const [thisResponse, setResponse] = useState('')

  const playerCards = useSelector(getPlayerCards)
  const playerCount = useSelector((state) => getPlayerCount(state))
  const boardCards = useSelector((state) => getBoardCards(state))
  */
  const cardGridRef = useRef();
  const playerGridRef = useRef();
  const boardGridRef = useRef();

  
  const gameRef = useRef();

  const dispatch = useDispatch()

  const [isGameChangeVisible, setGameChangeVisible] = useState(false)


  
  const initialGame = 'NLHE'

  const [currentGame, setCurrentGame] = useState(initialGame)
  
  const [cardsPerPlayer, setCardsPerPlayer] = useState(getPlayerCardCount(initialGame))
  const [boardCount, setBoardCount] = useState(getBoardCount(initialGame))
  const [cardsPerBoard, setCPB] = useState(getCardsPerBoard(initialGame))
  const [focusOnBoard, setFocusOnBoard] = useState(false)

  const [equity, setEquity] = useState(null)

  const remotePath = 'http://18.188.193.162:3000/'
  const localPath = 'http://localhost:3000/'

  const [ranAlready, setRanAlready] = useState(false)



  
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

      const newCardCount = getPlayerCardCount(props)
      setCardsPerPlayer(newCardCount)
      dispatch(setCardsPerPlayerSlice({cardsPerPlayer:newCardCount}))
      playerGridRef.current.setCardsPerPlayer(newCardCount)
      
      const newBoardCount = getBoardCount(props)
      setBoardCount(newBoardCount)
      dispatch(setBoardCountFunc({boardCount:newBoardCount}))
      boardGridRef.current.setBoardCount(newBoardCount)

      
      const newCardsPerBoard = getCardsPerBoard(props)
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
    testLow8()
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

          <BoardGrid removeCard={removeCardBoard} setBoardFocus={setBoardFocus} ref={boardGridRef} boardCount={boardCount} cardsPerBoard="5"></BoardGrid>

          <Button title="Calculate Equity from Server" onPress={() => calculateEquityRemote()}></Button>
          <Button title="Calculate Equity from Local" onPress={() => calculateEquityLocal()}></Button>
          <Button title="Calculate Equity on Phone" onPress={() => calculateEquityOnHardware()}></Button>
          <Button title="Clear Cards" onPress={() => clearCards()}></Button>
          <Button title="Change Game" onPress={() => showGameChange()} ></Button>       
            
          <CardGrid pressedButton={pressedButton} ref={cardGridRef}></CardGrid>
          <Modal visible={isGameChangeVisible} onRequestClose={() => hideGameChange()}>
            <ScrollView>
              <Button title="Play BigO" onPress={() => chooseGame('BigOh')}></Button>
              <Button title="Play NLHE" onPress={() => chooseGame('NLHE')}></Button>
              
              <Button title="Play PLO4" onPress={() => chooseGame('PLO4')}></Button>
              <Button title="Play Double Board PLO" onPress={() => chooseGame('DBPLO4')}></Button>
              <Button title="Play Badacey" onPress={() => chooseGame('Badacey')}></Button>
              <Button title="Play Badacey" onPress={() => chooseGame('Badacey')}></Button>
              <Button title="Close" onPress={() => hideGameChange()}></Button>
            </ScrollView>
          </Modal>
          <Game ref={gameRef}/>
          
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



