"use client";

import React, { useState } from "react";
import { File } from "@/db/schema";
import Link from "next/link";
import { MessageSquare, Plus } from "lucide-react";
import { format } from "date-fns";
import DeleteButton from "@/components/dashboard/delete-button";

interface FileListProps {
  initialFiles: File[];
}

const FileList: React.FC<FileListProps> = ({ initialFiles }) => {4
  const [files, setFiles] = useState<File[]>(initialFiles);
  const [deletingFileId, setDeletingFileId] = useState<number | null>(null);
  const handleDeleteSuccess = (fileId: number) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
  };

  return (
    <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 sm:grid-cols-2 lg:grid-cols-3">
      {files?.map((file) => (
        <FileItem
          key={file.id}
          file={file}
          onDeleteSuccess={() => handleDeleteSuccess(file.id)}
          isDeleting={deletingFileId === file.id}
        />
      ))}
    </ul>
  );
};

interface FileItemProps {
  file: File;
  onDeleteSuccess: () => void;
  isDeleting: boolean;
}

const FileItem: React.FC<FileItemProps> = ({
  file,
  onDeleteSuccess,
  isDeleting,
}) => {
  return (
    <li className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg">
      <Link
        className="flex w-full items-center justify-between space-x-6 p-6"
        href={`/dashboard/${file.id}`}
      >
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
            <h3 className="truncate text-lg font-medium text-zinc-700">
              {file.fileName}
            </h3>
          </div>
        </div>
      </Link>
      <div className="px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500">
        <div className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          {format(new Date(file.uploadedAt), "MMM yyyy")}
        </div>
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          mocked
        </div>
        <DeleteButton fileId={file.id} onDeleteSuccess={onDeleteSuccess} />
      </div>
    </li>
  );
};

export default FileList;
