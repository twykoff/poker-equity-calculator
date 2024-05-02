import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View, TextInput, Button } from 'react-native';
import { getPlayerCardCount } from './GameUtils';


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

    let cardCount = cards.length
    let i, j, k, m;
    cardCount = cards.length;

    let ranks;

    let returnString = '999999999'

    let score




    for(i = 0; i < cardCount - 3; i++) {
        for(j = i + 1; j < cardCount - 2; j++) {
            for(k = j + 1; k < cardCount - 1; k++) {
                for(m = k + 1; m < cardCount; m++) {
                    score = calculateSubset([cards[i], cards[j], cards[k], cards[m]], game)
                    if(score < returnString)
                        returnString = score
                }
            }
        }
    }

    if(returnString != '999999999')
        return returnString
    
    for(i = 0; i < cardCount - 2; i++) {
        for(j = i + 1; j < cardCount - 1; j++) {
            for(k = j + 1; k < cardCount; k++) {
                score = calculateSubset([cards[i], cards[j], cards[k]], game)
                if(score < returnString)
                    returnString = score
            }
        }
    }

    
    if(returnString != '999999999')
        return returnString

    for(i = 0; i < cardCount - 1; i++) {
        for(j = i + 1; j < cardCount; j++) {
            score = calculateSubset([cards[i], cards[j]], game)
            if(score < returnString)
                returnString = score
        }
    }

    
    if(returnString != '999999999')
        return returnString

    for(i = 0; i < cardCount; i++) {
        score = calculateSingle(cards[i], game)
        if(score < returnString)
            returnString = score

    }

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
        if(suits[i] > 1) {
            return '999999999'
        }
    }

    returnString = '' + (5-cards.length)

    for(i = 12; i >= 0; i--) {
        
        if(ranks[i] > 1) {
            console.log("RANKS " + i + " " + ranks[i])
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