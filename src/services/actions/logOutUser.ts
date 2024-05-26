import { authenKeys } from "@/constant/authenKeys";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const logoutUser = (router: AppRouterInstance) => {
	localStorage.removeItem(authenKeys);
	router.push("/");
	router.refresh();
};
