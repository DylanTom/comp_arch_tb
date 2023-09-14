const getTwoComplement = (a: number, nbits: number = 32) => {
    const MAX_INT = (2 ** (nbits - 1)) - 1;
    const MIN_INT = - (2 ** (nbits - 1));

    if (a < MIN_INT || a > MAX_INT) {
        return a.toString(2).slice(-nbits)
    }
    else if (a >= 0 && a <= MAX_INT) {
        return a.toString(2).padStart(nbits, '0');
    } else {
        const positiveValue = (-a) ^ MAX_INT;
        return (positiveValue + 1).toString(2).padStart(nbits, '1');
    }
}


export { getTwoComplement }