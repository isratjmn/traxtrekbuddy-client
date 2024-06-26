"use client";

import {
	useGetAllUsersQuery,
	useUpdateUserInfoMutation,
	useUpdateUserRoleMutation,
} from "@/redux/api/userApi";
import { useDebounced } from "@/redux/hooks";
import React, { useEffect, useState } from "react";
import Pagination from "@/component/Forms/Pagination";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "@/component/Shared/Spinner/Spinner";

const ITEMS_PER_PAGE = 10;
interface User {
	id: string;
	name: string;
	email: string;
	role: "admin" | "user";
	status: "ACTIVE" | "DEACTIVE";
}

const ManageUsers = () => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [currentPage, setCurrentPage] = useState<number>(1);
	const debouncedTerm = useDebounced({ searchQuery: searchTerm, delay: 600 });
	const query: Record<string, any> = {
		page: currentPage,
		limit: ITEMS_PER_PAGE,
	};
	if (debouncedTerm) {
		query["searchTerm"] = debouncedTerm;
	}
	const {
		data: getAllUsers,
		isLoading: usersLoading,
		isError: usersError,
	} = useGetAllUsersQuery(query);

	const [updateUserRole] = useUpdateUserRoleMutation();
	const [updateUserInfo] = useUpdateUserInfoMutation();

	useEffect(() => {
		if (usersError) {
			toast.error("Failed to fetch users data");
		}
	}, [usersError]);
	const handleRoleChange = async (userId: string, newRole: string) => {
		try {
			const updatedUser = await updateUserRole({
				id: userId,
				body: { role: newRole },
			});
			toast.success("User role updated successfully....");
		} catch (error) {
			toast.error("Failed to update user role");
		}
	};

	const handleStatusChange = async (
		id: string,
		newStatus: "ACTIVE" | "DEACTIVE"
	) => {
		try {
			const updatedStatus = await updateUserInfo({
				id: id,
				body: { status: newStatus },
			});
			console.log(updatedStatus);

			toast.success("User status updated successfully......");
		} catch (error) {
			toast.error("Failed to update user status");
		}
	};

	if (usersLoading) {
		return <Spinner />;
	}

	if (!getAllUsers) {
		return <div>No users found</div>;
	}

	const totalUsers = getAllUsers?.meta?.total;
	const totalPages = Math.ceil(totalUsers / ITEMS_PER_PAGE);
	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	return (
		<div className="w-full py-10">
			<Toaster position="top-center" />
			<h1 className="text-center text-3xl font-extrabold text-teal-600 pb-8">
				Manage Users
			</h1>
			<div className="border w-[80%] mx-auto ">
				<table className="min-w-full bg-white">
					<thead className="bg-gray-200 rounded-3xl">
						<tr>
							<th className="py-4 px-6 border-b border-gray-200 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
								SL No
							</th>
							<th className="py-4 px-6 border-b border-gray-200 text-left text-sm font-extraextrabold text-gray-600 uppercase tracking-wider">
								Name
							</th>
							<th className="py-4 px-6 border-b border-gray-200 text-left text-sm font-extrabold text-gray-600 uppercase tracking-wider">
								Email
							</th>
							<th className="py-4 px-6 border-b border-gray-200 text-left text-sm font-extrabold text-gray-600 uppercase tracking-wider">
								Role
							</th>
							<th className="py-4 px-6 border-b border-gray-200 text-left text-sm font-extrabold text-gray-600 uppercase tracking-wider">
								Status
							</th>
						</tr>
					</thead>
					<tbody>
						{getAllUsers?.users?.map((user: any, index: number) => (
							<tr key={user?.id}>
								<td className="py-2 px-4 border-b border-gray-200">
									{(currentPage - 1) * ITEMS_PER_PAGE +
										index +
										1}
								</td>
								<td className="py-2 px-4 border-b border-gray-200">
									{user?.name}
								</td>
								<td className="py-2 px-4 border-b border-gray-200">
									{user?.email}
								</td>
								<td className="py-2 px-4 border-b border-gray-200">
									<div className="relative inline-block text-left">
										<div className="group">
											<button
												type="button"
												className={`inline-flex justify-center items-center w-24 px-4 py-2 text-sm font-extrabold text-white ${
													user?.role === "admin"
														? "bg-teal-700"
														: "bg-gray-500"
												} hover:bg-gray-500 focus:outline-none focus:bg-gray-700`}
											>
												{user?.role}
											</button>
											<div className="absolute z-10 w-24 origin-top-left bg-white divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
												<div>
													<p
														onClick={() =>
															handleRoleChange(
																user?.id,
																"admin"
															)
														}
														className="block px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-[#e44d36] hover:text-white"
													>
														Admin
													</p>
													<p
														onClick={() =>
															handleRoleChange(
																user?.id,
																"user"
															)
														}
														className="block px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-[#e44d36] hover:text-white"
													>
														User
													</p>
												</div>
											</div>
										</div>
									</div>
								</td>
								<td className="py-2 px-4 border-b border-gray-200">
									<div className="relative inline-block text-left">
										<div className="group">
											<button
												type="button"
												className={`inline-flex justify-center items-center w-24 px-4 py-2 text-sm font-extrabold text-black ${
													user.status === "ACTIVE"
														? "bg-blue-300"
														: "bg-red-500"
												} hover:bg-gray-500 focus:outline-none focus:bg-gray-700`}
											>
												{user.status}
											</button>
											<div className="absolute z-10 w-24 origin-top-left bg-white divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
												<div>
													<p
														onClick={() =>
															handleStatusChange(
																user?.id,
																"ACTIVE"
															)
														}
														className="block px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-[#e44d36] hover:text-white"
													>
														Active
													</p>
													<p
														onClick={() =>
															handleStatusChange(
																user?.id,
																"DEACTIVE"
															)
														}
														className="block px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-[#e44d36] hover:text-white"
													>
														Deactive
													</p>
												</div>
											</div>
										</div>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={handlePageChange}
			/>
		</div>
	);
};

export default ManageUsers;
