const calculateRazz = require('./CalculateRazz.js')


module.exports = {
  runTrial: (cardArray, playerCount) => runTrial(cardArray, playerCount)
}



const runTrial = (cardArray, playerCount) => {
  let i

  
  let playerLowScore = []
  for(i = 0; i < playerCount; i++) {
    playerLowScore[i] = calculateRazz.calculateRazz(cardArray[i])
  }


  let minLowScore = '99999999999'

  for(i = 0; i < playerCount; i++) {
    if(playerHighScore[i] < minLowScore)
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

  for(i = 0; i < playerCount; i++) {
    playerWins[i] = 0
    playerScoop[i] = 0
  }

  for(i = 0; i < playerCount; i++) {
    if(isLowScore[i] == 1) {
      playerWins[i] += 1/countLowScores
      if(countLowScores == 1)
        playerScoop[i]++
    }
  }

  //console.log(playerWins)

  return {
    playerWins: playerWins,
    playerScoop: playerScoop}
}
 


