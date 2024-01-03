import { getServerAuthSession } from "@/server/auth";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import React from "react";
import QuickAction from "@/components/QuickAction";

import dayjs from "dayjs";
import { RocketIcon } from "lucide-react";
import Modal from "@/components/Modal";
import QuickCreate from "../../components/QuickCreate/QuickCreate";

type Props = { user: InferGetServerSidePropsType<typeof getServerSideProps> };

function Page({ user }: Props) {
  const [open, setOpen] = React.useState(false);
  const hour = dayjs().hour();

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <main className="px-6 py-6 md:px-12">
        <h1 className="text-center text-3xl font-light tracking-tighter md:text-start">
          {hour > 18
            ? "Good Evening "
            : hour > 12
              ? "Good Afternoon"
              : "Good Morning"}
          , <span className="font-normal text-red-600">{user.name}</span>{" "}
        </h1>

        <div className="flex flex-col items-center justify-center space-y-4 py-4 md:flex-row md:space-x-4 md:space-y-0">
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            className="w-full max-w-sm"
          >
            <QuickCreate />
          </Modal>
          <QuickAction
            onClick={() => setOpen(true)}
            icon={<RocketIcon className="text-red-600" size={48} />}
            title="Quick Start"
            description="Get started with your first workout"
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
