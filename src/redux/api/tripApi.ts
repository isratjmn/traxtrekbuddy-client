import { IMeta } from "@/types/general";
import { tagType } from "../tagTypes";
import { baseApi } from "./baseApi";
import { ITrip } from "@/types/trips";

export const doctorApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createTrip: build.mutation({
            query: (data) => ({
                url: '/trips',
                method: 'POST',
                contentType: 'multipart/form-data',
                data,
            }),
            invalidatesTags: [tagType.trip],
        }),

        getAllTips: build.query({
            query: (arg: Record<string, any>) => ({
                url: '/trips',
                method: 'GET',
                params: arg
            }),
            transformResponse: (response: ITrip[], meta: IMeta) => {
                return {
                    trips: response,
                    meta
                };
            },
            providesTags: [tagType.trip]

        }),

        deleteTrip: build.mutation({
            query: (id) => ({
                url: `/trip/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: [tagType.trip],

        }),

        getTrip: build.query({
            query: (id: string | string[] | undefined) => ({
                url: `/trip/${id}`,
                method: "GET"

            }),
            providesTags: [tagType.trip]
        }),

        updateTrip: build.mutation({
            query: (data) => {
                console.log(data);
                return (
                    {
                        url: `/trip/${data?.id}`,
                        method: "PATCH",
                        data: data?.body
                    });
            },
            invalidatesTags: [tagType.trip],
        })
    })
});

export const {
    useCreateTripMutation,
    useGetAllTipsQuery,
    useGetTripQuery,
    useDeleteTripMutation,
    useUpdateTripMutation
} = doctorApi;