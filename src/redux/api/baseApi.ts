
import { createApi } from '@reduxjs/toolkit/query/react';
import { tagTypesList } from '../tagTypes';
import { axiosBaseQuery } from '@/helpers/axios/axiosBaseQuery';

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQuery({ baseUrl: 'https://trektrax-server.vercel.app/api' }),
    endpoints: () => ({}),
    tagTypes: tagTypesList
});

