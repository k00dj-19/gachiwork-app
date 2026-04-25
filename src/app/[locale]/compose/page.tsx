import {getTranslations, setRequestLocale} from "next-intl/server";
import {Link} from "@/i18n/navigation";
import {NATIONALITIES, REGION_ORDER} from "@/lib/regions";

const INDUSTRY_KEYS = ["manufacturing", "agriculture", "construction"] as const;

type Props = {
  params: Promise<{locale: string}>;
};

export default async function Compose({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const tCompose = await getTranslations("compose");
  const tCommon = await getTranslations();

  return (
    <div className="min-h-screen flex justify-center bg-zinc-50">
      <div className="w-full max-w-md bg-white shadow-sm flex flex-col">
        <header className="flex items-center justify-between px-5 py-3 border-b border-zinc-100 sticky top-0 bg-white">
          <Link
            href="/"
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
          <h1 className="font-semibold text-zinc-900">{tCompose("title")}</h1>
          <button
            type="submit"
            form="compose-form"
            className="text-sm font-semibold text-sky-700 hover:text-sky-800 px-2 -mr-2"
          >
            {tCompose("submitCta")}
          </button>
        </header>

        <main className="px-5 pt-5 pb-12 flex-1">
          <p className="text-xs text-zinc-500 mb-5 leading-relaxed">
            {tCompose("subtitle")}
          </p>

          <form id="compose-form" className="space-y-5" action="#">
            <div>
              <label
                htmlFor="compose-title"
                className="block text-xs font-semibold text-zinc-700 mb-2"
              >
                {tCompose("postTitleLabel")}
              </label>
              <input
                id="compose-title"
                type="text"
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
                rows={8}
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
                  defaultValue=""
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm text-zinc-900 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none"
                >
                  <option value="" disabled>
                    {tCompose("industryLabel")}
                  </option>
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
                  defaultValue=""
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm text-zinc-900 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none"
                >
                  <option value="" disabled>
                    {tCompose("countryLabel")}
                  </option>
                  {REGION_ORDER.map((region) => (
                    <optgroup
                      key={region}
                      label={tCommon(`regions.${region}`)}
                    >
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
          </form>
        </main>
      </div>
    </div>
  );
}
