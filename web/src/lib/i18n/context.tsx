"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { translations, type LangCode, type TranslationKey } from "./translations";

type LangContextType = {
  lang: LangCode;
  setLang: (l: LangCode) => void;
  t: (key: TranslationKey) => string;
};

const LangContext = createContext<LangContextType>({
  lang: "en",
  setLang: () => {},
  t: (key) => translations.en[key],
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>("en");

  useEffect(() => {
    const saved = localStorage.getItem("alexiant_lang") as LangCode | null;
    if (saved && saved in translations) setLangState(saved);
  }, []);

  function setLang(l: LangCode) {
    setLangState(l);
    localStorage.setItem("alexiant_lang", l);
  }

  function t(key: TranslationKey): string {
    return (translations[lang] as Record<string, string>)[key] ?? translations.en[key];
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
