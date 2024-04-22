import { StatusBar } from 'expo-status-bar';
import {useImperativeHandle, forwardRef, useState, useRef} from 'react';
import { StyleSheet, Text, SafeAreaView, View, TextInput, Button, TouchableOpacity, Image } from 'react-native';

import getImageSource from './CardImageUtil';






const UsableCard = (props, ref) => {
    useImperativeHandle(ref, () => ({
        removeFocus: () => {removeFocus()},
        addFocus: () => {addFocus()},
        setCard: (cardValueParam) => {setCard(cardValueParam)},
        clearCard: () => {clearCard()},
        clearSpecific: () => {clearSpecificCard()},
        addShowCard: () => {addShowCard()},
        removeShowCard: () => {removeShowCard()}
      }))

    const [showCard, setShowCard] = useState(props.cardNumber < props.cardCount ? true : false)

    const [cardValue, setCardValue] = useState('')

    const cardNumber = props.cardNumber

    const [focus, setFocus] = useState(props.setCardFocus === null ? false : props.setCardFocus)

    const [imageSource, setImageSource] = useState(getImageSource.getImageSource(cardValue).imageSource);

    const clearCard = () => { 
        if(cardValue != '') {
            props.removeCard(cardValue, cardNumber, false)
            setImageSource(getImageSource.getImageSource('').imageSource)
            setCardValue('')
        }
    }

    const clearSpecificCard = () => { 
        props.removeCard(cardValue, cardNumber, true)
        //console.log(" CLEAR: " + cardValue)
        if(cardValue != '') {
            setImageSource(getImageSource.getImageSource('').imageSource)
            setCardValue('')
        }
    }
    
    const addFocus = () => {
        setFocus(true)
    }

    const removeFocus = () => {
        setFocus(false)
    }

    const addShowCard = () => {
        setShowCard(true)
    }
    
    const removeShowCard = () => {
        setShowCard(false)
    }

    const setCard = (cardValueParam) => {
        if(cardValue != '')
            props.removeCard(cardValue, cardNumber, false)
        setImageSource(getImageSource.getImageSource(cardValueParam).imageSource)
        setCardValue(cardValueParam)
    }

    return (
        <View>
            {   
                showCard && 
                    <TouchableOpacity onPress={() => clearSpecificCard()} 
                        style={focus?styles.onFocus:styles.notOnFocus}>

                        <Image source={imageSource} style={styles.card} /> 
                    </TouchableOpacity>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    card: { 
        width: 27,
        height:37,
        paddingLeft: 8,
        paddingTop: 3,
        borderRadius:2,
        borderColor: '#ffffff',
        backgroundColor: '#ffffff'
    },
    onFocus: {
        backgroundColor: '#00ff00',
        width: 30,
        height:40,
    },
    notOnFocus: {
        width: 30,
        height:40,
    },
});

export default forwardRef(UsableCard)