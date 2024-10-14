"use client";

import React, { useEffect, useState } from "react";
import { File } from "@/db/schema";
import { useToast } from "@/hooks/use-toast";

interface PdfRendererProps {
  file: File;
}

import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Loader2 } from "lucide-react";
import { useResizeDetector } from "react-resize-detector";
import { cn } from "@/lib/utils";

// Ensure the PDF.js worker is loaded
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

console.log("pdfjs.version", pdfjs.version);
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

  useEffect(() => {
    const fetchPdfUrl = async () => {
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
    };

    fetchPdfUrl();
  }, [file.id, toast]);
  if (!pdfUrl) {
    return (
      <div className="flex justify-center">
        <Loader2 className="my-24 h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-md shadow flex flex-col items-center">
      <div className="h-14 w-full border-b border-zinc-200 flex items-center justify-between px-2">
        <div className="flex items-center gap-1.5">
          <button
            disabled={currPage <= 1}
            onClick={() => setCurrPage((prev) => Math.max(prev - 1, 1))}
            className="px-2 py-1 bg-gray-100 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {currPage} of {numPages || "--"}
          </span>
          <button
            disabled={currPage >= (numPages || 0)}
            onClick={() =>
              setCurrPage((prev) => Math.min(prev + 1, numPages || Infinity))
            }
            className="px-2 py-1 bg-gray-100 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      <div className="flex-1 w-full max-h-screen overflow-auto">
        <div ref={ref}>
          <Document
            loading={
              <div className="flex justify-center">
                <Loader2 className="my-24 h-6 w-6 animate-spin" />
              </div>
            }
            onLoadError={(error) => {
              console.error("Error loading PDF:", error);
              toast({
                title: "Error loading PDF",
                description: "Please try again later",
                variant: "destructive",
              });
            }}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            file={pdfUrl} // Use the file's URL directly
            className="max-h-full"
          >
            {isLoading && renderedScale ? (
              <Page
                width={width ? width : 1}
                pageNumber={currPage}
                scale={scale}
                rotate={rotation}
                key={"@" + renderedScale}
              />
            ) : null}

            <Page
              width={width ? width : 1}
              pageNumber={currPage}
              scale={scale}
              rotate={rotation}
              key={"@" + scale}
              loading={
                <div className="flex justify-center">
                  <Loader2 className="my-24 h-6 w-6 animate-spin" />
                </div>
              }
              onRenderSuccess={() => setRenderedScale(scale)}
            />
          </Document>
        </div>
      </div>
    </div>
  );
}

export default PdfRenderer;
