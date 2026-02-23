"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { Locale, locales, getTranslation } from "./translations";

// RTL languages
const RTL_LOCALES: Locale[] = ["ar", "fa"];

interface LocaleContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: string, replacements?: Record<string, string>) => string;
    dir: "ltr" | "rtl";
    locales: typeof locales;
}

const LocaleContext = createContext<LocaleContextType | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>("en");

    // Read saved locale from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem("locale") as Locale | null;
            if (saved && locales.some((l) => l.code === saved)) {
                setLocaleState(saved);
            }
        } catch {
            // localStorage not available (SSR or private browsing)
        }
    }, []);

    // Apply lang + dir to <html> whenever locale changes
    useEffect(() => {
        const dir = RTL_LOCALES.includes(locale) ? "rtl" : "ltr";
        document.documentElement.lang = locale;
        document.documentElement.dir = dir;
    }, [locale]);

    const setLocale = useCallback((code: Locale) => {
        setLocaleState(code);
        try {
            localStorage.setItem("locale", code);
        } catch {
            // ignore
        }
    }, []);

    const t = useCallback(
        (key: string, replacements?: Record<string, string>) => {
            let text = getTranslation(key, locale);
            if (replacements) {
                Object.entries(replacements).forEach(([k, v]) => {
                    text = text.replace(`{${k}}`, v);
                });
            }
            return text;
        },
        [locale]
    );

    const dir = RTL_LOCALES.includes(locale) ? "rtl" : "ltr";

    return (
        <LocaleContext.Provider value={{ locale, setLocale, t, dir, locales }}>
            {children}
        </LocaleContext.Provider>
    );
}

export function useLocale() {
    const ctx = useContext(LocaleContext);
    if (!ctx) {
        throw new Error("useLocale must be used within a <LocaleProvider>");
    }
    return ctx;
}
