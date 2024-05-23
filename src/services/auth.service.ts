
import { authenKeys } from "@/constant/authenKeys";
import { instance as axiosInstance } from "@/helpers/axios/axiosInstance";
import { decordedToken } from "@/utilities/jwtDecode";
import { getFromLocalStorage, removeFromLocalStorage, setToLocalStorage } from "@/utilities/local-stroge";


export const storeUserInfo = ({ accessToken }: { accessToken: string; }) => {
    return setToLocalStorage(authenKeys, accessToken);
};

export const getUserInfo = () => {
    const authToken = getFromLocalStorage(authenKeys);
    if (authToken)
    {
        const decordedData: any = decordedToken(authToken);
        return {
            ...decordedData,
            role: decordedData?.role
        };
    }
};

export const isLoggedIn = () => {
    const authToken = getFromLocalStorage(authenKeys);
    if (authToken)
    {
        return !!authToken;
    }

};

export const removeUser = () => {
    return removeFromLocalStorage(authenKeys);
};


export const getNewAccessToken = async () => {

    return await axiosInstance({
        url: "http://localhost:5000/api/refresh-token",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        withCredentials: true
    });
};