import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const API_URL = "https://watch-vogue.shop/api/users";

export const signUp = createAsyncThunk(
    'user/signUp',
    async ({ name, email, password, contact }, thunkAPI) => {
        try {
            const response = await axios.post(`${API_URL}/signup`, {
                name,
                email,
                password,
                contact,
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

const userSlice = createSlice({
 
    name: 'user',
    initialState: {
        user: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signUp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; 
            });
    },
});

export default userSlice.reducer;
 
