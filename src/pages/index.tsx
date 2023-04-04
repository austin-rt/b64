import Head from 'next/head';
import React from 'react';
import useFileReader from '../hooks/useFileReader';
import Image from 'next/image';

export default function Home() {
  const { files, handleFileChange } = useFileReader();
  const imageWidth = 75;

  const handleCopyClick = (str: string) => {
    if (str) {
      navigator.clipboard.writeText(str);
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
      <main>
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
            hidden
            onChange={handleFileChange}
          />
        </div>
        <div>
          {files.length > 0 &&
            files.map(file => (
              <div key={file.fileName}>
                <h3>{file.fileName}</h3>
                <Image
                  src={file.dataUri}
                  alt={file.fileName}
                  unoptimized
                  width={imageWidth}
                  height={(file.height / file.width) * imageWidth}
                />
                <pre>
                  <code>{file.dataUri.substring(0, 50)}...</code>
                </pre>
                <button
                  onClick={() => {
                    handleCopyClick(file.dataUri);
                  }}
                >
                  copy
                </button>
              </div>
            ))}
        </div>
      </main>
    </>
  );
}
