import {getTranslations, setRequestLocale} from "next-intl/server";
import {Link} from "@/i18n/navigation";
import {
  LANGUAGES,
  LANGUAGES_TOP,
  NATIONALITIES,
  REGION_ORDER,
} from "@/lib/regions";

type Props = {
  params: Promise<{locale: string}>;
};

export default async function SignUp({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const tSignup = await getTranslations("signup");
  const tCommon = await getTranslations();

  return (
    <div className="min-h-screen flex justify-center bg-zinc-50">
      <div className="w-full max-w-md bg-white shadow-sm flex flex-col">
        <header className="flex items-center justify-between px-5 py-3 border-b border-zinc-100">
          <Link
            href="/signin"
            aria-label={tCommon("common.back")}
            className="p-1 -ml-1 text-zinc-700 hover:text-zinc-900"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </Link>
          <div className="font-bold text-lg tracking-tight">
            <span className="text-sky-700">{tCommon("brand.gachi")}</span>
            <span className="text-amber-500">{tCommon("brand.work")}</span>
          </div>
          <span className="w-7" aria-hidden="true" />
        </header>

        <main className="px-6 pt-6 pb-12 flex-1">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
              {tSignup("title")}
            </h2>
            <p className="mt-2 text-sm text-zinc-500 leading-relaxed">
              {tSignup("subtitle")}
            </p>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2">
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-sky-50 text-sky-800 text-xs font-semibold border border-sky-100"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M12 2 4 5v6c0 5 3.5 9.4 8 11 4.5-1.6 8-6 8-11V5l-8-3z" />
              </svg>
              {tSignup("togglePrivacy")}
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-zinc-50 text-zinc-600 text-xs font-semibold border border-zinc-200"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <rect x="3" y="7" width="18" height="13" rx="2" />
                <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
              {tSignup("toggleSecure")}
            </button>
          </div>

          <form className="mt-6 space-y-5" action="#">
            <div>
              <label
                htmlFor="signup-nickname"
                className="block text-xs font-semibold text-zinc-700 mb-2"
              >
                {tSignup("nicknameLabel")}
              </label>
              <input
                id="signup-nickname"
                type="text"
                placeholder={tSignup("nicknamePlaceholder")}
                className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm text-zinc-900 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none"
              />
              <p className="text-[11px] text-zinc-400 mt-1.5">
                {tSignup("nicknameHelper")}
              </p>
            </div>

            <div>
              <label
                htmlFor="signup-password"
                className="block text-xs font-semibold text-zinc-700 mb-2"
              >
                {tSignup("passwordLabel")}
              </label>
              <input
                id="signup-password"
                type="password"
                defaultValue="••••••••"
                className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm text-zinc-900 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="signup-nationality"
                className="block text-xs font-semibold text-zinc-700 mb-2"
              >
                {tSignup("nationalityLabel")}
              </label>
              <select
                id="signup-nationality"
                defaultValue=""
                required
                className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm text-zinc-900 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none"
              >
                <option value="" disabled>
                  {tSignup("nationalityPlaceholder")}
                </option>
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

            <div>
              <label
                htmlFor="signup-language"
                className="block text-xs font-semibold text-zinc-700 mb-2"
              >
                {tSignup("languageLabel")}
              </label>
              <select
                id="signup-language"
                defaultValue=""
                required
                className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm text-zinc-900 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none"
              >
                <option value="" disabled>
                  {tSignup("languagePlaceholder")}
                </option>
                {LANGUAGES_TOP.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
                {REGION_ORDER.map((region) => (
                  <optgroup key={region} label={tCommon(`regions.${region}`)}>
                    {LANGUAGES[region].map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <p className="text-[11px] text-zinc-400 mt-1.5">
                {tSignup("languageHelper")}
              </p>
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-semibold text-sm py-3 transition-colors"
            >
              {tSignup("joinCta")}
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
          </form>

          <p className="mt-5 text-center text-sm text-zinc-500">
            {tSignup("haveAccount")}{" "}
            <Link
              href="/signin"
              className="font-semibold text-sky-700 hover:text-sky-800"
            >
              {tSignup("loginLink")}
            </Link>
          </p>

          <div className="mt-6 flex justify-center">
            <span className="text-[10px] font-semibold tracking-widest text-emerald-700 bg-emerald-50 rounded-full px-3 py-1">
              {tSignup("secureBadge")}
            </span>
          </div>

          <p className="mt-3 text-center text-[10px] text-zinc-400 leading-relaxed">
            {tSignup("agreement")}
          </p>
        </main>
      </div>
    </div>
  );
}
