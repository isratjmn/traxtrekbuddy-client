import { IMeta } from "@/types/general";
import { tagType } from "../tagTypes";
import { baseApi } from "./baseApi";
import { ITrip } from "@/types/trips";

export const tripsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		createTrip: builder.mutation({
			query: (data) => {
				return {
					url: "/trips",
					method: "POST",
					contentType: "multipart/form-data",
					data,
				};
			},
			invalidatesTags: [tagType.trip, tagType.user],
		}),

		getAllTips: builder.query({
			query: (arg: Record<string, any>) => ({
				url: "/trips",
				method: "GET",
				params: arg,
			}),
			transformResponse: (response: ITrip[], meta: IMeta) => {
				return {
					trips: response,
					meta,
				};
			},
			providesTags: [tagType.trip],
		}),

		getTrip: builder.query({
			query: (id: string | string[] | undefined) => ({
				url: `/trips/${id}`,
				method: "GET",
			}),
			providesTags: [tagType.trip],
		}),

		deleteTrip: builder.mutation({
			query: (id) => ({
				url: `/trip/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: [tagType.trip],
		}),

		updateTrip: builder.mutation({
			query: (data: { id: string; body: any }) => {
				return {
					url: `/trip/${data?.id}`,
					method: "PATCH",
					data: data?.body,
				};
			},
			invalidatesTags: [tagType.trip],
		}),
	}),
});

export const {
	useCreateTripMutation,
	useGetAllTipsQuery,
	useGetTripQuery,
	useDeleteTripMutation,
	useUpdateTripMutation,
} = tripsApi;
