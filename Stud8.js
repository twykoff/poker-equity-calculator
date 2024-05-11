const calculateHigh = require('./CalculateHigh.js')
const calculateRazz = require('./CalculateRazz.js')

module.exports = {
  runTrial: (cardArray, playerCount) => runTrial(cardArray, playerCount)
}



  const runTrial = (cardArray, playerCount) => {

    let playerHighScore = []
    for(i = 0; i < playerCount; i++) {
      playerHighScore[i] = calculateHigh.calculateHighXCards(cardArray[i], 7)
    }

    
    let playerLowScore = []
    for(i = 0; i < playerCount; i++) {
      playerLowScore[i] = calculateRazz.calculateLow8OrBetterXCards(cardArray[i], 7)
      console.log(i + " " + playerLowScore[i])
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
  


  const calculatePlayerScore = (cardArray, boardArray, game) => {
    let returnScore;
    let i;
    let j;
    let score;

    let localBoardArray, localCardArray
    if(game == 'high')
      returnScore = '00000000000';
    else {
      returnScore = '99999999999';
    }
    sendArray = [0,0,0,0,0]
    localCardArray = [cardArray[0], cardArray[1], cardArray[2], cardArray[3], cardArray[4]]
    localBoardArray = [boardArray[0], boardArray[1], boardArray[2], boardArray[3], boardArray[4]]
    
    for(i = 0; i < 4; i++) {
      sendArray[0] = localCardArray[i];
      for(j = i + 1; j < 5; j++) {
        sendArray[1] = localCardArray[j];
        for(k = 0; k < 3; k++) {
          sendArray[2] = localBoardArray[k];
          for(m = k + 1; m < 4; m++) {
            sendArray[3] = localBoardArray[m];
            for(n = m + 1; n < 5; n++) {
              sendArray[4] = localBoardArray[n];
              if(game == 'high') {
                score = calculateHigh.calculateHigh(sendArray);
                //score = '10000000000'
                if(score > returnScore) {
                  returnScore = score;
                }
              }
              else {
                score = CalculateRazz(sendArray);
                //score = '10000000000'
                if(score < returnScore) {
                  returnScore = score;
                }
              }
            }
          }
        }
      }
    }


    return returnScore;
  }
