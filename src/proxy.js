import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const privateRoutes = {
  user: ["/booking/", "/payment", "/my-bookings"],
  admin: ["/dashboard", "/booking"],
};

export async function proxy(req) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;
  const isUser = token?.role?.toLowerCase() === "user";
  const isAdmin = token?.role?.toLowerCase() === "admin";
  const isAUthorized = Boolean(token);
  const isUserPrivateRoute = privateRoutes.user.some((r) =>
    pathname.startsWith(r)
  );
  const isAdminPrivateRoute = privateRoutes.admin.some((r) => {
    if (r === "/booking") {
      return pathname === "/booking";
    }
    return pathname.startsWith(r);
  });
  if (!isAUthorized && !isUser && isUserPrivateRoute) {
    return NextResponse.redirect(
      new URL(`/auth/login?callbackUrl=${pathname}`, req.url)
    );
  }
  if (!isAUthorized && !isAdmin && isAdminPrivateRoute) {
    return NextResponse.redirect(new URL(`/`, req.url));
  }
  if (isAUthorized && !isAdmin && isAdminPrivateRoute) {
    return NextResponse.redirect(new URL(`/`, req.url));
  }
  if (isAUthorized && !isUser && isUserPrivateRoute) {
    return NextResponse.redirect(new URL(`/`, req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/booking/:path*",
    "/payment/:path*",
    "/my-bookings/:path*",
  ],
};
