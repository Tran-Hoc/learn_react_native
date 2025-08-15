import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { Todo } from "../type/index";

// Counter selectors
export const selectCounter = (state: RootState) => state.counter;
export const selectCounterValue = (state: RootState) => state.counter.value;
export const selectCounterStep = (state: RootState) => state.counter.step;

// User selectors
export const selectUser = (state: RootState) => state.user;
export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectIsAuthenticated = (state: RootState) =>
  state.user.isAuthenticated;
export const selectUserLoading = (state: RootState) => state.user.isLoading;

// Todos selectors with memoization
export const selectTodos = (state: RootState) => state.todos;
export const selectAllTodos = (state: RootState) => state.todos.items;
export const selectTodosFilter = (state: RootState) => state.todos.filter;

export const selectFilteredTodos = createSelector(
  [selectAllTodos, selectTodosFilter],
  (todos: Todo[], filter) => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }
);

export const selectTodoStats = createSelector(
  [selectAllTodos],
  (todos: Todo[]) => ({
    total: todos.length,
    completed: todos.filter((todo) => todo.completed).length,
    active: todos.filter((todo) => !todo.completed).length,
  })
);
