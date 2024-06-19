import axios from "axios"
import { ADD_PRODUCTS, DELETE_PRODUCTS, EDIT_PRODUCTS, ERROR_PRODUCTS, GET_PRODUCTS, LOADING_PRODUCTS } from "../ActionType"
import { BASE_URL, baseURL } from "../../utils/baseURL"

const loadingProducts = () => async (dispatch) => {
    dispatch({ type: LOADING_PRODUCTS })
}

const errorProduct = (error) => async (dispatch) => {
    dispatch({ type: ERROR_PRODUCTS, payload: error })
}

export const getProducts = (data) => async (dispatch) => {

    try {
        dispatch(loadingProducts())

        await axios.get(BASE_URL + 'products/list-product', data)
            .then((response) => {
                dispatch({ type: GET_PRODUCTS, payload: response.data })
            })
            .catch((error) => {
                dispatch(errorProduct(error.message));
            })

    } catch (error) {
        dispatch(errorProduct(error.message));
    }
}

export const addProduct = (data) => async (dispatch) => {
    try {
        dispatch(loadingProducts())

        await axios.post(BASE_URL + 'products/add-product', data)
            .then((response) => dispatch({ type: ADD_PRODUCTS, payload: response.data }))
            .catch((error) => {
                dispatch(errorProduct(error.message));
            })
    } catch (error) {
        dispatch(errorProduct(error.message));
    }
}

export const deleteProduct = (_id) => async (dispatch) => {
    try {
        dispatch(loadingProducts())

        await axios.delete(BASE_URL + 'products/delete-product/' + _id)
            .then(dispatch({ type: DELETE_PRODUCTS, payload: _id }))
            .catch((error) => {
                dispatch(errorProduct(error.message));
            })
    } catch (error) {
        dispatch(errorProduct(error.message));
    }
}

export const editProduct = (data) => async (dispatch) => {
    try {
        dispatch(loadingProducts())

        await axios.put(BASE_URL + 'products/update-product/' + data._id, data)
            .then((response) => {
                dispatch({ type: EDIT_PRODUCTS, payload: data })
            })
            .catch((error) => {
                dispatch(errorProduct(error.message));
            })
    } catch (error) {
        dispatch(errorProduct(error.message));
    }
}