

export const getPlayerCardCount = (game) => {
    if(game === 'NLHE')
        return 2
    if(game === 'BigOh')
        return 5
    if(game === 'PLO4')
        return 4
    if(game === 'PLO5')
        return 5
    if(game === 'PLO6')
        return 6
    if(game === 'DBPLO4')
        return 4
    if(game === 'Badacey')
        return 5
    if(game === 'Badeucey')
        return 5
}

export const getBoardCount = (game) => {
    if(game === 'NLHE')
        return 1
    if(game === 'BigOh')
        return 1
    if(game === 'PLO4')
        return 1
    if(game === 'PLO5')
        return 1
    if(game === 'PLO6')
        return 1
    if(game === 'DBPLO4')
        return 2
    if(game === 'Badacey')
        return 0
    if(game === 'Badeucey')
        return 0
}

export const getCardsPerBoard = (game) => {
    if(game === 'NLHE')
        return 5
    if(game === 'BigOh')
        return 5
    if(game === 'PLO4')
        return 5
    if(game === 'PLO5')
        return 5
    if(game === 'PLO6')
        return 5
    if(game === 'DBPLO4')
        return 5
    if(game === 'Badacey')
        return 0
    if(game === 'Badeucey')
        return 0
}

export const setGameEquity = (playerWins, playerScoop, numTrials) => {
    let playerEquity = []
    let playerScoops = []

    let winSum = 0
    let scoopTotal = 0

    let playerCount = playerWins.length
    for(i = 0; i < playerCount; i++) {
      winSum += playerWins[i]
      scoopTotal += playerScoop[i]
    }

    /*
    console.log("PC: " + playerCount)
    console.log("NT: " + numTrials)
    console.log("PW: " + playerWins)
    console.log("PS: " + playerScoop)
    */

    for(i = 0; i < playerCount; i++) {
      playerEquity[i] = ((playerWins[i])/(winSum))
      playerScoops[i] = ((playerScoop[i])/(numTrials))
    }

    return {playerEquity: playerEquity, playerScoops: playerScoops}
  }


export const getRandomCards = (cardArray, boardCards, randomSet, randomCount, playerCount, cardCount, boardCount, cardsPerBoard) => {
    let used = []
    let i, j

    let newBoardCards = []
    let newCardArray = []
    let keepGoing

    let rando

    /*
    console.log("BC: " + cardsPerBoard)
    console.log("PC: " + cardCount)
    */

    for(i = 0; i < randomCount; i++)
        used[i] = false

    for(i = 0; i < playerCount; i++) {
        newCardArray[i] = []
        for(j = 0; j < cardCount; j++) {
            if(cardArray[i][j] >= 0)
                newCardArray[i][j] = cardArray[i][j]
            else {
                for(keepGoing = 1; keepGoing > 0; ) {
                    rando = Math.floor(Math.random() * (randomCount));
                    if(used[rando] == false) {
                        newCardArray[i][j] = randomSet[rando]
                        used[rando] = true
                        keepGoing = 0
                    }
                }

            } 
        }
    }
    for(i = 0; i < boardCount; i++) {
        newBoardCards[i] = []
        for(j = 0; j < cardsPerBoard; j++) {
            if(boardCards[i][j] >= 0)
                newBoardCards[i][j] = boardCards[i][j]
            else {
                for(keepGoing = 1; keepGoing > 0; ) {
                    rando = Math.floor(Math.random() * (randomCount));
                    if(used[rando] == false) {
                        newBoardCards[i][j] = randomSet[rando]
                        used[rando] = true
                        keepGoing = 0
                    }
                }
            }
        }
    }

    return {newBoardCards: newBoardCards, newCardArray: newCardArray}
}

export const setUpPlayerBoardRandom = (playerCardsParam, boardCardsParam, playerCountParam, cardCountParam, boardCountParam, boardCardsCountParam) => {

    let randomCards = []
    let cardArray = []
    let totalCards = 0
    let i, j
    let boardArray = []
    let boardCount = 0
    let randomCount = 0

    let randomSet = []

    /*
    console.log("BC\n" + boardCardsParam)
    console.log("BCOUNT PARAM: " + boardCountParam)
    console.log("BCOUNT PARAM: " + boardCardsCountParam)
    */

    for(i = 0; i < 52; i++)
        randomCards[i] = false

    for(i = 0; i < playerCountParam; i++) {
        cardArray[i] = []
        for(j = 0; j < cardCountParam; j++) {
            cardArray[i][j] = getCard(playerCardsParam[i][j])
            if(cardArray[i][j] >= 0) {
                randomCards[cardArray[i][j]] = true
                totalCards++
            }
        }
    }
     
    /*
    console.log("BAMOUNT: " + boardCountParam)
    console.log("BCARDS: " + boardCardsCountParam)
    */

    for(i = 0; i < boardCountParam; i++) {
      boardArray[i] = []
      for(j = 0; j < boardCardsCountParam; j++) {
        boardArray[i][j] = getCard(boardCardsParam[i][j])
        if(boardArray[i][j] >= 0) {
          boardCount++
          randomCards[boardArray[i][j]] = true
          totalCards++
        }
      }
    }

    for(i = 0; i < 52; i++ ) {
      if(!randomCards[i]) {
        randomSet[randomCount++] = i
      }
    }

    //console.log("THIS IS THE BOARDARRAY: " + boardArray)
    
    return {randomSet: randomSet, cardArray: cardArray, randomCards: randomCards, totalCards: totalCards,
      randomCount: randomCount, boardArray: boardArray}
  }



export const getRandomCards2Boards = (boardCards, randomSet, randomCount) => {
    let used = []
    let i

    let newBoardCards = []
    let keepGoing

    let rando

    let j
    newBoardCards[0] = []
    newBoardCards[1] = []

    for(i = 0; i < randomCount; i++)
        used[i] = false

    for(j = 0; j < 2; j++)
        for(i = 0; i < 5; i++) {
            if(boardCards[j][i] >= 0)
                newBoardCards[j][i] = boardCards[j][i]
            else {
                for(keepGoing = 1; keepGoing > 0; ) {
                    rando = Math.floor(Math.random() * (randomCount));
                    if(used[rando] == false) {
                        newBoardCards[j][i] = randomSet[rando]
                        used[rando] = true
                        keepGoing = 0
                    }
                }
            }
        }

    return newBoardCards
}

export const getCard = (cardString) => {
    
    
    if(cardString == null)
        return -1
    if(cardString == '')
        return -1
    if(cardString == '2d')
        return 0;
    if(cardString == '3d')
        return 1;
    if(cardString == '4d')
        return 2;
    if(cardString == '5d')
        return 3;
    if(cardString == '6d')
        return 4;
    if(cardString == '7d')
        return 5;
    if(cardString == '8d')
        return 6;
    if(cardString == '9d')
        return 7;
    if(cardString == 'Td')
        return 8;
    if(cardString == 'Jd')
        return 9;
    if(cardString == 'Qd')
        return 10;
    if(cardString == 'Kd')
        return 11;
    if(cardString == 'Ad')
        return 12;
    if(cardString == '2c')
        return 13;
    if(cardString == '3c')
        return 14;
    if(cardString == '4c')
        return 15;
    if(cardString == '5c')
        return 16;
    if(cardString == '6c')
        return 17;
    if(cardString == '7c')
        return 18;
    if(cardString == '8c')
        return 19;
    if(cardString == '9c')
        return 20;
    if(cardString == 'Tc')
        return 21;
    if(cardString == 'Jc')
        return 22;
    if(cardString == 'Qc')
        return 23;
    if(cardString == 'Kc')
        return 24;
    if(cardString == 'Ac')
        return 25;
    if(cardString == '2h')
        return 26;
    if(cardString == '3h')
        return 27;
    if(cardString == '4h')
        return 28;
    if(cardString == '5h')
        return 29;
    if(cardString == '6h')
        return 30;
    if(cardString == '7h')
        return 31;
    if(cardString == '8h')
        return 32;
    if(cardString == '9h')
        return 33;
    if(cardString == 'Th')
        return 34;
    if(cardString == 'Jh')
        return 35;
    if(cardString == 'Qh')
        return 36;
    if(cardString == 'Kh')
        return 37;
    if(cardString == 'Ah')
        return 38;
    if(cardString == '2s')
        return 39;
    if(cardString == '3s')
        return 40;
    if(cardString == '4s')
        return 41;
    if(cardString == '5s')
        return 42;
    if(cardString == '6s')
        return 43;
    if(cardString == '7s')
        return 44;
    if(cardString == '8s')
        return 45;
    if(cardString == '9s')
        return 46;
    if(cardString == 'Ts')
        return 47;
    if(cardString == 'Js')
        return 48;
    if(cardString == 'Qs')
        return 49;
    if(cardString == 'Ks')
        return 50;
    if(cardString == 'As')
        return 51;

    return -1
    
}
export const getCardReverse = (cardNumber) => {
    returnArray = [
        '2d', '3d', '4d', '5d', '6d', '7d', '8d', '9d', 'Td', 'Jd', 'Qd', 'Kd', 'Ad',
        '2c', '3c', '4c', '5c', '6c', '7c', '8c', '9c', 'Tc', 'Jc', 'Qc', 'Kc', 'Ac',
        '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', 'Th', 'Jh', 'Qh', 'Kh', 'Ah',
        '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s', 'Ts', 'Js', 'Qs', 'Ks', 'As'
    ]
    
    
    return returnArray[cardNumber]
    
}