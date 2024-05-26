"use client";
import React, { useState } from "react";
import { useGetAllTipsQuery } from "@/redux/api/tripApi";
import { useDebounced } from "@/redux/hooks";
import Image from "next/image";
import Pagination from "@/component/Forms/Pagination";
import Spinner from "@/component/Shared/Spinner/Spinner";
import Link from "next/link";
import CustomSelectField from "@/component/Forms/CustomSelectField";
import CustomTextField from "@/component/Forms/CustomTextField";

const ITEMS_PER_PAGE = 8;

const formatDate = (dateString: string | number | Date) => {
	const date = new Date(dateString);
	return date.toISOString().split("T")[0];
};

const AllTrips = () => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [filter, setFilter] = useState({
		travelType: "",
	});
	const debouncedTerm = useDebounced({ searchQuery: searchTerm, delay: 600 });
	const query: Record<string, any> = {};
	if (debouncedTerm) {
		query["searchTerm"] = debouncedTerm;
	}

	Object.keys(filter).forEach((key) => {
		const typedKey = key as keyof typeof filter;
		if (filter[typedKey]) {
			query[typedKey] = filter[typedKey];
		}
	});

	const { data, isLoading } = useGetAllTipsQuery({ ...query });
	const trips = data?.trips || [];
	const totalTrips = trips.length;
	const totalPages = Math.ceil(totalTrips / ITEMS_PER_PAGE);

	const paginatedTrips = trips.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE
	);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
		console.log({ name, value });
		setFilter({ ...filter, [name]: value });
		console.log({ ...filter }, value);
		setCurrentPage(1);
	};

	const travelTypes = Array.from(
		new Set(trips.map((trip) => trip?.travelType))
	);

	return (
		<div className="container mx-auto mt-24 max-w-screen-xl">
			<div className="mb-4 flex justify-end">
				<CustomTextField
					onChange={(e: any) => setSearchTerm(e.target.value)}
					placeholder="Search trips....."
					size="small"
					value={searchTerm}
					fullWidth
				/>
				<CustomSelectField
					onChange={handleFilterChange}
					name="travelType"
					options={travelTypes}
					placeholder="Select Travel Type"
					value={filter.travelType}
					fullWidth
				/>
			</div>

			{isLoading ? (
				<Spinner />
			) : (
				<>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-10 rounded-3xl">
						{paginatedTrips.map((trip) => (
							<div
								key={trip?.id}
								className="bg-white border border-gray-200 rounded-lg shadow-md flex flex-col"
								style={{ height: "300px" }}
							>
								<div className="overflow-hidden rounded-t-lg">
									{trip?.photos && (
										<Image
											src={trip.photos}
											alt={trip.destination}
											width={150}
											height={200}
											className="object-cover w-full h-full"
										/>
									)}
								</div>
								<div className="px-6 py-3 flex-grow flex flex-col justify-center">
									<div>
										<h3 className="text-2xl flex text-center text-teal-700 mx-auto font-extrabold mb-2">
											{trip.destination}
										</h3>
										<div className="flex justify-between">
											<p className="text-gray-700 mb-1 text-lg">
												<strong>Start Date:</strong>{" "}
												{formatDate(trip.startDate)}
											</p>
											<p className="text-gray-700 mb-1 text-lg">
												<strong>End Date:</strong>{" "}
												{formatDate(trip.endDate)}
											</p>
										</div>
										<p className="text-gray-700 mb-1 text-lg">
											<strong>Travel Type:</strong>{" "}
											{trip.travelType}
										</p>
									</div>
									<div className="flex justify-between items-center">
										<div className="text-gray-700 mb-1"></div>
										<Link href={`/trips/${trip?.id}`}>
											<button className="bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-600 transition-colors duration-300 shadow-md">
												View Details
											</button>
										</Link>
									</div>
								</div>
							</div>
						))}
					</div>
					<div className="mt-10 mb-20">
						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={handlePageChange}
						/>
					</div>
				</>
			)}
		</div>
	);
};

export default AllTrips;
