import { IMeta } from "@/types/general";
import { tagType } from "../tagTypes";
import { baseApi } from "./baseApi";
import { ITrip } from "@/types/trips";

export const doctorApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		createTrip: build.mutation({
			query: (data) => ({
				url: "/trips",
				method: "POST",
				contentType: "multipart/form-data",
				data,
			}),
			invalidatesTags: [tagType.trip],
		}),
		submitTravelRequest: build.mutation({
			query: ({ tripId, userId }) => ({
				url: `/trip/${tripId}/request`,
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: { userId },
			}),
			invalidatesTags: [tagType.trip],
		}),

		getAllTips: build.query({
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

		getTrip: build.query({
			query: (id: string | string[] | undefined) => ({
				url: `/trips/${id}`,
				method: "GET",
			}),
			providesTags: [tagType.trip],
		}),

		deleteTrip: build.mutation({
			query: (id) => ({
				url: `/trip/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: [tagType.trip],
		}),

		updateTrip: build.mutation({
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
	useSubmitTravelRequestMutation,
	useGetAllTipsQuery,
	useGetTripQuery,
	useDeleteTripMutation,
	useUpdateTripMutation,
} = doctorApi;
