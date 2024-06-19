import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { BASE_URL, otherURL } from "../../utils/baseURL";

export const addSubCategory = createAsyncThunk(
    'subcategories/add',
    async (data) => {
        console.log(data);
        const response = await axios.post(BASE_URL + 'subcategories', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
       
        return response.data;
    }
)

export const getSubCategory = createAsyncThunk(
    'subcategories/get',

    async () => {
        const response = await axios.get(BASE_URL + 'subcategories')
        return response.data;
    }
)

export const deleteSubCategory = createAsyncThunk(
    'subcategories/delete',

    async (_id) => {
        await axios.delete(BASE_URL + 'subcategories/' + _id)
        return _id;
    }
)

export const editSubCategory = createAsyncThunk(
    'subcategories/edit',

    async (data) => {
        await axios.put(BASE_URL + 'subcategories/' + data._id, data);

        return data
    }
)

const initialState = {
    isLoading: false,
    subcategory: [],
    error: null
}

const subcategorySlice = createSlice({
    name: 'subcategories',
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {

        builder.addCase(getSubCategory.fulfilled, (state, action) => {
            console.log(action.payload);
            state.subcategory = action.payload.data
        });

        builder.addCase(addSubCategory.fulfilled, (state, action) => {
            console.log(action.payload, state);
            state.subcategory = state.subcategory.concat(action.payload.data);
        });

        builder.addCase(deleteSubCategory.fulfilled, (state, action) => {
            console.log(action, state);
            state.subcategory = state.subcategory.filter((v) => v._id !== action.payload);
        });

        builder.addCase(editSubCategory.fulfilled, (state, action) => {
            console.log(action, state);
            state.subcategory = state.subcategory.map((v) => {
                if (v._id === action.payload._id) {
                    return action.payload;
                } else {
                    return v;
                }
            });
        });


    }
})

export default subcategorySlice.reducer