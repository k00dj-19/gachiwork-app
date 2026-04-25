"use server";

import {headers} from "next/headers";
import {createSupabaseServerClient} from "@/lib/supabase/server";
import {routing} from "@/i18n/routing";

type State = {ok: boolean; message?: string; email?: string};

export async function sendSignInLink(
  _prev: State,
  formData: FormData,
): Promise<State> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const localeRaw = String(formData.get("locale") ?? "ko");
  const locale = (routing.locales as readonly string[]).includes(localeRaw)
    ? localeRaw
    : routing.defaultLocale;

  if (!email || !email.includes("@")) {
    return {ok: false, message: "invalid_email", email};
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
      shouldCreateUser: false,
    },
  });

  if (error) {
    return {ok: false, message: error.message, email};
  }
  return {ok: true, email};
}
