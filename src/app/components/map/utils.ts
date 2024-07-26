export const pointsCloseTo = (
    a: [number, number, number?],
    b: [number, number, number?]
) => {
    return Math.abs(a[0] - b[0]) < 0.001 && Math.abs(a[1] - b[1]) < 0.001
}
