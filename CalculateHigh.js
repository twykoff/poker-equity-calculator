import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View, TextInput, Button } from 'react-native';
import App from './App';





export default function CalculateHigh(cards) {
    function getRank(card) {
        return (card % 13);
    }
    
    function getSuit(card) {
        if(card < 13)
            return 0;
        if(card < 26)
            return 1;
        if(card < 39)
            return 2;
        return 3;
    }

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
        //console.log(cards[i]);
        //console.log("R: " + getRank(cards[i]));
        //console.log("S: " + getSuit(cards[i]));
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
};