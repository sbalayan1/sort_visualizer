function bubbleSort(arr) {
    for (let i = 0; i<arr.length; i++) {
        let j = i + 1
        while (arr[i] > arr[j]) {
            [arr[i], arr[j]] = [arr[j], arr[i]]
            j++
        }

    }
    return arr
}

export {bubbleSort}