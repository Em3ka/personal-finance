import { updateSession } from "./lib/supabase/middleware";

export default async function proxy(req) {
  return updateSession(req);
}

// Routes Proxy should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
