"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useGetAllTipsQuery } from "@/redux/api/tripApi";
import { useDebounced } from "@/redux/hooks";
import Image from "next/image";
import Pagination from "@/component/Forms/Pagination";
import Spinner from "@/component/Shared/Spinner/Spinner";
import Link from "next/link";

const ITEMS_PER_PAGE = 9;

const formatDate = (dateString: string | number | Date) => {
	const date = new Date(dateString);
	return date.toISOString().split("T")[0];
};

const filters = [
	{
		label: "Travel Type",
		options: [
			"Nature and Adventure",
			"Relaxation",
			"Cultural",
			"Business",
			"Historical",
			"Adventure and Trekking",
			"Sailing",
			"Wildlife",
		],
		key: "travelType",
	},
	{
		label: "Location",
		options: [
			"Cairo, Luxor, Aswan, Egypt",
			"Rome, Italy",
			"Machu Picchu, Peru",
			"Egypt",
		],
		key: "location",
	},
	{
		label: "Destination",
		options: [
			"Japan",
			"Egypt",
			"Croatia",
			"Norway",
			"Greece",
			"Italy",
			"Nepal",
			"Tarangire National Park, Tanzania",
			"Historical Tour of Rome",
		],
		key: "destination",
	},
];

type FilterKeys = "travelType" | "location" | "destination";
type SelectedFilters = {
	[key in FilterKeys]?: string;
};

const AllTrips = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({});
	const [showClearAll, setShowClearAll] = useState(false);

	const debouncedTerm = useDebounced({ searchQuery: searchTerm, delay: 600 });

	useEffect(() => {
		setShowClearAll(Object.keys(selectedFilters).length > 0);
	}, [selectedFilters]);

	const handleFilterChange = (key: FilterKeys, value: string) => {
		setSelectedFilters((prevFilters) => ({
			...prevFilters,
			[key]: value,
		}));
	};

	const handleClearFilter = (key: FilterKeys) => {
		setSelectedFilters((prevFilters) => {
			const newFilters = { ...prevFilters };
			delete newFilters[key];
			return newFilters;
		});
	};

	const handleClearAllFilters = () => {
		setSelectedFilters({});
	};

	const query = useMemo(() => {
		const queryParams: { [key: string]: string } = {};
		if (debouncedTerm) queryParams["searchTerm"] = debouncedTerm;
		Object.keys(selectedFilters).forEach((key) => {
			const filterKey = key as FilterKeys;
			if (selectedFilters[filterKey])
				queryParams[filterKey] = selectedFilters[filterKey]!;
		});
		return queryParams;
	}, [debouncedTerm, selectedFilters]);

	const { data, isLoading } = useGetAllTipsQuery(query);
	const trips = data?.trips || [];

	const totalTrips = trips.length;
	const totalPages = Math.ceil(totalTrips / ITEMS_PER_PAGE);

	const paginatedTrips = trips.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE
	);

	const handlePageChange = (page: React.SetStateAction<number>) => {
		setCurrentPage(page);
	};

	return (
		<div className="container mx-auto mt-24 max-w-screen-xl">
			<div className="my-8 flex justify-center space-x-4">
				<input
					type="text"
					placeholder="Search trips....."
					className="border-2 border-purple-700 rounded p-2"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				{filters.map((filter, index) => (
					<div key={index} className="relative">
						<select
							value={
								selectedFilters[filter.key as FilterKeys] || ""
							}
							onChange={(e) =>
								handleFilterChange(
									filter.key as FilterKeys,
									e.target.value
								)
							}
							className="border-2 border-purple-700 rounded p-2"
						>
							<option value="">{filter.label}</option>
							{filter.options.map((option, idx) => (
								<option key={idx} value={option}>
									{option}
								</option>
							))}
						</select>
						{selectedFilters[filter.key as FilterKeys] && (
							<button
								onClick={() =>
									handleClearFilter(filter.key as FilterKeys)
								}
								className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
							></button>
						)}
					</div>
				))}
			</div>

			{isLoading ? (
				<Spinner />
			) : (
				<>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 rounded-3xl">
						{paginatedTrips.map((trip) => (
							<div
								key={trip?.id}
								className="bg-white border border-gray-200 rounded-lg shadow-md flex flex-col"
								style={{ height: "400px" }}
							>
								<div className="overflow-hidden rounded-t-lg">
									{trip?.photos && (
										<Image
											src={trip.photos}
											alt={trip.destination}
											width={150}
											height={300}
											className="object-cover w-full h-full"
										/>
									)}
								</div>
								<div className="px-6 py-3 flex-grow flex flex-col justify-center">
									<div>
										<h3 className="text-2xl flex text-left text-teal-700 mx-auto font-extrabold mb-2">
											{trip.destination}
										</h3>
										<div className="flex justify-between">
											<p className="text-gray-700 mb-1 text-lg">
												<strong>Start Date: </strong>{" "}
												{formatDate(trip.startDate)}
											</p>
											<p className="text-gray-700 mb-1 text-lg">
												<strong>End Date: </strong>{" "}
												{formatDate(trip.endDate)}
											</p>
										</div>
										<p className="text-gray-700 mb-1 text-lg">
											<strong>Travel Type: </strong>{" "}
											{trip.travelType}
										</p>
										<p className="text-gray-700 mb-1 text-lg">
											<strong>Location: </strong>
											{trip.location}
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
