import { StatusBar } from 'expo-status-bar';
import { useState, forwardRef, useImperativeHandle} from 'react'
import { StyleSheet, Text, SafeAreaView, View, TextInput, Button, TouchableOpacity, Image } from 'react-native';

import getImageSource from './CardImageUtil';






const Card = (props, ref) => {
    useImperativeHandle(ref, () => ({
        // methods connected to `ref`
        clearCard: () => { clearCard() },
        disableCard: () => { disableCard() },
        clearSpecificCard: (clearCardValue) => { clearSpecificCard(clearCardValue) }
    }))

    const [cardDisabled, setCardDisabled] = useState(false);

    function pressedButton() {
        //console.log(JSON.stringify(props.parent, null, 2))
        props.pressedButton(cardValue);

        setCardDisabled(true);
        //console.log(cardValue);
    }

    const clearCard = () => {
        setCardDisabled(false)
    }

    const disableCard = () => {
        setCardDisabled(true)
    }

    const clearSpecificCard = (clearCardValue) => {
        if(clearCardValue == cardValue)
            setCardDisabled(false)
    }
    
    const cardValue = props.cardValue
    const {imageSource} = getImageSource.getImageSource(cardValue);
    

    return (
        
        <TouchableOpacity style={cardDisabled?styles.disabled:styles.enabled} onPress={() => pressedButton()} disabled={cardDisabled}>
          <Image source={imageSource} style={styles.card} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: { 
        width: 27,
        height:37,
    },
    enabled: { 
        width: 29,
        height: 42,
        opacity: 1,
    },
    disabled: { 
        width: 29,
        height: 42,
        opacity: 0.25,
    },
    flexContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 2,
    },
});

export default forwardRef(Card)