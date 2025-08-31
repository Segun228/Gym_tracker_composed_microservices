import {getMe} from "./../../../api/requests/user/userRequests"
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getThunkMe = createAsyncThunk(
    'user/getMe',
    async () => {
        try {
            const response = await getMe()
            return response
        } catch (error) {
            console.error(error)
            return rejectWithValue(error.response.data)
        }
    }
);