import Loading from "@/components/Loading";
import { getServerAuthSession } from "@/server/auth";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import React, { Suspense } from "react";

type Props = { user: InferGetServerSidePropsType<typeof getServerSideProps> };

function Page({ user }: Props) {
  console.log(user);
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div>
        <h1>Hello</h1>
      </div>
    </>
  );
}

export default Page;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { user: session.user },
  };
};
