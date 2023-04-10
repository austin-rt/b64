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
export interface IDataURI {
  dataURI: string;
}

export interface IDataURIDocument extends IDataURI {
  _id: string;
}

export interface IUserDocument {
  _id: string;
  name: string;
  googleId: string;
  email: string;
  avatar: string;
  images?: IDataURIDocument[];
  __v?: number;
}

export interface IUserData {
  user: IUserDocument;
}
