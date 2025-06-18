import ChatWrapper from "@/components/chat/chat-wrapper";
import { ChatContextProvider } from "@/components/chat/chat-context";
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
  const user = await getCurrentUser();

  if (!user || !user.id) {
    redirect("/sign-in");
  }

  const file = await getFile(Number(fileId), user.id);

  return (
    <div className="flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)] bg-gray-50 dark:bg-gray-950 transition-colors">
      <div className="mx-auto w-full max-w-8xl grow flex flex-col lg:flex-row xl:px-2 h-full">
        {/* Chat sidebar - responsive */}
        <div className="flex-1 lg:flex-[0.6] xl:flex-[0.7] border-t border-gray-200 dark:border-gray-800 lg:border-l lg:border-t-0 h-full lg:h-auto">
          <ChatContextProvider fileId={file.id}>
            <ChatWrapper file={file} isSubscribed={false} />
          </ChatContextProvider>
        </div>

        {/* PDF renderer - responsive */}
        <div className="flex-1 lg:flex-[0.4] xl:flex-[0.3] border-t lg:border-t border-gray-200 dark:border-gray-800 h-full lg:h-auto">
          <div className="h-full">
            <PdfRenderer file={file} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
