"use client";

import React, { useCallback, useState } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import DropZone, { useDropzone } from "react-dropzone";
import { Cloud, File, Loader2 } from "lucide-react";
import { Progress } from "./ui/progress";
import { useUploadThing } from "@/lib/uploadthing";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const UploadDropZone = ({ user }: { user: any }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const { startUpload } = useUploadThing("pdfUploader");
  const { toast } = useToast();
  const router = useRouter();

  const fetchUploadedFile = useCallback(
    async (fileId: number, userId: number) => {
      try {
        const params = new URLSearchParams({
          fileId: fileId.toString(),
          userId: userId.toString(),
        });

        const response = await fetch(`/api/files?${params.toString()}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch file");
        }

        await response.json();

        toast({
          title: "File uploaded successfully",
          description: "Your file has been uploaded successfully",
        });

        router.push(`/dashboard/${fileId}`);
      } catch (error) {
        console.error("Failed to fetch file:", error);
        toast({
          title: "Upload failed",
          description:
            "There was an error uploading your file. Please try again.",
          variant: "destructive",
        });
      }
    },
    [toast, router]
  );

  const startSimulatedProgress = useCallback(() => {
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 95) {
          clearInterval(interval);
          return prevProgress;
        }
        return prevProgress + 5;
      });
    }, 500);

    return interval;
  }, []);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      setUploading(true);
      setUploadStatus("Uploading...");
      const progressInterval = startSimulatedProgress();

      try {
        const res = await startUpload(acceptedFiles);
        if (!res) {
          throw new Error("Upload failed");
        }

        const [fileResponse] = res;
        const key = fileResponse?.key;
        const fileId = fileResponse?.serverData.fileId;

        if (!key || !fileId) {
          throw new Error("Invalid response from server");
        }

        clearInterval(progressInterval);
        setUploadProgress(100);
        setUploadStatus("Processing...");

        // Wait for a short delay before fetching the uploaded file
        setTimeout(() => {
          fetchUploadedFile(fileId, user.id);
        }, 1000);
      } catch (error) {
        clearInterval(progressInterval);
        setUploading(false);
        setUploadProgress(0);
        setUploadStatus("");
        console.error("Upload error:", error);
        toast({
          title: "Upload failed",
          description:
            "There was an error uploading your file. Please try again.",
          variant: "destructive",
        });
      }
    },
    [startUpload, startSimulatedProgress, fetchUploadedFile, user.id, toast]
  );

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxSize: 4 * 1024 * 1024, // 4MB
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className="border border-dashed h-64 m-4 rounded-lg border-gray-300"
    >
      <input {...getInputProps()} />
      <div className="flex items-center justify-center w-full h-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-full text-center cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-lg"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Cloud className="h-10 w-10 text-zinc-500 mb-2" />
            <span className="mt-1 text-sm text-zinc-500">
              Click to upload or drag and drop
            </span>
            <span className="text-xs text-zinc-500">PDF (up to 4MB)</span>
          </div>

          {acceptedFiles[0] && (
            <div className="max-w-xs bg-white flex items-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200">
              <div className="px-3 py-2 h-full grid place-items-center">
                <File className="h-6 w-6 text-blue-700" />
              </div>
              <div className="flex-1 px-3 py-2 text-sm text-gray-800 truncate">
                {acceptedFiles[0].name}
              </div>
            </div>
          )}

          {uploading && (
            <div className="w-full mt-4 max-w-xs mx-auto">
              <Progress
                indicatorColor={uploadProgress === 100 ? "bg-green-500" : ""}
                value={uploadProgress}
                className="h-1 w-full bg-zinc-200"
              />
              <div className="flex gap-1 items-center justify-center text-sm text-zinc-700 text-center pt-2">
                <Loader2 className="h-3 w-3 animate-spin" />
                {uploadStatus || "Uploading..."}
              </div>
            </div>
          )}
        </label>
      </div>
    </div>
  );
};

function UploadButton({ user }: { user: any }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) {
          setOpen(v);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          onClick={() => setOpen(true)}
        >
          Upload PDF
        </Button>
      </DialogTrigger>
      <DialogContent>
        <UploadDropZone user={user} />
      </DialogContent>
    </Dialog>
  );
}

export default UploadButton;
