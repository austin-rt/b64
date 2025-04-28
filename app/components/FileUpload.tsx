"use client";

import { useFiles } from "../context/FileContext";
import FileCard from "./FileCard";

export default function FileUpload() {
  const { files, loading, error, handleFileChange } = useFiles();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label
          htmlFor="file-upload"
          className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Select Files
        </label>
        <input
          id="file-upload"
          type="file"
          multiple
          className="hidden"
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>

      {loading && <p>Converting files...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {files.map((file, index) => (
          <FileCard key={file._id?.toString() || index} file={file} />
        ))}
      </div>
    </div>
  );
}
