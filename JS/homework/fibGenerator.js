function* fibonacci(num) {
    let current = 0;
    let next = 1;

    while (current <= num) {
        yield current;
        next = current + next;
        current = next - current;
    }
}

const gen = fibonacci(100);
for (const x of gen) {
    console.log(x)
}