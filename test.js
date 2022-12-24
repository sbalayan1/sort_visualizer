const selectionSort = (arr) => {
    for (let i = 0; i<arr.length; i++) {
        let min = i
        for (let j = i+1; j<arr.length; j++) {
            if (arr[min] > arr[j]) min = j
        }

        if (i != min) [arr[i], arr[min]] = [arr[min], arr[i]]
    }

    return arr
}

console.log(selectionSort([55555,4444,333,22,11,444444,111,3333333333,111111111,0.1]))