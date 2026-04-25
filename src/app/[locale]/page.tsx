import {getTranslations, setRequestLocale} from "next-intl/server";
import {Link} from "@/i18n/navigation";
import {LanguageSwitcher} from "@/components/LanguageSwitcher";
import {createSupabaseServerClient} from "@/lib/supabase/server";

type Tone = "blue" | "green" | "orange" | "purple" | "red" | "pink" | "neutral";

const INDUSTRY_TONES: Record<string, Tone> = {
  manufacturing: "blue",
  agriculture: "orange",
  construction: "purple",
};

const TONE_CLASSES: Record<Tone, string> = {
  blue: "bg-blue-50 text-blue-700",
  green: "bg-emerald-50 text-emerald-700",
  orange: "bg-amber-50 text-amber-700",
  purple: "bg-purple-50 text-purple-700",
  red: "bg-red-50 text-red-800",
  pink: "bg-pink-50 text-pink-800",
  neutral: "bg-zinc-100 text-zinc-700",
};

type PostRow = {
  id: string;
  title: string;
  body: string;
  industry: string | null;
  country: string | null;
  created_at: string;
  author: {display_name: string | null} | null;
};

type Props = {
  params: Promise<{locale: string}>;
};

function relativeTime(iso: string, locale: string): string {
  const created = new Date(iso).getTime();
  const diffMs = Date.now() - created;
  const minutes = Math.max(1, Math.round(diffMs / 60_000));
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);
  const rtf = new Intl.RelativeTimeFormat(locale, {numeric: "auto"});
  if (minutes < 60) return rtf.format(-minutes, "minute");
  if (hours < 24) return rtf.format(-hours, "hour");
  return rtf.format(-days, "day");
}

export default async function Home({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const supabase = await createSupabaseServerClient();
  const {
    data: {user},
  } = await supabase.auth.getUser();

  let displayName: string | null = null;
  if (user) {
    const {data: profile} = await supabase
      .from("profiles")
      .select("display_name")
      .eq("id", user.id)
      .maybeSingle();
    displayName = profile?.display_name ?? user.email?.split("@")[0] ?? null;
  }

  const {data: postsData} = await supabase
    .from("posts")
    .select("id, title, body, industry, country, created_at, author:profiles!posts_author_id_fkey(display_name)")
    .eq("is_draft", false)
    .order("created_at", {ascending: false})
    .limit(20);

  const posts = (postsData ?? []) as unknown as PostRow[];

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
              {(displayName ?? "G")[0]?.toUpperCase()}
            </div>
            <div>
              <div className="font-semibold text-zinc-900">{t("brand.name")}</div>
              {user ? (
                <span className="inline-block text-[10px] font-bold tracking-wide text-emerald-700 bg-emerald-50 rounded-full px-2 py-0.5 mt-1">
                  {t("home.verifiedBadge")}
                </span>
              ) : (
                <Link
                  href="/signin"
                  className="inline-block text-[10px] font-semibold tracking-wide text-sky-700 hover:text-sky-800 mt-1 underline-offset-2 hover:underline"
                >
                  {t("home.signinCta")}
                </Link>
              )}
            </div>
          </div>
          <h1 className="mt-5 text-2xl font-bold tracking-tight text-zinc-900">
            {user && displayName
              ? t("home.greeting", {name: displayName})
              : t("home.greetingAnon")}
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            {user ? t("home.subgreeting") : t("home.subgreetingAnon")}
          </p>
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
          {posts.length === 0 ? (
            <div className="bg-white border border-zinc-200 rounded-2xl p-8 text-center">
              <h3 className="text-base font-semibold text-zinc-900">
                {t("home.emptyTitle")}
              </h3>
              <p className="text-sm text-zinc-500 mt-2 leading-relaxed">
                {t("home.emptyBody")}
              </p>
            </div>
          ) : (
            posts.map((post) => {
              const tone = post.industry
                ? INDUSTRY_TONES[post.industry] ?? "neutral"
                : "neutral";
              const authorName = post.author?.display_name ?? "—";
              const initial = (authorName[0] ?? "U").toUpperCase();
              return (
                <article
                  key={post.id}
                  className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-sm"
                >
                  <div className="flex flex-wrap items-center gap-1.5 mb-2">
                    {post.industry && (
                      <span
                        className={`text-[10px] font-bold tracking-wide rounded px-2 py-0.5 ${TONE_CLASSES[tone]}`}
                      >
                        {post.industry.toUpperCase()}
                      </span>
                    )}
                    {post.country && (
                      <span className="text-[10px] font-bold tracking-wide rounded px-2 py-0.5 bg-zinc-100 text-zinc-700">
                        {post.country.toUpperCase()}
                      </span>
                    )}
                    <span className="text-xs text-zinc-400 ml-auto">
                      {relativeTime(post.created_at, locale)}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-zinc-900 leading-snug">
                    {post.title}
                  </h3>
                  {post.body && (
                    <p className="text-sm text-zinc-600 mt-1 line-clamp-3 whitespace-pre-wrap">
                      {post.body}
                    </p>
                  )}
                  <div className="mt-3 flex items-center justify-between text-sm text-zinc-500">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-zinc-200 text-zinc-600 grid place-items-center text-[11px] font-semibold">
                        {initial}
                      </span>
                      <span>{authorName}</span>
                    </div>
                  </div>
                </article>
              );
            })
          )}
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
