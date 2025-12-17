export function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomFiveDigit() {
    return Math.floor(10000 + Math.random() * 90000);
}
