import {createServerClient} from "@supabase/ssr";
import {NextResponse, type NextRequest} from "next/server";

/**
 * Refreshes the Supabase auth session cookie on every request that hits the
 * Next.js middleware. Returns a NextResponse with cookies updated; the caller
 * is expected to merge any additional cookies it sets into this response.
 */
export async function updateSupabaseSession(
  request: NextRequest,
  response: NextResponse,
) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({name, value, options}) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  // Touch the session so cookies refresh if needed.
  await supabase.auth.getUser();

  return response;
}
