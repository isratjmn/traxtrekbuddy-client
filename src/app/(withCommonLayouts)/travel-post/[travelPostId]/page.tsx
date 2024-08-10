"use client";
import React from "react";
import { FieldValues } from "react-hook-form";
import { useGetTripQuery, useUpdateTripMutation } from "@/redux/api/tripApi";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import TTForms from "@/component/Forms/TTForms";
import TTInput from "@/component/Forms/TTInput";
import TTDatePicker from "@/component/Forms/TTDatePicker";

type TParams = {
	params: {
		travelPostId: string;
	};
};

const EditTripForm = ({ params }: TParams) => {
	const router = useRouter();
	const id = params?.travelPostId;
	const {
		data: getTrip,
		error: errorTips,
		refetch: refetchTrip,
	} = useGetTripQuery(id);

	const [updateTrip, { isLoading: updating }] = useUpdateTripMutation();

	const onSubmit = async (values: FieldValues) => {
		try {
			const updatedValues = {
				...values,
				budget: Number(values.budget),
			};
			const res = await updateTrip({ id, body: updatedValues }).unwrap();
			if (res?.id) {
				toast.success("Profile Updated Successfully....!!");
				refetchTrip();
				router.push("/my-profile");
			}
		} catch (error) {
			console.error("Error updating profile:", error);
		}
	};
	const defaultValues = {
		destination: getTrip?.destination || "",
		description: getTrip?.description || "",
		startDate: getTrip?.startDate || "",
		endDate: getTrip?.endDate || "",
		budget: getTrip?.budget ? Number(getTrip.budget) : 0,
	};

	return (
		<div className="w-full mt-20 item-center">
			<Toaster position="top-center" />
			<div className="w-[100%] rounded-lg mx-auto border p-12 bg-blue-50 shadow-lg max-w-[600px]">
				<h1 className="text-2xl text-teal-500 font-bold mb-6">
					Update Your Trip
				</h1>
				<TTForms onSubmit={onSubmit} defaultValues={defaultValues}>
					<div className="grid grid-cols-1 pt-2 gap-4 mt-2 mb-4">
						<div className="flex">
							<div className="mr-2 w-1/2">
								<TTInput
									name="destination"
									label="Destination"
									type="text"
									fullWidth={true}
								/>
							</div>
							<div className="ml-2 w-1/2">
								<TTInput
									name="description"
									label="Description"
									type="text"
									fullWidth={true}
								/>
							</div>
						</div>
					</div>
					<div className="grid grid-cols-1 pt-2 gap-4 mt-2 mb-4">
						<div className="flex">
							<div className="mr-2 w-1/2">
								<TTDatePicker
									name="startDate"
									label="Start Date"
								/>
							</div>
							<div className="ml-2 w-1/2">
								<TTDatePicker name="endDate" label="End Date" />
							</div>
						</div>
					</div>
					<div className="grid grid-cols-1 pt-2 gap-4 mt-2 mb-4">
						<div className="flex">
							{/* <div className="mr-2 w-1/2">
								<TTInput
									name="location"
									label="Location"
									type="text"
									fullWidth
									required
								/>
							</div> */}
							<div className="mr-2 w-full">
								<TTInput
									name="budget"
									label="Budget"
									type="number"
									fullWidth
								/>
							</div>
						</div>
					</div>

					<button
						className="w-[100%] text-lg py-2 bg-teal-500 text-white rounded mt-2"
						type="submit"
						disabled={updating}
					>
						{updating ? "Updating ..." : "Updated"}
					</button>
				</TTForms>
			</div>
		</div>
	);
};

export default EditTripForm;
