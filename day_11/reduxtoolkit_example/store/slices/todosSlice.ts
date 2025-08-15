import { Todo, TodoFilter, TodoState } from "@/type";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
  "todo/fetchTodos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await new Promise<Todo[]>((resolve) =>
        setTimeout(
          () =>
            resolve([
              { id: 1, text: "Learn Redux toolkit", completed: true },
              { id: 2, text: "Build React native app", completed: true },
              { id: 3, text: "Deploy to app store", completed: false },
            ]),
          1000
        )
      );
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const initialState: TodoState = {
  items: [],
  isLoading: false,
  error: null,
  filter: "all",
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };
      state.items.push(newTodo);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.items.find((item) => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateTodo: (
      state,
      action: PayloadAction<{ id: number; text: string }>
    ) => {
      const { id, text } = action.payload;
      const todo = state.items.find((item) => item.id === id);
      if (todo) {
        todo.text = text;
      }
    },

    setFilter: (state, action: PayloadAction<TodoFilter>) => {
      state.filter = action.payload;
    },
    clearCompleted: (state) => {
      state.items = state.items.filter((item) => !item.completed);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  addTodo,
  toggleTodo,
  removeTodo,
  updateTodo,
  setFilter,
  clearCompleted,
} = todosSlice.actions;

export default todosSlice.reducer;
