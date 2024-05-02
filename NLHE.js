const calculateHigh = require('./CalculateHigh.js)';

import {getCardReverse} from './GameUtils'



export const runTrialNLHE = (cardArray, boardArray, playerCount) => {
  let i

  
  let playerHighScore = []
  for(i = 0; i < playerCount; i++) {
    playerHighScore[i] = calculatePlayerScore(cardArray[i], boardArray[0])
  }


  let maxHighScore = '00000000000'

  for(i = 0; i < playerCount; i++) {
    if(playerHighScore[i] > maxHighScore)
      maxHighScore = playerHighScore[i]
  }

  let isHighScore = []
  let countHighScores = 0

  for(i = 0; i < playerCount; i++) {
    if(playerHighScore[i] == maxHighScore) {
      isHighScore[i] = 1
      countHighScores++
    }
    else
      isHighScore[i] = 0
  }

  let playerWins = []
  let playerScoop = []

  for(i = 0; i < playerCount; i++) {
    playerWins[i] = 0
    playerScoop[i] = 0
  }

  for(i = 0; i < playerCount; i++) {
    if(isHighScore[i] == 1) {
      playerWins[i] += 1/countHighScores
      if(countHighScores == 1)
        playerScoop[i]++
    }
  }

  //console.log(playerWins)

  return {
    playerWins: playerWins,
    playerScoop: playerScoop}
}
 
export const calculatePlayerScore = (cardArray, boardArray) => {
  let returnScore;
  let i;
  let j;
  let score;
  
  sendArray = [0,0,0,0,0]

  return calculateHigh.calculateHighXCards([cardArray[0], cardArray[1], boardArray[0], boardArray[1],
    boardArray[2], boardArray[3], boardArray[4]], 7)

 
}

