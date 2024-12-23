import ChatWrapper from "@/components/chat/chat-wrapper";
import PdfRenderer from "@/components/pdf-renderer";
import { getFile } from "@/data-access/files";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";

interface PageProps {
  params: {
    fileId: string;
  };
}

async function Page({ params }: PageProps) {
  const { fileId } = params;
  const user = { userId: 1 };

  // if (!user || !user.id) {
  //   redirect("/sign-in");
  // }
  const file = await getFile(Number(fileId), user.userId);
  // console.log(file);

  // if (!file) {
  //   return <div>File not found</div>;
  // }
  return (
    // <FileProvider>
    <div className="flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="mx-auto w-full max-w-8xl grow lg:flex xl:px-2">
        {/* Left sidebar & main wrapper */}
        <div className="flex-1 xl:flex">
          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            {/* Main area */}
            <PdfRenderer file={file} />
          </div>
        </div>

        <div className="shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0">
          <ChatWrapper isSubscribed={false} />
        </div>
      </div>
    </div>
    // </FileProvider>
  );
}

export default Page;
