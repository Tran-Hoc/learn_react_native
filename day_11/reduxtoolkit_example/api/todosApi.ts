import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiTodo } from "../type";

export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
    // Add auth headers if needed
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as any;
      const token = state.user?.currentUser?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    getTodos: builder.query<ApiTodo[], void>({
      query: () => "todos",
      providesTags: ["Todo"],
    }),
    getTodo: builder.query<ApiTodo, number>({
      query: (id) => `todos/${id}`,
      providesTags: (result, error, id) => [{ type: "Todo", id }],
    }),
    addTodo: builder.mutation<ApiTodo, Partial<ApiTodo>>({
      query: (newTodo) => ({
        url: "todos",
        method: "POST",
        body: newTodo,
      }),
      invalidatesTags: ["Todo"],
    }),
    updateTodo: builder.mutation<
      ApiTodo,
      Partial<ApiTodo> & Pick<ApiTodo, "id">
    >({
      query: ({ id, ...patch }) => ({
        url: `todos/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Todo", id }],
    }),
    deleteTodo: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useGetTodoQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todosApi;
