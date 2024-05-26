import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const AuthRoutes = ["/login", "/register"];

const commonPrivateRoutes = ["/dashboard/change-password"];

const publicRoutes = ["/", "/about"];

const protectedRoutes = [
	"/dashboard/admin",
	"/dashboard/user",
	"/dashboard/admin/manage-trips",
	"/dashboard/admin/manage-users",
	"/dashboard/user/my-trips",
];

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const accessToken = cookies().get("accessToken")?.value;

	if (!accessToken) {
		// Allow access to public routes and auth routes
		if (publicRoutes.includes(pathname) || AuthRoutes.includes(pathname)) {
			return NextResponse.next();
		} else {
			return NextResponse.redirect(new URL("/login", request.url));
		}
	}

	/* 	if (!accessToken) {
		if (AuthRoutes.includes(pathname)) {
			return NextResponse.next();
		} else {
			return NextResponse.redirect(new URL("/login", request.url));
		}
	} */

	let decodedData = null;
	try {
		decodedData = jwtDecode(accessToken) as any;
	} catch (error) {
		return NextResponse.redirect(new URL("/login", request.url));
	}
	const role = decodedData?.role;
	if (
		protectedRoutes.includes(pathname) ||
		commonPrivateRoutes.some((route) => pathname.startsWith(route))
	) {
		if (role === "admin" && pathname.startsWith("/dashboard/admin")) {
			return NextResponse.next();
		}
		if (role === "user" && pathname.startsWith("/dashboard/user")) {
			return NextResponse.next();
		}
		if (!role) {
			return NextResponse.redirect(new URL("/login", request.url));
		}
		return NextResponse.redirect(new URL("/", request.url));
	}

	return NextResponse.next();

	/* 	const { pathname } = request.nextUrl;
	const accessToken = cookies().get("accessToken")?.value;
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
	if (
		accessToken &&
		(commonPrivateRoutes.includes(pathname) ||
			commonPrivateRoutes.some((route) => pathname.startsWith(route)))
	) {
		return NextResponse.next();
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
	return NextResponse.redirect(new URL("/", request.url)); */
}

/* export const config = {
	matcher: [
		"/login",
		"/register",
		"/dashboard/:page*",
		"/travels",
		"/trips",
		"/trips/edit",
		"/my-profile",
		// "/profile",
		// "/travel-post",
	],
}; */

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
