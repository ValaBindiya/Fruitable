import { ADD_CATEGORIES, DELETE_CATEGORIES, EDIT_CATEGORIES, GET_CATEGORIES } from "../ActionType";

const initialState = {
    isLoading: null,
    category: [],
    error: false,
}

export const categoryReducer = (state = initialState, action) => {
    console.log(action);

    switch (action.type) {
        // case LOADING_PRODUCTS:
        //     return {
        //         ...state,
        //         isLoading: true,
        //     }

        // case ERROR_PRODUCTS:
        //     return {
        //         ...state,
        //         isLoading: false,
        //         error:action.payload
        //     }

        case GET_CATEGORIES:
            return {
                isLoading: null,
                category: action.payload,
                error: false,
            }

        case ADD_CATEGORIES:
            return {
                isLoading: null,
                category: state.category.concat(action.payload.data),
                error: false,
            }

        case DELETE_CATEGORIES:
            return {
                isLoading: null,
                category: state.category.filter((v) => v._id !== action.payload),
                error: false,
            }

        case EDIT_CATEGORIES:
            return {
                isLoading: null,
                category: state.category.map((v) => {
                    if (v._id === action.payload.data._id) {
                        return action.payload.data
                    } else {
                        return v
                    }
                }),
                error: false,
            }

        default:
            return state;
    }
}
