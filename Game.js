

const badacey     = require('./BadaceyBadeucey.js')
const badugi     = require('./Badugi.js')
  const omahaHL     = require('./OmahaHL.js')
  const omahaHigh   = require('./OmahaHigh.js')
  const dbOmahaHigh = require('./DBOmahaHigh.js')
  const nlhe      = require('./NLHE.js')
  const stud      = require('./Stud.js')
  const stud8     = require('./Stud8.js')
  const studHLReg = require('./StudHiLoReg.js')

  const gameProperties= require('./GameProperties.js')

  
const gameUtils = require('./GameUtilsNJS.js')

module.exports = {
  runGame: (playerCards, boardCards, playerCount, cardsPerPlayer, boardCount, cardsPerBoard, gameName, numTrials) => 
    runGame(playerCards, boardCards, playerCount, cardsPerPlayer, boardCount, cardsPerBoard, gameName, numTrials)
}


const runAllTrials = (cardArray, boardArray, randomSet, randomCount, playerCount, cardsPerPlayer, boardCount, cardsPerBoard, gameName) => {
  let i, j, k, m

  let playerWins = []
  let playerScoop = []

  let numTrials = 0

  let playerOrBoard = []
  let playerOrBoardNumber = []
  let cardNumber = []

  let randomCardCount = 0

  let handResultStruct

  for(i = 0; i < playerCount; i++) {
    for(j = 0; j < cardsPerPlayer; j++) {
      if(cardArray[i][j] < 0) {
        playerOrBoard[randomCardCount] = 0
        playerOrBoardNumber[randomCardCount] = i
        cardNumber[randomCardCount++] = j
      }
    }
  }

  
  for(i = 0; i < boardCount; i++) {
    for(j = 0; j < cardsPerBoard; j++) {
      if(boardArray[i][j] < 0) {
        playerOrBoard[randomCardCount] = 1
        playerOrBoardNumber[randomCardCount] = i
        cardNumber[randomCardCount++] = j
      }
    }
  }

  let firstSecondCardConnected = 0
  let secondThirdCardConnected = 0

  if(randomCardCount >= 2) {
    if(playerOrBoard[0] == playerOrBoard[1] && playerOrBoardNumber[0] == playerOrBoardNumber[1])
      firstSecondCardConnected = 1
  }

  
  if(randomCardCount == 3) {
    if(playerOrBoard[1] == playerOrBoard[2] && playerOrBoardNumber[1] == playerOrBoardNumber[2])
      secondThirdCardConnected = 1
  }

  for(i = 0; i < playerCount; i++) {
    playerWins[i] = 0
    playerScoop[i] = 0
  }

  let jStart, kStart

  if(randomCardCount == 3) {
    for(i = 0; i < randomCount; i++) {
      if(playerOrBoard[0] == 0) {
        cardArray[playerOrBoardNumber[0]][cardNumber[0]] = randomSet[i]
      }
      else {
        boardArray[playerOrBoardNumber[0]][cardNumber[0]] = randomSet[i]
      }
      if(firstSecondCardConnected == 1) {
        jStart = i + 1
      }
      else {
        jStart = 0
      }
      for(j = jStart; j < randomCount; j++) {
        if(i == j)
          continue
        if(playerOrBoard[1] == 0) {
          cardArray[playerOrBoardNumber[1]][cardNumber[1]] = randomSet[j]
        }
        else {
          boardArray[playerOrBoardNumber[1]][cardNumber[1]] = randomSet[j]
        }
        if(secondThirdCardConnected == 1) {
          kStart = j + 1
        }
        else {
          kStart = 0
        }
        for(k = kStart; k < randomCount; k++) {
          if(i == k || j == k) 
            continue
          if(playerOrBoard[2] == 0) {
            cardArray[playerOrBoardNumber[2]][cardNumber[2]] = randomSet[k]
          }
          else {
            boardArray[playerOrBoardNumber[2]][cardNumber[2]] = randomSet[k]
          }
          
          handResultStruct = runTrial(cardArray, boardArray, playerCount, gameName)      
          for(m = 0; m < playerCount; m++)
          {
            playerWins[m]   += handResultStruct.playerWins[m]
            playerScoop[m]  += handResultStruct.playerScoop[m]
          } 
          numTrials++
        }
      }
    }

  }

  if(randomCardCount == 2) {
    for(i = 0; i < randomCount; i++) {
      if(playerOrBoard[0] == 0) {
        cardArray[playerOrBoardNumber[0]][cardNumber[0]] = randomSet[i]
        //console.log("ADD PLAYER " + playerOrBoardNumber[0] + " CARD " + cardNumber[0] + " " + randomSet[i])
      }
      else {
        boardArray[playerOrBoardNumber[0]][cardNumber[0]] = randomSet[i]
        //console.log("ADD BOARD " + playerOrBoardNumber[0] + " CARD " + cardNumber[0] + " " + randomSet[i])
      }
      if(firstSecondCardConnected == 1) {
        jStart = i + 1
      }
      else {
        jStart = 0
      }
      for(j = jStart; j < randomCount; j++) {
        if(i == j)
          continue
        if(playerOrBoard[1] == 0) {
          cardArray[playerOrBoardNumber[1]][cardNumber[1]] = randomSet[j]
          //console.log("ADD PLAYER " + playerOrBoardNumber[1] + " CARD " + cardNumber[1] + " " + randomSet[j])
        }
        else {
          boardArray[playerOrBoardNumber[1]][cardNumber[1]] = randomSet[j]
          //console.log("ADD BOARD " + playerOrBoardNumber[1] + " CARD " + cardNumber[1] + " " + randomSet[j])
        }
        
        handResultStruct = runTrial(cardArray, boardArray, playerCount, gameName) 
        //console.log("CA " + cardArray)
        //console.log("BA " + boardArray)     
        //console.log(handResultStruct)
        for(m = 0; m < playerCount; m++)
        {
          //console.log("M " + m)
          playerWins[m]   += handResultStruct.playerWins[m]
          playerScoop[m]  += handResultStruct.playerScoop[m]
        } 
        numTrials++
      }
    }
  }


  if(randomCardCount == 1) {
    for(i = 0; i < randomCount; i++) {
      if(playerOrBoard[0] == 0) {
        cardArray[playerOrBoardNumber[0]][cardNumber[0]] = randomSet[i]
      }
      else {
        boardArray[playerOrBoardNumber[0]][cardNumber[0]] = randomSet[i]
      }
      
      handResultStruct = runTrial(cardArray, boardArray, playerCount, gameName)      
      for(m = 0; m < playerCount; m++)
      {
        playerWins[m]   += handResultStruct.playerWins[m]
        playerScoop[m]  += handResultStruct.playerScoop[m]
      } 
      numTrials++
    }
  }

  let equity = {playerWins: playerWins,
    playerScoop: playerScoop,
    numTrials: numTrials
  }

  return equity
}

const runGame = (playerCards, boardCards, playerCount, cardsPerPlayer, boardCount, cardsPerBoard, gameName, numTrials) => {
  console.log(playerCards[0])
  console.log(playerCards[1])
  console.log(boardCards[0])
  
  let playerBoardRandom = gameUtils.setUpPlayerBoardRandom(playerCards, boardCards, playerCount, cardsPerPlayer, boardCount, cardsPerBoard, numTrials)
      
      
  let i, j
  let d1 = Date.now()
  let d2
  let diff

  let randomSet = playerBoardRandom.randomSet
  let cardArray = playerBoardRandom.cardArray
  let randomCards = playerBoardRandom.randomCards
  let randomCardCount = playerBoardRandom.randomCardCount
  let totalCards = playerBoardRandom.totalCards
  let randomCount = playerBoardRandom.randomCount
  let boardArray = playerBoardRandom.boardArray

  let playerWins = []
  let playerScoop = []


  for(i = 0; i < playerCount; i++) {
    playerWins[i] = 0
    playerScoop[i] = 0
  }

  let newCardArray, newBoardArray
  let newCardsStruct

  let handResultStruct

  console.log("RCC" + randomCardCount)

  if(randomCardCount <= 3) {
    return runAllTrials(cardArray, boardArray, randomSet, randomCount, playerCount, cardsPerPlayer, boardCount, cardsPerBoard, gameName)
  }

  for(i = 0; i < numTrials; i++) {
      if(i% 1000 == 0)
          console.log("Trial #: " + i);
      newCardsStruct = gameUtils.getRandomCards(cardArray, boardArray, randomSet, randomCount, playerCount, cardsPerPlayer, boardCount, cardsPerBoard)

      newCardArray = newCardsStruct.newCardArray
      newBoardArray = newCardsStruct.newBoardCards
      handResultStruct = runTrial(newCardArray, newBoardArray, playerCount, gameName)
      
      for(j = 0; j < playerCount; j++)
      {
        playerWins[j]   += handResultStruct.playerWins[j]
        playerScoop[j]  += handResultStruct.playerScoop[j]
      }        
  } 

  let equity = {playerWins: playerWins,
    playerScoop: playerScoop,
    numTrials: numTrials
  }

  return equity
}

const runTrial = (cardArray, boardArray, playerCount, gameName) => {
  if(gameName === gameProperties.gameNames.holdEm){
    return nlhe.runTrial(cardArray, boardArray, playerCount)
  }
  if(gameName === gameProperties.gameNames.omahaHigh4)
    return omahaHigh.runTrial(cardArray, boardArray, playerCount, 4)
  
  if(gameName === gameProperties.gameNames.omahaHigh5)
    return omahaHigh.runTrial(cardArray, boardArray, playerCount, 5)
  if(gameName === gameProperties.gameNames.omahaHigh6)
    return omahaHigh.runTrial(cardArray, boardArray, playerCount, 6)
  
  
  if(gameName === gameProperties.gameNames.omahaHL4)
    return omahaHL.runTrial(cardArray, boardArray, playerCount, 4)
  
  if(gameName === gameProperties.gameNames.omahaHL5)
    return omahaHL.runTrial(cardArray, boardArray, playerCount, 5)
  if(gameName === gameProperties.gameNames.omahaHL6)
    return omahaHL.runTrial(cardArray, boardArray, playerCount, 6)
  if(gameName === gameProperties.gameNames.omahaDBHigh4)
    return dbOmahaHigh.runTrial(cardArray, boardArray, playerCount, 4)
  if(gameName === gameProperties.gameNames.omahaDBHigh5)
    return dbOmahaHigh.runTrial(cardArray, boardArray, playerCount, 5)
  
  if(gameName === gameProperties.gameNames.omahaDBHigh6)
    return dbOmahaHigh.runTrial(cardArray, boardArray, playerCount, 6)
  if(gameName === gameProperties.gameNames.badacey || gameName === gameProperties.gameNames.badeucey)
    return badacey.runTrial(cardArray, playerCount, gameName)
  if(gameName === gameProperties.gameNames.badugi)
    return badugi.runTrial(cardArray, playerCount)
  if(gameName === gameProperties.gameNames.stud)
    return stud.runTrial(cardArray, playerCount)
  if(gameName === gameProperties.gameNames.stud8)
    return stud8.runTrial(cardArray, playerCount)
  if(gameName === gameProperties.gameNames.studHL)
    return studHLReg.runTrial(cardArray, playerCount)
}