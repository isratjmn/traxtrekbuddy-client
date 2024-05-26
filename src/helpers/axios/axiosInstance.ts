
import { authenKeys } from "@/constant/authenKeys";
import setAccessToken from "@/services/actions/setAccessToken";
import { getNewAccessToken } from "@/services/auth.service";
import { IGenericErrorResponse, ResponseSuccessType } from "@/types/general";
import { getFromLocalStorage, setToLocalStorage } from "@/utilities/local-stroge";

import axios from "axios";

const instance = axios.create();

instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        const accessToken = getFromLocalStorage(authenKeys);
        if (accessToken)
        {
            config.headers.Authorization = accessToken;
        }
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
        ;
    });

// Add a response interceptor
instance.interceptors.response.use(
    // @ts-ignore
    function (response) {

        const responseObject: ResponseSuccessType = {
            data: response?.data?.data,
            meta: response?.data?.meta
        };
        return responseObject;
    },
    async function (error) {

        const config = error.config;
        console.log(config);
        if (error?.response?.status === 500 && !config.sent)
        {
            config.sent = true;
            const response = await getNewAccessToken();
            console.log(response);
            const accessToken = response?.data?.accessToken;
            config.headers["Authorization"] = accessToken;
            setToLocalStorage(authenKeys, accessToken);
            setAccessToken(accessToken);
            return instance(config);
        }
        else
        {

            const responseObject: IGenericErrorResponse = {
                statusCode: error?.response?.data?.statusCode || 500,
                message: error?.response?.data?.message || "Something went wrong !!!",
                errorMessages: error?.response?.data?.message
            };

            return responseObject;
        }

    });

export { instance };