import Loading from "@/components/Loading";
import { getServerAuthSession } from "@/server/auth";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import React, { Suspense, useEffect } from "react";
import QuickAction from "@/components/QuickAction";

import dayjs from "dayjs";
import { DumbbellIcon, Waypoints } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type Props = { user: InferGetServerSidePropsType<typeof getServerSideProps> };

function Page({ user }: Props) {
  const hour = dayjs().hour();

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <main className="px-6 py-6 md:px-12">
        <h1 className="text-center text-3xl font-light tracking-tighter md:text-start">
          {hour > 18
            ? "Good Evening"
            : hour > 12
              ? "Good Afternoon"
              : "Good Morning"}
          , <span className="font-normal text-red-600">{user.name}</span>{" "}
          {hour > 18 ? "🌙" : hour > 12 ? "🌞" : "🌅"}
        </h1>

        <div className="flex flex-col items-center justify-center space-y-4 py-4 md:flex-row md:space-x-4 md:space-y-0">
          <QuickAction
            title="Workout Plan"
            description="Create a new workout plan"
          />

          <QuickAction title="Exercise" description="Create a new exercise" />
          
          <QuickAction
            title="Session"
            description="Start a workout session"
            icon={<DumbbellIcon className="text-red-600" size={48} />}
          />
        </div>
      </main>
    </>
  );
}

export default Page;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (!session)
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };

  return {
    props: { user: session.user },
  };
};
