import CalculateHigh from './CalculateHigh';





  export const runTrialPLO4 = (cardArray, boardArray, playerCount) => {
    let displayLowScores = false
    let displayHighScores = false

    /*
    console.log(cardArray)
    console.log(boardArray)
    console.log(playerCount)
    */

    let playerHighScore = []
    for(i = 0; i < playerCount; i++) {
      playerHighScore[i] = calculatePlayerScore(cardArray[i], boardArray[0])
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
        playerWins[i] += 2/countHighScores
      }

      if(isHighScore[i] == 1 && countHighScores == 1) {
        playerScoop[i] += 1
      }
    }


    return {
      playerWins: playerWins,
      playerScoop: playerScoop}
  }
  
  const calculatePlayerScore = (cardArray, boardArray) => {
    let returnScore;
    let i;
    let j;
    let score;
    returnScore = '00000000000';
    sendArray = [0,0,0,0,0]
    localCardArray = [cardArray[0], cardArray[1], cardArray[2], cardArray[3]]
    localBoardArray = [boardArray[0], boardArray[1], boardArray[2], boardArray[3], boardArray[4]]
    
    for(i = 0; i < 3; i++) {
      sendArray[0] = localCardArray[i];
      for(j = i + 1; j < 4; j++) {
        sendArray[1] = localCardArray[j];
        for(k = 0; k < 3; k++) {
          sendArray[2] = localBoardArray[k];
          for(m = k + 1; m < 4; m++) {
            sendArray[3] = localBoardArray[m];
            for(n = m + 1; n < 5; n++) {
              sendArray[4] = localBoardArray[n];
             
              score = CalculateHigh(sendArray);
              //score = '10000000000'
              if(score > returnScore) {
                returnScore = score;
              }
              
            }
          }
        }
      }
    }


    return returnScore;
  }
