"use client";
import * as React from "react";
import { FaUpload } from "react-icons/fa";

type TFileUploadButton = {
	name: string;
	label?: string;
	accept?: string;
	sx?: string;
	icon?: React.ReactElement;
	variant?: "contained" | "text";
	onFileUpload: (file: File) => void;
};

const ProfileFileUploader = ({
	name,
	label,
	sx = "",
	icon,
	accept,
	variant = "contained",
	onFileUpload,
}: TFileUploadButton) => {
	return (
		<div className={`flex items-center w-full`}>
			<label
				className={`relative w-full inline-flex items-center justify-center px-4 py-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
					variant === "text" ? " text-green-600" : ""
				}`}
			>
				{icon ? icon : <FaUpload className="h-5 w-5 mr-6 pl-7" />}
				{label || "Upload file"}
				<input
					type="file"
					accept={accept}
					className="hidden"
					onChange={(e) => {
						const fileInput = e.target as HTMLInputElement;
						const file = fileInput.files?.[0];
						if (file) {
							onFileUpload(file);
						}
					}}
				/>
			</label>
		</div>
	);
};

export default ProfileFileUploader;
