"use client";
import * as React from "react";
import { FaUpload } from "react-icons/fa";

type TFileUploadButton = {
	name: string;
	label?: string;
	accept?: string;
	icon?: React.ReactElement;
	onFileUpload: (file: File) => void;
};

const ProfileFileUploader = ({
	label,
	icon,
	accept,
	onFileUpload,
}: TFileUploadButton) => {
	return (
		<div className={`flex items-center w-full`}>
			<label
				className={`relative w-full inline-flex items-center justify-center px-4 py-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500
				}`}
			>
				{icon ? icon : <FaUpload className="h-5 w-5 mr-2" />}
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
