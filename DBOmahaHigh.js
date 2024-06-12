const calculateHigh = require('./CalculateHigh.js');

module.exports = {
  runTrial: (cardArray, boardArray, playerCount, playerCardCount) => runTrial(cardArray, boardArray, playerCount, playerCardCount)
}

  const runTrial = (cardArray, boardArray, playerCount, playerCardCount) => {
    let displayLowScores = false
    let displayHighScores = false

    let playerBoard1Score = []
    for(i = 0; i < playerCount; i++) {
      playerBoard1Score[i] = calculateHigh.calculateHighOmahaFull(cardArray[i], boardArray[0], playerCardCount)
      //playerHighScore[i] = '10000000000'
    }

    /*
    console.log(cardArray)
    console.log(boardArray)
    */

    let playerBoard2Score = []
    for(i = 0; i < playerCount; i++) {
      playerBoard2Score[i] = calculateHigh.calculateHighOmahaFull(cardArray[i], boardArray[0], playerCardCount)
      //playerHighScore[i] = '10000000000'
    }


    
    if(displayHighScores || displayLowScores) {
      //console.log(cardArray)
      //console.log(newBoardCards)
    }
    
    if(displayHighScores) {
      //console.log("P1S: " + playerOneHighScore)
      //console.log("P2S: " + playerTwoHighScore)
    }
    if(displayLowScores) {
      //console.log("P1L: " + playerOneLowScore)
      //console.log("P2L: " + playerTwoLowScore)
    }

    let maxHighScore1 = '00000000000'

    for(i = 0; i < playerCount; i++) {
      if(playerBoard1Score[i] > maxHighScore1)
        maxHighScore1 = playerBoard1Score[i]
    }
  
    let isHighScore1 = []
    let countHighScores1 = 0
  
    for(i = 0; i < playerCount; i++) {
      if(playerBoard1Score[i] == maxHighScore1) {
        isHighScore1[i] = 1
        countHighScores1++
      }
      else
        isHighScore1[i] = 0
    }

    let maxHighScore2 = '00000000000'

    for(i = 0; i < playerCount; i++) {
      if(playerBoard2Score[i] > maxHighScore2)
        maxHighScore2 = playerBoard2Score[i]
    }
  
    let isHighScore2 = []
    let countHighScores2 = 0
  
    for(i = 0; i < playerCount; i++) {
      if(playerBoard2Score[i] == maxHighScore2) {
        isHighScore2[i] = 1
        countHighScores2++
      }
      else
        isHighScore2[i] = 0
    }

    let playerWins = []
    let playerScoop = []



    for(i = 0; i < playerCount; i++) {
      playerWins[i] = 0
      playerScoop[i] = 0
    }

    for(i = 0; i < playerCount; i++) {
      if(isHighScore1[i] == 1) {
        playerWins[i] += 1/countHighScores1
      }
      if(isHighScore2[i] == 1) {
        playerWins[i] += 1/countHighScores2
      }

      if(isHighScore1[i] == 1 && countHighScores1 == 1 && 
        isHighScore2[i] == 1 && countHighScores2 == 1) {
        playerScoop[i] += 1
      }
    }


    return {
      playerWins: playerWins,
      playerScoop: playerScoop}
  }
  

