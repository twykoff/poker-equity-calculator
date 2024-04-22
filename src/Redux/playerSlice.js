import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    players: [["","","","","","","","","",""],
        ["","","","","","","","","",""],
        ["","","","","","","","","",""],
        ["","","","","","","","","",""],
        ["","","","","","","","","",""],
        ["","","","","","","","","",""],
        ["","","","","","","","","",""],
        ["","","","","","","","","",""],
        ["","","","","","","","","",""],
        ["","","","","","","","","",""]],

    playerCount: 2,
    cardsPerPlayer: 2,
    playerEquity: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    playerScoops: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
}

export const playerSlice = createSlice({
    name: 'players',
    initialState,
    reducers: {
        setPlayerCountFunc: (state, actions) => {
            state.playerCount = actions.payload.playerCount
            //console.log("SPC: " + state.playerCount)
            //console.log("SPC: " + actions.payload.playerCount)
        },
        setPlayerSliceCard: (state, actions) => {
            state.players[actions.payload.playerNumber-1][actions.payload.cardNumber] = actions.payload.cardValue
        },
        setCardsPerPlayerSlice: (state, actions) => {
            state.cardsPerPlayer = actions.payload.cardsPerPlayer
        },
        setEquity: (state, actions) => {
            state.playerEquity[actions.payload.playerNumber] = actions.payload.equity
            state.playerScoops[actions.payload.playerNumber] = actions.payload.scoops
        },


    },
})
export const {setPlayerCountFunc, setPlayerSliceCard, setCardsPerPlayerSlice, setEquity} = playerSlice.actions



export const getPlayerCount = (state) => state.players.playerCount
export const getPlayerCards = (state) => state.players.players
export const getCardsPerPlayer = (state) => state.players.cardsPerPlayer
export const getPlayerEquity = (state, playerNumber) => state.players.playerEquity[playerNumber - 1]
export const getPlayerScoops = (state, playerNumber) => state.players.playerScoops[playerNumber - 1]

export default playerSlice.reducer