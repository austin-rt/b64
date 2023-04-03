import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
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
        <label
          className='new-button'
          htmlFor='convert'
        >
          Convert Files
        </label>
        <input
          id='convert'
          type='file'
        />
      </main>
    </>
  );
}
