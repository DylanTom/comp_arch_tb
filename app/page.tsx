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
        </div>

        {/* <div className={styles.grid}>
                    <Link href='/adder' className={styles.card}>
                        <a href='' className={styles.card}>
                            <h2>Test Add32 &rarr;</h2>
                            <p>
                                32-bit adder for signed two's complement
                                numbers.
                            </p>
                        </a>
                    </Link>

                    <Link href='/leftshifter' className={styles.card}>
                        <a href='' className={styles.card}>
                            <h2>Test LeftShift32 &rarr;</h2>
                            <p>32-bit logical left-shifter</p>
                        </a>
                    </Link>

                    <Link href='/alu' className={styles.card}>
                        <a href='' className={styles.card}>
                            <h2>Test ALU &rarr;</h2>
                            <p>32-bit ALU</p>
                        </a>
                    </Link>
                </div> */}
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