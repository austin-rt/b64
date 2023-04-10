import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import useFileReader from '../hooks/useFileReader';
import Nav from '../components/Nav';
import axios from 'axios';
import { API_ENDPOINTS, BASE_URL } from '@/constants/consts';
import { IUserDocument } from '@/types/interfaces';

export default function Home() {
  const [user, setUser] = useState();
  const { files, handleFileChange } = useFileReader();
  const imageWidth = 75;

  const handleCopyClick = (str: string) => {
    if (str) {
      navigator.clipboard.writeText(str);
    }
  };

  const getUser = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL.API}/${API_ENDPOINTS.AUTH.LOGIN.SUCCESS}`,
        {
          withCredentials: true
        }
      );
      if (data.user) {
        setUser(data.user);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

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
      <Nav />
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
