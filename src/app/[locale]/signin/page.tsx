import {getTranslations, setRequestLocale} from "next-intl/server";
import {Link} from "@/i18n/navigation";

type Props = {
  params: Promise<{locale: string}>;
};

export default async function SignIn({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations("auth");

  return (
    <div className="min-h-screen flex justify-center bg-gradient-to-b from-sky-50 to-amber-50">
      <div className="w-full max-w-md bg-transparent flex flex-col px-6 pt-12 pb-10">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-sky-700 grid place-items-center shadow-lg shadow-sky-200">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <rect x="3" y="7" width="18" height="13" rx="2" />
              <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </div>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-zinc-900">
            {t("signinTitle")}
          </h2>
          <p className="mt-2 text-sm text-zinc-500">{t("signinSubtitle")}</p>
        </div>

        <form
          className="mt-8 bg-white rounded-2xl p-5 shadow-sm border border-zinc-100 space-y-5"
          action="#"
        >
          <div>
            <label
              htmlFor="signin-userid"
              className="block text-xs font-semibold text-zinc-700 mb-2"
            >
              {t("userIdLabel")}
            </label>
            <div className="relative">
              <span
                className="absolute inset-y-0 left-3 flex items-center text-zinc-400"
                aria-hidden="true"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21a8 8 0 0 1 16 0" />
                </svg>
              </span>
              <input
                id="signin-userid"
                type="text"
                placeholder={t("userIdPlaceholder")}
                className="w-full rounded-lg border border-zinc-200 bg-zinc-50 pl-10 pr-3 py-2.5 text-sm text-zinc-900 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none"
              />
            </div>
            <p className="text-[11px] text-zinc-400 mt-1.5">{t("userIdHelper")}</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="signin-password"
                className="text-xs font-semibold text-zinc-700"
              >
                {t("passwordLabel")}
              </label>
              <button
                type="button"
                className="text-xs font-medium text-sky-700 hover:text-sky-800"
              >
                {t("forgotPassword")}
              </button>
            </div>
            <div className="relative">
              <span
                className="absolute inset-y-0 left-3 flex items-center text-zinc-400"
                aria-hidden="true"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <rect x="4" y="11" width="16" height="9" rx="2" />
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                </svg>
              </span>
              <input
                id="signin-password"
                type="password"
                defaultValue="••••••••"
                className="w-full rounded-lg border border-zinc-200 bg-zinc-50 pl-10 pr-3 py-2.5 text-sm text-zinc-900 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-semibold text-sm py-3 transition-colors"
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

          <div className="flex items-center gap-3 text-[10px] font-semibold tracking-widest text-zinc-400 uppercase">
            <span className="flex-1 h-px bg-zinc-200" aria-hidden="true" />
            {t("orSecure")}
            <span className="flex-1 h-px bg-zinc-200" aria-hidden="true" />
          </div>

          <button
            type="button"
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 font-semibold text-sm py-3 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              />
            </svg>
            {t("googleSignin")}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500">
          {t("noAccount")}{" "}
          <Link href="/signup" className="font-semibold text-sky-700 hover:text-sky-800">
            {t("signupLink")}
          </Link>
        </p>

        <p className="mt-8 text-center text-[10px] font-semibold tracking-widest text-zinc-400 uppercase">
          {t("globalSupport")}
        </p>
      </div>
    </div>
  );
}
