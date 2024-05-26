import { tagType } from "../tagTypes";
import { baseApi } from "./baseApi";

export const travelBuddyApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getBuddyRequest: build.query({
            query: (id: string | string[] | undefined) => ({
                method: "GET",
                url: `/travel-buddies/${id}`,
            }),
            providesTags: [tagType.travelBuddy],
        }),
    }),
});

export const { useGetBuddyRequestQuery } = travelBuddyApi;
