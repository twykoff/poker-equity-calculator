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

    let score1
    let score2
    let score3
    let i

    let allow1 = 1
    let allow2 = 1
    let allow3 = 1

    let board1Rank = boardArray[0][4] % 13
    let board2Rank = boardArray[0][4] % 13
    let board3Rank = boardArray[0][4] % 13

    if(board1Rank == board2Rank && board1Rank == board2Rank) {
      //allow none - need to change to best hand
      allow1 = 0
      allow2 = 0
      allow3 = 0
    }
    else if(board1Rank == board2Rank) {
      if(board3Rank < board1Rank)
        allow3 = 0
      else {
        allow1 = 0
        allow2 = 0
      }
    }
    else if(board1Rank == board3Rank) {
      if(board2Rank < board1Rank)
        allow2 = 0
      else {
        allow1 = 0
        allow3 = 0
      }
    }
    else if(board2Rank == board3Rank) {
      if(board1Rank < board2Rank)
        allow1 = 0
      else {
        allow2 = 0
        allow3 = 0
      }
    }
    else if(board1Rank < board2Rank && board1Rank < board3Rank)
      allow1 = 0
    else if(board2Rank < board3Rank)
      allow2 = 0
    else
      allow3 = 0
    
    for(i = 0; i < playerCount; i++) {
      //console.log("I " + i + ": " + cardArray[i])
      if(allow1 == 1)
        score1 = calculateHigh.calculateHighOmahaFull(cardArray[i], boardArray[0], playerCardCount)
      else
        score1 = '00000000000'
      if(allow2 == 1)
        score2 = calculateHigh.calculateHighOmahaFull(cardArray[i], boardArray[1], playerCardCount)
      else
        score2 = '00000000000'
      if(allow3 == 1)
        score3 = calculateHigh.calculateHighOmahaFull(cardArray[i], boardArray[2], playerCardCount)
      else
        score3 = '00000000000'
      if(score1 > score2){
        if(score1 > score3) {

          playerHighScore[i] = score1
        }
        else {
          playerHighScore[i] = score3
        }
      }
      else if(score2 > score3)
        playerHighScore[i] = score2
      else
        playerHighScore[i] = score3
      
      if(allow1 == 0 && allow2 == 0 && allow3 == 0) {
        playerHighScore = calculateHigh.calculateHighXCards(cardArray[i], playerCardCount)
      }
    }

    
    let playerLowScore = []
    for(i = 0; i < playerCount; i++) {
      //console.log("I " + i + ": " + cardArray[i])
      if(allow1 == 1)
        score1 = calculateRazz.calculateLowOmahaFull(cardArray[i], boardArray[0], playerCardCount)
      else
        score1 = '99999999999'
      if(allow2 == 1)
        score2 = calculateRazz.calculateLowOmahaFull(cardArray[i], boardArray[1], playerCardCount)
      else
        score2 = '99999999999'
      if(allow3 == 1)
        score3 = calculateRazz.calculateLowOmahaFull(cardArray[i], boardArray[2], playerCardCount)
      else
        score3 = '99999999999'
      if(score1 < score2){
        if(score1 < score3) {

          playerLowScore[i] = score1
        }
        else {
          playerLowScore[i] = score3
        }
      }
      else if(score2 < score3)
        playerLowScore[i] = score2
      else
        playerLowScore[i] = score3
      
      if(allow1 == 0 && allow2 == 0 && allow3 == 0) {

        //need to fix but no low for now
        if(playerCardCount == 4) {
          playerLowScore[i] = '99999999999'
        }
        else {
          calculateRazz.calculateLow8OrBetterXCards(cardArray[i], playerCardCount)
        }
        //playerLowScore = calculateHigh.calculateHighXCards(cardArray[i], playerCardCount)
      }
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
