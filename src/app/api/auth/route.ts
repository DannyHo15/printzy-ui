import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const body = await request.json();
  const accessToken = body.token as string;
  const refreshToken = body.refreshToken as string;
  if (!accessToken || !refreshToken) {
    return new Response("No token provided", { status: 400 });
  }
  setTokenIntoCookie("printzy_ac_token", accessToken);
  setTokenIntoCookie("printzy_refresh_token", refreshToken);
  return new NextResponse(JSON.stringify({ accessToken, refreshToken }), {
    status: 200,
  });
}

const setTokenIntoCookie = (name: string, token: string, path = "/") => {
  const cookieStore = cookies();
  cookieStore.set({
    name,
    value: token,
    path,
    httpOnly: true,
    secure: true,
  });
};
