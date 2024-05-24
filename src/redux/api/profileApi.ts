import { tagType } from "../tagTypes";
import { baseApi } from "./baseApi";

export const profileApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getMyProfile: build.query({
			query: () => ({
				method: "GET",
				url: "/profile/my-profile",
			}),
			providesTags: [tagType.user],
		}),

		updateMyProfile: build.mutation({
			query: (data) => ({
				url: `/profile/${data.id}`,
				method: "PATCH",
				body: data,
			}),
			invalidatesTags: [tagType.user],
		}),
	}),
});

export const { useGetMyProfileQuery, useUpdateMyProfileMutation } = profileApi;
