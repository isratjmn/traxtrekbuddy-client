import { tagType } from "../tagTypes";
import { baseApi } from "./baseApi";

export const travelBuddyApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		createTravelRequest: build.mutation({
			query: ({ tripId, userId }) => {
				
				return {
					url: `/trip/${tripId}/request`,
					method: "POST",

					body: { userId },
				};
			},
			invalidatesTags: [tagType.trip],
		}),

		getTravelBuddy: build.query({
			query: (tripId: string | string[] | undefined) => ({
				url: `/travel-buddies/${tripId}`,
				method: "GET",
			}),
			providesTags: [tagType.travelBuddy],
		}),
	}),
});

export const { useCreateTravelRequestMutation, useGetTravelBuddyQuery } =
	travelBuddyApi;
