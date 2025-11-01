import PageProgress from "@components/atoms/page-progress";
import Anchor from "@components/molecules/anchor";
import IntlProvider from "@core/context/IntlProvider";
import { LenisProvider } from "@core/context/LenisProvider";
import { UIProvider } from "@core/context/ui-provider";
import { routing } from "@core/locale/i18n/routing";
import { selfURL } from "@shared/env";
import { openGraphConstructor } from "@shared/lib/helpers/og-constructor";
import { cn } from "@shared/lib/utils";
import "@shared/styles/globals.scss";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

const inter = Inter({
  preload: true,
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "arial", "sans-serif"],
});

export async function generateMetadata(): Promise<Metadata> {
  const headersStore = await headers();
  const og = await openGraphConstructor({
    title: "Вадим Сикорский",
    description:
      "Вадим Сикорский - front-end разработчик, который ценит качественную архитектуру и чистый код.",
  });

  const pathname = headersStore.get("x-pathname");

  return {
    ...og,
    metadataBase: selfURL ? new URL(selfURL) : null,
    appleWebApp: { title: "Вадим" },
    alternates: { canonical: pathname },

    icons: {
      icon: [
        {
          url: "/assets/favicon/favicon-96x96.png",
          type: "image/png",
          sizes: "96x96",
        },
        { url: "/assets/favicon/favicon.svg", type: "image/svg+xml" },
        { url: "/assets/favicon/favicon.ico", rel: "shortcut icon" },
      ],
      apple: [
        { url: "/assets/favicon/apple-touch-icon.png", sizes: "180x180" },
      ],
    },
    manifest: "/assets/favicon/site.webmanifest",
  };
}

export const revalidate = 120;

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

interface RootLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

async function RootLayout({ children, params }: Readonly<RootLayoutProps>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body
        suppressHydrationWarning
        className={cn(
          inter.className,
          "text-white font-light antialiased text-base"
        )}
      >
        <IntlProvider
          locale={locale}
          messages={messages}
        >
          <LenisProvider>
            <UIProvider>
              {/* <Header /> */}
              {children}
              <PageProgress />
              <Anchor />

              {/* <Footer currentDate={new Date()} /> */}
            </UIProvider>
          </LenisProvider>
        </IntlProvider>
      </body>
    </html>
  );
}

export default RootLayout;
