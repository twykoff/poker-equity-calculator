const calculateHigh = require('../CalculateHigh.js')
const calculateRazz = require('../CalculateRazz.js')
const game = require('../Game.js')
const gameProperties= require('../GameProperties.js')


export const testOmaha6 = () => {

    console.log("TEST OM 6")
    let cardIsGood = []
    let i
    let j
    let numTrials = 100000000
    let isGood
    let rando
    let playerCard = []
    let boardCard = []
    let scoreBruteForce
    let scoreFull
    let totalBF = 0
    let totalClever = 0
    let incorrectCount = 0



    for(i = 0; i < numTrials; i++) {
        for(j = 0; j < 52; j++) {
            cardIsGood[j] = true
        }

        //get randomCards for player
        for(j = 0; j < 6; j++) {
            isGood = false
            while(isGood == false) {
                rando = Math.floor(Math.random() * 52)
                if(cardIsGood[rando]) {
                    playerCard[j] = rando
                    cardIsGood[rando] = false
                    isGood = true
                }
            }
        }

        
        for(j = 0; j < 5; j++) {
            isGood = false
            while(isGood == false) {
                rando = Math.floor(Math.random() * 52)
                if(cardIsGood[rando]) {
                    boardCard[j] = rando
                    cardIsGood[rando] = false
                    isGood = true
                }
            }
        }
        


        //numTrials = 1000
        let d1, d2, d3
        
        d1 = Date.now()
        scoreBruteForce = calculatePlayerScorePLO6(playerCard, boardCard)

        d2 = Date.now()
        scoreFull = calculateHigh.calculateHighOmahaFull(playerCard, boardCard, 6)

        d3 = Date.now()

        totalBF += d2 - d1
        totalClever += d3 - d2

        let firstDigit = scoreBruteForce.charAt(0)

        if(/*firstDigit == '5'  && */ scoreFull != scoreBruteForce) {
            incorrectCount++
            console.log("TRIAL NUMBER: " + i)
            console.log("playerCard = [" + playerCard + "]\n\tboardCard = [" + boardCard + "]")
            console.log("PLAYER: ")
            console.log(printCards(playerCard))
            console.log("WHAT UND ")
            console.log("BOARD:  ")
            console.log(printCards(boardCard))
            console.log("BRUTE FORCE: " + scoreBruteForce)
            console.log("SCORE CLEVR: " + scoreFull)
        }
    }

    console.log("TIME BF: " + totalBF)
    console.log("TIME CV: " + totalClever)
    console.log("TIME: " + Math.floor((totalBF - totalClever)/1000)); //in milliseconds)

    console.log("TRIALS: " + numTrials)
    console.log("INCORR: " + incorrectCount)
    console.log("FAIL %: " + incorrectCount/numTrials)
}

export const testNLHEFull = () => {

    console.log("TEST OM 6")
    let cardIsGood = []
    let i
    let j
    let k
    let numTrials = 1000
    let isGood
    let rando
    let playerCard = []
    let boardCard = []
    let scoreRandom
    let scoreFull
    let totalBF = 0
    let totalClever = 0
    let incorrectCount = 0



    for(i = 0; i < numTrials; i++) {
        for(j = 0; j < 52; j++) {
            cardIsGood[j] = true
        }

        //get randomCards for player
        for(k = 0; k < 2; k++) {
            playerCard[k] = []
            for(j = 0; j < 2; j++) {
                isGood = false
                while(isGood == false) {
                    rando = Math.floor(Math.random() * 52)
                    if(cardIsGood[rando]) {
                        playerCard[k][j] = rando
                        cardIsGood[rando] = false
                        isGood = true
                    }
                }
            }
        }

        boardCard[0] = []
        for(j = 0; j < 4; j++) {
            isGood = false
            while(isGood == false) {
                rando = Math.floor(Math.random() * 52)
                if(cardIsGood[rando]) {
                    boardCard[0][j] = rando
                    cardIsGood[rando] = false
                    isGood = true
                }
            }
        }

        boardCard[0][4] = -1
        


        //numTrials = 1000
        let d1, d2, d3
        
        d1 = Date.now()
        game.runGame(playerCard, boardCard, 2, 2, 1, 5, gameProperties.gameNames.holdEm, 1000)

        d2 = Date.now()


        totalBF += d2 - d1


        /*
        if(scoreFull != scoreRandom) {
            incorrectCount++
            console.log("TRIAL NUMBER: " + i)
            console.log("playerCard = [" + playerCard + "]\n\tboardCard = [" + boardCard + "]")
            console.log("PLAYER: ")
            console.log(printCards(playerCard))
            console.log("WHAT UND ")
            console.log("BOARD:  ")
            console.log(printCards(boardCard))
            console.log("BRUTE FORCE: " + scoreBruteForce)
            console.log("SCORE CLEVR: " + scoreFull)
        }
        */
    }

    console.log("TIME BF: " + totalBF)

    console.log("TRIALS: " + numTrials)
    console.log("INCORR: " + incorrectCount)
    console.log("FAIL %: " + incorrectCount/numTrials)
}

export const testLow = () => {

    console.log("TEST LOW OMAHA 6")
    let cardIsGood = []
    let i
    let j
    let numTrials = 100000000
    let isGood
    let rando
    let playerCard = []
    let boardCard = []
    let scoreBruteForce
    let scoreFull
    let totalBF = 0
    let totalClever = 0
    let incorrectCount = 0



    for(i = 0; i < numTrials; i++) {
        for(j = 0; j < 52; j++) {
            cardIsGood[j] = true
        }

        //get randomCards for player
        for(j = 0; j < 6; j++) {
            isGood = false
            while(isGood == false) {
                rando = Math.floor(Math.random() * 52)
                if(cardIsGood[rando]) {
                    playerCard[j] = rando
                    cardIsGood[rando] = false
                    isGood = true
                }
            }
        }

        
        for(j = 0; j < 5; j++) {
            isGood = false
            while(isGood == false) {
                rando = Math.floor(Math.random() * 52)
                if(cardIsGood[rando]) {
                    boardCard[j] = rando
                    cardIsGood[rando] = false
                    isGood = true
                }
            }
        }
        


        let d1, d2, d3
        
        d1 = Date.now()
        scoreBruteForce = calculatePlayerScoreLow(playerCard, boardCard)

        d2 = Date.now()
        scoreFull = calculateRazz.calculateLowOmahaFull(playerCard, boardCard, 6)

        d3 = Date.now()

        totalBF += d2 - d1
        totalClever += d3 - d2

        let firstDigit = scoreBruteForce.charAt(0)

        if(/*firstDigit == '5'  && */ scoreFull != scoreBruteForce) {
            incorrectCount++
            console.log("TRIAL NUMBER: " + i)
            console.log("playerCard = [" + playerCard + "]\n\tboardCard = [" + boardCard + "]")
            console.log("PLAYER: ")
            console.log(printCards(playerCard))
            console.log("WHAT UND ")
            console.log("BOARD:  ")
            console.log(printCards(boardCard))
            console.log("BRUTE FORCE: " + scoreBruteForce)
            console.log("SCORE CLEVR: " + scoreFull)
        }
    }

    console.log("TIME BF: " + totalBF)
    console.log("TIME CV: " + totalClever)
    console.log("TIME: " + Math.floor((totalBF - totalClever)/1000)); //in milliseconds)

    console.log("TRIALS: " + numTrials)
    console.log("INCORR: " + incorrectCount)
    console.log("FAIL %: " + incorrectCount/numTrials)
}

export const testStudRegLow = () => {

    console.log("TEST STUD REG LOW")
    let cardIsGood = []
    let i
    let j
    let numTrials = 10
    let isGood
    let rando
    let playerCard = []
    let boardCard = []
    let scoreBruteForce
    let scoreFull
    let totalBF = 0
    let totalClever = 0
    let incorrectCount = 0



    for(i = 0; i < numTrials; i++) {
        for(j = 0; j < 52; j++) {
            cardIsGood[j] = true
        }

        //get randomCards for player
        for(j = 0; j < 7; j++) {
            isGood = false
            while(isGood == false) {
                rando = Math.floor(Math.random() * 52)
                if(cardIsGood[rando]) {
                    playerCard[j] = rando
                    cardIsGood[rando] = false
                    isGood = true
                }
            }
        }

        
        console.log(playerCard)

        let d1, d2, d3
        
        d1 = Date.now()
        scoreBruteForce = calculatePlayerScoreRegLow(playerCard)

        d2 = Date.now()
        scoreFull = calculateRazz.calculateRazz7Cards(playerCard)

        d3 = Date.now()

        totalBF += d2 - d1
        totalClever += d3 - d2

        let firstDigit = scoreBruteForce.charAt(0)

        if(scoreFull != scoreBruteForce) {
            incorrectCount++
            console.log("TRIAL NUMBER: " + i)
            console.log("playerCard = [" + playerCard + "]")
            console.log("PLAYER: ")
            console.log(printCards(playerCard))
            console.log("BRUTE FORCE: " + scoreBruteForce)
            console.log("SCORE CLEVR: " + scoreFull)
        }
    }

    console.log("TIME BF: " + totalBF)
    console.log("TIME CV: " + totalClever)
    console.log("TIME: " + Math.floor((totalBF - totalClever)/1000)); //in milliseconds)

    console.log("TRIALS: " + numTrials)
    console.log("INCORR: " + incorrectCount)
    console.log("FAIL %: " + incorrectCount/numTrials)
}


const calculatePlayerScoreLow = (cardArray, boardArray) => {
    let returnScore;
    let i;
    let j;
    let score;
    returnScore = '99999999999';

    sendArray = [0,0,0,0,0]

    let cardsPerPlayer = 6
    let sentAmount = 0

    for(i = 0; i < cardsPerPlayer - 1; i++) {
        sendArray[0] = cardArray[i];
        for(j = i + 1; j < cardsPerPlayer; j++) {
            sendArray[1] = cardArray[j];
            for(k = 0; k < 3; k++) {
                sendArray[2] = boardArray[k];
                for(m = k + 1; m < 4; m++) {
                    sendArray[3] = boardArray[m];
                    for(n = m + 1; n < 5; n++) {
                        sendArray[4] = boardArray[n];
                        score = calculateRazz.calculateLow8OrBetter(sendArray);
                        sentAmount++
                        if(score < returnScore) {
                            returnScore = score;
                        }
                        
                    }
                }
            }
        }
    }
    return returnScore;
}

const calculatePlayerScoreRegLow = (cardArray) => {
    let returnScore;
    let i;
    let j;
    let score;
    returnScore = '99999999999';

    sendArray = [0,0,0,0,0]

    let cardsPerPlayer = 7
    let sentAmount = 0

    for(i = 0; i < cardsPerPlayer - 4; i++) {
        sendArray[0] = cardArray[i];
        for(j = i + 1; j < cardsPerPlayer - 3; j++) {
            sendArray[1] = cardArray[j];
            for(k = j + 1; k < cardsPerPlayer - 2; k++) {
                sendArray[2] = cardArray[k];
                for(m = k + 1; m < cardsPerPlayer - 1; m++) {
                    sendArray[3] = cardArray[m];
                    for(n = m + 1; n < cardsPerPlayer; n++) {
                        sendArray[4] = cardArray[n];
                        score = calculateRazz.calculateRazz(sendArray);
                        //console.log(score)
                        sentAmount++
                        //if(score == '10000000000')
                            //console.log("THE SCORE HERE\n\nTHERKE")
                        if(score < returnScore) {
                            returnScore = score;
                        }
                        
                    }
                }
            }
        }
    }
    return returnScore;
}

const calculatePlayerScorePLO6 = (cardArray, boardArray) => {
    let returnScore;
    let i;
    let j;
    let score;
    returnScore = '00000000000';

    sendArray = [0,0,0,0,0]

    let cardsPerPlayer = 6
    let sentAmount = 0

    for(i = 0; i < cardsPerPlayer - 1; i++) {
        sendArray[0] = cardArray[i];
        for(j = i + 1; j < cardsPerPlayer; j++) {
            sendArray[1] = cardArray[j];
            for(k = 0; k < 3; k++) {
                sendArray[2] = boardArray[k];
                for(m = k + 1; m < 4; m++) {
                    sendArray[3] = boardArray[m];
                    for(n = m + 1; n < 5; n++) {
                        sendArray[4] = boardArray[n];
                        score = calculateHigh.calculateHigh(sendArray);
                        sentAmount++
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

const printCards = (cards) => {
    let ranks         = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    let ranksPlayer   = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let ranksPlayerM2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let ranksPlayerM1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    
    let ranksBoard    = []
    let ranksBoardM3  = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let ranksBoardM1  = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    let suits         = [0, 0, 0, 0]
    
    let suitsPlayer   = [0, 0, 0, 0]
    let suitsPlayerM2 = [0, 0, 0, 0]
    let suitsPlayerM1 = [0, 0, 0, 0]

    
    let suitsBoard    = []
    let suitsBoardM3  = [0, 0, 0, 0]
    let suitsBoardM1  = [0, 0, 0, 0]

    let ranksSuitPlayer = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let ranksSuitBoard  = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    let i, j

    let returnString = ''

 

    for(i = 0; i < cards.length; i++) {
        ranksPlayer[calculateHigh.getRank(cards[i])]++
        suitsPlayer[calculateHigh.getSuit(cards[i])]++
    }



    console.log("Ranks: " + ranksPlayer)
    console.log("Suits: " + suitsPlayer)
}

export const testNLHE = () => {
    let i, j, k, m, n
    let cardCount = 52;

    let score

    let scoreFirstDigit = [0,0,0,0,0,0,0,0,0,0]
    for(i = 0; i < cardCount - 4; i++) {
        for(j = i + 1; j < cardCount - 3; j++) {
            for(k = j + 1; k < cardCount - 2; k++) {
                for(m = k + 1; m < cardCount -1; m++) {
                    for(n = m + 1; n < cardCount; n++) {
                        score = calculateHigh.calculateHigh([i,j,k,m,n])
                        scoreFirstDigit[score.charAt(0)]++
                    }
                }
            }
        }
    }

    let requiredEachDigit = [
        0,
        1302540,
        1098240,
        123552,
        54912,
        10200,
        5108,
        3744,
        624,
        40
    ]

    let sumRequired = 0
    let sumActual = 0
    let rightAmount = true
    for(i = 0; i < 9; i++) {
        sumRequired += requiredEachDigit[i]
        sumActual += scoreFirstDigit[i]
        if(requiredEachDigit[i] != scoreFirstDigit[i]) {
            rightAmount = false
            console.log("DIGIT WRONG: " + i)
            console.log("SHOULD BE: " + requiredEachDigit[i])
            console.log("IS:        " + scoreFirstDigit[i])
        }
    }

    console.log("SUM REQ: " + sumRequired)
    console.log("SUM ACT: " + sumActual)
}

export const testLow8 = () => {
    let i, j, k, m, n
    let cardCount = 52;

    let score
    let countLow = 0

    let scoreFirstDigit = [0,0,0,0,0,0,0,0,0,0]
    for(i = 0; i < cardCount - 4; i++) {
        for(j = i + 1; j < cardCount - 3; j++) {
            for(k = j + 1; k < cardCount - 2; k++) {
                for(m = k + 1; m < cardCount -1; m++) {
                    for(n = m + 1; n < cardCount; n++) {
                        score = calculateRazz.calculateLow8OrBetter([i,j,k,m,n])
                        if(score.charAt(0) == '1') {
                            countLow++
                        }
                    }
                }
            }
        }
    }

    

    console.log("Count low: " + countLow)
}