const calculateHigh = require('./CalculateHigh.js')


module.exports = {
  runTrial: (cardArray, playerCount) => runTrial(cardArray, playerCount),
  dealerResult: (cardArray, playerCount) => dealerResult(cardArray, playerCount)
}


const dealerResult = (cardArray, playerCount) => {
  let i

  
  let playerHighScore = []
  for(i = 0; i < playerCount; i++) {
    playerHighScore[i] = calculateHigh.calculateHigh(cardArray[i])
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
    gameHasHigh: true,
    gameHasLow: false, 
    playerWinsHigh: playerWins,
    playerScoop: playerScoop}
}

const runTrial = (cardArray, playerCount) => {
  let i

  
  let playerHighScore = []
  for(i = 0; i < playerCount; i++) {
    playerHighScore[i] = calculateHigh.calculateHigh(cardArray[i])
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
 


