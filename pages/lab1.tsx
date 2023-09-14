import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import React from "react";
import Link from "next/link";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Button from "@mui/material/Button";
import { getRandomInt, getRandom_pn_ls, getRandom_mask } from "@/components/lib/random_utils";
import { getTwoComplement } from "@/components/lib/format";

const Lab1: NextPage = () => {
    // constants
    const [num_directed, setDirected] = React.useState(20);
    const [num_random, setRandom] = React.useState(100);
    const [format_as_binary, setBinary] = React.useState(true);

    const MAX_INT = (2 ** 31) - 1;
    const MIN_INT = - (2 ** 31);

    const edge_cases = [
        [2147483647, -2147483648],
        [2147483647, 2147483647],
        [2147483647, 2147483647],
        [-2147483648, -2147483648],
        [0, 0],
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
        [1, -1],
        [-1, 1],
        [1, 1],
        [-1, -1],
    ];

    const first_line =
        "\n# Notes: Please see the lab report for detailed insight into how testing works." +
        "\n#        " +
        "\n#        The first line below is the header, indicating the pins and their bit widths." +
        "\n#        " +
        `\n#        The next sections are directed test cases specified by the lab manual.` +
        "\n#        " +
        `\n#        For each section, there are ${Math.floor(num_random / 20)} test cases. ` +
        "\n#        " +
        `\n#        The following ${num_random} lines are random test cases generated by the custom test case generator.` +
        "\n#        " +
        `\n#        The last ${edge_cases.length} lines are carefully-generated tests that conform to specific edge cases.` +
        "\n#        " +
        `\n#        See the design report for more information.` +
        `\n` +
        `\n A[31:0] B[31:0] Out[31:0]` + 
        `\n# Number Format: ${format_as_binary ? "binary" : "decimal"}` 

    type SingularTestCase = {
        line: string;
        features: {
            isAPositive: boolean;
            isBPositive: boolean;
            isAZero: boolean;
            isBZero: boolean;
            isALarge: boolean;
            isBLarge: boolean;
            isASparse: boolean;
            isBSparse: boolean;
        };
    };

    const isSparse = (a: number) => {
        if ((a & (a >> 1)) == 0) return true;
        return false;
    }

    // generates a new singlar test case
    const newLine = (asBinary: boolean, alpha?: number, beta?: number): SingularTestCase => {
        let line = "";

        let a: number, b: number;

        if (alpha !== undefined && beta !== undefined) {
            a = alpha
            b = beta
        } else {
            a = Math.floor(Math.random() * (MAX_INT - MIN_INT + 1)) + MIN_INT;
            b = Math.floor(Math.random() * (MAX_INT - MIN_INT + 1)) + MIN_INT;
        }

        let out = a * b;

        if (asBinary) {
            line += getTwoComplement(a) + " ";
            line += getTwoComplement(b) + " ";
            line += getTwoComplement(out) + " ";
        } else {
            line += a + " ";
            line += b + " ";
            line += out + " ";
        }

        return {
            line: line,
            features: {
                isAPositive: a !== 0 && a > 0,
                isBPositive: b !== 0 && b > 0,
                isAZero: a == 0,
                isBZero: b == 0,
                isALarge: Math.abs(a) > Math.floor(MAX_INT / 2),
                isBLarge: Math.abs(b) > Math.floor(MAX_INT / 2),
                isASparse: isSparse(a),
                isBSparse: isSparse(b)
            },
        };
    };

    // hook to display the generated test file
    const [testCases, setTestCases] = React.useState("");

    const getDirected = (num_directed: number) => {
        const possibilities = [
            { typeA: [true, true], typeB: [true, true] },  // A (Large Positive), B (Large Positive)
            { typeA: [true, false], typeB: [true, true] },
            { typeA: [false, true], typeB: [true, true] },
            { typeA: [false, false], typeB: [true, true] },

            { typeA: [true, true], typeB: [true, false] },
            { typeA: [true, false], typeB: [true, false] },
            { typeA: [false, true], typeB: [true, false] },
            { typeA: [false, false], typeB: [true, false] },

            { typeA: [true, true], typeB: [false, true] },
            { typeA: [true, false], typeB: [false, true] },
            { typeA: [false, true], typeB: [false, true] },
            { typeA: [false, false], typeB: [false, true] },

            { typeA: [true, true], typeB: [false, false] },
            { typeA: [true, false], typeB: [false, false] },
            { typeA: [false, true], typeB: [false, false] },
            { typeA: [false, false], typeB: [false, false] },
        ];

        let newText = "";
        for (let i = 0; i < possibilities.length; i++) {
            const { typeA, typeB } = possibilities[i];

            newText += `\n/-- A (${typeA[1] ? 'Large' : 'Small'} ${typeA[0] ? 'Positive' : 'Negative'}), B (${typeB[1] ? 'Large' : 'Small'} ${typeB[0] ? 'Positive' : 'Negative'})`;

            for (let j = 0; j < num_directed; j++) {
                let a = getRandom_pn_ls(typeA[0], typeA[1]);
                let b = getRandom_pn_ls(typeB[0], typeB[1]);

                let o = newLine(format_as_binary, a, b);

                newText += "\n" + o.line;

            }

            newText += "\n--/";
        }

        return newText;
    }

    const generate = (): void => {
        const features: string[] = []

        let newText = "";
        newText += first_line;

        newText += getDirected(num_directed);

        newText += `\n/-- Mask Low Order Bits `;

        for (let j = 0; j < num_directed; j++) {
            let a = getRandomInt();
            let b = getRandom_mask(true);

            let o = newLine(format_as_binary, a, b);

            newText += "\n" + o.line;

        }

        newText += "\n--/";

        newText += `\n/-- Mask Middle Bits `;

        for (let j = 0; j < num_directed; j++) {
            let a = getRandomInt();
            let b = getRandom_mask(false);

            let o = newLine(format_as_binary, a, b);

            newText += "\n" + o.line;

        }

        newText += "\n--/";

        newText += `\n/-- Sparse Tests`;

        for (let j = 0; j < num_directed; j++) {
            let a = getRandomInt();
            let b = getRandom_mask(false);

            let o = newLine(format_as_binary, a, b);

            newText += "\n" + o.line;

        }

        newText += "\n--/";

        newText += `\n/-- Dense Tests`;

        for (let j = 0; j < num_directed; j++) {
            let a = getRandomInt();
            let b = getRandom_mask(false);

            let o = newLine(format_as_binary, a, b);

            newText += "\n" + o.line;

        }

        newText += "\n--/";

        // add the edge cases
        newText += "\n/-- Edge Cases --/";
        for (let i = 0; i < edge_cases.length; i++) {
            let o = newLine(format_as_binary, edge_cases[i][0], edge_cases[i][1]);

            features.push(Object.values(o.features).toString());

            newText += "\n" + o.line;
        }

        for (let i = 0; i < num_random; i++) {
            // Generate a new test case
            let o = newLine(format_as_binary);

            features.push(Object.values(o.features).toString());

            // Append the new line to the text
            newText += "\n" + o.line;
        }

        setTestCases(newText);
    };

    const [inputValue, setInputValue] = React.useState('');

    const handleSubmit = (event: any) => {
        event.preventDefault();

        let x = parseInt(inputValue);

        if (!isNaN(x) && x < 2500) {
            setRandom(x);
            setDirected(Math.floor(x / 20));
            setInputValue('');
        }
    };

    const handleChange = (event: any) => {
        setInputValue(event.target.value);
    };

    React.useEffect(() => {
        generate();
    }, [num_random, num_directed]);

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
                <Link href="/" className={styles.return}>
                    Return Home
                </Link>
                <br />
                <Button onClick={() => setBinary(!format_as_binary)} variant="contained">
                    {format_as_binary ? "Switch to Decimal" : "Switch to Binary"}
                </Button>
                <br />

                <form onSubmit={handleSubmit}>
                    <input type="text" value={inputValue} onChange={handleChange} placeholder="Enter # of Testcases" />
                    <Button type="submit">Generate Test Cases</Button>
                </form>
                <br />
                <CopyToClipboard text={testCases}>
                    <Button className='bg-blue-600 text-white text-sm leading-6 font-medium py-2 px-5 rounded-lg' variant="contained">
                        Copy to Clipboard
                    </Button>
                </CopyToClipboard>
                <br />
                <br />
                <hr />
                <br />
                <code className={styles.code}>{testCases}</code>
                <br />
            </main>
        </div>
    );
};

export default Lab1;