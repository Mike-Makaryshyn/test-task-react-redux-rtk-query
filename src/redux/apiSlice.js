import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
   reducerPath: "api",
   baseQuery: fetchBaseQuery({
      baseUrl: "https://frontend-test-assignment-api.abz.agency/api/v1/",
   }),
   tagTypes: ["Users","Positions"],
   endpoints: (builder) => ({
      getUsers: builder.query({
         query: (page) => ({
            url: `/users?page=${page}&count=6`,
         }),
         providesTags: ["Users"],
      }),
      getPositions: builder.query({
         query: () => ({
            url: `/positions`,
         }),
         providesTags: ["Positions"],
      }),
      getToken: builder.query({
         query: () => ({
            url: `/token`,
         }),
      }),
      createUser: builder.mutation({
         query: ({formData, token}) => {
            return {
              url: "/users",
              method: "POST",
              headers: { Token: token },
              body: formData,
            };
          },
         invalidatesTags: ["Users"],
      }),
   }),
});

export const {
   useGetUsersQuery,
   useGetTokenQuery,
   useGetPositionsQuery,
   useCreateUserMutation,
} = usersApi;
