// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// const BASE_URL = 'http://localhost:5000/api/projects';
// export const projectApi = createApi({
//   reducerPath: 'projectApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: BASE_URL, 
//     credentials: 'include', 
//   }),
//   endpoints: (builder) => ({
//     // ** Add a New Project **
//     addProject: builder.mutation({
//       query: (projectData) => ({
//         url: '/add', 
//         method: 'POST',
//         body: projectData,
//       }),
//     }),

//     // ** Update an Existing Project **
//     updateProject: builder.mutation({
//       query: ({ id, updatedData }) => ({
//         url: `/update/${id}`, 
//         method: 'PATCH',
//         body: updatedData,
//       }),
//     }),

//     // ** Delete a Project by ID **
//     deleteProject: builder.mutation({
//       query: (id) => ({
//         url: `/delete/${id}`,
//         method: 'DELETE',
//       }),
//     }),

//     // ** Get All Projects **
//     getProjects: builder.query({
//       query: () => '/all', // GET /projects/all
//     }),

    
//     // ** Fetch Projects Stats/Counts **
//     getProjectsStats: builder.query({
//       query: () => '/stats', // GET /projects/stats
//     }),
   
//   }),
// });

// export const {
//   useAddProjectMutation,
//   useUpdateProjectMutation,
//   useDeleteProjectMutation,
//   useGetProjectsQuery,
// } = projectApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:5000/api/projects';

export const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL, 
    credentials: 'include', 
  }),
  tagTypes: ['Projects', 'Stats'], // Define tag types for cache invalidation
  endpoints: (builder) => ({
    // ** Add a New Project **
    addProject: builder.mutation({
      query: (projectData) => ({
        url: '/add', 
        method: 'POST',
        body: projectData,
      }),
      invalidatesTags: ['Projects', 'Stats'], // Invalidate project list and stats
    }),

    // ** Update an Existing Project **
    updateProject: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/update/${id}`, 
        method: 'PATCH',
        body: updatedData,
      }),
      invalidatesTags: ['Projects', 'Stats'], // Invalidate project list and stats
    }),

    // ** Delete a Project by ID **
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Projects', 'Stats'], // Invalidate project list and stats
    }),

    // ** Get All Projects **
    getAllProjects: builder.query({
      query: () => '/all', // GET /projects/all
      providesTags: ['Projects'], // Mark this data with the 'Projects' tag
    }),

    // ** Fetch Projects Stats/Counts **
    getProjectsStats: builder.query({
      query: () => '/stats', // GET /projects/stats
      providesTags: ['Stats'], // Mark this data with the 'Stats' tag
    }),
    updateProjectStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Projects', 'Stats'], // Ensures the cache is updated
    }),
    getStatusOptions: builder.query({
      query: () => '/status-options',
      providesTags: ['Projects'],
    }),
  }),
});

export const {
  useAddProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useGetAllProjectsQuery,
  useGetProjectsStatsQuery,
  useUpdateProjectStatusMutation,
  useGetStatusOptionsQuery,
} = projectApi;
