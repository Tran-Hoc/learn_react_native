import {
  Middleware,
  MiddlewareAPI,
  Dispatch,
  AnyAction,
} from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export const loggerMiddleware: Middleware<{}, RootState> =
  (store: MiddlewareAPI<Dispatch<AnyAction>, RootState>) =>
  (next: Dispatch<AnyAction>) =>
  (action: AnyAction) => {
    console.group(action.type);
    console.info("dispatching", action);
    const result = next(action);
    console.log("next state", store.getState());
    console.groupEnd();
    return result;
  };
