import CalculateHigh from './CalculateHigh';
import {CalculateHighFull} from './CalculateHigh'
import CalculateRazz from './CalculateRazz';
import CalculateBadugi from './CalculateBadugi'
import {Calculate8BetterFull} from './CalculateRazz'




  export const runTrialBadacey = (cardArray, playerCount, game) => {
    let displayLowScores = true
    let displayHighScores = true

    console.log("PC: " + playerCount)
    let playerRazzScore = []
    for(i = 0; i < playerCount; i++) {
      if(game == 'Badacey')
        playerRazzScore[i] = CalculateRazz(cardArray[i])
      else
        playerRazzScore[i] = CalculateHigh(cardArray[i])
    }

    
    let playerBadugiScore = []
    for(i = 0; i < playerCount; i++) {
      playerBadugiScore[i] = calculatePlayerScore(cardArray[i], game)
    }

    let minRazzScore = '99999999999'

    for(i = 0; i < playerCount; i++) {
      if(playerRazzScore[i] < minRazzScore)
        minRazzScore = playerRazzScore[i]
    }
  
    let isRazzScore = []
    let countRazzScores = 0
  
    for(i = 0; i < playerCount; i++) {
      if(playerRazzScore[i] == minRazzScore) {
        isRazzScore[i] = 1
        countRazzScores++
      }
      else
        isRazzScore[i] = 0
    }

    let minBadugiScore = '999999999'

    for(i = 0; i < playerCount; i++) {
      if(playerBadugiScore[i] < minBadugiScore)
        minBadugiScore = playerBadugiScore[i]
    }
  
    let isBadugiScore = []
    let countBadugiScores = 0
  
    for(i = 0; i < playerCount; i++) {
      if(playerBadugiScore[i] == minBadugiScore) {
        isBadugiScore[i] = 1
        countBadugiScores++
      }
      else
        isBadugiScore[i] = 0
    }

    let playerWins = []
    let playerScoop = []



    for(i = 0; i < playerCount; i++) {
      playerWins[i] = 0
      playerScoop[i] = 0
    }

    for(i = 0; i < playerCount; i++) {
      if(isRazzScore[i] == 1) {
        playerWins[i] += 1/countRazzScores
      }
      if(isBadugiScore[i] == 1) {
        playerWins[i] += 1/countBadugiScores
      }

      if(isRazzScore[i] == 1 && countRazzScores == 1 && isBadugiScore[i] == 1 && countBadugiScores == 1) {
        playerScoop[i] += 1
      }
    }


    return {
      playerWins: playerWins,
      playerScoop: playerScoop}
  }
  


  const calculatePlayerScore = (cardArray, game) => {
    let returnScore;
    let i;
    let j;
    let score;

    returnScore = '99999999999';
    
    
    for(i = 0; i < 2; i++) {
      for(j = i + 1; j < 3; j++) {
        for(k = 0; k < 4; k++) {
          for(m = k + 1; m < 5; m++) {
            score = CalculateBadugi([cardArray[i], cardArray[j], cardArray[k], cardArray[m]], game);
            if(score < returnScore) {
              returnScore = score;
            }
          }
        }
      }
    }

    console.log(cardArray)
    console.log(game)
    console.log("RET STRING: " + returnScore)

    return returnScore;
  }
