"use server";

import {headers} from "next/headers";
import {createSupabaseServerClient} from "@/lib/supabase/server";
import {routing} from "@/i18n/routing";

type State = {ok: boolean; message?: string; email?: string};

export async function sendSignUpLink(
  _prev: State,
  formData: FormData,
): Promise<State> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const displayName = String(formData.get("display_name") ?? "").trim();
  const localeRaw = String(formData.get("locale") ?? "ko");
  const locale = (routing.locales as readonly string[]).includes(localeRaw)
    ? localeRaw
    : routing.defaultLocale;

  if (!email || !email.includes("@")) {
    return {ok: false, message: "invalid_email", email};
  }
  if (!displayName) {
    return {ok: false, message: "missing_display_name", email};
  }

  const headerList = await headers();
  const origin =
    headerList.get("origin") ??
    (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000");

  const supabase = await createSupabaseServerClient();
  const {error} = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${origin}/auth/callback?next=/${locale}`,
      shouldCreateUser: true,
      data: {
        display_name: displayName,
        locale,
      },
    },
  });

  if (error) {
    return {ok: false, message: error.message, email};
  }
  return {ok: true, email};
}
