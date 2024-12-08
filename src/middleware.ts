import { NextRequest, NextResponse } from "next/server";

const authPaths = ["/auth/login"];
const privatePaths = [
  "/profile",
  "/address",
  "/cart",
  "/checkout",
  "/order-summary",
  "/wishlist",
];

export const middleware = (req: NextRequest) => {
  const { pathname } = req.nextUrl;
  const acToken = req.cookies.get("printzy_ac_token")?.value;
  const isAuthPath = authPaths.some((path) => pathname.startsWith(path));
  const isPrivatePath = privatePaths.some((path) => pathname.startsWith(path));
  let url = req.nextUrl.clone();

  if (isAuthPath && !!acToken) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (!acToken && isPrivatePath) {
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/profile",
    "/address",
    "/cart",
    "/checkout",
    "/order-summary",
    "/wishlist",
    "/auth/login",
  ],
};
