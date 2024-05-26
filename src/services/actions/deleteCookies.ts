"use server";
import { cookies } from "next/headers";

export const deleteCookies = (key: string[]) => {
	key.forEach((key) => {
		cookies().delete(key);
	});
};
