"use client";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useGetTripQuery, useUpdateTripMutation } from "@/redux/api/tripApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import TTForms from "@/component/Forms/TTForms";
import TTInput from "@/component/Forms/TTInput";
import TTDatePicker from "@/component/Forms/TTDatePicker";

type TParams = {
	params: {
		itemId: string;
	};
};

const EditTripForm = ({ params }: TParams) => {
	const router = useRouter();
	const id = params?.itemId;
	const { data: getTrip, error: errorTips } = useGetTripQuery(id);
	const [updateTrip, { isLoading: updating }] = useUpdateTripMutation();

	const onSubmit = async (values: FieldValues) => {
		try {
			const res = await updateTrip({ id, body: values }).unwrap();
			console.log(res);
			if (res?.id) {
				console.log(res);
				toast.success("Profile Updated Successfully!!!");
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
			<div className="w-[100%] rounded-lg mx-auto border p-12 bg-blue-50 shadow-lg max-w-[600px]">
				<h1 className="text-2xl text-green-500 font-bold mb-6">
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
						className="w-[100%] text-lg py-2 bg-green-500 text-white rounded mt-2"
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

/* "use client";
import React, { useEffect } from "react";
import { FieldValues, useForm, FormProvider } from "react-hook-form";
import { useGetTripQuery, useUpdateTripMutation } from "@/redux/api/tripApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import TTForms from "@/component/Forms/TTForms";
import TTInput from "@/component/Forms/TTInput";
import TTDatePicker from "@/component/Forms/TTDatePicker";

type TParams = {
	params: {
		itemId: string;
	};
};

const EditTripForm = ({ params }: TParams) => {
	const router = useRouter();
	const id = params?.itemId;
	const {
		data: getTrip,
		isLoading: isLoadingTrip,
		error: errorTrip,
	} = useGetTripQuery(id);

	const [updateTrip, { isLoading: updating }] = useUpdateTripMutation();

	const methods = useForm({
		defaultValues: {
			destination: "",
			description: "",
			startDate: "",
			endDate: "",
		},
	});

	const { reset } = methods;

	useEffect(() => {
		if (getTrip) {
			reset({
				destination: getTrip.destination,
				description: getTrip.description,
				startDate: getTrip.startDate,
				endDate: getTrip.endDate,
			});
		}
	}, [getTrip, reset]);

	const onSubmit = async (values: FieldValues) => {
		try {
			const res = await updateTrip({ id, body: values }).unwrap();
			if (res?.id) {
				toast.success("Trip Updated Successfully!!!");
				router.push("/my-profile");
			}
		} catch (error) {
			console.error("Error updating trip:", error);
		}
	};

	return (
		<div className="w-full mt-20 item-center">
			<div className="w-[100%] rounded-lg mx-auto border p-12 bg-blue-50 shadow-lg max-w-[600px]">
				<h1 className="text-2xl text-green-500 font-bold mb-6">
					Update Your Trip
				</h1>
				<FormProvider {...methods}>
					<TTForms onSubmit={onSubmit}>
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
									<TTDatePicker
										name="endDate"
										label="End Date"
									/>
								</div>
							</div>
						</div>

						<button
							className="w-[100%] text-lg py-2 bg-green-500 text-white rounded mt-2"
							type="submit"
							disabled={updating}
						>
							{updating ? "Updating ..." : "Update"}
						</button>
					</TTForms>
				</FormProvider>
			</div>
		</div>
	);
};

export default EditTripForm; */
