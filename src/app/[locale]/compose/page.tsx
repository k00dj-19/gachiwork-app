import {getTranslations, setRequestLocale} from "next-intl/server";
import {redirect} from "@/i18n/navigation";
import {Link} from "@/i18n/navigation";
import {createSupabaseServerClient} from "@/lib/supabase/server";
import {ComposeForm} from "./ComposeForm";

type Props = {
  params: Promise<{locale: string}>;
};

export default async function Compose({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  const supabase = await createSupabaseServerClient();
  const {
    data: {user},
  } = await supabase.auth.getUser();

  if (!user) {
    redirect({href: "/signin", locale});
  }

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
          <ComposeForm />
        </main>
      </div>
    </div>
  );
}
