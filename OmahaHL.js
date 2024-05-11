const calculateHigh = require('./CalculateHigh.js')
const calculateRazz = require('./CalculateRazz.js')

//need to 
module.exports = {
  runTrial: (cardArray, boardArray, playerCount, playerCardCount) => runTrial(cardArray, boardArray, playerCount, playerCardCount)
}

  const runTrial = (cardArray, boardArray, playerCount, playerCardCount) => {
    let displayLowScores = false
    let displayHighScores = false

    let playerHighScore = []

    let i
    console.log(boardArray[0])
    for(i = 0; i < playerCount; i++) {
      console.log("I " + i + ": " + cardArray[i])
      playerHighScore[i] = calculateHigh.calculateHighOmahaFull(cardArray[i], boardArray[0], playerCardCount)
      console.log("HIGH: " + playerHighScore[i])
    }

    
    let playerLowScore = []
    for(i = 0; i < playerCount; i++) {
      console.log("I " + i + ": " + cardArray[i])
      playerLowScore[i] = calculateRazz.calculateLowOmahaFull(cardArray[i], boardArray[0], playerCardCount)
      console.log("LOW: " + playerLowScore[i])
    }


    
    if(displayHighScores || displayLowScores) {
      console.log(cardArray)
      console.log(boardArray)
    }
    
    if(displayHighScores) {
      console.log("P1S: " + playerHighScore[0])
      console.log("P2S: " + playerHighScore[1])
    }
    if(displayLowScores) {
      console.log("P1L: " + playerLowScore[0])
      console.log("P2L: " + playerLowScore[1])
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
