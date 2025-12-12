import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

const protectedRoutes = ["/", "/transactions", "/budgets", "/pots", "/bills"];

export async function updateSession(request) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value }) => {
            supabaseResponse.cookies.set(name, value);
          });
        },
      },
    },
  );

  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  const isProtected = protectedRoutes.some((route) => {
    if (route === "/") {
      return request.nextUrl.pathname === "/";
    }
    return request.nextUrl.pathname.startsWith(route);
  });

  // Redirect if not logged in
  if (!user && isProtected) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
