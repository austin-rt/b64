"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAuth } from "@clerk/nextjs";
import { IDataURI } from "@/models/DataURI";

interface FileContextType {
  files: IDataURI[];
  loading: boolean;
  error: string | null;
  showAuth: boolean;
  toggleAuth: () => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleDelete: (file: IDataURI) => void;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export function FileProvider({ children }: { children: ReactNode }) {
  const [files, setFiles] = useState<IDataURI[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAuth, setShowAuth] = useState(true);
  const { isSignedIn } = useAuth();

  const toggleAuth = () => setShowAuth((prev) => !prev);

  // Fetch saved files when user signs in
  useEffect(() => {
    const fetchSavedFiles = async () => {
      if (!isSignedIn) return;

      try {
        const response = await fetch("/api/users/me/images");
        if (!response.ok) {
          throw new Error("Failed to fetch saved files");
        }
        const data = await response.json();
        setFiles(data.files);
      } catch (err) {
        console.error("Error fetching saved files:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch saved files"
        );
      }
    };

    fetchSavedFiles();
  }, [isSignedIn]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    setLoading(true);
    setError(null);

    // Create optimistic placeholders
    const newFiles = Array.from(e.target.files).map((file) => ({
      src: URL.createObjectURL(file),
      originalName: file.name,
      mimeType: file.type,
      size: file.size,
      owner: null,
      isPublic: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      _id: `temp-${Date.now()}-${Math.random()}`,
      isLoading: true,
    }));

    // Add optimistic placeholders immediately
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);

    try {
      const formData = new FormData();
      Array.from(e.target.files).forEach((file) => {
        formData.append("file", file);
      });

      const response = await fetch("/api/files", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to convert files");
      }

      const data = await response.json();

      // Replace optimistic placeholders with real data
      setFiles((prevFiles) =>
        prevFiles.map((file) => {
          if (!file.isLoading) return file;
          const newFile = data.files.find(
            (f: IDataURI) => f.originalName === file.originalName
          );
          return newFile || { ...file, isLoading: false };
        })
      );
    } catch (err) {
      // Remove failed uploads
      setFiles((prevFiles) => prevFiles.filter((file) => !file.isLoading));
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (fileToDelete: IDataURI) => {
    setFiles(files.filter((file) => file !== fileToDelete));
  };

  return (
    <FileContext.Provider
      value={{
        files,
        loading,
        error,
        showAuth,
        toggleAuth,
        handleFileChange,
        handleDelete,
      }}
    >
      {children}
    </FileContext.Provider>
  );
}

export function useFiles() {
  const context = useContext(FileContext);
  if (context === undefined) {
    throw new Error("useFiles must be used within a FileProvider");
  }
  return context;
}
