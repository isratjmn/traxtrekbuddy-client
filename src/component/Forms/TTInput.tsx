/* eslint-disable jsx-a11y/role-has-required-aria-props */
import { Controller, useFormContext } from "react-hook-form";
import { useState, useRef, useEffect } from "react";

type TInputProps = {
	name: string;
	label?: string;
	type?: string;
	size?: "small" | "medium";
	fullWidth: boolean;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	select?: boolean;
	options?: string[];
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
	select,
	options,
}: TInputProps) => {
	const { control } = useFormContext();
	const [isOpen, setIsOpen] = useState(false);
	const selectRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				selectRef.current &&
				!selectRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleOptionClick = (
		option: string,
		selectedOptions: string[],
		onChange: (value: string[]) => void
	) => {
		if (selectedOptions.includes(option)) {
			onChange(selectedOptions.filter((item) => item !== option));
		} else {
			onChange([...selectedOptions, option]);
		}
	};

	const renderSelectedOptions = (selectedOptions: string[]) => {
		if (selectedOptions.length === 0) {
			return `Select ${label}`;
		}
		return selectedOptions.join(", ");
	};

	if (select && options) {
		const isMultiSelect = name === "itinerary";

		return (
			<Controller
				control={control}
				name={name}
				render={({ field }) => (
					<div
						className={`flex flex-col ${
							fullWidth ? "w-full" : "w-auto"
						}`}
					>
						{label && (
							<label
								htmlFor={name}
								className="text-gray-700 font-medium mb-2"
							>
								{label}
								{required && (
									<span className="text-red-500">*</span>
								)}
							</label>
						)}
						<div className="relative" ref={selectRef}>
							<button
								type="button"
								className={`flex appearance-none text-left w-full bg-white border border-gray-300 text-gray-700 py-2 px-2 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 ${
									size === "small" ? "text-sm" : "text-base"
								}`}
								onClick={() => setIsOpen(!isOpen)}
							>
								{isMultiSelect
									? renderSelectedOptions(field.value)
									: field.value || `Select ${label}`}
							</button>
							<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
								<svg
									className="w-5 h-5 text-gray-400"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M10 12a1 1 0 01-.707-.293l-3-3a1 1 0 011.414-1.414L10 9.586l2.293-2.293a1 1 0 011.414 1.414l-3 3A1 1 0 0110 12z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
							{isOpen && (
								<div className="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10">
									<ul
										tabIndex={-1}
										role="listbox"
										className="max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm"
									>
										{options.map((option, index) => (
											<li
												key={index}
												role="option"
												className={`cursor-pointer select-none relative py-2 pl-3 pr-9 text-gray-900 hover:bg-teal-500 hover:text-white ${
													field.value.includes(option)
														? "bg-teal-100"
														: ""
												}`}
												onClick={() =>
													isMultiSelect
														? handleOptionClick(
																option,
																field.value,
																field.onChange
														  )
														: (field.onChange(
																option
														  ),
														  setIsOpen(false))
												}
											>
												<span
													className={`flex truncate ${
														field.value.includes(
															option
														)
															? "font-semibold"
															: "font-normal"
													}`}
												>
													{option}
												</span>
												{field.value.includes(
													option
												) && (
													<span className="absolute inset-y-0 right-0 flex items-center pr-4 text-teal-600">
														<svg
															className="w-5 h-5"
															xmlns="http://www.w3.org/2000/svg"
															viewBox="0 0 20 20"
															fill="currentColor"
														>
															<path
																fillRule="evenodd"
																d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
																clipRule="evenodd"
															/>
														</svg>
													</span>
												)}
											</li>
										))}
									</ul>
								</div>
							)}
						</div>
					</div>
				)}
			/>
		);
	}

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
							className="text-gray-700 font-medium mb-1 flex"
						>
							{label}
							{required && (
								<span className="text-red-500">*</span>
							)}
						</label>
					)}
					<input
						{...field}
						id={name}
						type={type}
						placeholder={placeholder || label}
						required={required}
						disabled={disabled}
						className={`p-2 border border-gray-300 rounded-md ${
							size === "small" ? "text-sm" : "text-base"
						} focus:outline-none focus:ring-2 focus:ring-teal-500 ${
							error ? "border-red-500" : ""
						}`}
					/>
					{error && (
						<span className="flex justify-start text-red-500 text-sm mt-1">
							{error.message}
						</span>
					)}
				</div>
			)}
		/>
	);
};

export default TTInput;
