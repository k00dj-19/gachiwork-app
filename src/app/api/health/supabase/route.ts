import {NextResponse} from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

  // Note: this public probe only checks the browser-safe vars. The service-role
  // key is verified by a separate admin-gated probe (added later) so this file
  // never imports it and stays out of the CI key-leak guard's path.
  const env = {
    url_set: Boolean(url),
    anon_set: Boolean(anon),
  };

  if (!env.url_set || !env.anon_set) {
    return NextResponse.json(
      {ok: false, reason: "missing_env", env},
      {status: 500},
    );
  }

  // Verify the URL is shaped like a Supabase URL and the project responds.
  // We hit /auth/v1/health which is a public health endpoint Supabase exposes.
  try {
    const projectHost = new URL(url).host;
    const isSupabase = projectHost.endsWith(".supabase.co");
    const ping = await fetch(`${url}/auth/v1/health`, {
      method: "GET",
      headers: {apikey: anon},
      cache: "no-store",
    });

    return NextResponse.json({
      ok: ping.ok && isSupabase,
      env,
      url_host: projectHost,
      is_supabase_host: isSupabase,
      auth_status: ping.status,
    });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        reason: "fetch_failed",
        message: err instanceof Error ? err.message : String(err),
        env,
      },
      {status: 500},
    );
  }
}
