import React from "react";

const CustomSelectField = ({
	size,
	label,
	disabled,
	value,
	onChange,
	options,
	placeholder,
	fullWidth,
}: any) => {
	return (
		<div className={`relative ${fullWidth ? "w-[70%]" : "w-auto"} mb-4`}>
			<label className="block text-sm font-medium text-gray-700 mb-1">
				{label}
			</label>
			<select
				name={label}
				disabled={disabled}
				value={value}
				onChange={onChange}
				className={`block w-[50%] p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-800 ${
					size === "medium" ? "text-sm" : "text-[17px]"
				} transition-colors duration-300`}
			>
				<option value="">{placeholder}</option>
				{options.map((option: string) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
		</div>
	);
};

export default CustomSelectField;
