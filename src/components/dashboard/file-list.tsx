"use client";

import React, { useState } from "react";
import { File } from "@/db/schema";
import { format } from "date-fns";
import { FileText, MessageSquare, Calendar, MoreVertical } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import DeleteButton from "./delete-button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface FileListProps {
  initialFiles: File[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "complete":
      return "bg-green-100 text-green-800 border-green-200";
    case "processing":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "failed":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const FileList: React.FC<FileListProps> = ({ initialFiles }) => {
  const [files, setFiles] = useState(initialFiles);

  const handleDeleteSuccess = (deletedFileId: number) => {
    setFiles(files.filter((file) => file.id !== deletedFileId));
  };

  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <FileText className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No documents yet
        </h3>
        <p className="text-gray-500 text-center max-w-md">
          Upload your first PDF to start chatting with your documents using AI
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {files.map((file) => (
        <div
          key={file.id}
          className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
        >
          <Link href={`/dashboard/${file.id}`}>
            <div className="p-6 space-y-4">
              {/* File Icon and Status */}
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <span
                  className={cn(
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
                    getStatusColor(file.status)
                  )}
                >
                  {file.status}
                </span>
              </div>

              {/* File Info */}
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900 text-lg leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {file.fileName}
                </h3>

                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {format(new Date(file.uploadedAt), "MMM dd, yyyy")}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <MessageSquare className="w-4 h-4" />
                  <span>Ready to chat</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Actions */}
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <Link href={`/dashboard/${file.id}`}>
              <Button
                size="sm"
                variant="ghost"
                className="text-blue-600 hover:text-blue-700"
              >
                Open Chat
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost" className="p-2">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/${file.id}`} className="w-full">
                    View Document
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <DeleteButton
                    fileId={file.id}
                    onDeleteSuccess={() => handleDeleteSuccess(file.id)}
                  />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FileList;
