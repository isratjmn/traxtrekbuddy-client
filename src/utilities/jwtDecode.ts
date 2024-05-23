import { jwtDecode } from "jwt-decode";

export const decordedToken = (token: string) => {
    return jwtDecode(token);
};