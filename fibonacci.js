export default fibonacci = (number) => {
    if (number < 1 || !number.isinteger()) {
        throw new Error('Enter a positive integer')
    }
    if (number === 1 ) {
        return [0]
    }
    else if (number === 1) {
        return [0, 1]
    }
    const array = fibonacci(number - 1 )
    array.push(array[array.length - 1] + array[array.length - 2])
    return array
}