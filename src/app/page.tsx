import MaxWidthWrapper from "@/components/max-width-wrapper";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrentUser();
  console.log("user", user);
  if (user) redirect("/dashboard");
  redirect("/sign-in");
  return (
    <>
      <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
        <div className="mx-auto mb-40 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-100 hover:bg-white/50">
          <div className="text-sm font-semibold text-gray-700">
            Welcome to Fable
          </div>
        </div>
        <h1 className=" max-w-5xl text-5xl font-bold md:text-6xl sm:text-7xl text-gray-900">
          Chat with your <span className="text-blue-600">documents</span> in
          real-time.
        </h1>
        <p className="mt-5 max-w-prose  text-zinc-700 sm:text-lg">
          Fable is a new way to collaborate with your team. Create, edit, and
          discuss documents in real-time. Sign up now to get started.
        </p>
        <Link
          className={buttonVariants({
            size: "lg",
            className: "mt-10",
          })}
          href="/dashboard"
          target="_blank"
        >
          Get started
          <ArrowRight size={24} className="ml-2 h-5 w-5" />
        </Link>
      </MaxWidthWrapper>
      <div>
        <div className="relative isolate">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-90 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>

          <div>
            <div className="mx-auto max-w-6xl px-6 lg:px-8">
              <div className="mt-16 flow-root sm:mt-24">
                <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                  <Image
                    src="/dashboard-preview.jpg"
                    alt="product preview"
                    width={1364}
                    height={866}
                    quality={100}
                    className="rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mb-32 mt-32 max-w-5xl sm:mt-56">
        <div className="mb-12 px-6 lg:px-6">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="mt-2 text-4xl font-bold text-gray-900 sm:text-5xl">
              Start chatting with your documents in seconds.
            </h2>
            <p className="mt-4 text-xl text-gray-700">
              Fable is a new way to collaborate with your team. Create, edit,
              and discuss documents in real-time. Sign up now to get started.
            </p>
          </div>
        </div>
        <ol className="my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0">
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-blue-700">Step 1</span>
              <span className="text-lg font-semibold ">Create an account</span>
              <p className=" mt-4 text-zinc-700">
                Sign up for an account to get started with Fable. You can start
                with a free plan or choose one of our{" "}
                <Link
                  href={"/pricing"}
                  className="text-blue-700 underline underline-offset-2"
                >
                  premium plans
                </Link>
                .
              </p>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-blue-700">Step 2</span>
              <span className="text-lg font-semibold ">
                Upload your PDF file
              </span>
              <p className=" mt-4 text-zinc-700">
                We&apos;ll convert your PDF file into a document that you can
                chat on.
              </p>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-blue-700">Step 3</span>
              <span className="text-lg font-semibold ">
                Start Chatting and collaborating
              </span>
              <p className=" mt-4 text-zinc-700 text-balance">
                Start chatting with your team on the document. You can also
                create tasks and assign them to your team members. or choose an
                output format for your document.
              </p>
            </div>
          </li>
        </ol>
        <div>
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="mt-16 flow-root sm:mt-24">
              <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <Image
                  src="/file-upload-preview.jpg"
                  alt="uploading preview"
                  width={1419}
                  height={732}
                  quality={100}
                  className="rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
