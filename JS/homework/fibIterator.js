const fibonacci = {
    [Symbol.iterator]: () => {
        let n1 = 0, n2 = 1;
        return {
            next: () => {
                let current = n1 + n2;
                n1 = n2;
                n2 = current;
                return {
                    value: current,
                    done: false
                };
            }
        };
    }
};
for (const n of fibonacci) {
    if (n > 100) break;
    console.log(n);
}