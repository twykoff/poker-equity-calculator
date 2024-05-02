const calculateHigh = require('./CalculateHigh.js');

import CalculateRazz from './CalculateRazz';

import { getRandomCards, getCard } from './GameUtils';
import {getBoardCards, getBoardsSet} from './src/Redux/boardSlice'
import { setEquity, showEquity } from './src/Redux/equitySlice';

import {forwardRef, useImperativeHandle, useState, useMemo, useEffect, useRef} from 'react'



import { useDispatch, useSelector } from 'react-redux';
import {getPlayerCards, getPlayerCount, getPlayerCountSet, getPlayersSet} from './src/Redux/playerSlice'



const PLOH6 = (props, ref) => {
  const dispatch = useDispatch()
  
  const playerCards = useSelector((state) => getPlayerCards(state))
  const playerCount = useSelector((state) => getPlayerCount(state))
  const playerCountSet = useSelector((state) => getPlayerCountSet(state))
  const playersSet = useSelector((state) => getPlayersSet(state))
  const boardCards = useSelector((state) => getBoardCards(state))
  const boardsSet = useSelector((state) => getBoardsSet(state))
  
  const [cardsPerPlayer, setCardsPerPlayer] = useState(6)
  useImperativeHandle(ref, () => ({
    // methods connected to `ref`
    calculateEquity: () => {calculateEquity()}
  }))

  const calculateEquity = () => {
    console.log("IN CALC EQ")
    let cardArray = []
    let boardArray = []
    let i, j
    let boardCount = 0



    let player1Wins;
    let player2Wins;
    let chop;

    
    let playerOneScoopCount;
    let playerTwoScoopCount;

    let randomCards = []
    let totalCards = 0
    let randomSet = []

    let newBoardCards
    let playerOneHighScore
    let playerTwoHighScore
    let playerOneLowScore
    let playerTwoLowScore

    let lowIsPaid
    let playerOneScoopsLow
    let playerTwoScoopsLow
    let numTrials = 10000

    

    for(i = 0; i < 52; i++)
        randomCards[i] = false

    for(i = 0; i < playerCount; i++) {
        cardArray[i] = []
        for(j = 0; j < cardsPerPlayer; j++) {
            cardArray[i][j] = getCard(playerCards[i][j])
            if(cardArray[i][j] >= 0) {
                randomCards[cardArray[i][j]] = true
                totalCards++
            }
        }
    }
            
    boardArray = []
    for(i = 0; i < 5; i++) {
        boardArray[i] = getCard(boardCards[0][i])
        if(boardArray[i] >= 0) {
            boardCount++
            randomCards[boardArray[i]] = true
            totalCards++
        }
        
    }

    randomCount = 0
    for(i = 0; i < 52; i++ ) {
        if(!randomCards[i]) {
            randomSet[randomCount++] = i
        }
    }
    
    player1Wins = 0
    player2Wins = 0
    playerOneScoopCount = 0
    playerTwoScoopCount = 0
    chop = 0


  
    for(i = 0; i < numTrials; i++) {
        if(i% 1000 == 0)
            console.log("Trial #: " + i);
    
        
        newBoardCards = getRandomCards(boardArray, randomSet, randomCount)

        handResult = calculateHandEquity(cardArray, newBoardCards)

        player1Wins += handResult.player1Wins
        player2Wins += handResult.player2Wins

        playerOneScoopCount += handResult.playerOneScoopCount
        playerTwoScoopCount += handResult.playerTwoScoopCount
        
    }

    let playerOneEquity = ((player1Wins)/(player1Wins + player2Wins));
    let playerOneScoops =((playerOneScoopCount)/(numTrials));

    let playerTwoEquity = ((player2Wins)/(player1Wins + player2Wins));
    let playerTwoScoops = ((playerTwoScoopCount)/(numTrials));
    
    let setChops = ((numTrials - playerOneScoopCount - playerTwoScoopCount)/numTrials);

    console.log("EQ1 " + playerOneEquity)
    console.log("EQ2 " + playerTwoEquity)
    console.log("SC1 " + playerOneScoops)
    console.log("SC2 " + playerTwoScoops)
    console.log("CHP " + setChops)

    dispatch(setEquity({equity: {playerOneEquity: playerOneEquity,
        playerTwoEquity: playerTwoEquity,
        playerOneScoops: playerOneScoops,
        playerTwoScoops: playerTwoScoops,
        setChops: setChops
    }}))

    dispatch(showEquity())
  }

  const calculateHandEquity = (cardArray, newBoardCards) => {
    let displayHighScores = false
    let playerOneHighScore = calculatePlayerScore(cardArray[0], newBoardCards)
    let playerTwoHighScore = calculatePlayerScore(cardArray[1], newBoardCards)

      

    if(displayHighScores) {
      console.log(cardArray)
      console.log(newBoardCards)
    }
    
    if(displayHighScores) {
      console.log("P1S: " + playerOneHighScore)
      console.log("P2S: " + playerTwoHighScore)
    }



    let player1Wins = 0
    let player2Wins = 0

    let playerOneScoopCount = 0
    let playerTwoScoopCount = 0

    let chop = 0

    

    if(playerOneHighScore > playerTwoHighScore) {
      //player 1 wins
      playerOneScoopCount++;
      player1Wins += 4;
    }
    else if(playerTwoHighScore == playerOneHighScore) {
      //chop
      player1Wins += 2;
      player2Wins += 2;
        
    }
    else {
      //player 2 wins;  
      playerTwoScoopCount++;
      player2Wins += 4;
    }

    return {
      player1Wins: player1Wins,
      player2Wins: player2Wins,

      playerOneScoopCount: playerOneScoopCount,
      playerTwoScoopCount: playerTwoScoopCount}

  }
  


  const calculatePlayerScore = (cardArray, boardArray) => {
    let returnScore;
    let i;
    let j;
    let score;
    returnScore = '00000000000';
    
    sendArray = [0,0,0,0,0]
    
    for(i = 0; i < cardsPerPlayer - 1; i++) {
      sendArray[0] = cardArray[i];
      for(j = i + 1; j < cardsPerPlayer; j++) {
        sendArray[1] = cardArray[j];
        for(k = 0; k < 3; k++) {
          sendArray[2] = boardArray[k];
          for(m = k + 1; m < 4; m++) {
            sendArray[3] = boardArray[m];
            for(n = m + 1; n < 5; n++) {
              sendArray[4] = boardArray[n];
              score = calculateHigh.calculateHigh(sendArray);
              if(score > returnScore) {
                returnScore = score;
              }
              
            }
          }
        }
      }
    }

    return returnScore;
  }
}

export default forwardRef(PLOH6)