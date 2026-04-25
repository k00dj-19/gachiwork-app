"use client";

import {useActionState} from "react";
import {useLocale, useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";
import {sendSignInLink} from "./actions";

const initialState = {ok: false} as {ok: boolean; message?: string; email?: string};

export function SignInForm() {
  const locale = useLocale();
  const t = useTranslations("auth");
  const [state, formAction, pending] = useActionState(sendSignInLink, initialState);

  if (state.ok && state.email) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-100 text-center"
      >
        <div className="w-12 h-12 mx-auto rounded-full bg-emerald-50 grid place-items-center text-emerald-700">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M3 7l9 6 9-6" />
          </svg>
        </div>
        <h3 className="mt-4 text-base font-semibold text-zinc-900">
          {t("checkInboxTitle")}
        </h3>
        <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
          {t("checkInboxBody", {email: state.email})}
        </p>
        <form action={formAction} className="mt-5">
          <input type="hidden" name="email" value={state.email} />
          <input type="hidden" name="locale" value={locale} />
          <button
            type="submit"
            disabled={pending}
            className="text-sm font-semibold text-sky-700 hover:text-sky-800 disabled:opacity-50"
          >
            {t("resendLink")}
          </button>
        </form>
      </div>
    );
  }

  const errorKey =
    state.message === "invalid_email" ? t("invalidEmail") : state.message;

  return (
    <form
      action={formAction}
      className="bg-white rounded-2xl p-5 shadow-sm border border-zinc-100 space-y-5"
    >
      <input type="hidden" name="locale" value={locale} />
      <div>
        <label
          htmlFor="signin-email"
          className="block text-xs font-semibold text-zinc-700 mb-2"
        >
          {t("emailLabel")}
        </label>
        <input
          id="signin-email"
          name="email"
          type="email"
          required
          defaultValue={state.email ?? ""}
          placeholder={t("emailPlaceholder")}
          className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm text-zinc-900 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none"
        />
        <p className="text-[11px] text-zinc-400 mt-1.5">{t("emailHelper")}</p>
        {errorKey && (
          <p
            role="alert"
            className="text-[11px] text-red-700 mt-1.5"
          >
            {errorKey}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-sky-700 hover:bg-sky-800 disabled:opacity-60 text-white font-semibold text-sm py-3 transition-colors"
      >
        {t("signinCta")}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </button>

      <p className="text-center text-sm text-zinc-500">
        {t("noAccount")}{" "}
        <Link href="/signup" className="font-semibold text-sky-700 hover:text-sky-800">
          {t("signupLink")}
        </Link>
      </p>
    </form>
  );
}
