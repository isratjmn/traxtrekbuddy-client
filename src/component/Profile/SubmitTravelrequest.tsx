import React from "react";
import { useGetTravelBuddyQuery } from "@/redux/api/travelBuddyApi";
import { useGetMyProfileQuery } from "@/redux/api/profileApi";
import Spinner from "../Shared/Spinner/Spinner";

const SubmitTravelRequest = () => {
	const { data: getMyProfile, isLoading } = useGetMyProfileQuery({});

	return (
		<div className="container mx-auto mt-10  lg:max-w-8xl">
			<h2 className="text-2xl font-bold mb-6 mt-10 text-teal-600">
				My Travel Request
			</h2>

			{isLoading ? (
				<Spinner />
			) : (
				<div className="overflow-x-auto bg-white shadow-md rounded-sm w-full max-w-full">
					<table className="min-w-full bg-white">
						<thead className="bg-gray-100">
							<tr>
								<th className="py-3 px-4 text-left font-black text-sm text-gray-700 uppercase tracking-wider">
									Destination
								</th>
								<th className="py-3 px-4 text-left font-black text-sm text-gray-700 uppercase tracking-wider">
									Status
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{getMyProfile?.length === 0 ? (
								<tr>
									<td
										colSpan={2}
										className="text-center py-3 px-4 font-extrabold text-lg"
									>
										No Items Found
									</td>
								</tr>
							) : (
								getMyProfile?.buddyRequests?.map(
									(item: any, index: number) => (
										<tr
											key={index}
											className="hover:bg-gray-100"
										>
											<td className="py-3 px-4 whitespace-nowrap">
												{item?.trip?.destination}
											</td>
											<td className="py-3 px-4 whitespace-nowrap">
												{item?.status === "REJECTED" ? (
													<span className="font-semibold text-red-500">
														{item?.status}
													</span>
												) : item?.status ===
												  "APPROVED" ? (
													<span className="font-semibold text-blue-500">
														{item?.status}
													</span>
												) : (
													<span className="text-teal-500 font-bold">
														{item?.status}
													</span>
												)}
											</td>
										</tr>
									)
								)
							)}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default SubmitTravelRequest;
