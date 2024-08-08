import { createSlice } from "@reduxjs/toolkit";

const initialState : Array<String> = [];

const queueSlice = createSlice({
    name: "queue",
    initialState,
    reducers : {
        addToQueue : (state, action) => {
            state.push(action.payload);
        }
    }
})

export const {addToQueue} = queueSlice.actions;
export default queueSlice.reducer;