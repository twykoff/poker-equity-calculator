import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    showEquity: false,
    equityStruct: {
    playerOneEquity: 0,
    playerTwoEquity: 0,
    playerOneScoops: 0,
    playerTwoScoops: 0,
    setChops: 0},
    numTrials: 0,
}

export const equitySlice = createSlice({
    name: 'equity',
    initialState,
    reducers: {
        setEquity: (state, actions) => {
            state.showEquity = true
            state.equityStruct = actions.payload.equity
        },

        setNumTrials: (state, actions) => {
            state.numTrials = actions.payload.numTrials
        },

        showEquity: (state) => {
            state.showEquity = true
        },
        hideEquity: (state) => {
            state.showEquity = false
        },

        clearEquity: (state, actions) => {
            return initialState
        },


    },
})

export const {setEquity, setNumTrials, showEquity, hideEquity, clearEquity} = equitySlice.actions



export const getEquity = (state, playerNumber) => (playerNumber == 1 ? state.equity.equityStruct.playerOneEquity : playerNumber == 2 ? 
    state.equity.equityStruct.playerTwoEquity : 0)
export const getScoop = (state, playerNumber) => (playerNumber == 1 ? state.equity.equityStruct.playerOneScoops: playerNumber == 2 ? 
    state.equity.equityStruct.playerTwoScoops : 0)

export const getNumTrials = (state) => state.equity.numTrials
   

export const getChops = (state) => state.equity.equityStruct.setChops
export const getShowEquity = (state) => state.equity.showEquity

export default equitySlice.reducer