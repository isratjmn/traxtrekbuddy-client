import { jwtDecode } from "jwt-decode";

export const decordedToken = (token: string) => {
    try
    {
        const decodedFromToken = jwtDecode(token);
        return decodedFromToken;
    } catch (error)
    {
        console.error("Invalid token", error);
        return null;
    }
};
