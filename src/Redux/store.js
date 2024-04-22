import { configureStore} from "@reduxjs/toolkit";
import playerReducer from './playerSlice'
import boardReducer from './boardSlice'
import equityReducer from './equitySlice'

export const store = configureStore({
    reducer: {
        players: playerReducer,
        boards: boardReducer,
        equity: equityReducer,
    },
})