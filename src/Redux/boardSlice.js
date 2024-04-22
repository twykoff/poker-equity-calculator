import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    boards: [["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""]],
    boardCount: 1,
    cardsPerBoard: 5,
}

export const boardSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
        setBoardSliceCard: (state, actions) => {
            state.boards[actions.payload.boardNumber-1][actions.payload.cardNumber] = actions.payload.cardValue
            //console.log("CURRENT BOARD: " + state.boards)
        },
        setBoardCountFunc: (state, actions) => {
            state.boardCount = actions.payload.boardCount
            //console.log("BOARD COUNT SLICE: " + actions.payload.boardCount)
        },
        setCardsPerBoard: (state, actions) => {
            state.cardsPerBoard = actions.payload.cardsPerBoard
            //console.log("BOARD CARDS SLICE: " + actions.payload.cardsPerBoard)
        },
    },
})

export const {setBoardCards, resetBoards, setBoardSliceCard, setBoardCountFunc, setCardsPerBoard} = boardSlice.actions

export const getBoardsSet = (state) => state.boards.boardsSet
export const getBoardCards = (state) => state.boards.boards
export const getBoardCountSlice = (state) => state.boards.boardCount
export const getCardsPerBoard = (state) => state.boards.cardsPerBoard

export default boardSlice.reducer