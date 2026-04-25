import {getTranslations, setRequestLocale} from "next-intl/server";
import {Link} from "@/i18n/navigation";
import {LanguageSwitcher} from "@/components/LanguageSwitcher";

type Tone = "blue" | "green" | "orange" | "purple" | "red" | "pink";

type Post = {
  id: string;
  industryKey: "manufacturing" | "agriculture" | "construction";
  industryTone: Tone;
  countryKey: "vietnam" | "nepal" | "cambodia";
  countryTone: Tone;
  timeKey: "minutes" | "hours";
  timeCount: number;
  titleKey: "p1" | "p2" | "p3";
  author: string;
  authorInitial: string;
  comments: number;
  hearts: number;
};

const POSTS: Post[] = [
  {
    id: "p1",
    industryKey: "manufacturing",
    industryTone: "blue",
    countryKey: "vietnam",
    countryTone: "green",
    timeKey: "minutes",
    timeCount: 12,
    titleKey: "p1",
    author: "User_992",
    authorInitial: "U",
    comments: 14,
    hearts: 5,
  },
  {
    id: "p2",
    industryKey: "agriculture",
    industryTone: "orange",
    countryKey: "nepal",
    countryTone: "red",
    timeKey: "hours",
    timeCount: 2,
    titleKey: "p2",
    author: "User_01532",
    authorInitial: "L",
    comments: 3,
    hearts: 2,
  },
  {
    id: "p3",
    industryKey: "construction",
    industryTone: "purple",
    countryKey: "cambodia",
    countryTone: "pink",
    timeKey: "hours",
    timeCount: 5,
    titleKey: "p3",
    author: "User_841",
    authorInitial: "A",
    comments: 7,
    hearts: 11,
  },
];

const TONE_CLASSES: Record<Tone, string> = {
  blue: "bg-blue-50 text-blue-700",
  green: "bg-emerald-50 text-emerald-700",
  orange: "bg-amber-50 text-amber-700",
  purple: "bg-purple-50 text-purple-700",
  red: "bg-red-50 text-red-800",
  pink: "bg-pink-50 text-pink-800",
};

type Props = {
  params: Promise<{locale: string}>;
};

export default async function Home({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <div className="min-h-screen bg-zinc-50 flex justify-center">
      <div className="w-full max-w-md bg-white shadow-sm flex flex-col">
        <header className="flex items-center justify-between px-5 py-4 border-b border-zinc-100">
          <button className="p-1 -ml-1 text-zinc-700" aria-label={t("nav.menu")}>
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
          <div className="font-bold text-lg tracking-tight">
            <span className="text-sky-700">{t("brand.gachi")}</span>
            <span className="text-amber-500">{t("brand.work")}</span>
          </div>
          <LanguageSwitcher />
        </header>

        <section className="px-5 pt-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-500 to-sky-700 text-white grid place-items-center font-semibold">
              MZ
            </div>
            <div>
              <div className="font-semibold text-zinc-900">{t("brand.name")}</div>
              <span className="inline-block text-[10px] font-bold tracking-wide text-emerald-700 bg-emerald-50 rounded-full px-2 py-0.5 mt-1">
                {t("home.verifiedBadge")}
              </span>
            </div>
          </div>
          <h1 className="mt-5 text-2xl font-bold tracking-tight text-zinc-900">
            {t("home.greeting", {name: "User_042"})}
          </h1>
          <p className="text-sm text-zinc-500 mt-1">{t("home.subgreeting")}</p>
        </section>

        <nav className="px-5 mb-3">
          <div className="flex gap-2 bg-zinc-100 p-1 rounded-xl">
            <button className="flex-1 py-2 px-3 rounded-lg bg-white text-sm font-medium text-zinc-900 shadow-sm">
              {t("home.tabFollowed")}
            </button>
            <button className="flex-1 py-2 px-3 rounded-lg text-sm font-medium text-zinc-500">
              {t("home.tabCommunity")}
            </button>
          </div>
        </nav>

        <main className="flex-1 px-5 pb-24 space-y-3">
          {POSTS.map((post, idx) => (
            <article
              key={post.id}
              className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-sm"
            >
              <div className="flex flex-wrap items-center gap-1.5 mb-2">
                <span
                  className={`text-[10px] font-bold tracking-wide rounded px-2 py-0.5 ${TONE_CLASSES[post.industryTone]}`}
                >
                  {t(`post.tags.${post.industryKey}`)}
                </span>
                <span
                  className={`text-[10px] font-bold tracking-wide rounded px-2 py-0.5 ${TONE_CLASSES[post.countryTone]}`}
                >
                  {t(`post.countries.${post.countryKey}`)}
                </span>
                <span className="text-xs text-zinc-400 ml-auto">
                  {t(`post.timeAgo.${post.timeKey}`, {count: post.timeCount})}
                </span>
              </div>
              <h3 className="text-base font-semibold text-zinc-900 leading-snug">
                {t(`samplePost.${post.titleKey}`)}
              </h3>
              <div className="mt-3 flex items-center justify-between text-sm text-zinc-500">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-zinc-200 text-zinc-600 grid place-items-center text-[11px] font-semibold">
                    {post.authorInitial}
                  </span>
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-400">
                  <span aria-label="comments" className="flex items-center gap-1">
                    💬 {post.comments}
                  </span>
                  <span aria-label="likes" className="flex items-center gap-1">
                    ♥ {post.hearts}
                  </span>
                </div>
              </div>
              {idx === 0 && (
                <div className="mt-4 -mx-4 -mb-4 p-4 rounded-b-2xl bg-amber-50 border-t border-amber-100">
                  <span className="text-[10px] font-bold tracking-wide text-amber-700">
                    {t("home.officialGuideTag")}
                  </span>
                  <h4 className="text-sm font-semibold text-amber-900 mt-1">
                    {t("home.officialGuideTitle")}
                  </h4>
                  <p className="text-xs text-amber-800/80 mt-1">
                    {t("home.officialGuideBody")}
                  </p>
                  <button className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-full px-3 py-1.5">
                    {t("home.officialGuideCta")} →
                  </button>
                </div>
              )}
            </article>
          ))}
        </main>

        <Link
          href="/compose"
          aria-label={t("nav.createPost")}
          className="fixed bottom-6 right-6 sm:right-[calc(50%-13rem)] w-14 h-14 rounded-full bg-sky-700 hover:bg-sky-800 text-white shadow-lg grid place-items-center transition-colors"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
