export interface FileData {
  fileName: string;
  dataUri: string;
}

export interface FileDataWithSize extends FileData {
  width: number;
  height: number;
}

export interface UseFileReaderReturn {
  files: FileDataWithSize[];
  handleFileChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => Promise<void>;
}


export interface FileReaderResult {
  dataUri: string;
  file: File;
}

 export interface AddWidthAndHeightResult {
  width: number;
  height: number;
}