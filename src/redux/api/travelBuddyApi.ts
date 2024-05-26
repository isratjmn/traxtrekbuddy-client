import { tagType } from "../tagTypes";
import { baseApi } from "./baseApi";

export const travelBuddyApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getTravelBuddy: build.query({
			query: (tripId: string | string[] | undefined) => ({
				url: `/travel-buddies/${tripId}`,
				method: "GET",
			}),
			providesTags: [tagType.travelBuddy],
		}),
	}),
});

export const { useGetTravelBuddyQuery } = travelBuddyApi;
