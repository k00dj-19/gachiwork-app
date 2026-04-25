import {getTranslations, setRequestLocale} from "next-intl/server";
import {SignInForm} from "./SignInForm";

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

        <div className="mt-8">
          <SignInForm />
        </div>

        <p className="mt-8 text-center text-[10px] font-semibold tracking-widest text-zinc-400 uppercase">
          {t("globalSupport")}
        </p>
      </div>
    </div>
  );
}
