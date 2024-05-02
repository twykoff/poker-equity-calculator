import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View, TextInput, Button } from 'react-native';



export function CalculateHighFull(cardArray, boardArray, cardCount) {
    //for now this is plo



    let printDebug = 0

    let ranks         = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    let ranksPlayer   = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let ranksPlayerM2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let ranksPlayerM1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    
    let ranksBoard    = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let ranksBoardM3  = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let ranksBoardM1  = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    let suits         = [0, 0, 0, 0]
    
    let suitsPlayer   = [0, 0, 0, 0]
    let suitsPlayerM2 = [0, 0, 0, 0]
    let suitsPlayerM1 = [0, 0, 0, 0]

    
    let suitsBoard    = [0, 0, 0, 0]
    let suitsBoardM3  = [0, 0, 0, 0]
    let suitsBoardM1  = [0, 0, 0, 0]

    let ranksSuitPlayer = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let ranksSuitBoard  = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

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
        suitsPlayer[getSuit(cardArray[i])]++
    }

    for(i = 0; i < 5; i++) {
        ranksBoard[getRank(boardArray[i])]++
        suitsBoard[getSuit(boardArray[i])]++
    }

    if(printDebug == 1) {
        for(i = 0; i < 13; i++) {
            console.log("RP[" + i + "] = " + ranksPlayer[i])
        }
        for(i = 0; i < 13; i++) {
            console.log("RB[" + i + "] = " + ranksBoard[i])
        }
        for(i = 0; i < 4; i++) {
            console.log("SP[" + i + "] = " + suitsPlayer[i])
        }
        for(i = 0; i < 4; i++) {
            console.log("SB[" + i + "] = " + suitsBoard[i])
        }
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
            ranksBoardM3[i] = 3
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
            suitsBoardM3[i] = 3
        else 
            suitsBoardM3[i] = suitsBoard[i]
        if(suitsBoard[i] > 1) 
            suitsBoardM1[i] = 1
        else 
            suitsBoardM1[i] = suitsBoard[i]

        suits[i] = suitsPlayer[i] + suitsBoard[i]
    }

    retNow = 0
    if(retNow == 1) {
        return returnString
    }
    //check for straight flush
    let isFlush = -1

    let debugFlush = 0

    for(i = 0; i < 4; i++) {
        if(suitsPlayerM2[i] >= 2 && suitsBoardM3[i] >= 3) {    
            isFlush = i
            if(debugFlush == 1) {
                console.log("SPM2[" + i + "]: " + suitsPlayerM2[i])
                console.log("SBM3[" + i + "]: " + suitsBoardM3[i])
                console.log("SP  [" + i + "]: " + suitsPlayer[i])
                console.log("SB  [" + i + "]: " + suitsBoard[i])
            }
        }
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
                    returnString += straightRank + '00000000'
                }
                else {
                    returnString += '0' + straightRank + '00000000'
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
                returnString = '8' + i
            else   
                returnString = '80' + i
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

    
    retNow = 0
    if(retNow == 1) {
        return returnString
    }

    let debugFullHouse = 0

    let tripsDigit = -1
    //check for full house
    for(i = 12; i >= 0; i--) {

        if(debugFullHouse == 1) {
            console.log("RPM2[" + i + "]: " + ranksPlayerM2[i])
            console.log("RPB3[" + i + "]: " + ranksBoardM3[i])

        }
        if(ranksPlayerM2[i] + ranksBoardM3[i] >= 3) {
            if(debugFullHouse == 1) {
                console.log("TRIPS: " + i)
            }
            if(tripsDigit == -1)
                tripsDigit = i
            for(j = 12; j >= 0; j--) {
                if(i != j) {
                    if((ranksPlayerM2[i] >= 2 && ranksBoardM3[j] >= 2)
                        || (ranksPlayerM2[i] == 1 && ranksPlayerM2[j] >= 1 && ranksBoardM3[j] >= 1)
                        || (ranksPlayerM2[i] == 0 && ranksPlayerM2[j] >= 2)
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
    let debugStraight = 0


    let ranksTotalM1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    for(i = 0; i < 13; i++) {
        if(ranksPlayer[i] > 0 || ranksBoard[i] > 0) {
            ranksTotalM1[i] = 1
        }
        if(debugStraight == 1)
            console.log("RTM[" + i + "] " + ranksTotalM1[i])
    }
    playerCount = ranksPlayerM1[12] + ranksPlayerM1[11] + ranksPlayerM1[10]
        + ranksPlayerM1[9]
    boardCount = ranksBoardM1[12] + ranksBoardM1[11] + ranksBoardM1[10]
        + ranksBoardM1[9]
    totalCount = ranksTotalM1[12] + ranksTotalM1[11] + ranksTotalM1[10]
        + ranksTotalM1[9]

    let straightRank


    if(debugStraight == 1) {
        console.log(ranksPlayerM2)
        console.log(ranksBoardM3)
    }
    for(i = 8; i >= 0; i--) {
        playerCount += ranksPlayerM1[i]
        boardCount += ranksBoardM1[i]
        totalCount += ranksTotalM1[i]

        if(debugStraight == 1) {
            console.log("PC[" + i + "]: " + playerCount)
            console.log("BC[" + i + "]: " + boardCount)
            console.log("TC[" + i + "]: " + totalCount)
        }


        if(playerCount >= 2 && boardCount >= 3 && totalCount == 5) {
            returnString = '5'
            straightRank = i + 4
            if(straightRank >= 10) {
                returnString += straightRank + '00000000'
            }
            else {
                returnString += '0' + straightRank + '00000000'
            }
            return returnString
        }
        playerCount -= ranksPlayerM1[i+4]
        boardCount -= ranksBoardM1[i+4]
        
        totalCount -= ranksTotalM1[i+4]

    }

    retNow = 0
    if(retNow == 1) {
        return returnString
    }

    playerCount += ranksPlayerM1[12]
    boardCount += ranksBoardM1[12]
    totalCount += ranksTotalM1[12]        
    
    if(debugStraight == 1) {
        console.log("PC[" + i + "]: " + playerCount)
        console.log("BC[" + i + "]: " + boardCount)
        console.log("TC[" + i + "]: " + totalCount)
    }

    if(playerCount >= 2 && boardCount >= 3 && totalCount == 5) {
        returnString = '50300000000'
        return returnString
    }

    let debugTrips = 0

    //check for trips (combined with full house check)
    if(tripsDigit != -1) {
        returnString = '4'
        if(debugTrips == 1)
            console.log("TD: " + tripsDigit)
        if(tripsDigit >= 10)
            returnString += tripsDigit
        else
            returnString += '0' + tripsDigit
        playerCount = ranksPlayerM2[tripsDigit]
        boardCount = ranksBoardM3[tripsDigit]

        if(playerCount == 3 && boardCount == 1) {
            //not sure how to handle
        }
        else {

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
        }
        returnString += '0000'
        return returnString
    }

    

    retNow = 0
    if(retNow == 1) {
        return returnString
    }
    let firstPair = -1

    let foundSecondPair = -1

    let debugTwoPair = 0
    let skipTwoPair = 0
    //check for 2 pair
    for(i = 12; i >= 0; i--) {
        playerCount = 0
        boardCount = 0
        if(ranksPlayerM2[i] + ranksBoardM3[i] == 2) {
            if(firstPair == -1)
                firstPair = i
            
            if(debugTwoPair == 1) {
                console.log(ranksPlayerM2)
                console.log(ranksBoardM3)
            }
            playerCount = ranksPlayerM2[i]
            boardCount = ranksBoardM3[i]
            

            for(j = i - 1; skipTwoPair != 1 && j >= 0; j--) {
                if(debugTwoPair == 1) {
                    console.log("J: " + j)
                    console.log("RPM2[" + j + "] " + ranksPlayerM2[j])
                    console.log(playerCount)
                    console.log("RBM3[" + j + "] " + ranksBoardM3[j])
                    console.log(boardCount)
                }
               
                if(playerCount == 0 && ranksPlayerM2[j] >= 2) {
                    foundSecondPair = j
                    j = 0
                    playerCount = 2
                }
                else if(boardCount <= 1 && ranksBoardM3[j] >= 2) {
                    foundSecondPair = j
                    j = 0
                    boardCount += 2
                }
                else if(playerCount <= 1 && ranksPlayerM2[j] >= 1 && ranksBoardM3[j] >= 1) {
                    foundSecondPair = j
                    if(debugTwoPair == 1) {
                        console.log("FOUND IT: " + j)
                    }
                    j = 0
                    boardCount++
                    playerCount++
                }
            }

            if(debugTwoPair == 1) {
                console.log("FSP: " + foundSecondPair)
            }
            if(foundSecondPair != -1) {
                returnString = '3'
                if(i >= 10)
                    returnString += i
                else
                    returnString += '0' + i
                if(foundSecondPair >= 10)
                    returnString += foundSecondPair
                else
                    returnString += '0' + foundSecondPair
                for(j = 12; j >= 0 && (playerCount + boardCount) < 5; j--) {
                    if(playerCount < 2 && ranksPlayer[j] > 0 && j != i && j != foundSecondPair) {
                        playerCount++
                        if(j >= 10)
                            returnString += j
                        else
                            returnString += '0' + j
                    }
                
                    if(boardCount < 3 && ranksBoard[j] > 0 && j != i && j != foundSecondPair) {
                        boardCount++
                        if(j >= 10)
                            returnString += j
                        else
                            returnString += '0' + j
                    }
                }            

                returnString += '0000'
                return returnString
            }
        }
    }

    retNow = 0
    if(retNow == 1) {
        return returnString
    }

    //check for 1 pair

    if(firstPair != -1) {
        playerCount = ranksPlayerM2[firstPair]
        boardCount = ranksBoardM3[firstPair]
        returnString += '2'
        if(firstPair < 10)
            returnString += '0'
        returnString += firstPair

        for(i = 12; i >= 0 && (playerCount + boardCount) < 5; i--) {
            if(i != firstPair && playerCount < 2 && ranksPlayer[i] > 0) {
                playerCount++
                if(i >= 10)
                    returnString += i
                else
                    returnString += '0' + i
            }
            else if(i != firstPair && boardCount < 3 && ranksBoard[i] > 0) {
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

    returnString = '1'

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
        //is 1 pair
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

export function CalculateHighXCards(cards, cardCount) {
    let i;

    let ranks, suits;

    ranks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    suits = [0, 0, 0, 0];
    
    for(i = 0; i < cardCount; i++) {
        suits[getSuit(cards[i])]++;
        ranks[getRank(cards[i])]++;
    }


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
        //is 1 pair
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

export const getRank = (card) => {
    return (card % 13);
}

export const getSuit = (card) => {
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
    return returnString;
}