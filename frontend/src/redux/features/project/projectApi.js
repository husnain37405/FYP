import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

 const BASE_URL = 'http://localhost:5000/api/projects';

export const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL, 
    credentials: 'include', 
  }),
  tagTypes: ['Projects', 'Stats'], 
  endpoints: (builder) => ({
    
    addProject: builder.mutation({
      query: (projectData) => ({
        url: '/add', 
        method: 'POST',
        body: projectData,
      }),
      invalidatesTags: ['Projects', 'Stats'], 
    }),

  
    updateProject: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/update/${id}`, 
        method: 'PATCH',
        body: updatedData,
      }),
      invalidatesTags: ['Projects', 'Stats'], 
    }),

    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Projects', 'Stats'], 
    }),

    
    getAllProjects: builder.query({
      query: () => '/all', 
      providesTags: ['Projects'], 
    }),

   
    getProjectsStats: builder.query({
      query: () => '/stats', 
      providesTags: ['Stats'],
    }),
    updateProjectStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Projects', 'Stats'], 
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
