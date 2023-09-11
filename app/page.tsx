import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>CS4420 Test Bench</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {" "}
          <a href='' className='font-bold'>
            Computer Architecture Test Bench
          </a>
        </h1>

        <p className={styles.description}>
          Made by Vanessa Fang & Dylan Tom
        </p>
        <div className={styles.grid}>
          <Link href='/lab1' className={styles.card}>
            <h2>Lab 1 &rarr;</h2>
            <p>
              Iterative Integer Multiplier
            </p>
          </Link>
          <Link href='/lab2' className={styles.card}>
            <h2>Lab 2 &rarr;</h2>
            <p>
              Pipelined Processor
            </p>
          </Link>
          <Link href='/lab3' className={styles.card}>
            <h2>Lab 3 &rarr;</h2>
            <p>
              Blocking Cache
            </p>
          </Link>
          <Link href='/lab4' className={styles.card}>
            <h2>Lab 4 &rarr;</h2>
            <p>
              Multicore Processor
            </p>
          </Link>
        </div>

      </main>

      <footer className={styles.footer}>
        <p >
          Inspired by Daniel Wei
        </p>

        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image
              src='/vercel.svg'
              alt='Vercel Logo'
              width={72}
              height={16}
            />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;