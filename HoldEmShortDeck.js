const calculateHigh = require('./CalculateHighShortDeck.js')


module.exports = {
  runTrial: (cardArray, boardArray, playerCount) => runTrial(cardArray, boardArray, playerCount),
  dealerResult: (cardArray, boardArray, playerCount) => dealerResult(cardArray, boardArray, playerCount)
}

const dealerResult = (cardArray, boardArray, playerCount) => {
  let i

  
  let playerHighScore = []
  for(i = 0; i < playerCount; i++) {
    playerHighScore[i] = calculateHigh.calculateHighXCards(getCardArray(cardArray[i], boardArray[0]), 7)
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
 




const runTrial = (cardArray, boardArray, playerCount) => {
  let i

  
  let playerHighScore = []
  for(i = 0; i < playerCount; i++) {
    playerHighScore[i] = calculateHigh.calculateHighXCards(getCardArray(cardArray[i], boardArray[0]), 7)
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
 
const getCardArray = (cardArray, boardArray) => {
  return [cardArray[0], cardArray[1], boardArray[0], boardArray[1], boardArray[2], boardArray[3], boardArray[4]]
}

