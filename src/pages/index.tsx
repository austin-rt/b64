import React, { useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import useFileReader from '../hooks/useFileReader';
import Nav from '../components/Nav';
import { useAppSelector } from '@/redux/store';
import useAuth from '@/hooks/useAuth';
import { API_ENDPOINTS, BASE_URL } from '@/constants/consts';
import axios from 'axios';

export default function Home() {
  const { files, handleFileChange } = useFileReader();
  const { getUser, loading, error } = useAuth();
  const imageWidth = 75;
  const user = useAppSelector(state => state.UserSlice.user);

  useEffect(() => {
    getUser();
  }, []);

  const handleCopyClick = (str: string) => {
    if (str) {
      navigator.clipboard.writeText(str);
    }
  };

  // combine into one function with conditional
  const handleSaveToProfile = (file: any) => {
    if (file) {
      axios.put(`${BASE_URL.API}/${API_ENDPOINTS.USERS}/${user._id}`, file);
    }
  };

  const handleSaveAllToProfile = () => {
    if (files) {
      axios.put(`${BASE_URL.API}/${API_ENDPOINTS.USERS}/${user._id}`, files);
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
      <Nav />
      <main>
        <div>
          <label
            className='button'
            htmlFor='convert'
            style={{
              cursor: 'pointer',
              border: '1px solid black',
              padding: '.5rem 1rem'
            }}
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
        <div style={{ marginTop: '1rem' }}>
          <button onClick={handleSaveAllToProfile}>Add all to Profile</button>
        </div>
        <div>
          {files.length > 0 &&
            files.map(file => (
              <div key={file.fileName}>
                <h3>{file.fileName}</h3>
                <Image
                  src={file.dataURI}
                  alt={file.fileName}
                  unoptimized
                  width={imageWidth}
                  height={(file.height / file.width) * imageWidth}
                />
                <pre>
                  <code>{file.dataURI.substring(0, 50)}...</code>
                </pre>
                <button
                  onClick={() => {
                    handleCopyClick(file.dataURI);
                  }}
                >
                  copy
                </button>
                <button
                  onClick={() => {
                    handleSaveToProfile(file.dataURI);
                  }}
                >
                  save to profile
                </button>
              </div>
            ))}
        </div>
      </main>
    </>
  );
}
