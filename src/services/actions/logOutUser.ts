import { authenKeys } from "@/constant/authenKeys";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { deleteCookies } from "./deleteCookies";

export const logoutUser = (router: AppRouterInstance) => {
	localStorage.removeItem(authenKeys);
	deleteCookies([authenKeys, "logout"]);
	router.push("/");
	router.refresh();
};
