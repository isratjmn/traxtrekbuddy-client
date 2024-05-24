import { ROLE } from "@/constant/roles";

export type IMeta = {
	page: number;
	limit: number;
	total: number;
};

export type Role = keyof typeof ROLE;

export interface DrawerItem {
	title: string;
	path: string;
	parentPath?: string;
	icon?: React.ElementType;
	child?: DrawerItem[];
}

export interface IRegister {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export type ResponseSuccessType = {
	data?: any;
	meta?: IMeta;
};

export interface IGenericErrorResponse {
	statusCode: number;
	message: string;
	errorMessages: IGenericErrorMessage[];
}

export interface IGenericErrorMessage {
	path: string | number;
	message: string;
}
