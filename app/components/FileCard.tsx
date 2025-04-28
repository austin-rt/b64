"use client";

import { IDataURI } from "@/models/DataURI";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { useFiles } from "../context/FileContext";

interface FileCardProps {
  file: IDataURI;
}

export default function FileCard({ file }: FileCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { isSignedIn } = useAuth();
  const { handleDelete } = useFiles();

  const onDelete = async () => {
    if (!isSignedIn || !file._id) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/users/me/images/${file._id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete file");
      }

      handleDelete(file);
    } catch (error) {
      console.error("Error deleting file:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="border rounded p-4 space-y-2 relative">
      {file.isLoading && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
        </div>
      )}
      <img
        src={file.src}
        alt={file.originalName}
        className="w-full h-32 object-cover rounded"
      />
      <p className="text-sm truncate">{file.originalName}</p>
      <div className="flex gap-2">
        <button
          onClick={() => navigator.clipboard.writeText(file.src)}
          className="text-sm bg-gray-100 px-2 py-1 rounded hover:bg-gray-200"
          disabled={file.isLoading}
        >
          Copy
        </button>
        {isSignedIn && file._id && !file.isLoading && (
          <button
            onClick={onDelete}
            disabled={isDeleting}
            className="text-sm bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        )}
      </div>
    </div>
  );
}
