import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();
  const force = body.force as boolean | undefined;
  if (force) {
    clearToken();
    return new Response("Logout successful", {
      status: 200,
    });
  }
}

const clearToken = () => {
  const cookieStore = cookies();
  cookieStore.delete("printzy_ac_token");
  cookieStore.delete("printzy_refresh_token");
};
