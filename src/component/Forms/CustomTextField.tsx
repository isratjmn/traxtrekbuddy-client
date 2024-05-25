import React from "react";

const CustomTextField = ({
	onChange,
	placeholder,
	size,
	value,
	fullWidth,

	width,
}: any) => {
	return (
		<div
			className={`relative ${
				fullWidth ? "w-[70%]" : width ? width : "w-auto"
			} mb-10`}
		>
			<input
				type="text"
				onChange={onChange}
				placeholder={placeholder}
				value={value}
				className={`block w-[80%] lg:w-[50%] p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-800 ${
					size === "medium" ? "text-sm" : "text-[17px]"
				} transition-colors duration-300`}
			/>
		</div>
	);
};

export default CustomTextField;
