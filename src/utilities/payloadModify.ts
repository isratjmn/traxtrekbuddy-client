import { FieldValues } from "react-hook-form";

export const payloadModify = (values: FieldValues) => {
    const formData = new FormData();
    const data = JSON.stringify(values);

    // Append the JSON string to the FormData object with the key "data"
    formData.append("data", data);

    return formData;
};
