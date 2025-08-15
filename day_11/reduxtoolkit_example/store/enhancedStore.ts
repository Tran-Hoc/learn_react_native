import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  PersistConfig,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import counterReducer from "./slices/counterSlice";
import userReducer from "./slices/userSlice";
import todosReducer from "./slices/todosSlice";
import { loggerMiddleware } from "../middleware/logger";

const persistConfig: PersistConfig<any> = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["counter", "user", "todos"], // Only persist these reducers
  blacklist: [], // Don't persist these reducers
};

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
  todos: todosReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const enhancedStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(loggerMiddleware), // Add custom middleware
  devTools: __DEV__, // Enable Redux DevTools in development
});

export const persistor = persistStore(enhancedStore);

export type EnhancedRootState = ReturnType<typeof enhancedStore.getState>;
export type EnhancedAppDispatch = typeof enhancedStore.dispatch;
