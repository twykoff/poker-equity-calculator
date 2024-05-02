import CalculateHigh from './CalculateHigh';
import { CalculateHighXCards } from './CalculateHigh';

import {getCardReverse} from './GameUtils'



export const runTrialStud = (cardArray, playerCount) => {
  let i

  
  let playerHighScore = []
  for(i = 0; i < playerCount; i++) {
    playerHighScore[i] = CalculateHighXCards(cardArray[i], 7)
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
 

