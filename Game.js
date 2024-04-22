import CalculateHigh from './CalculateHigh';
import CalculateRazz from './CalculateRazz';

import { runTrialBigOh } from './BigOh'
import { runTrialNLHE } from './NLHE'
import { runTrialPLO4 } from './PLOH4'
import { runTrialDBPLO4 } from './DBPLO4'


import { getRandomCards, setGameEquity, setUpPlayerBoardRandom } from './GameUtils';
import { getBoardCards, getBoardCountSlice, getCardsPerBoard } from './src/Redux/boardSlice'
import { getPlayerCards, getPlayerCount, getCardsPerPlayer, setEquity} from './src/Redux/playerSlice'
import { showEquity, hideEquity } from './src/Redux/equitySlice';

import {forwardRef, useImperativeHandle, useState, useMemo, useEffect, useRef} from 'react'



import { useDispatch, useSelector } from 'react-redux';

import { runGameServer } from './ServerCall.js'



const Game = (props, ref) => {
  const dispatch = useDispatch()
  
  const playerCards = useSelector((state) => getPlayerCards(state))
  const playerCount = useSelector((state) => getPlayerCount(state))
  const cardsPerPlayer = useSelector((state) => getCardsPerPlayer(state))
  const boardCards = useSelector((state) => getBoardCards(state))
  const boardCount = useSelector((state) => getBoardCountSlice(state))
  const cardsPerBoard = useSelector((state) => getCardsPerBoard(state))

  const bigOhRef = useRef()
  const NLHERef = useRef()
  const PLO4Ref = useRef()
  const PLO5Ref = useRef()
  const PLO6Ref = useRef()
  const DBPLO4Ref = useRef()
  
  useImperativeHandle(ref, () => ({
    calculateEquity: (gameName, path) => {calculateEquity(gameName, path)},
    calculateEquityOnHardware: (gameName) => {calculateEquityOnHardware(gameName)}
  }))

  const runTestHigh = () => {
    let a, b, c, d, e;

    let cardArray = []

    let count = 0;
    for(a = 0; a < 52; a++) {
      for(b = a + 1; b < 52; b++) {
        for(c = b + 1; c < 52; c++) {
          for(d = c + 1; d < 52; d++) {
            for(e = d + 1; e < 52; e++) {
              cardArray[0] = a;
              cardArray[1] = b;
              cardArray[2] = c;
              cardArray[3] = d;
              cardArray[4] = e;
              CalculateHigh(cardArray)
              count++
              //console.log(CalculateHigh(cardArray))
            }
          }
        }
      }
    }

    //console.log(count)
  }


  async function calculateEquity(game, path) {

   
    dispatch(hideEquity())

    /*
    console.log("Cards: " + boardCards)
    console.log("Count: " + boardCount)
    console.log(cardsPerBoard)
    */

    let playerBoardRandom = setUpPlayerBoardRandom(playerCards, boardCards, playerCount, cardsPerPlayer, boardCount, cardsPerBoard)
    
    
    let i, j
    let d1 = Date.now()
    let d2
    let diff
    
    let randomSet = playerBoardRandom.randomSet
    let cardArray = playerBoardRandom.cardArray
    let randomCards = playerBoardRandom.randomCards
    let totalCards = playerBoardRandom.totalCards
    let randomCount = playerBoardRandom.randomCount
    let boardArray = playerBoardRandom.boardArray

    /*
    console.log(game)
    console.log(playerCount)
    console.log(cardArray)
    console.log(boardArray)
    */

    let promiseFromServer = []
    promiseFromServer[0] = runGameServer(game, playerCount, cardArray, boardArray, path)

    const equityFromServer = await Promise.all(promiseFromServer);

    /*
    console.log(equityFromServer[0])
    console.log(equityFromServer[0].playerWins)
    console.log(equityFromServer[0].playerScoop)
    */

    let equityStruct = setGameEquity(equityFromServer[0].playerWins, equityFromServer[0].playerScoop, equityFromServer[0].numTrials)

    for(i = 0; i < playerCount; i++)
      dispatch(setEquity({playerNumber: i, equity: getPercent(equityStruct.playerEquity[i]), 
        scoops: getPercent(equityStruct.playerScoops[i])}))

    d2 = Date.now()
    console.log("TIME: " + Math.floor((d2-d1)/1000)); //in milliseconds)
    console.log("TRIALS: " + equityFromServer[0].numTrials)
    dispatch(showEquity())
  }

  const calculateEquityOnHardware = (gameName) => {

   
    dispatch(hideEquity())

    //console.log("BOARD CARDS CEOH: " + boardCards)

    let playerBoardRandom = setUpPlayerBoardRandom(playerCards, boardCards, playerCount, cardsPerPlayer, boardCount, cardsPerBoard)
    
    
    let i, j
    let numTrials = 10000
    let d1 = Date.now()
    let d2
    let diff
    
    let randomSet = playerBoardRandom.randomSet
    let cardArray = playerBoardRandom.cardArray
    let randomCards = playerBoardRandom.randomCards
    let totalCards = playerBoardRandom.totalCards
    let randomCount = playerBoardRandom.randomCount
    let boardArray = playerBoardRandom.boardArray

    let playerWins = []
    let playerScoop = []

    
    for(i = 0; i < playerCount; i++) {
      playerWins[i] = 0
      playerScoop[i] = 0
    }

    let newCardArray, newBoardArray
    let newCardsStruct

    let handResultStruct
    for(i = 0; i < numTrials; i++) {
        if(i% 1000 == 0)
            console.log("Trial #: " + i);
        newCardsStruct = getRandomCards(cardArray, boardArray, randomSet, randomCount, playerCount, cardsPerPlayer, boardCount, cardsPerBoard)

        newCardArray = newCardsStruct.newCardArray
        newBoardArray = newCardsStruct.newBoardCards
        handResultStruct = runTrial(newCardArray, newBoardArray, playerCount, gameName)
        
        for(j = 0; j < playerCount; j++)
        {
          playerWins[j]   += handResultStruct.playerWins[j]
          playerScoop[j]  += handResultStruct.playerScoop[j]
        }        
    }


    let equityStruct = setGameEquity(playerWins, playerScoop, numTrials, playerCount)
    for(i = 0; i < playerCount; i++)
      dispatch(setEquity({playerNumber: i, equity: getPercent(equityStruct.playerEquity[i]), 
        scoops: getPercent(equityStruct.playerScoops[i])}))

    d2 = Date.now()
    console.log("TIME: " + Math.floor((d2-d1)/1000)); //in milliseconds)
    console.log("TRIALS: " + numTrials)
    dispatch(showEquity())
  }

  const getPercent = (value) => {
    let returnValue = (Math.round(value * 1000)/10) + "%"
    //console.log("new equity: " + returnValue)
    return returnValue
  }



 
  const runTrial = (cardArray, boardArray, playerCount, gameName) => {
    if(gameName === 'BigOh') {
      //console.log("RUN BIG OH")
      return runTrialBigOh(cardArray, boardArray, playerCount)
    }
    if(gameName === 'NLHE'){
      //console.log("RUN NHLE")
      return runTrialNLHE(cardArray, boardArray, playerCount)
    }
    
    if(gameName === 'PLO4')
      return runTrialPLO4(cardArray, boardArray, playerCount)
    if(gameName === 'DBPLO4')
      return runTrialDBPLO4(cardArray, boardArray, playerCount)
    /*
    if(gameName === 'PLO5')
      PLO5Ref.current.runTrial()
    if(gameName === 'PLO6')
      PLO6Ref.current.runTrial()
    */
    
  }
  

}

export default forwardRef(Game)