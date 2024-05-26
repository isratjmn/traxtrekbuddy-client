import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { authenKeys } from "./constant/authenKeys";

const AuthRoutes = ["/login", "/register"];

const protectedRoutes = [
	"/dashboard/admin",
	"/dashboard/user",
	"/dashboard/admin/manage-trips",
	"/dashboard/admin/manage-users",
	"/dashboard/user/my-trips",
];

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const accessToken = cookies().get(authenKeys)?.value;

	if (!accessToken) {
		if (AuthRoutes.includes(pathname)) {
			return NextResponse.next();
		} else {
			return NextResponse.redirect(new URL("/login", request.url));
		}
	}

	if (!accessToken) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	if (accessToken && protectedRoutes.includes(pathname)) {
		return NextResponse.next();
	}
	let decodedData = null;

	if (accessToken) {
		decodedData = jwtDecode(accessToken) as any;
	}

	const role = decodedData?.role;

	if (role === "admin" && pathname.startsWith("/dashboard/admin")) {
		return NextResponse.next();
	}
	if (role === "user" && pathname.startsWith("/dashboard/user")) {
		return NextResponse.next();
	}

	if (protectedRoutes.includes(pathname)) {
		return NextResponse.next();
	}

	return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
	matcher: [
		// "/login", "/register",
		"/dashboard/admin",
		"/dashboard/user",
		"/dashboard/admin/manage-trips",
		"/dashboard/admin/manage-users",
		"/dashboard/user/my-trips",
	],
};
