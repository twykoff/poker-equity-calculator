import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View, TextInput, Button } from 'react-native';


function getRank(card, game) {
    if(game == 'Badacey') {
        if(card % 13 == 12)
            return 0
        return (card % 13) + 1;
    }
    return card % 13;
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

export default function CalculateBadugi(cards, game) {

    let cardCount
    let i, j, k;
    cardCount = 0;

    let ranks;

    let returnString = '999999999'

    let score

    score = calculateSubset(cards, game)

    if(score < returnString)
        returnString = score

    for(i = 0; i < 2; i++) {
        for(j = i + 1; j < 3; j++) {
            for(k = j + 1; k < 4; k++) {
                score = calculateSubset([cards[i], cards[j], cards[k]], game)
                if(score < returnString)
                    returnString = score
            }
        }
    }

    for(i = 0; i < 3; i++) {
        for(j = i + 1; j < 4; j++) {
            score = calculateSubset([cards[i], cards[j]], game)
            if(score < returnString)
                returnString = score
        }
    }

    for(i = 0; i < 4; i++) {
        score = calculateSingle(cards[i], game)
        if(score < returnString)
            returnString = score

    }

    /*
    console.log(cards)
    console.log(game)
    console.log("RET STRING: " + returnString)
    */

    return returnString

}

const calculateSingle = (card, game) => {
    let rank = getRank(card, game)

    if(rank < 10)
        return '40' + rank + '000000'
    return '4' + rank + '000000'
}

const calculateSubset = (cards, game) => {

    ranks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    let suits

    suits = [0, 0, 0, 0]

    let i
    
    
    for(i = 0; i < cards.length; i++) {
        ranks[getRank(cards[i], game)]++;
        suits[getSuit(cards[i])]++;
    }


    for(i = 0; i < 4; i++) {
        if(suits[i] > 1)
            return '999999999'
    }

    returnString = '' + (5-cards.length)

    for(i = 12; i >= 0; i--) {
        
        if(ranks[i] > 1) {
            return '999999999'
        }
        if(ranks[i] == 1) {
            if(i == 0) {
                returnString += '00'

            }
            else {
                if(i < 10)
                    returnString += '0'
                returnString += i
            }
        }
    }

    for(i = cards.length; i < 4; i++) {
        
        returnString += '00'
    }

    
    return returnString;
};