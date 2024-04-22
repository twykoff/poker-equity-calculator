import CalculateHigh from './CalculateHigh';
import { CalculateHighVar } from './CalculateHigh';

import {getCardReverse} from './GameUtils'



export const runTrialNLHE = (cardArray, boardArray, playerCount) => {
  let i

  
  let playerHighScore = []
  for(i = 0; i < playerCount; i++) {
    playerHighScore[i] = calculatePlayerScore(cardArray[i], boardArray[0])
    //playerHighScore[i] = CalculateHigh(boardArray[0])
    //playerHighScore[i] = '10000000000'
    //playerHighScore[i] = CalculateHighVar(boardArray[0][0],boardArray[0][1],boardArray[0][2],boardArray[0][3],boardArray[0][4])
  }
  
  /*

  playerOne = [getCardReverse(cardArray[0][0]), getCardReverse(cardArray[0][1])]
  playerTwo = [getCardReverse(cardArray[1][0]), getCardReverse(cardArray[1][1])]
  board = [getCardReverse(boardArray[0][0]), getCardReverse(boardArray[0][1]), getCardReverse(boardArray[0][2]), getCardReverse(boardArray[0][3]),
    getCardReverse(boardArray[0][4])]
  */

  //console.log(playerOne)
  //console.log(playerTwo)
  //console.log(board)

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

  returnScore = '00000000000';
    
  combinedArray = [cardArray[0], cardArray[1], boardArray[0], boardArray[1],
    boardArray[2], boardArray[3], boardArray[4]]

  for(i = 0; i < 3; i++) {
    sendArray[0] = combinedArray[i];
    for(j = i + 1; j < 4; j++) {
      sendArray[1] = combinedArray[j];
      for(k = j + 1; k < 5; k++) {
        sendArray[2] = combinedArray[k];
        for(m = k + 1; m < 6; m++) {
          sendArray[3] = combinedArray[m];
          for(n = m + 1; n < 7; n++) {
            sendArray[4] = combinedArray[n];
            
            //score = '10000000000'
            score = CalculateHigh(sendArray);
            //console.log(score)
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

