"use client";

import React, { useCallback, useEffect, useState } from "react";
import { File } from "@/db/schema";
import { useToast } from "@/hooks/use-toast";

interface PdfRendererProps {
  file: File;
}

import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import {
  ChevronDown,
  ChevronUp,
  Loader2,
  RotateCw,
  Search,
} from "lucide-react";
import { useResizeDetector } from "react-resize-detector";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import SimpleBar from "simplebar-react";
import PdfFullscreen from "./pdf-full-screen";

// Ensure the PDF.js worker is loaded
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function PdfRenderer({ file }: PdfRendererProps) {
  const { toast } = useToast();
  const [numPages, setNumPages] = useState<number>();
  const [currPage, setCurrPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [renderedScale, setRenderedScale] = useState<number | null>(null);
  const isLoading = renderedScale !== scale;
  const { width, ref } = useResizeDetector();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const fetchPdfUrl = useCallback(async () => {
    try {
      const response = await fetch(`/api/pdf-proxy?fileId=${file.id}`);
      if (response.ok) {
        setPdfUrl(response.url);
      } else {
        throw new Error("Failed to fetch PDF URL");
      }
    } catch (error) {
      console.error("Error fetching PDF URL:", error);
      toast({
        title: "Error loading PDF",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  }, [file.id, toast]);

  useEffect(() => {
    fetchPdfUrl();
  }, [fetchPdfUrl]);

  const CustomPageValidator = z.object({
    page: z
      .string()
      .refine((num) => Number(num) > 0 && Number(num) <= numPages!),
  });

  type TCustomPageValidator = z.infer<typeof CustomPageValidator>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TCustomPageValidator>({
    defaultValues: {
      page: "1",
    },
    resolver: zodResolver(CustomPageValidator),
  });

  const handlePageSubmit = ({ page }: TCustomPageValidator) => {
    setCurrPage(Number(page));
    setValue("page", String(page));
  };

  if (!pdfUrl) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Loading PDF...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* PDF Controls Header - Fixed */}
      <div className="h-14 w-full border-b border-zinc-200 flex items-center justify-between px-4 flex-shrink-0 bg-white">
        <div className="flex items-center gap-1.5">
          <Button
            disabled={currPage <= 1}
            onClick={() => {
              setCurrPage((prev) => (prev - 1 > 1 ? prev - 1 : 1));
              setValue("page", String(currPage - 1));
            }}
            variant="ghost"
            aria-label="previous page"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-1.5">
            <Input
              {...register("page")}
              className={cn(
                "w-12 h-8",
                errors.page && "focus-visible:ring-red-500"
              )}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(handlePageSubmit)();
                }
              }}
            />
            <p className="text-zinc-700 text-sm space-x-1">
              <span>/</span>
              <span>{numPages ?? "x"}</span>
            </p>
          </div>

          <Button
            disabled={numPages === undefined || currPage === numPages}
            onClick={() => {
              setCurrPage((prev) =>
                prev + 1 > numPages! ? numPages! : prev + 1
              );
              setValue("page", String(currPage + 1));
            }}
            variant="ghost"
            aria-label="next page"
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="gap-1.5" aria-label="zoom" variant="ghost">
                <Search className="h-4 w-4" />
                {scale * 100}%
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => setScale(0.5)}>
                50%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(0.75)}>
                75%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(1)}>
                100%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(1.25)}>
                125%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(1.5)}>
                150%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(2)}>
                200%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(2.5)}>
                250%
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            onClick={() => setRotation((prev) => prev + 90)}
            variant="ghost"
            aria-label="rotate 90 degrees"
          >
            <RotateCw className="h-4 w-4" />
          </Button>

          <PdfFullscreen fileUrl={pdfUrl} />
        </div>
      </div>

      {/* PDF Viewer Container - Fixed Height with Scrolling */}
      <div className="flex-1 min-h-0 bg-gray-50">
        <SimpleBar
          autoHide={false}
          className="h-full"
          style={{ maxHeight: "100%" }}
        >
          <div className="p-6 min-h-full flex justify-center">
            <div ref={ref} className="w-full flex justify-center">
              <Document
                loading={
                  <div className="flex justify-center items-center min-h-[400px]">
                    <div className="text-center">
                      <Loader2 className="h-8 w-8 animate-spin text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">
                        Loading document...
                      </p>
                    </div>
                  </div>
                }
                onLoadError={() => {
                  toast({
                    title: "Error loading PDF",
                    description: "Please try again later",
                    variant: "destructive",
                  });
                }}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                file={pdfUrl}
                className="max-h-full"
              >
                {isLoading && renderedScale ? (
                  <Page
                    width={width ? Math.min(width - 48, 1000) : 600}
                    pageNumber={currPage}
                    scale={scale}
                    rotate={rotation}
                    key={"@" + renderedScale}
                    className="shadow-lg border border-gray-200"
                  />
                ) : null}

                <Page
                  className={cn(
                    isLoading ? "hidden" : "shadow-lg border border-gray-200",
                    "block mx-auto"
                  )}
                  width={width ? Math.min(width - 48, 1000) : 600}
                  pageNumber={currPage}
                  scale={scale}
                  rotate={rotation}
                  key={"@" + scale}
                  loading={
                    <div className="flex justify-center items-center min-h-[400px]">
                      <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                    </div>
                  }
                  onRenderSuccess={() => setRenderedScale(scale)}
                />
              </Document>
            </div>
          </div>
        </SimpleBar>
      </div>
    </div>
  );
}

export default PdfRenderer;
