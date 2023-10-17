const mergeSort = (array) => {
    if (array.length === 1) {
        return array;
    };
    const mid = Math.floor(array.length/2)
    const left = mergeSort( array.slice(0, mid) )
    const right = mergeSort( array.slice(mid) )
    const output = []
    let i = 0
    let j = 0
    while (i < left.length) {
        while (j < right.length && right[j] < left[i]) {
            output.push(right[j])
            j += 1
        }
        output.push(left[i])
        i += 1
    }
    output.push(...right.slice(j))
    return output;
}
export default mergeSort