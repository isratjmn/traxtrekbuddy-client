

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
        tripRequestUser: build.mutation({
            query: (data) => ({
                url: '/trip/${tripId}/request',
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

        getTrip: build.query({
            query: (tripId) => ({
                url: `/trips/${tripId}`,
                method: "GET"

            }),
            providesTags: [tagType.trip]
        }),

        deleteTrip: build.mutation({
            query: (id) => ({
                url: `/trip/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: [tagType.trip],

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