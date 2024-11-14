import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import sidebarReducer from "./features/sidebarMenuSlice";
import authReducer from "./features/authReducer/authSlice";
import categoryReducer from "./features/system/categoriesSlice"
import usersReducer from "./features/user/userSlice"
import toursReducer from "./features/system/tourSlice"
import schedulesReducer from "./features/system/scheduleSlice"
import bookingsReducer from "./features/system/bookingSlice"
import paymentMethodsReducer from "./features/system/paymentMethodSlice"

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["sidebar", "auth"],
};

const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  auth: authReducer,
  category: categoryReducer,
  users: usersReducer,
  tours: toursReducer,
  schedules: schedulesReducer,
  bookings: bookingsReducer,
  paymentMethods: paymentMethodsReducer,
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
