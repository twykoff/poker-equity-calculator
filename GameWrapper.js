


import { getBoardCards, getBoardCountSlice, getCardsPerBoard } from './src/Redux/boardSlice.js'
import { getPlayerCards, getPlayerCount, getCardsPerPlayer, setEquity} from './src/Redux/playerSlice.js'
import { showEquity, hideEquity, setNumTrials } from './src/Redux/equitySlice.js';

import {forwardRef, useImperativeHandle} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { runGameServer } from './ServerCall.js'

const gameUtils = require('./GameUtilsNJS.js')

const game = require('./Game.js')

const GameWrapper = (props, ref) => {
  const dispatch = useDispatch()
  
  const playerCards = useSelector((state) => getPlayerCards(state))
  const playerCount = useSelector((state) => getPlayerCount(state))
  const cardsPerPlayer = useSelector((state) => getCardsPerPlayer(state))
  const boardCards = useSelector((state) => getBoardCards(state))
  const boardCount = useSelector((state) => getBoardCountSlice(state))
  const cardsPerBoard = useSelector((state) => getCardsPerBoard(state))


  
  useImperativeHandle(ref, () => ({
    calculateEquity: (gameName, path) => {calculateEquity(gameName, path)},
    calculateEquityOnHardware: (gameName) => {calculateEquityOnHardware(gameName)}
  }))



  async function calculateEquity(gameName, path) {

   
    dispatch(hideEquity())


    let playerBoardRandom = gameUtils.setUpPlayerBoardRandom(playerCards, boardCards, playerCount, cardsPerPlayer, boardCount, cardsPerBoard)
    
    
    let i, j
    let d1 = Date.now()
    let d2
    
    let cardArray = playerBoardRandom.cardArray
    let boardArray = playerBoardRandom.boardArray

    let randomCardCount = 3 //playerBoardRandom.randomCount

    let equityStruct
    let equityFromServer

    if(randomCardCount <= 2) {
        //run exhaustive on hardware
    }
    else {

        let promiseFromServer = []
        promiseFromServer[0] = runGameServer(gameName, playerCount, cardArray, boardArray, path)
    
        equityFromServer = await Promise.all(promiseFromServer)
        console.log("EQ STRUCT ")
        //console.log(equityStruct[0].playerWins)
    
        equityStruct = gameUtils.setGameEquity(equityFromServer[0].playerWins, equityFromServer[0].playerScoop, equityFromServer[0].numTrials)
    }



    for(i = 0; i < playerCount; i++)
      dispatch(setEquity({playerNumber: i, equity: getPercent(equityStruct.playerEquity[i]), 
        scoops: getPercent(equityStruct.playerScoops[i])}))

    console.log(equityStruct.numTrials)
    dispatch(setNumTrials({numTrials: equityStruct.numTrials}))

    d2 = Date.now()
    console.log("TIME: " + Math.floor((d2-d1)/1000)); //in milliseconds)
    console.log("TRIALS: " + equityFromServer[0].numTrials)
    dispatch(showEquity())
  }

  async function calculateEquityOnHardware(gameName) {

   
    dispatch(hideEquity())


    let d1, d2

    d1 = Date.now()

    
    let equity = game.runGame(playerCards, boardCards, playerCount, cardsPerPlayer, boardCount, cardsPerBoard, gameName, 1000)

    let equityStruct = gameUtils.setGameEquity(equity.playerWins, equity.playerScoop, equity.numTrials)
    for(i = 0; i < playerCount; i++)
      dispatch(setEquity({playerNumber: i, equity: getPercent(equityStruct.playerEquity[i]), 
        scoops: getPercent(equityStruct.playerScoops[i])}))

    
    console.log("NUM TRIALS: " + equityStruct.numTrials)
    dispatch(setNumTrials({numTrials: equityStruct.numTrials}))

    d2 = Date.now()
    console.log("TIME: " + Math.floor((d2-d1)/1000)); //in milliseconds)
    console.log("TRIALS: " + equity.numTrials)
    dispatch(showEquity())
  }

  const getPercent = (value) => {
    let returnValue = (Math.round(value * 1000)/10) + "%"
    //console.log("new equity: " + returnValue)
    return returnValue
  }
}

export default forwardRef(GameWrapper)