import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
	name: string;
	label?: string;
	type?: string;
	size?: "small" | "medium";
	fullWidth: boolean;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
};

const TTInput = ({
	name,
	label,
	type = "text",
	size = "small",
	placeholder,
	required,
	disabled,
	fullWidth,
}: TInputProps) => {
	const { control } = useFormContext();

	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState: { error } }) => (
				<div
					className={`flex flex-col ${
						fullWidth ? "w-full" : "w-auto"
					}`}
				>
					{label && (
						<label
							htmlFor={name}
							className="flex text-gray-700 font-medium mb-1"
						>
							{label}
						</label>
					)}
					<input
						{...field}
						id={name}
						type={type}
						placeholder={placeholder || label}
						required={required}
						disabled={disabled}
						className={`p-2 border border-gray-300 rounded ${
							size === "small" ? "text-sm" : "text-base"
						} ${error ? "border-red-500" : ""}`}
					/>
					{error && (
						<span className="flex  justify-start text-red-500 text-sm mt-1">
							{error.message}
						</span>
					)}
				</div>
			)}
		/>
	);
};

export default TTInput;
