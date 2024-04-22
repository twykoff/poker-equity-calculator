import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View, TextInput, Button } from 'react-native';



export function CalculateHighFull(cardArray, boardArray) {
    //for now this is 6 card plo

    ranks         = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    ranksPlayer   = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ranksPlayerM2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ranksPlayerM1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    
    ranksBoard    = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ranksBoardM3  = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ranksBoardM1  = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    suits         = [0, 0, 0, 0]
    
    suitsPlayer   = [0, 0, 0, 0]
    suitsPlayerM2 = [0, 0, 0, 0]
    suitsPlayerM1 = [0, 0, 0, 0]

    
    suitsBoard    = [0, 0, 0, 0]
    suitsBoardM3  = [0, 0, 0, 0]
    suitsBoardM1  = [0, 0, 0, 0]

    ranksSuitPlayer = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ranksSuitBoard  = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    let i, j

    for(i = 0; i < 6; i++) {
        ranksPlayer[getRank(cardArray)]++
        suitsPlayer[getRank(cardArray)]++
    }

    for(i = 0; i < 5; i++) {
        ranksBoard[getRank(cardArray)]++
        suitsBoard[getRank(cardArray)]++
    }

    for(i = 0; i < 13; i++) {
        if(ranksPlayer[i] > 2) 
            ranksPlayerM2[i] = 2
        else 
            ranksPlayerM2[i] = ranksPlayer[i]
        if(ranksPlayer[i] > 1) 
            ranksPlayerM1[i] = 1
        else 
            ranksPlayerM1[i] = ranksPlayer[i]
        
        if(ranksBoard[i] > 3) 
            ranksBoardM3[i] = 2
        else 
            ranksBoardM3[i] = ranksBoard[i]
        if(ranksBoard[i] > 1) 
            ranksBoardM1[i] = 1
        else 
            ranksBoardM1[i] = ranksBoard[i]

        ranks[i] = ranksPlayer[i] + ranksBoard[i]
    }

    for(i = 0; i < 4; i++) {
        if(suitsPlayer[i] > 2) 
            suitsPlayerM2[i] = 2
        else 
            suitsPlayerM2[i] = suitsPlayer[i]
        if(suitsPlayer[i] > 1) 
            suitsPlayerM1[i] = 1
        else 
            suitsPlayerM1[i] = suitsPlayer[i]
        
        if(suitsBoard[i] > 3) 
            suitsBoardM3[i] = 2
        else 
            suitsBoardM3[i] = suitsBoard[i]
        if(suitsBoard[i] > 1) 
            suitsBoardM1[i] = 1
        else 
            suitsBoardM1[i] = suitsBoard[i]

        suits[i] = suitsPlayer[i] + suitsBoard[i]
    }

    //check for straight flush
    let isFlush = -1

    for(i = 0; i < 4; i++) {
        if(suitsPlayer[i] >= 2 && suitsBoard[i] >= 3)
            isFlush = i
    }

    let totalCount = 0
    let boardCount = 0
    let playerCount = 0
    if(isFlush != -1) {
        //check for straight flush
        for(i = 0; i < 6; i++) {
            if(getSuit(cardArray[i]) == isFlush) {
                ranksSuitPlayer[getRank(cardArray[i])] = 1
            }
        }
        
        for(i = 0; i < 5; i++) {
            if(getSuit(boardArray[i]) == isFlush) {
                ranksSuitBoard[getRank(boardArray[i])] = 1
            }
        }

        playerCount = ranksSuitPlayer[12] + ranksSuitPlayer[11] + ranksSuitPlayer[10]
            + ranksSuitPlayer[9]
        boardCount = ranksSuitBoard[12] + ranksSuitBoard[11] + ranksSuitBoard[10]
            + ranksSuitBoard[9]

        let straightRank
        for(i = 8; i >= 0; i--) {
            playerCount += ranksSuitPlayer[i]
            boardCount += ranksSuitBoard[i]

            totalCount = playerCount + boardCount
            if(playerCount == 2 && boardCount == 3) {
                returnString = '9'
                straightRank = i + 4
                if(straightRank >= 10) {
                    returnString += i + '00000000'
                }
                else {
                    returnString += '0' + i + '00000000'
                }
                return returnString
            }
            playerCount -= ranksSuitPlayer[i+4]
            boardCount -= ranksSuitBoard[i+4]
        }

        playerCount += ranksSuitPlayer[12]
        boardCount += ranksSuitBoard[12]

        if(playerCount == 2 && boardCount == 3) {
            returnString = '90300000000'
            return returnString
        }
    }

    //check for quads
    for(i = 12; i >= 0; i--) {
        if(ranksPlayerM2[i] + ranksBoardM3[i] == 4) {
            if(i >= 10)
                returnString = '9' + i
            else   
                returnString = '90' + i
            for(j = 12; j >= 0; j--) {
                if(j != i) {
                    if(ranksPlayerM2[i] == 2 && ranksBoard[j] >= 1) {
                        if(j >= 10)
                            returnString += j + '000000'
                        else
                            returnString += '0' + j + '000000'
                        return returnString
                    }
                
                    if(ranksPlayerM2[i] == 1 && ranksPlayer[j] >= 1) {
                        if(j >= 10)
                            returnString += j + '000000'
                        else
                            returnString += '0' + j + '000000'
                        
                        return returnString
                    }
                }
            }
        }
    }

    let tripsDigit = -1
    //check for full house
    for(i = 12; i >= 0; i--) {
        if(ranksPlayerM2[i] + ranksBoardM3[i] >= 3) {
            tripsDigit = i
            for(j = 12; j >= 0; j--) {
                if(i != j) {
                    if((ranksPlayerM2[i] == 2 && ranksBoardM3[i] >= 2)
                        || (ranksPlayerM2[i] == 1 && ranksPlayerM2[j] >= 1 && ranksBoardM3[j] >= 1)
                        || (ranksPlayerM2[i] == 0 && ranksBoardM3[j] >= 2)
                        ) {
                        returnString = '7'
                        if(i >= 10)
                            returnString += i
                        else
                            returnString += '0' + i
                        if(j >= 10)
                            returnString += j
                        else
                            returnString += '0' + j
                        returnString += '000000'
                        return returnString
                    }
                }
            }
        }
    }

    let singlePlayerCount = 0
    let singleBoardCount = 0
    //check for flush (combined with straight flush check)
    if(isFlush != -1) {
        returnString = '6'
        for(i = 12; i >= 0 && (singlePlayerCount + singleBoardCount) < 5; i--) {
            if(singlePlayerCount < 2 && ranksSuitPlayer[i] > 0) {
                singlePlayerCount++
                if(i >= 10)
                    returnString += i
                else
                    returnString += '0' + i
            }
        
            if(singleBoardCount < 3 && ranksSuitBoard[i] > 0) {
                singleBoardCount++
                if(i >= 10)
                    returnString += i
                else
                    returnString += '0' + i
            }
        }
        return returnString
    }

    //check for straight
    let ranksTotalM1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    for(i = 0; i < 13; i++) {
        if(ranksPlayer[i] > 0 || ranksBoard[i] > 0)
            ranksTotalM1[i] = 0
    }
    playerCount = ranksPlayerM1[12] + ranksPlayerM1[11] + ranksPlayerM1[10]
        + ranksPlayerM1[9]
    boardCount = ranksBoardM1[12] + ranksBoardM1[11] + ranksBoardM1[10]
        + ranksBoardM1[9]
    totalCount = ranksTotalM1[12] + ranksTotalM1[11] + ranksTotalM1[10]
        + ranksTotalM1[9]

    let straightRank
    for(i = 8; i >= 0; i--) {
        playerCount += ranksPlayerM1[i]
        boardCount += ranksBoardM1[i]
        totalCount += ranksTotalM1[i]

        if(playerCount >= 2 && boardCount >= 3 && totalCount == 5) {
            returnString = '5'
            straightRank = i + 4
            if(straightRank >= 10) {
                returnString += i + '00000000'
            }
            else {
                returnString += '0' + i + '00000000'
            }
            return returnString
        }
        playerCount -= ranksPlayerM1[i+4]
        boardCount -= ranksBoardM1[i+4]
        
        totalCount -= ranksTotalM1[i+4]

    }

    playerCount += ranksPlayerM1[12]
    boardCount += ranksBoardM1[12]
    totalCount += ranksTotalM1[12]

    if(playerCount >= 2 && boardCount >= 3 && totalCount == 5) {
        returnString = '50300000000'
        return returnString
    }


    //check for trips (combined with full house check)
    if(tripsDigit != -1) {
        returnString = '4'
        if(tripsDigit >= 10)
            returnString += i
        else
            returnString += '0' + i
        playerCount = ranksPlayer[tripsDigit]
        boardCount = ranksBoardM3[tripsDigit]

        for(i = 12; i >= 0 && (playerCount + boardCount) < 5; i--) {
            if(i != tripsDigit && playerCount < 2 && ranksPlayer[i] > 0) {
                playerCount++
                if(i >= 10)
                    returnString += i
                else
                    returnString += '0' + i
            }
        
            if(i != tripsDigit && boardCount < 3 && ranksBoard[i] > 0) {
                boardCount++
                if(i >= 10)
                    returnString += i
                else
                    returnString += '0' + i
            }
        }
        returnString += '00'
    }

    let firstPair = -1

    let foundSecondPair = -1
    //check for 2 pair
    for(i = 12; i >= 0; i--) {
        if(ranksPlayerM2[i] + ranksBoardM3[i] == 2) {
            firstPair = i
            playerCount = ranksPlayerM2[i]
            boardCount = ranksBoardM3[i]
            for(j = i - 1; j >= 0; j--) {
                if(ranksPlayerM2[i] - playerCount >= 2) {
                    foundSecondPair = 1
                    playerCount = 2
                }
                if(ranksBoardM3[i] - boardCount >= 2) {
                    foundSecondPair = 1
                    boardCount += 2
                }
                if(ranksPlayerM2[i] - playerCount >= 1 && ranksBoardM3[i] - boardCount >= 1) {
                    foundSecondPair = 1
                    boardCount++
                    playerCount++
                }
            }
            if(foundSecondPair == 1) {
                returnString = '3'
                if(i >= 10)
                    returnString += i
                else
                    returnString += '0' + i
                if(j >= 10)
                    returnString += j
                else
                    returnString += '0' + j
                for(i = 12; i >= 0 && (playerCount + boardCount) < 5; i--) {
                    if(playerCount < 2 && ranksPlayer[i] > 0) {
                        playerCount++
                        if(i >= 10)
                            returnString += i
                        else
                            returnString += '0' + i
                    }
                
                    if(boardCount < 3 && ranksBoard[i] > 0) {
                        boardCount++
                        if(i >= 10)
                            returnString += i
                        else
                            returnString += '0' + i
                    }
                }            

                returnString += '0000'
                return returnString
            }
        }
    }



    //check for 1 pair

    if(firstPair != -1) {
        playerCount = ranksPlayerM2[firstPair]
        boardCount = ranksBoardM3[firstPair]
        for(i = 12; i >= 0 && (playerCount + boardCount) < 5; i--) {
            if(playerCount < 2 && ranksPlayer[i] > 0) {
                playerCount++
                if(i >= 10)
                    returnString += i
                else
                    returnString += '0' + i
            }
        
            if(boardCount < 3 && ranksBoard[i] > 0) {
                boardCount++
                if(i >= 10)
                    returnString += i
                else
                    returnString += '0' + i
            }
        }            

        returnString += '00'
        return returnString

    }

    //else no pair

    retrunString = '1'

    for(i = 12; i >= 0 && (singlePlayerCount + singleBoardCount) < 5; i--) {
        if(singlePlayerCount < 2 && ranksPlayer[i] > 0) {
            singlePlayerCount++
            if(i >= 10)
                returnString += i
            else
                returnString += '0' + i
        }
    
        if(singleBoardCount < 3 && ranksBoard[i] > 0) {
            singleBoardCount++
            if(i >= 10)
                returnString += i
            else
                returnString += '0' + i
        }
    }
    return returnString
    

}


export default function CalculateHigh(cards) {

    let card1;
    let card2;
    let card3;
    let card4;
    let card5;
    let cardCount;
    let i;
    card1 = -1;
    card2 = -1;
    card3 = -1;
    card4 = -1;
    card5 = -1;
    cardCount = 0;
    

    let ranks, suits;

    ranks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    suits = [0, 0, 0, 0];
    
    let rank;
    let suit;
    
    for(i = 0; i < 5; i++) {
        suits[getSuit(cards[i])]++;
        ranks[getRank(cards[i])]++;
    }

    //console.log("SUIT")
    //console.log(suits)
    //console.log("RANK")
    //console.log(ranks)

    let maxSuit;

    let returnString;

    //check for flush (and straightFlush)
    maxSuit = 0;
    for(i = 0; i < 4; i++) {
        if(suits[i] > maxSuit)
            maxSuit = suits[i];
    }

    if(maxSuit == 5) {
        //is a flush or straightFlush

        isStraight = 0;

        returnString = '6';
        for(i = 12; i >= 0; i--) {
            if(ranks[i] == 1) {
                if(i < 10)
                    returnString = returnString + '0';
                returnString = returnString + i;
            }

            if(i >= 4) {
                if(ranks[i] == 1 && ranks[i-1] == 1 && ranks[i - 2] == 1 && ranks[i - 3] == 1 && ranks[i - 4] == 1) {
                    
                    if(i < 10)
                        return '90' + i + '00000000';
                    return '9' + i + '00000000';
                }
            }
            if(i == 3) {
                if(ranks[i] == 1 && ranks[i-1] == 1 && ranks[i - 2] == 1 && ranks[i - 3] == 1 && ranks[12] == 1) {
                    
                    return '90300000000';
                }
            }
        }

        return returnString;
    }

    //check Straight
    for(i = 12; i >= 0; i--) {

        if(i >= 4) {
            if(ranks[i] == 1 && ranks[i-1] == 1 && ranks[i - 2] == 1 && ranks[i - 3] == 1 && ranks[i - 4] == 1) {
                if(i < 10)
                    return '50' + i + '00000000';
                return '5' + i + '00000000';
            }
        }
        if(i == 3) {
            if(ranks[i] == 1 && ranks[i-1] == 1 && ranks[i - 2] == 1 && ranks[i - 3] == 1 && ranks[12] == 1) {
                
                return '50300000000';
            }
        }
    }

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

    if(quadCount == 1) {
        //is quads
        returnString = '8'
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
        returnString = '7'
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
        returnString = returnString + singleDigit[0] + "0000";
        return returnString
    }
    if(pairCount == 1) {
        //is trips
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
    return returnString;
}

const getRank = (card) => {
    return (card % 13);
}

const getSuit = (card) => {
    if(card < 13)
        return 0;
    if(card < 26)
        return 1;
    if(card < 39)
        return 2;
    return 3;
}

export const CalculateHighVar = (card1, card2, card3, card4, card5) => {


    let cardCount;
    let i;
    cardCount = 0;
    

    let ranks, suits;

    ranks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    suits = [0, 0, 0, 0];
    
    let rank;
    let suit;
    
    
    suits[getSuit(card1)]++;
    ranks[getRank(card1)]++;
    suits[getSuit(card2)]++;
    ranks[getRank(card2)]++;
    suits[getSuit(card3)]++;
    ranks[getRank(card3)]++;
    suits[getSuit(card4)]++;
    ranks[getRank(card4)]++;
    suits[getSuit(card5)]++;
    ranks[getRank(card5)]++;
    

    //console.log("SUIT")
    //console.log(suits)
    //console.log("RANK")
    //console.log(ranks)

    let maxSuit;

    let returnString;

    //check for flush (and straightFlush)
    maxSuit = 0;
    for(i = 0; i < 4; i++) {
        if(suits[i] > maxSuit)
            maxSuit = suits[i];
    }

    if(maxSuit == 5) {
        //is a flush or straightFlush

        isStraight = 0;

        returnString = '6';
        for(i = 12; i >= 0; i--) {
            if(ranks[i] == 1) {
                if(i < 10)
                    returnString = returnString + '0';
                returnString = returnString + i;
            }

            if(i >= 4) {
                if(ranks[i] == 1 && ranks[i-1] == 1 && ranks[i - 2] == 1 && ranks[i - 3] == 1 && ranks[i - 4] == 1) {
                    
                    if(i < 10)
                        return '90' + i + '00000000';
                    return '9' + i + '00000000';
                }
            }
            if(i == 3) {
                if(ranks[i] == 1 && ranks[i-1] == 1 && ranks[i - 2] == 1 && ranks[i - 3] == 1 && ranks[12] == 1) {
                    
                    return '90300000000';
                }
            }
        }

        return returnString;
    }

    //check Straight
    for(i = 12; i >= 0; i--) {

        if(i >= 4) {
            if(ranks[i] == 1 && ranks[i-1] == 1 && ranks[i - 2] == 1 && ranks[i - 3] == 1 && ranks[i - 4] == 1) {
                if(i < 10)
                    return '50' + i + '00000000';
                return '5' + i + '00000000';
            }
        }
        if(i == 3) {
            if(ranks[i] == 1 && ranks[i-1] == 1 && ranks[i - 2] == 1 && ranks[i - 3] == 1 && ranks[12] == 1) {
                
                return '50300000000';
            }
        }
    }

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

    if(quadCount == 1) {
        //is quads
        returnString = '8'
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
        returnString = '7'
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
        returnString = returnString + singleDigit[0] + "0000";
        return returnString
    }
    if(pairCount == 1) {
        //is trips
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
    return returnString;
}