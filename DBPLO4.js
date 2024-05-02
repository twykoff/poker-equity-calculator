const calculateHigh = require('./CalculateHigh.js');

  export const runTrialDBPLO4 = (cardArray, boardArray, playerCount) => {
    let displayLowScores = false
    let displayHighScores = false

    let playerBoard1Score = []
    for(i = 0; i < playerCount; i++) {
      playerBoard1Score[i] = calculatePlayerScore(cardArray[i], boardArray[0])
      //playerHighScore[i] = '10000000000'
    }

    /*
    console.log(cardArray)
    console.log(boardArray)
    */

    let playerBoard2Score = []
    for(i = 0; i < playerCount; i++) {
      playerBoard2Score[i] = calculatePlayerScore(cardArray[i], boardArray[1])
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
             
              score = calculateHigh.calculateHigh(sendArray);
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

