"use server";
import { authenKeys } from '@/constant/authenKeys';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const setAccessToken = (token: string, option?: any) => {
    cookies().set(authenKeys, token);
    if (option && option.redirect)
    {
        redirect(option.redirect);
    }
};

export default setAccessToken;