"use client";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useGetTripQuery, useUpdateTripMutation } from "@/redux/api/tripApi";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import TTForms from "@/component/Forms/TTForms";
import TTInput from "@/component/Forms/TTInput";
import TTDatePicker from "@/component/Forms/TTDatePicker";
import useUserInfo from "@/hooks/useUserInfo";

type TParams = {
	params: {
		itemId: string;
	};
};

const EditTripForm = ({ params }: TParams) => {
	const router = useRouter();
	const userInfo = useUserInfo();
	const id = params?.itemId;
	const {
		data: getTrip,
		error: errorTips,
		refetch: refetchTrip,
	} = useGetTripQuery(id);
	const [updateTrip, { isLoading: updating }] = useUpdateTripMutation();

	const onSubmit = async (values: FieldValues) => {
		try {
			const res = await updateTrip({ id, body: values }).unwrap();
			if (res?.id) {
				toast.success("Profile Updated Successfully!!!");
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
	};

	return (
		<div className="w-full mt-20 item-center">
			<ToastContainer />
			<div className="w-[100%] rounded-lg mx-auto border p-12 bg-blue-50 shadow-lg max-w-[600px]">
				<h1 className="text-2xl text-teal-500 font-bold mb-6">
					Update Your Trip
				</h1>
				<TTForms
					onSubmit={onSubmit}
					// resolver={zodResolver(passwordValidateSchema)}
					defaultValues={defaultValues}
				>
					<div className="grid grid-cols-1 pt-4 gap-4 mt-2 mb-4">
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
					<div className="grid grid-cols-1 pt-4 gap-4 mt-2 mb-4">
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
