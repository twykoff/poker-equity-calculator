const calculateHigh = require('./CalculateHigh.js')
const calculateRazz = require('./CalculateRazz.js')

const calculateBadugi = require('./CalculateBadugi.js')

module.exports = {
  runTrial: (cardArray, playerCount, gameName) => runTrial(cardArray, playerCount, gameName),
  dealerResult: (cardArray, playerCount, gameName) => dealerResult(cardArray, playerCount, gameName)
}

const dealerResult = (cardArray, playerCount, gameName) => {

  let playerRazzScore = []
  for(i = 0; i < playerCount; i++) {
    if(gameName == 'Badacey')
      playerRazzScore[i] = calculateRazz.calculateRazz(cardArray[i])
    else
      playerRazzScore[i] = calculateHigh.calculateHigh(cardArray[i])

  }

  
  let playerBadugiScore = []
  for(i = 0; i < playerCount; i++) {
    playerBadugiScore[i] = calculateBadugi.calculateBadugi(cardArray[i], gameName)
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

  let playerWinsRazz = []
  let playerWinsBadugi
  let playerScoop = []



  for(i = 0; i < playerCount; i++) {
    playerWinsRazz[i] = 0
    playerWinsBadugi[i] = 0
    playerScoop[i] = 0
  }

  for(i = 0; i < playerCount; i++) {
    if(isRazzScore[i] == 1) {
      playerWinsRazz[i] += 1/countRazzScores
    }
    if(isBadugiScore[i] == 1) {
      playerWinsBadugi[i] += 1/countBadugiScores
    }

    if(isRazzScore[i] == 1 && countRazzScores == 1 && isBadugiScore[i] == 1 && countBadugiScores == 1) {
      playerScoop[i] += 1
    }
  }


  return {
    gameHasHigh: true, //razz
    gameHasLow: true, //badugi,
    playerWinsHigh: playerWinsRazz,
    playerWinsLow: playerWinsBadugi,
    playerScoop: playerScoop}
}

const runTrial = (cardArray, playerCount, gameName) => {

  let playerRazzScore = []
  for(i = 0; i < playerCount; i++) {
    if(gameName == 'Badacey')
      playerRazzScore[i] = calculateRazz.calculateRazz(cardArray[i])
    else
      playerRazzScore[i] = calculateHigh.calculateHigh(cardArray[i])

  }

  
  let playerBadugiScore = []
  for(i = 0; i < playerCount; i++) {
    playerBadugiScore[i] = calculateBadugi.calculateBadugi(cardArray[i], gameName)
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
  



