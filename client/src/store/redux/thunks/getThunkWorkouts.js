import {getWorkouts} from "./../../../api/requests/workouts/workoutsRequest.js"
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import handleLog from "../../../helpers/handleLog.js";

export const getThunkWorkouts = createAsyncThunk(
    'workouts/fetchAll',
    async () => {
        try {
            const response = await getWorkouts()
            handleLog(response)
            return response
        } catch (error) {
            console.error(error)
            return rejectWithValue(error.response.data)
        }
    }
);