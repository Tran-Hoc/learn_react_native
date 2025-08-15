import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootState } from "../store/store";

const PERSIST_KEY = "redux-state";

interface PersistedState {
  counter: RootState["counter"];
  user: {
    currentUser: RootState["user"]["currentUser"];
    isAuthenticated: RootState["user"]["isAuthenticated"];
  };
  todos: {
    items: RootState["todos"]["items"];
    filter: RootState["todos"]["filter"];
  };
}

export const saveState = async (state: RootState): Promise<void> => {
  try {
    const persistedState: PersistedState = {
      // Only persist certain parts of state
      counter: state.counter,
      user: {
        currentUser: state.user.currentUser,
        isAuthenticated: state.user.isAuthenticated,
      },
      todos: {
        items: state.todos.items,
        filter: state.todos.filter,
      },
    };
    const serializedState = JSON.stringify(persistedState);
    await AsyncStorage.setItem(PERSIST_KEY, serializedState);
  } catch (error) {
    console.error("Could not save state", error);
  }
};

export const loadState = async (): Promise<Partial<RootState> | undefined> => {
  try {
    const serializedState = await AsyncStorage.getItem(PERSIST_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState) as Partial<RootState>;
  } catch (error) {
    console.error("Could not load state", error);
    return undefined;
  }
};
