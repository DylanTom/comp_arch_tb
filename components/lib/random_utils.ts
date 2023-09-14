
const getRandomInt = (nbits: number = 32) => {
    const MAX_INT = (2 ** (nbits - 1)) - 1;
    const MIN_INT = - (2 ** (nbits - 1));

    return Math.floor(Math.random() * (MAX_INT - MIN_INT + 1)) + MIN_INT;
}

const getRandom_pn_ls = (isPositive: boolean, isLarge: boolean, nbits: number = 32): number => {
    const MAX_INT = (2 ** (nbits - 1)) - 1;
    const MIN_INT = - (2 ** (nbits - 1));

    switch (true) {
        // Large positive number
        case isPositive && isLarge:
            return Math.floor(Math.random() * ((MAX_INT / 2) + 1) + (MAX_INT / 2));
        // Small positive number
        case isPositive && !isLarge:
            return Math.floor(Math.random() * ((MAX_INT / 2) + 1));
        // Large negative number
        case !isPositive && isLarge:
            return Math.floor(Math.random() * (-(MIN_INT / 2) + 1) + (MIN_INT));
        // Small negative number
        case !isPositive && !isLarge:
            return Math.floor(Math.random() * (-(MIN_INT / 2) + 1) + (MIN_INT / 2));
        default:
            return 0;
    }
}

const getRandom_sd = ( isSparse: boolean, nbits: number = 32) => {
    const MAX_INT = (2 ** (nbits - 1)) - 1;
    const MIN_INT = - (2 ** (nbits - 1));

    switch (isSparse) {
        case true:
            return (Math.random() * (MAX_INT - MIN_INT)) | 0;
        case false:
            return
    }
}

const getRandom_mask = (isLower: boolean, nbits: number = 32) => {
    const MAX_INT = (2 ** (nbits - 1)) - 1;
    const MIN_INT = - (2 ** (nbits - 1));

    const res = Math.floor(Math.random() * (MAX_INT - MIN_INT + 1)) + MIN_INT;
    const maskAmt = Math.floor(Math.random() * (nbits / 2));

    switch (isLower) {
        case true:
            const bitmaskA = ~(0xFFFFFFFF >>> maskAmt); // Create bitmask with x trailing zeros
            return res & bitmaskA;
        case false:
            const bitmaskStart = 0xFFF00000; // Bitmask for the first 16 bits of the middle 20 bits
            const bitmaskEnd = 0xFFFFF; // Bitmask for the last 4 bits of the middle 20 bits
            const bitmask = bitmaskStart | bitmaskEnd
            return res & bitmask;
    }
}

export { getRandomInt, getRandom_pn_ls, getRandom_sd, getRandom_mask }