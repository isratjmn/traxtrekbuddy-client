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
			query: ({ tripId }) => ({
				url: `/travel-buddies/${tripId}`,
				method: "GET",
			}),
			providesTags: [tagType.travelBuddy],
		}),

		respondToRequest: build.mutation({
			query: ({ buddyId, tripId, status }) => ({
				url: `/travel-buddies/${buddyId}/respond`,
				method: "PUT",
				body: { tripId, status },
			}),
		}),
	}),
});

export const {
	useCreateTravelRequestMutation,
	useGetTravelBuddyQuery,
	useRespondToRequestMutation,
} = travelBuddyApi;
