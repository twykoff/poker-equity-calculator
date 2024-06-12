

const calculateBadugi = require('./CalculateBadugi.js')

module.exports = {
  runTrial: (cardArray, playerCount) => runTrial(cardArray, playerCount)
}


  const runTrial = (cardArray, playerCount) => {



    
    let playerBadugiScore = []
    for(i = 0; i < playerCount; i++) {
      playerBadugiScore[i] = calculateBadugi.calculateBadugi(cardArray[i], 'Badacey')
      //console.log("I " + i + ": " + playerBadugiScore[i])
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
      if(isBadugiScore[i] == 1) {
        playerWins[i] += 1/countBadugiScores
      }

      if(isBadugiScore[i] == 1 && countBadugiScores == 1) {
        playerScoop[i] += 1
      }
    }


    return {
      playerWins: playerWins,
      playerScoop: playerScoop}
  }
  



