import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://68f92523deff18f212b8c71a.mockapi.io/api/v1/",
  }),
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "createtask",
       providesTags: ['Task']
    }),

    addTask: builder.mutation({
      query: (newTask) => ({
        url: "createtask",
        method: "POST",
        body: newTask,
      }),
        invalidatesTags: ['Task'] 

    }),

    updateTask: builder.mutation({
      query: ({id, updatedData}) => ({
        url: `createtask/${id}`,
        method: "PUT",
        body: updatedData,
      }),
       invalidatesTags: ['Task'] 
    }),

    deleteTask: builder.mutation({
      query: (id) => ({
         url: `createtask/${id}`,
         method: "DELETE",
      }),
      invalidatesTags: ['Task'] 
    }),

    completeTask: builder.mutation({
      query: ({id, updatedData}) => ({
      url: `createtask/${id}`,
      method: 'PUT',
      body: updatedData
      }),
      invalidatesTags:['Task']
    })

  }),
});

export const { useGetTasksQuery, useAddTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation, useCompleteTaskMutation } = apiSlice;
