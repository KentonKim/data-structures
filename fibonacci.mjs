export const fibR = (number) => {
    if (number < 1 || !Number.isInteger(number)) {
        throw new Error('Enter a positive integer')
    }
    if (number === 1 ) {
        return [0]
    }
    else if (number === 2) {
        return [0, 1]
    }
    const array = fibR(number - 1 )
    array.push(array[array.length - 1] + array[array.length - 2])
    return array
}

export const fibIt = (number) => {
    if (number < 1 || !Number.isInteger(number)) {
        throw new Error('Enter a positive integer')
    }
    if (number === 1 ) {
        return [0]
    }
    const array = [0,1]
    for (let i = 2; i < number; i += 1) {
        array.push(array[array.length-1] + array[array.length - 2])    
    }
    return array
}
