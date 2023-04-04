import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [selectedFiles, setSelectedFiles] = useState<
    { fileName: string; dataUri: string }[]
  >([]);

  const fileSelectedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files: any[] = [];
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.result) {
            files.push({
              fileName: file.name,
              dataUri: reader.result
            });
          }
        };
        reader.readAsDataURL(file);
        setSelectedFiles(files);
      }
    }
  };

  return (
    <>
      <Head>
        <title>b64</title>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
        <link
          rel='icon'
          href='/favicon.ico'
        />
      </Head>
      <main className={styles.main}>
        <div>
          <label
            className='button'
            htmlFor='convert'
          >
            Convert Files
          </label>
          <input
            id='convert'
            type='file'
            multiple
            onChange={fileSelectedHandler}
          />
        </div>
        <div className='image-wrapper'>
          {selectedFiles.length > 0 &&
            selectedFiles.map(file => (
              <div
                key={`${file.fileName}-${Date.now()}`}
                className=''
              >
                <h3>{file.fileName}</h3>
                <img
                  src={file.dataUri}
                  alt={file.fileName}
                  className='thumbnail'
                />
              </div>
            ))}
        </div>
      </main>
    </>
  );
}
