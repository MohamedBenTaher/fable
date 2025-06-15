"use client";

import React, { useCallback, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { useDropzone } from "react-dropzone";
import { Cloud, File, Loader2, Upload, X, CheckCircle } from "lucide-react";
import { Progress } from "./ui/progress";
import { useUploadThing } from "@/lib/uploadthing";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const UploadDropZone = ({ user }: { user: any }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [isComplete, setIsComplete] = useState(false);
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
        setIsComplete(true);

        setTimeout(() => {
          fetchUploadedFile(fileId, user.id);
        }, 1000);
      } catch (error) {
        clearInterval(progressInterval);
        setUploading(false);
        setUploadProgress(0);
        setUploadStatus("");
        setIsComplete(false);
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

  const { getRootProps, getInputProps, acceptedFiles, isDragActive } =
    useDropzone({
      onDrop,
      accept: { "application/pdf": [".pdf"] },
      maxSize: 4 * 1024 * 1024, // 4MB
      multiple: false,
    });

  return (
    <div className="p-6">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ease-in-out",
          isDragActive
            ? "border-blue-500 bg-blue-50 scale-[1.02]"
            : "border-gray-300 hover:border-gray-400 hover:bg-gray-50",
          uploading && "pointer-events-none"
        )}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center space-y-4">
          {!uploading ? (
            <>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {isDragActive ? "Drop your PDF here" : "Upload your PDF"}
                </h3>
                <p className="text-sm text-gray-500">
                  Drag and drop your file here, or click to browse
                </p>
                <p className="text-xs text-gray-400">PDF up to 4MB</p>
              </div>
            </>
          ) : (
            <div className="space-y-4 w-full max-w-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                {isComplete ? (
                  <CheckCircle className="w-8 h-8 text-green-600" />
                ) : (
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                )}
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {uploadStatus}
                </h3>
                <Progress
                  value={uploadProgress}
                  className="h-2"
                  indicatorColor={isComplete ? "bg-green-500" : "bg-blue-500"}
                />
                <p className="text-sm text-gray-500">
                  {uploadProgress}% complete
                </p>
              </div>
            </div>
          )}

          {acceptedFiles[0] && !uploading && (
            <div className="bg-white border border-gray-200 rounded-lg p-3 flex items-center space-x-3 max-w-sm w-full">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <File className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {acceptedFiles[0].name}
                </p>
                <p className="text-xs text-gray-500">
                  {(acceptedFiles[0].size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function UploadButton({ user }: { user: any }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 shadow-sm">
          <Upload className="w-4 h-4 mr-2" />
          Upload PDF
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            Upload Document
          </DialogTitle>
        </DialogHeader>
        <UploadDropZone user={user} />
      </DialogContent>
    </Dialog>
  );
}

export default UploadButton;
