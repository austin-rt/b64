import { useState } from 'react';
import {
  FileData,
  FileDataWithSize,
  UseFileReaderReturn,
  FileReaderResult,
  AddWidthAndHeightResult
} from '../types/interfaces';

// Define a custom hook called useFileReader that returns files and handleFileChange function
const useFileReader = (): UseFileReaderReturn => {
  // Initialize the files state with an empty array
  const [files, setFiles] = useState<FileDataWithSize[]>([]);

  // Define a function called readFile that reads a file and returns a Promise that resolves to a FileReaderResult object
  const readFile = (file: File): Promise<FileReaderResult> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();

      // When the file is read, resolve with an object that contains the data URI and the file object
      reader.onload = () => {
        resolve({ dataUri: reader.result as string, file });
      };

      // If there is an error while reading the file, reject with an error message
      reader.onerror = () => {
        reject(new Error(`Failed to read file: ${file.name}`));
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);
    });

  // Define a function called addWidthAndHeight that takes a FileReaderResult and returns a Promise that resolves to a FileDataWithSize object
  const addWidthAndHeight = async (
    fileData: FileReaderResult
  ): Promise<FileDataWithSize> => {
    const { dataUri, file } = fileData;

    // Create a new image object and set its source to the data URI of the file
    const img = new Image();
    img.src = dataUri;

    // Wait for the image to load and then resolve with an object that contains the width and height of the image
    const { width, height } = await new Promise<AddWidthAndHeightResult>(
      resolve => {
        img.onload = () => {
          resolve({ width: img.width, height: img.height });
        };
      }
    );

    // Return an object that contains the name, data URI, width, and height of the file
    return { fileName: file.name, dataUri, width, height };
  };

  // Define a function called handleFileChange that takes a file input change event and returns a Promise that resolves to void
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    // Throw an error if no files are uploaded
    if (!event.target.files) {
      throw new Error('No files uploaded');
    }

    // Convert the FileList object to an array
    const filesArray = Array.from(event.target.files);

    // Map over the array of files and read each file
    const fileReaderPromises = filesArray.map(readFile);

    // Wait for all the file reading to complete
    const fileReaderResults = await Promise.all(fileReaderPromises);

    // Map over the array of file reader results and add the width and height of each image
    const filesWithDimensions = await Promise.all(
      fileReaderResults.map(addWidthAndHeight)
    );

    // Filter out the files that already exist in state and add the new files to the state
    const newFiles = filesWithDimensions.filter(newFile => {
      return !files.find(file => file.fileName === newFile.fileName);
    });
    setFiles([...files, ...newFiles]);
  };

  // Return an object that contains the files state and the handleFileChange function

  // return an object containing the current state of files and the function to handle file input changes
  return { files, handleFileChange };
};

export default useFileReader;
