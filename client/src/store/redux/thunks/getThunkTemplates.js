import {getWorkoutExercises} from "../../../api/requests/templates/templateRequest"
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getThunkTemplates = createAsyncThunk(
    'templates/fetchAll',
    async () => {
        try {
            const response = await getWorkoutExercises()
            return response
        } catch (error) {
            console.error(error)
            return rejectWithValue(error.response.data)
        }
    }
);