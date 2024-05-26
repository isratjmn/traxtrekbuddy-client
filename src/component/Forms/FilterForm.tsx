"use client";
import { useState } from "react";

const FilterForm: React.FC = () => {
	const [destination, setDestination] = useState<string>("");
	const [startDate, setStartDate] = useState<string>("");
	const [endDate, setEndDate] = useState<string>("");
	const [travelType, setTravelType] = useState<string>("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log({ destination, startDate, endDate, travelType });
	};

	return (
		<div className="flex justify-center items-center">
			<div className="w-full max-w-[1440px] px-4 mx-auto">
				<form
					onSubmit={handleSubmit}
					className="bg-white p-6 rounded-lg shadow-lg flex flex-wrap md:flex-nowrap space-y-4 mx-auto md:space-y-0 md:space-x-4"
				>
					<div className="flex flex-col w-full md:w-1/5">
						<label
							htmlFor="destination"
							className="text-gray-700 mb-2"
						>
							Destination
						</label>
						<input
							type="text"
							id="destination"
							value={destination}
							onChange={(e) => setDestination(e.target.value)}
							className="p-2 border border-gray-300 rounded-md"
							placeholder="Dream Destination"
						/>
					</div>
					<div className="flex flex-col w-full md:w-1/5">
						<label
							htmlFor="startDate"
							className="text-gray-700 mb-2"
						>
							Start Date
						</label>
						<input
							type="date"
							id="startDate"
							value={startDate}
							onChange={(e) => setStartDate(e.target.value)}
							className="p-2 border border-gray-300 rounded-md"
						/>
					</div>
					<div className="flex flex-col w-full md:w-1/5">
						<label htmlFor="endDate" className="text-gray-700 mb-2">
							End Date
						</label>
						<input
							type="date"
							id="endDate"
							value={endDate}
							onChange={(e) => setEndDate(e.target.value)}
							className="p-2 border border-gray-300 rounded-md"
						/>
					</div>
					<div className="flex flex-col w-full md:w-1/5 ">
						<label
							htmlFor="travelType"
							className="text-gray-700 mb-2 "
						>
							Travel Type
						</label>
						<select
							id="travelType"
							value={travelType}
							onChange={(e) => setTravelType(e.target.value)}
							className="p-2 border border-gray-300 py-3 rounded-md"
						>
							<option value="adventure">Adventure</option>
							<option value="leisure">Leisure</option>
							<option value="business">Business</option>
							<option value="family">Family</option>
							<option value="romantic">Romantic</option>
							<option value="cultural">Cultural</option>
							<option value="solo">Solo</option>
							<option value="group">Group</option>
							<option value="backpacking">Backpacking</option>
							<option value="luxury">Luxury</option>
							<option value="budget">Budget</option>
							<option value="educational">Educational</option>
						</select>
					</div>

					<div className="flex w-full md:w-auto mx-auto justify-center space-y-4">
						<button
							type="submit"
							className="bg-green-500 text-white
                         p-3 rounded-md self-end w-full md:w-auto  md:min-w-[150px]"
						>
							Search
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default FilterForm;
