export interface FileData {
  fileName: string;
  dataURI: string;
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
  dataURI: string;
  file: File;
}

export interface AddWidthAndHeightResult {
  width: number;
  height: number;
}
export interface IDataURI {
  fileName: string;
  dataURI: string;
}

export interface IDataURIDocument extends IDataURI {
  _id: string;
}

export interface IUser {
  name: string;
  googleId: string;
  email: string;
  avatar: string;
  images: IDataURI[];
}

export interface IUserDocument extends IUser {
  _id: string;
}

export interface IUserData {
  user: IUserDocument;
}
