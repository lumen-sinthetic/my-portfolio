import { routing } from "../i18n/routing";

export const locales = routing.locales;
export const defaultLocale = routing.defaultLocale;
export const localeCookieName = "NEXT_LOCALE";
export type Locales = (typeof routing.locales)[number];
