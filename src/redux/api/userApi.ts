import { IMeta } from "@/types/general";
import { tagType } from "../tagTypes";
import { baseApi } from "./baseApi";
import { ITrip, IUsers } from "@/types/trips";

export const userApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		/* getAllUsers: build.query({
			query: (arg: Record<string, any>) => ({
				url: "/all-user",
				method: "GET",
				params: arg,
			}),

			transformResponse: (response: { data: IUsers[]; meta: IMeta }) => {
				return {
					users: response.data,
					meta: response.meta,
				};
			},
			providesTags: [tagType.user],
		}), */

		getAllUsers: build.query({
			query: () => ({
				url: "/users",
				method: "GET",
			}),
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
