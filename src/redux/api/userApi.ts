import { IMeta } from "@/types/general";
import { tagType } from "../tagTypes";
import { baseApi } from "./baseApi";
import { IUsers } from "@/types/trips";

export const userApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getAllUsers: build.query({
			query: (arg: Record<string, any>) => ({
				url: "/users",
				method: "GET",
				params: arg,
			}),

			transformResponse: (response: IUsers[], meta: IMeta) => {
				return {
					users: response,
					meta,
				};
			},
			providesTags: [tagType.user],
		}),

		updateUserInfo: build.mutation({
			query: (data: { id: string; body: any }) => {
				return {
					url: `/${data.id}/status`,
					method: "PATCH",
					data: data?.body,
				};
			},
			invalidatesTags: [tagType.user],
		}),

		updateUserRole: build.mutation({
			query: (data: { id: string; body: any }) => {
				return {
					url: `/${data.id}/role`,
					method: "PATCH",
					data: data?.body,
				};
			},
			invalidatesTags: [tagType.user],
		}),

	}),
});

export const {
	useGetAllUsersQuery,
	useUpdateUserInfoMutation,
	useUpdateUserRoleMutation,
} = userApi;
