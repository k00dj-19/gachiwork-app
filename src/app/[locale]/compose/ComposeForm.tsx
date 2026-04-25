"use client";

import {useActionState} from "react";
import {useLocale, useTranslations} from "next-intl";
import {NATIONALITIES, REGION_ORDER} from "@/lib/regions";
import {createPost} from "./actions";

const INDUSTRY_KEYS = ["manufacturing", "agriculture", "construction"] as const;

const initialState = {ok: false} as {ok: boolean; message?: string};

export function ComposeForm() {
  const locale = useLocale();
  const tCompose = useTranslations("compose");
  const tCommon = useTranslations();
  const [state, formAction, pending] = useActionState(createPost, initialState);

  const errorMessage = (() => {
    if (!state.message) return null;
    if (state.message === "title_required") return tCompose("postTitleLabel");
    if (state.message === "body_required") return tCompose("postBodyLabel");
    if (state.message === "not_signed_in") return tCompose("notSignedIn");
    return state.message;
  })();

  return (
    <form id="compose-form" action={formAction} className="space-y-5">
      <input type="hidden" name="locale" value={locale} />

      <div>
        <label
          htmlFor="compose-title"
          className="block text-xs font-semibold text-zinc-700 mb-2"
        >
          {tCompose("postTitleLabel")}
        </label>
        <input
          id="compose-title"
          name="title"
          type="text"
          required
          placeholder={tCompose("postTitlePlaceholder")}
          className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm text-zinc-900 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="compose-body"
          className="block text-xs font-semibold text-zinc-700 mb-2"
        >
          {tCompose("postBodyLabel")}
        </label>
        <textarea
          id="compose-body"
          name="body"
          rows={8}
          required
          placeholder={tCompose("postBodyPlaceholder")}
          className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm text-zinc-900 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none resize-y"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label
            htmlFor="compose-industry"
            className="block text-xs font-semibold text-zinc-700 mb-2"
          >
            {tCompose("industryLabel")}
          </label>
          <select
            id="compose-industry"
            name="industry"
            defaultValue=""
            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm text-zinc-900 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none"
          >
            <option value="">{tCompose("industryLabel")}</option>
            {INDUSTRY_KEYS.map((key) => (
              <option key={key} value={key}>
                {tCommon(`post.tags.${key}`)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="compose-country"
            className="block text-xs font-semibold text-zinc-700 mb-2"
          >
            {tCompose("countryLabel")}
          </label>
          <select
            id="compose-country"
            name="country"
            defaultValue=""
            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm text-zinc-900 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none"
          >
            <option value="">{tCompose("countryLabel")}</option>
            {REGION_ORDER.map((region) => (
              <optgroup key={region} label={tCommon(`regions.${region}`)}>
                {NATIONALITIES[region].map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
      </div>

      <p className="text-[11px] text-zinc-400 leading-relaxed">
        {tCompose("anonymousNotice")}
      </p>

      {errorMessage && (
        <p role="alert" className="text-[11px] text-red-700">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-sky-700 hover:bg-sky-800 disabled:opacity-60 text-white font-semibold text-sm py-3 transition-colors"
      >
        {tCompose("submitCta")}
      </button>
    </form>
  );
}
