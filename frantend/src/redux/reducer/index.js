import { combineReducers } from "redux";
import { FacilitiesReducer } from "./facilities.reducer";
import { productsReducer } from "./products.reducer";
import { shopReducer } from "./shop.reducer";
import { reviewReducer } from "./review.reducer";
import counterSlice from "../slice/counter.slice";
import cartSlice from "../slice/cart.slice";
import couponSlice from "../slice/coupon.slice";
import { categoryReducer } from "./category.reducer";
import subcategorySlice from "../slice/subcategory.slice";

export const RootReducer = combineReducers({

    facilities: FacilitiesReducer,
    products: productsReducer,
    shop: shopReducer,
    reviews: reviewReducer,
    count_slice: counterSlice,
    cart: cartSlice,
    coupon:couponSlice,
    category:categoryReducer,
    subCategories: subcategorySlice
})