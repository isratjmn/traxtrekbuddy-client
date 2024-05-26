
import { useEffect, useState } from 'react';

import { JwtPayload } from 'jwt-decode';
import { getFromLocalStorage } from '@/utilities/local-stroge';
import { authenKeys } from '@/constant/authenKeys';
import { decordedToken } from '@/utilities/jwtDecode';

const useUserInfo = (): any | string => {
    const [userInfo, setUserInfo] = useState<any | string>('');

    useEffect(() => {
        const fetchUserInfo = () => {
            const authToken = getFromLocalStorage(authenKeys);
            if (authToken)
            {
                const decodedData: JwtPayload & { role: any; } = decordedToken(
                    authToken
                ) as JwtPayload & {
                    role: any;
                };
                const userInfo: any = {
                    ...decodedData,
                    role: decodedData?.role?.toLowerCase() || '',
                };
                setUserInfo(userInfo);
            } else
            {
                setUserInfo('');
            }
        };

        fetchUserInfo();
    }, []);

    return userInfo;
};

export default useUserInfo;

