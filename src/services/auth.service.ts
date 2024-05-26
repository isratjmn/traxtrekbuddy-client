import { authenKeys } from "@/constant/authenKeys";
import { decordedToken } from "@/utilities/jwtDecode";

import {
	getFromLocalStorage,
	removeFromLocalStorage,
	setToLocalStorage,
} from "@/utilities/local-stroge";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
	return setToLocalStorage(authenKeys, accessToken);
};

export const getUserInfo = () => {
	const authToken = getFromLocalStorage(authenKeys);
	if (authToken) {
		const decordedData: any = decordedToken(authToken);
		return {
			...decordedData,
			role: decordedData?.role.toLowerCase(),
		};
	}
};

export const isLoggedIn = () => {
	const authToken = getFromLocalStorage(authenKeys);
	if (authToken) {
		return !!authToken;
	}
};

export const removeUser = () => {
	return removeFromLocalStorage(authenKeys);
};
