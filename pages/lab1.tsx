import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import React from "react";
// import RandomUtils from "../libs/random";
// import { CopyToClipboard } from "react-copy-to-clipboard";

const Lab1: NextPage = () => {
    // constants
    const num_of_lines = 20;
    const format_as_binary = false;

    const MAX_INT = 2147483647;
    const MIN_INT = -(MAX_INT + 1);

    const edge_cases = [
        "2147483647 -2147483648",
        "2147483647 2147483647",
        "2147483647 2147483647",
        "-2147483648 -2147483648",
        "-2147483648 -2147483648",
        "2147483647 -2147483648",
        " 0 0",
        "0 0",
        "0 1",
        "-1 1",
        "1 0",
        "-1 0",
        "1 1",
        "0 -1",
    ];

    const first_line =
        "\n# Notes: Please see the lab report for detailed insight into how testing works." +
        "\n#        " +
        "\n#        The first line above is the header, indicating the pins and their bit widths." +
        "\n#        " +
        `\n#        The next ${num_of_lines} lines are test cases generated by the custom test case generator.` +
        "\n#        " +
        `\n#        The last ${edge_cases.length} lines are carefully-generated edge cases that conform to specific use cases` +
        "\n#        " +
        `\n#        See the design report for more information.` +
        `\n` +
        `\n A[32] B[32] Out[32]`

    type SingularTestCase = {
        line: string;
        features: {
            containsNegative: boolean;
            containsPositive: boolean;
            containsZero: boolean;
            containsLarge: boolean;
            containsSmall: boolean;
        };
    };

    const seededRandomFloat = (floor: number, ceiling: number, seed: number) => {
        var x = Math.sin(seed++) * 10000;
        let zeroToOne = x - Math.floor(x);
        return zeroToOne * (ceiling - floor) + floor;
    };

    // generates a new singlar test case
    const newLine = (asBinary: boolean): SingularTestCase => {
        let line = "";

        let a = Math.floor(Math.random() * (MAX_INT - MIN_INT + 1)) + MIN_INT;
        let b = Math.floor(Math.random() * (MAX_INT - MIN_INT + 1)) + MIN_INT;


        let out = a * b;

        if (asBinary) {
            line += a.toString(2) + " ";
            line += b.toString(2) + " ";
            line += out.toString(2) + " ";
        } else {
            line += a + " ";
            line += b + " ";
            line += out + " ";
        }

        return {
            line: line,
            features: {
                containsNegative: a < 0 || b < 0,
                containsPositive: a > 0 || b > 0,
                containsZero: a == 0 || b == 0,
                containsLarge: Math.abs(a) > Math.floor(MAX_INT / 2) || Math.abs(b) > Math.floor(MAX_INT / 2),
                containsSmall: Math.abs(a) < Math.floor(MAX_INT / 2) || Math.abs(b) < Math.floor(MAX_INT / 2)
            },
        };
    };

    // hook to display the generated test file
    const [testCases, setTestCases] = React.useState("");

    const generate = (): void => {
        let featureCheck = {
            containsNegative: false,
            containsPositive: false,
            containsZero: false,
            containsLarge: false,
            containsSmall: false
        };

        let newText = first_line;
        for (let i = 0; i < num_of_lines; i++) {
            // Generate a new test case
            let o = newLine(format_as_binary);

            // Check if the new line contains any of the features
            for (let key in featureCheck) {
                if (o.features[key as keyof typeof o.features]) {
                    featureCheck[key as keyof typeof featureCheck] = true;
                }
            }

            // Append the new line to the text
            newText += "\n" + o.line;
        }

        // if the feature check features aren't all true, generate again
        // for (let key in featureCheck) {
        //     if (!featureCheck[key as keyof typeof featureCheck]) {
        //         generate();
        //         return;
        //     }
        // }

        // add the edge cases
        for (let i = 0; i < edge_cases.length; i++) {
            newText += "\n" + edge_cases[i];
        }

        // if the feature check passes, set the text
        setTestCases(newText);
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Lab 1</title>
                <meta
                    name='description'
                    content='Generated by create next app'
                />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <main className={styles.notmain}>
                <h1 className={styles.title}>
                    Lab 1: Iterative Integer Multiplier
                </h1>
                <br />
                <button onClick={generate} className='hover:cursor-pointer'>
                    Generate Test Cases{" "}
                </button>
                <br />
                {/* <CopyToClipboard text={testCases}>
                    <button className='bg-blue-600 text-white text-sm leading-6 font-medium py-2 px-5 rounded-lg'>
                        Copy to Clipboard
                    </button>
                </CopyToClipboard> */}
                <br />
                <br />
                <hr />
                <br />
                <code className={styles.code}>{testCases}</code>
            </main>
        </div>
    );
};

export default Lab1;