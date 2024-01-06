import { createSlice } from "@reduxjs/toolkit";


const surveySlice = createSlice({
    name: "survey",
    initialState : {
        isCreating : false,
    },
    reducers: {
        setIsCreating(state, action){
            state.isCreating =  !state.isCreating
        }
    }
})

export const {setIsCreating} = surveySlice.actions

export default surveySlice;