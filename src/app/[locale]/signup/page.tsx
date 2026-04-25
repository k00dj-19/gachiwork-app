import {getTranslations, setRequestLocale} from "next-intl/server";
import {Link} from "@/i18n/navigation";
import {SignUpForm} from "./SignUpForm";

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

          <div className="mt-6">
            <SignUpForm />
          </div>

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
