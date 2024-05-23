import { USER_ROLE } from "@/constant/roles";
import { ReactNode } from "react";
import { IconType } from "react-icons";

export type IMeta = {
    page: number;
    limit: number;
    total: number;
};

export type Role = keyof typeof USER_ROLE;

export interface DrawerItem {
    title: string;
    path: string;
    parentPath?: string;
    icon?: React.ElementType;
    child?: DrawerItem[];
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