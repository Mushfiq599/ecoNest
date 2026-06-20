import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
    "/",
    "/explore(.*)",
    "/products(.*)",
    "/about",
    "/contact",
    "/blog(.*)",
    "/faq",
    "/login(.*)",
    "/register(.*)",
    "/sso-callback(.*)",
    "/api/auth/webhook(.*)",
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
    if (isPublicRoute(req)) return NextResponse.next();

    const { userId, sessionClaims } = await auth();

    if (!userId) {
        const signInUrl = new URL("/login", req.url);
        signInUrl.searchParams.set("redirect_url", req.url);
        return NextResponse.redirect(signInUrl);
    }

    if (isAdminRoute(req)) {
        const role = (sessionClaims?.metadata as { role?: string } | undefined)?.role;
        if (role !== "admin") {
            return NextResponse.redirect(new URL("/user", req.url));
        }
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        "/(api|trpc)(.*)",
    ],
};