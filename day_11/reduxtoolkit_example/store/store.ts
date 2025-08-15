import counterReducer from "./slices/counterSlice";
import userReducer from "./slices/userSlice";
import todoReducer from "./slices/todosSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    todos: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
