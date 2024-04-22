import CalculateHigh, { CalculateHighFull } from '../CalculateHigh';
import CalculateRazz from '../CalculateRazz';
import { calculatePlayerScore } from '../NLHE';

export const testOmaha6 = () => {
    let cardIsGood = []
    let i
    let j
    let numTrials = 10000
    let isGood
    let rando
    let playerCard = []
    let boardCard = []
    let scoreBruteForce
    let scoreFull
    let totalBF = 0
    let totalClever = 0

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
                    isGood = true
                }
            }
        }

        //time 1
        scoreBruteForce = calculatePlayerScore(playerCard, boardCard)

        //time 2
        scoreFull = CalculateHighFull(playerCard, boardCard, 6)

        //time 3

        //need diff 2 & 1
        //need diff 3 & 2

        //add times

        totalBF += diffBF
        totalClever += diffClever 

        if(scoreFull != scoreBruteForce) {
            console.log("PLAYER CARDS: " + playerCard)
            console.log("BOARD  CARDS: " + boardCard)
            console.log("BRUTE FORCE: " + scoreBruteForce)
            console.log("SCORE CLEVR: " + scoreFull)
        }
    }

    console.log("TIME BF: " + totalBF)
    console.log("TIME CV: " + totalClever)
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
                        score = CalculateHigh([i,j,k,m,n])
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