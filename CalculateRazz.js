module.exports = {
    calculateLow8OrBetter: (cards) => CalculateLow8OrBetter(cards),
    calculateLow8OrBetterXCards: (cards, cardCount) => CalculateLow8OrBetterXCards(cards, cardCount),
    calculateLowOmahaFull: (cardArray, boardArray, cardCount) => CalculateLowOmahaFull(cardArray, boardArray, cardCount),
    calculateRazz: (cards) => CalculateRazz(cards),
    calculateRazz7Cards: (cards) => CalculateRazz7Cards(cards)
}


function getRank(card) {
    if(card % 13 == 12)
        return 0
    return (card % 13) + 1;
}

const CalculateLow8OrBetter = (cards) => {

    
    let i;
    let cardCount;
    cardCount = 0;

    let ranks;

    ranks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    
    
    for(i = 0; i < 5; i++) {
        ranks[getRank(cards[i])]++;
    }


    let returnString;


    let quadCount, quadDigit;
    let tripCount, tripDigit;
    let pairCount, pairDigit;
    let singleCount, singleDigit;

    quadCount = 0;
    quadDigit = 0;
    tripCount = 0;
    tripDigit = 0;
    pairCount = 0;
    pairDigit = [0, 0];
    singleCount = 0;
    singleDigit = [0, 0, 0, 0, 0];

    for(i = 12; i >= 8; i--) {
        if(ranks[i] >= 1) {
            return '99999999999'
        }
    }

    for(i = 7; i >= 0; i--) {
        if(ranks[i] >= 2) {
            return '99999999999'
        }
        if(ranks[i] >= 1) {
            singleDigit[singleCount++] = i;
        }
    }


    

    


    //is high card
    returnString = '1'
    if(singleDigit[0] < 10) {
        returnString = returnString + '0'
    }
    returnString = returnString + singleDigit[0];
    if(singleDigit[1] < 10) {
        returnString = returnString + '0'
    }
    returnString = returnString + singleDigit[1];
    if(singleDigit[2] < 10) {
        returnString = returnString + '0'
    }
    returnString = returnString + singleDigit[2];
    if(singleDigit[3] < 10) {
        returnString = returnString + '0'
    }
    returnString = returnString + singleDigit[3];
    if(singleDigit[4] < 10) {
        returnString = returnString + '0'
    }
    returnString = returnString + singleDigit[4];
    //console.log(cards)
    //console.log(returnString)
    return returnString;
}

const CalculateLow8OrBetterXCards = (cards, cardCount) => {
    let i;
    let ranks;

    ranks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    
    
    for(i = 0; i < cardCount; i++) {
        ranks[getRank(cards[i])]++;
    }


    let returnString;


    let quadCount, quadDigit;
    let tripCount, tripDigit;
    let pairCount, pairDigit;
    let singleCount, singleDigit;

    quadCount = 0;
    quadDigit = 0;
    tripCount = 0;
    tripDigit = 0;
    pairCount = 0;
    pairDigit = [0, 0];
    singleCount = 0;
    singleDigit = [0, 0, 0, 0, 0];

    returnString = ''

    for(i = 0; i < 8 && singleCount < 5; i++) {
        if(ranks[i] >= 1) {
            returnString = '0' + i + returnString
            singleCount++
        }
    }

    if(singleCount == 5)
        return '1' + returnString

    return '99999999999'
}

const CalculateLowOmahaFull = (cardArray, boardArray, cardCount) => {
    //for now this is 6 card plo



    let printDebug = 0

    let ranks         = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    let ranksPlayer   = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let ranksPlayerM1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    
    let ranksBoard    = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let ranksBoardM1  = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    let i, j

    let retNow = 0
    let returnString = ''
    if(retNow == 1) {
        return returnString
    }

    if(printDebug == 1) {
        console.log(cardArray)
        console.log(boardArray)
    }

    for(i = 0; i < cardCount; i++) {
        ranksPlayer[getRank(cardArray[i])]++
    }

    for(i = 0; i < 5; i++) {
        ranksBoard[getRank(boardArray[i])]++
    }


    
    for(i = 0; i < 13; i++) {
        if(ranksPlayer[i] > 0) 
            ranksPlayerM1[i] = 1
        else 
            ranksPlayerM1[i] = 0
        
        if(ranksBoard[i] > 0) 
            ranksBoardM1[i] = 1
        else 
            ranksBoardM1[i] = 0
        
    }

    returnString = '99999999999'

    for(i = 7; i >= 1; i--) {
        if(ranksPlayerM1[i] == 0)
            continue;
        for(j = i - 1; j >= 0; j--) {
            if(ranksPlayerM1[j] == 0) 
                continue
            for(k = 7; k >= 2; k--) {
                if(k == i || k == j || ranksBoardM1[k] == 0)
                    continue
                for(m = k - 1; m >= 1; m--) {
                    if(m == i || m == j || ranksBoardM1[m] == 0)
                        continue
                    for(n = m - 1; n >= 0; n--) {
                        if(n == i || n == j || ranksBoardM1[n] == 0)
                            continue
                        score = getScore([i, j, k, m, n])
                        if(score < returnString)
                            returnString = score
                    }
                }
            }
        }
    }

    
    return returnString
    

}

const getScore = (cards) => {
    let swap
    for(i = 0; i < 5; i++) {
        for(j = 0; j < 4; j++) {
            if(cards[i] > cards[j]) {
                swap = cards[i]
                cards[i] = cards[j]
                cards[j] = swap
            }
        }
    }

    return '10' + cards[0] + '0' + cards[1] + '0' + cards[2] + '0' + cards[3] + '0' + cards[4]
}

const CalculateRazz = (cards) => {

    let cardCount
    let i;
    cardCount = 0;

    let ranks;

    ranks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    
    
    for(i = 0; i < 5; i++) {
        ranks[getRank(cards[i])]++;
    }


    let returnString;


    let quadCount, quadDigit;
    let tripCount, tripDigit;
    let pairCount, pairDigit;
    let singleCount, singleDigit;

    quadCount = 0;
    quadDigit = 0;
    tripCount = 0;
    tripDigit = 0;
    pairCount = 0;
    pairDigit = [0, 0];
    singleCount = 0;
    singleDigit = [0, 0, 0, 0, 0];

    for(i = 12; i >= 0; i--) {
        if(ranks[i] == 4) {
            quadDigit = i;
            quadCount++;
        }
        if(ranks[i] == 3) {
            tripDigit = i;
            tripCount++;
        }
        if(ranks[i] == 2) {
            pairDigit[pairCount++] = i;
        }
        if(ranks[i] == 1) {
            singleDigit[singleCount++] = i;
        }
    }

    //console.log(cards)
    //console.log(ranks)

    

    if(quadCount == 1) {
        //is quads
        returnString = '6'
        if(quadDigit < 10) {
            returnString = returnString + '0'
        }
        returnString = returnString + quadDigit;
        if(singleDigit[0] < 10) {
            returnString = returnString + '0'
        }
        returnString = returnString + singleDigit[0];
        returnString = returnString + '000000'
        return returnString;
    }
    if(tripCount == 1 && pairCount == 1) {
        //is fullhouse
        returnString = '5'
        if(tripDigit < 10) {
            returnString = returnString + '0'
        }
        returnString = returnString + tripDigit;
        if(pairDigit[0] < 10) {
            returnString = returnString + '0'
        }
        returnString = returnString + pairDigit[0];
        returnString = returnString + '000000'
        return returnString;
    }
    if(tripCount == 1) {
        //is trips
        returnString = '4'
        if(tripDigit < 10) {
            returnString = returnString + '0'
        }
        returnString = returnString + tripDigit;
        if(singleDigit[0] < 10) {
            returnString = returnString + '0'
        }
        returnString = returnString + singleDigit[0];
        if(singleDigit[1] < 10) {
            returnString = returnString + '0'
        }
        returnString = returnString + singleDigit[1];
        returnString = returnString + '0000'
        return returnString;
    }
    if(pairCount == 2) {
        //is 2 pair
        returnString = '3'
        if(pairDigit[0] < 10) {
            returnString = returnString + '0'
        }
        returnString = returnString + pairDigit[0];
        if(pairDigit[1] < 10) {
            returnString = returnString + '0'
        }
        returnString = returnString + pairDigit[1];
        if(singleDigit[0] < 10) {
            returnString = returnString + '0'
        }
        returnString = returnString + singleDigit[0] + '0000'
        return returnString;
    }
    if(pairCount == 1) {
        //is one pair
        returnString = '2'
        if(pairDigit[0] < 10) {
            returnString = returnString + '0'
        }
        returnString = returnString + pairDigit[0];
        if(singleDigit[0] < 10) {
            returnString = returnString + '0'
        }
        returnString = returnString + singleDigit[0];
        if(singleDigit[1] < 10) {
            returnString = returnString + '0'
        }
        returnString = returnString + singleDigit[1];
        if(singleDigit[2] < 10) {
            returnString = returnString + '0'
        }
        returnString = returnString + singleDigit[2];
        returnString = returnString + '00'
        return returnString;
    }

    //is high card
    returnString = '1'
    if(singleDigit[0] < 10) {
        returnString = returnString + '0'
    }
    returnString = returnString + singleDigit[0];
    if(singleDigit[1] < 10) {
        returnString = returnString + '0'
    }
    returnString = returnString + singleDigit[1];
    if(singleDigit[2] < 10) {
        returnString = returnString + '0'
    }
    returnString = returnString + singleDigit[2];
    if(singleDigit[3] < 10) {
        returnString = returnString + '0'
    }
    returnString = returnString + singleDigit[3];
    if(singleDigit[4] < 10) {
        returnString = returnString + '0'
    }
    returnString = returnString + singleDigit[4];
    //console.log(cards)
    //console.log(returnString)
    return returnString;
}

const CalculateRazz7Cards = (cards) => {

    let i;

    let ranks;

    let cardCount = 7

    ranks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    
    
    for(i = 0; i < cardCount; i++) {
        ranks[getRank(cards[i])]++;
        //console.log("card " + cards[i] + " " + getRank(cards[i]))
    }


    let returnString;


    let quadCount, quadDigit;
    let tripCount, tripDigit;
    let pairCount, pairDigit;
    let singleCount, singleDigit;
    let totalSingleCount, totalSingleDigit

    quadCount = 0;
    quadDigit = 0;
    tripCount = 0;
    tripDigit = [-1, -1];
    pairCount = 0;
    pairDigit = [-1, -1, -1];
    singleCount = 0;
    singleDigit = [-1, -1, -1, -1, -1, -1, -1];
    totalSingleCount = 0;
    totalSingleDigit = [-1, -1, -1, -1, -1, -1, -1];

    for(i = 0; i <= 12; i++) {
        if(ranks[i] == 4) {
            quadDigit = i;
            quadCount++;
        }
        if(ranks[i] == 3) {
            tripDigit[tripCount++] = i;
        }
        if(ranks[i] == 2) {
            pairDigit[pairCount++] = i;
        }
        if(ranks[i] == 1) {
            singleDigit[singleCount++] = i;
        }
        if(ranks[i] >= 1) {
            totalSingleDigit[totalSingleCount++] = i;
        }
    }

    /*
    console.log("TC " + tripCount)
    console.log("PC " + pairCount)
    console.log("SC " + singleCount)
    */

    let loopSingle, loopPair, loopTrip, addedSingle

    if(quadCount == 1 && tripCount == 1) {
        //full house
        returnString = '5'
        if(quadDigit < tripDigit[0]) {
            if(tripDigit[0] < 10)
                returnString += '0'
            returnString += tripDigit[0]
            if(quadDigit < 10)
                returnString += '0'
            returnString += quadDigit
        }
        else {
            if(quadDigit < 10)
                returnString += '0'
            returnString += quadDigit
            if(tripDigit[0] < 10)
                returnString += '0'
            returnString += tripDigit[0]
        }

        returnString += '000000'
        return returnString
    }

    if(quadCount == 1 && pairCount == 1) {
        returnString = '3'
        if(quadDigit < pairDigit[0]) {
            if(pairDigit[0] < 10)
                returnString += '0'
            returnString += pairDigit[0]
            if(quadDigit < 10)
                returnString += '0'
            returnString += quadDigit
        }
        else {
            if(quadDigit < 10)
                returnString += '0'
            returnString += quadDigit
            if(pairDigit[0] < 10)
                returnString += '0'
            returnString += pairDigit[0]
        }

        if(singleDigit[0] < 10)
            returnString += '0'
        returnString += singleDigit[0]

        returnString += '0000'
        return returnString
    }

    if(tripCount == 2 && pairCount == 0) {
        returnString = '3'
        if(tripDigit[1] < 10)
            returnString += '0'
        returnString += tripDigit[1]
        if(tripDigit[0] < 10)
            returnString += '0'
        returnString += tripDigit[0]

        if(singleDigit[0] < 10)
            returnString += '0'
        returnString += singleDigit[0]

        returnString += '0000'
        return returnString
    }

    
    if(tripCount == 1 && pairCount == 2) {
        returnString = '3'
        if(tripDigit[0] < pairDigit[0]) {
            if(pairDigit[0] < 10)
                returnString += '0'
            returnString += pairDigit[0]
            if(tripDigit[0] < 10)
                returnString += '0'
            returnString += tripDigit[0]
            if(pairDigit[1] < 10)
                returnString += '0'
            returnString += pairDigit[1]
        }
        else if(tripDigit[0] < pairDigit[1]) {
            if(tripDigit[0] < 10)
                returnString += '0'
            returnString += tripDigit[0]
            if(pairDigit[0] < 10)
                returnString += '0'
            returnString += pairDigit[0]
            if(pairDigit[1] < 10)
                returnString += '0'
            returnString += pairDigit[1]
        }
        else {
            if(pairDigit[1] < 10)
                returnString += '0'
            returnString += pairDigit[1]
            if(pairDigit[0] < 10)
                returnString += '0'
            returnString += pairDigit[0]
            if(tripDigit[0] < 10)
                returnString += '0'
            returnString += tripDigit[0]
        }
        returnString += '0000'
        return returnString
    }

    let singleReturnString
    if(quadCount == 1) {
        returnString = '2'
        if(quadDigit < 10)
            returnString += '0'
        returnString += quadDigit

        addedSingle = 0
        singleReturnString = ''
        for(i = 0; i <= 12 && addedSingle < 3; i++) {
            if(singleDigit[addedSingle] == i) {
                if(i < 10)
                    singleReturnString = '0' + i + singleReturnString
                else
                    singleReturnString = i + singleReturnString 
                addedSingle++                
            }
        }
        returnString = returnString + singleReturnString + '00'

        //console.log("QUADS")
        //console.log(returnString)
        return returnString
    }

    let pairDigitUsed
    if(tripCount == 1 && pairCount == 1) {
        returnString = '2'
        if(tripDigit[0] < pairDigit[0]) {
            if(tripDigit[0] < 10)
                returnString += '0'
            returnString += tripDigit[0]
            pairDigitUsed = tripDigit[0]
        }
        else {
            if(pairDigit[0] < 10)
                returnString += '0'
            returnString += pairDigit[0]
            pairDigitUsed = pairDigit[0]
        }
        addedSingle = 0
        singleReturnString = ''
        for(i = 0; i <= 12; i++) {
            if(totalSingleDigit[addedSingle] == i) {
                if(pairDigitUsed != i) {

                    if(i < 10)
                        singleReturnString = '0' + i + singleReturnString
                    else
                        singleReturnString = i + singleReturnString 
                }
                addedSingle++                
            }
        }
        returnString = returnString + singleReturnString + '00'

        //console.log("TRIPS PAIR")
        //console.log(returnString)
        return returnString
    }

    if(pairCount == 3) {
        returnString = '2'
        
        if(pairDigit[0] < 10)
            returnString += '0'
        returnString += pairDigit[0]
        
        pairDigitUsed = pairDigit[0]

        addedSingle = 0
        singleReturnString = ''
        for(i = 0; i <= 12; i++) {
            if(totalSingleDigit[addedSingle] == i) {
                if(pairDigitUsed != i) {

                    if(i < 10)
                        singleReturnString = '0' + i + singleReturnString
                    else
                        singleReturnString = i + singleReturnString 
                }
                addedSingle++                
            }
        }
        returnString = returnString + singleReturnString + '00'

        //console.log("3 PAIR")
        //console.log(returnString)
        return returnString
    }

    if(tripCount + pairCount + singleCount >= 5) {
        returnString = ''
        loopSingle = 0
        loopPair = 0
        loopTrip = 0
        addedSingle = 0
        for(i = 0; i <= 12 && addedSingle < 5; i++) {
            if(loopSingle < singleCount && singleDigit[loopSingle] == i) {
                if(i < 10)
                    returnString = '0' + i + returnString
                else
                    returnString = i + returnString 
                loopSingle++
                addedSingle++                
            }
            if(loopPair < pairCount && pairDigit[loopPair] == i) {
                if(i < 10)
                    returnString = '0' + i + returnString
                else
                    returnString = i + returnString 
                loopPair++
                addedSingle++   
                
            }
            if(loopTrip < tripCount && tripDigit[loopTrip] == i) {
                if(i < 10)
                    returnString = '0' + i + returnString
                else
                    returnString = i + returnString 
                loopTrip++
                addedSingle++   
                
            }
        }

        return '1' + returnString
    }

   
    
    return '88888888888'
}

//possibilities

//