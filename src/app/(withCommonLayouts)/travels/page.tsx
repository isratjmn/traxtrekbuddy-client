"use client";
import TTDatePicker from "@/component/Forms/TTDatePicker";
import TTForms from "@/component/Forms/TTForms";
import TTInput from "@/component/Forms/TTInput";
import { useCreateTripMutation } from "@/redux/api/tripApi";
import { getUserInfo } from "@/services/auth.service";
import { payloadModify } from "@/utilities/payloadModify";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultValues = {
	destination: "",
	description: "",
	startDate: "",
	endDate: "",
	travelType: "",
	itinerary: "",
	location: "",
};

const TravelPostForm = () => {
	const [createTrip, { isLoading: isLoadingTrip }] = useCreateTripMutation();

	const methods = useForm({ defaultValues });
	const { handleSubmit, reset } = methods;
	const [error, setError] = useState<string>("");
	const [user, setUser] = useState<any>(null);

	useEffect(() => {
		const userInfo = getUserInfo();
		setUser(userInfo);
	}, []);

	const onSubmit = async (values: FieldValues) => {
		if (!user) {
			setError("User not authenticated...!");
			return;
		}

		const data = payloadModify(values);

		try {
			const res = await createTrip(data).unwrap();
			reset(defaultValues);

			if (res?.id) {
				toast.success("Travel created successfully.....!");
				reset(defaultValues);
			}
		} catch (error) {
			console.error("Error creating trip:", error);
			toast.error("Error creating trip. Please try again.");
		}
	};
	return (
		<div className="bg-gray-100 mt-24 px-16 py-16 max-w-[800px] mx-auto">
			<ToastContainer />
			<h2 className="text-2xl font-bold mt-6 mb-6 text-green-600">
				Create Travel
			</h2>
			<TTForms onSubmit={onSubmit} defaultValues={defaultValues}>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<TTInput
						name="destination"
						label="Destination"
						fullWidth
						required
					/>
					<TTInput
						name="description"
						label="Detailed Description"
						type="text"
						fullWidth
						required
					/>
					<TTDatePicker name="startDate" label="Start Date" />

					<TTDatePicker name="endDate" label="End Date" />

					<TTInput
						name="travelType"
						label="Travel Type"
						type="text"
						fullWidth
						required
					/>
					<TTInput
						name="itinerary"
						label="Itinerary"
						type="text"
						fullWidth
						required
					/>
					<div className="col-span-1 md:col-span-2">
						<TTInput
							name="location"
							label="Location"
							type="text"
							fullWidth
							required
						/>
					</div>
				</div>
				<button
					type="submit"
					className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-4 w-full"
				>
					{isLoadingTrip ? "Submitting..." : "Submit"}
				</button>
			</TTForms>
		</div>
	);
};

export default TravelPostForm;
