import React from "react";
import { UseFormRegister } from "react-hook-form";
import { FaChevronDown } from "react-icons/fa"; // Make sure to install react-icons

interface TTSelectProps {
	name: string;
	label: string;
	options: string[];
	register: UseFormRegister<any>;
	required?: boolean;
	isMulti?: boolean;
}

const TTSelect: React.FC<TTSelectProps> = ({
	name,
	label,
	options,
	register,
	required,
	isMulti 
}) => {
	return (
		<div className="mb-4 relative">
			<label
				className="block text-gray-700 text-sm font-bold mb-2"
				htmlFor={name}
			>
				{label}
			</label>
			<div className="relative">
				<select
					id={name}
					{...register(name, { required })}
					className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
				>
					<option value="">Select {label}</option>
					{options.map((option) => (
						<option key={option} value={option}>
							{option}
						</option>
					))}
				</select>
				<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
					<FaChevronDown />
				</div>
			</div>
		</div>
	);
};

export default TTSelect;
