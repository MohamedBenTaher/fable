// DeleteButton.tsx
"use client";

import React, { useState } from "react";
import { Loader2, Trash } from "lucide-react";
import { Button } from "../ui/button";

interface DeleteButtonProps {
  fileId: number;
  onDeleteSuccess: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  fileId,
  onDeleteSuccess,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch("/api/files", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileId }),
      });
      if (!response.ok) {
        throw new Error("Failed to delete file");
      }
      onDeleteSuccess();
    } catch (error) {
      console.error("Failed to delete file:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button
      onClick={handleDelete}
      size="sm"
      className="w-full"
      variant="destructive"
      disabled={isDeleting}
    >
      {isDeleting ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Trash className="h-4 w-4" />
      )}
    </Button>
  );
};

export default DeleteButton;
