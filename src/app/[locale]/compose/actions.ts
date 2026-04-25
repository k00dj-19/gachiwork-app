"use server";

import {redirect} from "next/navigation";
import {createSupabaseServerClient} from "@/lib/supabase/server";
import {routing} from "@/i18n/routing";

type State = {ok: boolean; message?: string};

export async function createPost(
  _prev: State,
  formData: FormData,
): Promise<State> {
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const industry = String(formData.get("industry") ?? "").trim() || null;
  const country = String(formData.get("country") ?? "").trim() || null;
  const localeRaw = String(formData.get("locale") ?? "ko");
  const locale = (routing.locales as readonly string[]).includes(localeRaw)
    ? localeRaw
    : routing.defaultLocale;

  if (!title) return {ok: false, message: "title_required"};
  if (!body) return {ok: false, message: "body_required"};

  const supabase = await createSupabaseServerClient();
  const {
    data: {user},
  } = await supabase.auth.getUser();

  if (!user) {
    return {ok: false, message: "not_signed_in"};
  }

  const {error} = await supabase.from("posts").insert({
    author_id: user.id,
    locale,
    title,
    body,
    industry,
    country,
  });

  if (error) {
    return {ok: false, message: error.message};
  }

  redirect(`/${locale}`);
}
