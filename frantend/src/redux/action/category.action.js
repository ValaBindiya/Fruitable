

import axios from "axios"
import { ADD_CATEGORIES, DELETE_CATEGORIES, EDIT_CATEGORIES, GET_CATEGORIES } from "../ActionType"
import { BASE_URL } from "../../utils/baseURL"

// const loadingProducts = () => async (dispatch) => {
//     dispatch({ type: LOADING_PRODUCTS })
// }

// const errorProduct = (error) => async (dispatch) => {
//     dispatch({ type: ERROR_PRODUCTS, payload: error })
// }

export const getCategory = () => (dispatch) => {

    try {
        // dispatch(loadingProducts())

        axios.get(BASE_URL + 'categories')
            .then((response) => {
                console.log(response.data.data);
                dispatch({ type: GET_CATEGORIES, payload: response.data.data })
            })
            .catch((error) => {
                // dispatch(errorProduct(error.message));
            })


    } catch (error) {
        // dispatch(errorProduct(error.message));
    }


}

export const addCategory = (data) => async (dispatch) => {
    try {
        // dispatch(loadingProducts())

        await axios.post(BASE_URL + 'categories', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => dispatch({ type: ADD_CATEGORIES, payload: response.data }))
            .catch((error) => {
                // dispatch(errorProduct(error.message));
            })
    } catch (error) {
        // dispatch(errorProduct(error.message));
    }
}

export const deleteCategory = (_id) => async (dispatch) => {
    try {
        // dispatch(loadingProducts())

        await axios.delete(BASE_URL + 'categories/' + _id)
            .then(dispatch({ type: DELETE_CATEGORIES, payload: _id }))
            .catch((error) => {
                // dispatch(errorProduct(error.message));
            })
    } catch (error) {
        // dispatch(errorProduct(error.message));
    }
}

export const editCategory = (data) => async (dispatch) => {
    try {
        // dispatch(loadingProducts())

        const response = await axios.put(BASE_URL + 'categories/' + data._id, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                dispatch({ type: EDIT_CATEGORIES, payload: response.data })
            })
            .catch((error) => {
                // dispatch(errorProduct(error.message));
            })
    } catch (error) {
        // dispatch(errorProduct(error.message));
    }
}