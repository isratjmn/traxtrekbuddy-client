
import { tagType } from "../tagTypes";
import { baseApi } from "./baseApi";

export const AuthApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        changePassword: build.mutation({
            query: (data) => ({
                method: "POST",
                url: "/change-password",

                data: data,
            }),
            invalidatesTags: [tagType.user, tagType.meta],
        }),
    }),
});

export const {
    useChangePasswordMutation
} = AuthApi;
