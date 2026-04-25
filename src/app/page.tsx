type Post = {
  id: string;
  industry: { label: string; tone: "blue" | "green" | "orange" | "purple" };
  country: { label: string; tone: "green" | "red" | "pink" };
  time: string;
  title: string;
  author: string;
  authorInitial: string;
  comments: number;
  hearts: number;
};

const POSTS: Post[] = [
  {
    id: "p1",
    industry: { label: "MANUFACTURING", tone: "blue" },
    country: { label: "VIETNAM", tone: "green" },
    time: "12m ago",
    title: "Has anyone had trouble with the new safety certification in Ansan?",
    author: "User_992",
    authorInitial: "U",
    comments: 14,
    hearts: 5,
  },
  {
    id: "p2",
    industry: { label: "AGRICULTURE", tone: "orange" },
    country: { label: "NEPAL", tone: "red" },
    time: "2h ago",
    title:
      "Looking for a translation of the latest dorm regulations. My boss gave us a paper but it's only in Korean.",
    author: "User_01532",
    authorInitial: "L",
    comments: 3,
    hearts: 2,
  },
  {
    id: "p3",
    industry: { label: "CONSTRUCTION", tone: "purple" },
    country: { label: "CAMBODIA", tone: "pink" },
    time: "5h ago",
    title: "Any recommended clinics in Pyeongtaek that are open on Sundays for workers?",
    author: "User_841",
    authorInitial: "A",
    comments: 7,
    hearts: 11,
  },
];

const INDUSTRY_TONES: Record<Post["industry"]["tone"], string> = {
  blue: "bg-blue-50 text-blue-700",
  green: "bg-emerald-50 text-emerald-700",
  orange: "bg-amber-50 text-amber-700",
  purple: "bg-purple-50 text-purple-700",
};

const COUNTRY_TONES: Record<Post["country"]["tone"], string> = {
  green: "bg-emerald-50 text-emerald-700",
  red: "bg-red-50 text-red-800",
  pink: "bg-pink-50 text-pink-800",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 flex justify-center">
      <div className="w-full max-w-md bg-white shadow-sm flex flex-col">
        {/* Top bar */}
        <header className="flex items-center justify-between px-5 py-4 border-b border-zinc-100">
          <button className="p-1 -ml-1 text-zinc-700" aria-label="Menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
          <div className="font-bold text-lg tracking-tight">
            <span className="text-sky-700">Gachi</span>
            <span className="text-amber-500">Work</span>
          </div>
          <button className="p-1 -mr-1 text-zinc-700" aria-label="Language">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
            </svg>
          </button>
        </header>

        {/* Hero greeting */}
        <section className="px-5 pt-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-500 to-sky-700 text-white grid place-items-center font-semibold">
              MZ
            </div>
            <div>
              <div className="font-semibold text-zinc-900">GachiWork</div>
              <span className="inline-block text-[10px] font-bold tracking-wide text-emerald-700 bg-emerald-50 rounded-full px-2 py-0.5 mt-1">
                ✓ VERIFIED E-9
              </span>
            </div>
          </div>
          <h1 className="mt-5 text-2xl font-bold tracking-tight text-zinc-900">Hello, User_042</h1>
          <p className="text-sm text-zinc-500 mt-1">Activity from your boards and communities.</p>
        </section>

        {/* Segmented tabs */}
        <nav className="px-5 mb-3">
          <div className="flex gap-2 bg-zinc-100 p-1 rounded-xl">
            <button className="flex-1 py-2 px-3 rounded-lg bg-white text-sm font-medium text-zinc-900 shadow-sm">
              Followed Boards
            </button>
            <button className="flex-1 py-2 px-3 rounded-lg text-sm font-medium text-zinc-500">
              Community Pages
            </button>
          </div>
        </nav>

        {/* Feed */}
        <main className="flex-1 px-5 pb-24 space-y-3">
          {POSTS.map((post, idx) => (
            <article
              key={post.id}
              className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-sm"
            >
              <div className="flex flex-wrap items-center gap-1.5 mb-2">
                <span className={`text-[10px] font-bold tracking-wide rounded px-2 py-0.5 ${INDUSTRY_TONES[post.industry.tone]}`}>
                  {post.industry.label}
                </span>
                <span className={`text-[10px] font-bold tracking-wide rounded px-2 py-0.5 ${COUNTRY_TONES[post.country.tone]}`}>
                  {post.country.label}
                </span>
                <span className="text-xs text-zinc-400 ml-auto">{post.time}</span>
              </div>
              <h3 className="text-base font-semibold text-zinc-900 leading-snug">{post.title}</h3>
              <div className="mt-3 flex items-center justify-between text-sm text-zinc-500">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-zinc-200 text-zinc-600 grid place-items-center text-[11px] font-semibold">
                    {post.authorInitial}
                  </span>
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-400">
                  <span className="flex items-center gap-1">💬 {post.comments}</span>
                  <span className="flex items-center gap-1">♥ {post.hearts}</span>
                </div>
              </div>
              {idx === 0 && (
                <div className="mt-4 -mx-4 -mb-4 p-4 rounded-b-2xl bg-amber-50 border-t border-amber-100">
                  <span className="text-[10px] font-bold tracking-wide text-amber-700">OFFICIAL GUIDE</span>
                  <h4 className="text-sm font-semibold text-amber-900 mt-1">Renewing your E-9 Visa?</h4>
                  <p className="text-xs text-amber-800/80 mt-1">Step-by-step documentation guide for 2026 industrial workers.</p>
                  <button className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-full px-3 py-1.5">
                    Read Guide →
                  </button>
                </div>
              )}
            </article>
          ))}
        </main>

        {/* Floating action button */}
        <button
          aria-label="Create post"
          className="fixed bottom-6 right-6 sm:right-[calc(50%-13rem)] w-14 h-14 rounded-full bg-sky-700 hover:bg-sky-800 text-white shadow-lg grid place-items-center transition-colors"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>
    </div>
  );
}
