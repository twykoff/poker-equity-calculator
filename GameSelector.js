import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View, TextInput, Button, TouchableOpacity, Image } from 'react-native';

import {forwardRef, useImperativeHandle, useState, useMemo, useEffect, useRef} from 'react'



import { useDispatch, useSelector } from 'react-redux';
import { getPlayerCards, getPlayerCount, getPlayerCountSet, getPlayersSet} from './src/Redux/playerSlice'
import { getBoardCards, getBoardsSet} from './src/Redux/boardSlice'
import { setEquity, showEquity } from './src/Redux/equitySlice';

import BigOh from './BigOh'
import NLHE from './NLHE'
import PLO4 from './PLOH4'
import PLO5 from './PLOH5'
import PLO6 from './PLOH6'
import DBPLO4 from './DBPLO4'





const GameSelector = (props, ref) => { 

    const dispatch = useDispatch()

    const bigOhRef = useRef()
    const NLHERef = useRef()
    const PLO4Ref = useRef()
    const PLO5Ref = useRef()
    const PLO6Ref = useRef()
    const DBPLO4Ref = useRef()
    
    const playerCards = useSelector((state) => getPlayerCards(state))
    const playerCount = useSelector((state) => getPlayerCount(state))
    const playerCountSet = useSelector((state) => getPlayerCountSet(state))
    const playersSet = useSelector((state) => getPlayersSet(state))
    const boardCards = useSelector((state) => getBoardCards(state))
    const boardsSet = useSelector((state) => getBoardsSet(state))

    const [refreshValue, setRefresh] = useState(false)

    const [playerCardsHere, setPlayerCardsHere] = useState(0)

    
    useEffect(() => {
        setPlayerCardsHere(playerCardsHere + 1)
        setPlayerCardsHere(2)
    }, playerCards)
    

    useImperativeHandle(ref, () => ({
        // methods connected to `ref`
        calculateEquity: (game) => {calculateEquity(game)}
      }))

    const fakeFunc = () => {

    }

    

    

    const calculateEquity = (game) => {

        if(game === 'BigOh')
            bigOhRef.current.calculateEquity()
        if(game === 'NLHE')
            NLHERef.current.calculateEquity()
        if(game === 'PLO4')
            PLO4Ref.current.calculateEquity()
        if(game === 'PLO5')
            PLO5Ref.current.calculateEquity()
        if(game === 'PLO6')
            PLO6Ref.current.calculateEquity()
        if(game === 'DBPLO4')
            DBPLO4Ref.current.calculateEquity()
        
    }

    


    

    



    return (<View>
        <BigOh ref={bigOhRef}/>
        <NLHE ref={NLHERef}/>
        <PLO4 ref={PLO4Ref}/>
        <PLO5 ref={PLO5Ref}/>
        <PLO6 ref={PLO6Ref}/>
        <DBPLO4 ref={DBPLO4Ref}/>
        </View>)
}


export default forwardRef(GameSelector)

