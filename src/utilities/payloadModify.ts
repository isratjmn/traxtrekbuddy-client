import { FieldValues } from "react-hook-form";

export const payloadModify = (values: FieldValues) => {
	const formData = new FormData();
	const data = JSON.stringify(values);
	formData.append("data", data);

	return formData;
};
