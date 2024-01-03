import React, { useEffect } from "react";
import { signIn, getProviders } from "next-auth/react";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { Button } from "@/components/ui/button";
import { Button as NextButton } from "@nextui-org/react";
import { getServerAuthSession } from "@/server/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import { toast } from "sonner";

type Props = {
  providers: InferGetServerSidePropsType<typeof getServerSideProps>;
};

const Page = ({ providers }: Props) => {
  const {
    query: { error },
  } = useRouter();

  useEffect(() => {
    if (error) toast.error(error);
  }, []);

  return (
    <>
      <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center bg-white">
        <div className="w-full max-w-sm space-y-4">
          <h1 className="text-center text-2xl font-semibold tracking-tighter">
            <span className="font-bold text-red-600">Login </span>to continue
          </h1>
          <Image
            src="/assets/images/login-art.png"
            alt="svg art"
            width={384}
            height={384}
            className="w-full animate-wiggle"
          />

          <div className="flex w-full flex-col items-center justify-center space-y-4 md:flex-row md:space-x-4 md:space-y-0 px-8">
            {
              // @ts-expect-error exists
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              providers?.github?.id && (
                <NextButton
                  // @ts-expect-error exists
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                  onClick={() => void signIn(providers.github.id)}
                  className="flex w-full items-center justify-center gap-3 rounded-md bg-[#24292F] px-3 py-1.5 text-white"
                >
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-semibold leading-6">
                    GitHub
                  </span>
                </NextButton>
              )
            }

            {
              // @ts-expect-error exists
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              providers?.google?.id && (
                <NextButton
                  // @ts-expect-error exists
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                  onClick={() => void signIn(providers.google.id)}
                  className="flex w-full items-center justify-center gap-3 rounded-md px-3 py-1.5 bg-white border"
                >
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 50 50"
                  >
                    <path
                      fill="#fbc02d"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                    <path
                      fill="#e53935"
                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    ></path>
                    <path
                      fill="#4caf50"
                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                    ></path>
                    <path
                      fill="#1565c0"
                      d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                  </svg>
                  <span className="text-sm font-semibold leading-6">
                    Google
                  </span>
                </NextButton>
              )
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerAuthSession(ctx);

  if (session) {
    return { redirect: { destination: "/dashboard" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
