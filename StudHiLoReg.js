import CalculateHigh, { CalculateHighXCards } from './CalculateHigh';
import {CalculateHighFull} from './CalculateHigh'
import CalculateRazz, { CalculateLow8OrBetterXCards } from './CalculateRazz';
import {Calculate8BetterFull} from './CalculateRazz'




  export const runTrialStudHiLoReg = (cardArray, boardArray, playerCount) => {
    let displayLowScores = true
    let displayHighScores = true

    let playerHighScore = []
    for(i = 0; i < playerCount; i++) {
      playerHighScore[i] = CalculateHighXCards(cardArray[i], 7)
      //playerHighScore[i] = '10000000000'
    }

    
    let playerLowScore = []
    for(i = 0; i < playerCount; i++) {
      playerLowScore[i] = CalculateLow8OrBetterXCards(cardArray[i], 7)
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

    let minLowScore = '10706050403'

    for(i = 0; i < playerCount; i++) {
      if(playerLowScore[i] < minLowScore)
        minLowScore = playerLowScore[i]
    }
  
    let isLowScore = []
    let countLowScores = 0
  
    for(i = 0; i < playerCount; i++) {
      if(playerLowScore[i] == minLowScore) {
        isLowScore[i] = 1
        countLowScores++
      }
      else
        isLowScore[i] = 0
    }

    let playerWins = []
    let playerScoop = []

    let doubleHigh = 1
    if(countLowScores == 0)
      doubleHigh = 2

    for(i = 0; i < playerCount; i++) {
      playerWins[i] = 0
      playerScoop[i] = 0
    }

    for(i = 0; i < playerCount; i++) {
      if(isHighScore[i] == 1) {
        playerWins[i] += 1/countHighScores * doubleHigh
      }
      if(isLowScore[i] == 1) {
        playerWins[i] += 1/countLowScores
      }

      if(isHighScore[i] == 1 && countHighScores == 1 && 
        (doubleHigh == 2 || (isLowScore[i] == 1 && countLowScores == 1))) {
        playerScoop[i] += 1
      }
    }


    return {
      playerWins: playerWins,
      playerScoop: playerScoop}
  }
  


  const calculatePlayerScore = (cardArray) => {
    let returnScore;
    let i;
    let j;
    let score;


    returnScore = '99999999999';
    
    let sendArray = [0,0,0,0,0]
    
    
    for(i = 0; i < 3; i++) {
      sendArray[0] = cardArray[i];
      for(j = i + 1; j < 4; j++) {
        sendArray[1] = cardArray[j];
        for(k = j + 1; k < 5; k++) {
          sendArray[2] = cardArray[k];
          for(m = k + 1; m < 6; m++) {
            sendArray[3] = cardArray[m];
            for(n = m + 1; n < 7; n++) {
              sendArray[4] = cardArray[n];
              
              score = CalculateRazz(sendArray);
             
              if(score < returnScore) {
                returnScore = score;
              }
              
            }
          }
        }
      }
    }


    return returnScore;
  }
