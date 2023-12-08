import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "@/utils/api";

import { Toaster } from "sonner";
import Layout from "@/components/Layout";
import { NextUIProvider } from "@nextui-org/react";

import "@/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <Toaster richColors />
      <SessionProvider session={session}>
        <NextUIProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </NextUIProvider>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
