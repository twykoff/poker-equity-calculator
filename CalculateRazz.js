import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View, TextInput, Button } from 'react-native';


function getRank(card) {
    if(card % 13 == 12)
        return 0
    return (card % 13) + 1;
}

export function CalculateLow8OrBetter(cards) {

    
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
};

export function CalculateLowOmaha8(cardArray, boardArray, cardCount) {
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

export default function CalculateRazz(cards) {

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

    for(i = 12; i > 0; i--) {
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
};