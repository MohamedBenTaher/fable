"use client";

import React, { useState } from "react";
import { File } from "@/db/schema";
import { format } from "date-fns";
import { Loader2, Plus, MessageSquare, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import DeleteButton from "./delete-button";

interface FileListProps {
  initialFiles: File[];
}

const FileList: React.FC<FileListProps> = ({ initialFiles }) => {
  const [files, setFiles] = useState(initialFiles);

  const handleDeleteSuccess = (deletedFileId: number) => {
    setFiles(files.filter((file) => file.id !== deletedFileId));
  };

  if (files.length === 0) {
    return (
      <div className="mt-16 flex flex-col items-center gap-2">
        <MessageSquare className="h-8 w-8 text-zinc-800" />
        <h3 className="font-semibold text-xl">Pretty empty around here</h3>
        <p>Let&apos;s upload your first PDF.</p>
      </div>
    );
  }

  return (
    <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
      {files.map((file) => (
        <li
          key={file.id}
          className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg"
        >
          <Link href={`/dashboard/${file.id}`} className="flex flex-col gap-2">
            <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
              <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="truncate text-lg font-medium text-zinc-900">
                    {file.fileName}
                  </h3>
                </div>
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
              {file.status}
            </div>

            <DeleteButton
              fileId={file.id}
              onDeleteSuccess={() => handleDeleteSuccess(file.id)}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default FileList;
