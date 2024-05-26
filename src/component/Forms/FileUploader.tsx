import { AiOutlineCloudUpload } from "react-icons/ai";
import React, { ReactNode } from "react";

interface IFileUploadButton {
	name: string;
	label?: string;
	className?: any;
	style?: React.CSSProperties;
	accept?: string;
	icon?: ReactNode;
	onFileUpload: (file: File) => void;
}

const FileUploader = ({
	name,
	label,
	accept,

	onFileUpload,
}: IFileUploadButton) => {
	return (
		<label className="cursor-pointer">
			<span className="flex items-center space-x-2 py-2 px-4 bg-teal-500 text-white rounded-md">
				<AiOutlineCloudUpload className="w-5 h-5" />
				<span>{label || "Upload file"}</span>
			</span>
			<input
				type="file"
				name={name}
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
	);
};

export default FileUploader;
