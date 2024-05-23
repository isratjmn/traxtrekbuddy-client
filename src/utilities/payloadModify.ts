
export const payloadModify = (values: { [key: string]: any; }) => {
    const { confirmPassword, ...rest } = values;
    const data = JSON.stringify(rest);
    const formData = new FormData();
    formData.append("data", data);
    return formData;
};
