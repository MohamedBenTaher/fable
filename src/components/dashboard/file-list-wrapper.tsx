import { getFiles } from "@/data-access/files";
import FileList from "@/components/dashboard/file-list";
import EmptyState from "@/components/dashboard/empty-state";

async function FileListWrapper({ userId }: { userId: string }) {
  const files = await getFiles(Number(userId));
  console.log(files);
  if (!files || files.length === 0) {
    return <EmptyState />;
  }
  return <FileList initialFiles={files} />;
}

export default FileListWrapper;