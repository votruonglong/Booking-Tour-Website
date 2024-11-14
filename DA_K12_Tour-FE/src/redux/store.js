import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import authReducer from './features/auth/authSlice'
import categoryReducer from "./features/system/categoriesSlice"
import toursReducer from "./features/system/tourSlice"
import schedulesReducer from "./features/system/scheduleSlice"
import bookingsReducer from "./features/system/bookingSlice"
import paymentMethodsReducer from "./features/system/paymentMethodSlice"
import commentReducer from './features/system/commentSlice'

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["sidebar", "auth"],
};


const rootReducer = combineReducers({
    auth: authReducer,
    category: categoryReducer,
    tours: toursReducer,
    schedules: schedulesReducer,
    bookings: bookingsReducer,
    paymentMethods: paymentMethodsReducer,
    comments: commentReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
export const persistor = persistStore(store);