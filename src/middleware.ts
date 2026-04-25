import createIntlMiddleware from "next-intl/middleware";
import type {NextRequest} from "next/server";
import {routing} from "./i18n/routing";
import {updateSupabaseSession} from "./lib/supabase/middleware";

const intlMiddleware = createIntlMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const response = intlMiddleware(request);
  return updateSupabaseSession(request, response);
}

export const config = {
  // Skip API routes, /auth (magic-link callback), Next.js internals, and static files.
  matcher: ["/((?!api|_next|_vercel|auth|.*\\..*).*)"],
};
