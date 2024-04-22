import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View, TextInput, Button } from 'react-native';






export default function CalculateRazz(cards) {
    function getRank(card) {
        if(card % 13 == 12)
            return 0
        return (card % 13) + 1;
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