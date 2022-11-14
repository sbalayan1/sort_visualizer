function convertData(arr) {
    return arr.map((value, index) => ({
            index: index,
            value: value
        }
    ))
}

function bubbleSort(arr) {
    // let dataArr = arr.map(obj => obj.value)
    for (let i = 0; i<arr.length; i++) {
        let j = i+1
        while (arr[i] > arr[j]) {
            [arr[i], arr[j]] = [arr[j], arr[i]]
            j++
        }
    }

    return arr
}

function partition(arr, start, end) {
    let pivot = arr[start]
    let swapIdx = start

    for (let i = start+1; i<=end; i++) {
        if (arr[i] < pivot) {
            swapIdx++
            [arr[swapIdx], arr[i]] = [arr[i], arr[swapIdx]]
        }
    }

    [arr[start], arr[swapIdx]] = [arr[swapIdx], arr[start]]
    return swapIdx
}

function quickSort(arr, left, right) {
    if (left < right) {
        let pivotIndex = partition(arr, left, right)
        quickSort(arr, left, pivotIndex - 1)
        quickSort(arr, pivotIndex + 1, right)

    }

    return arr
}

export {bubbleSort, quickSort, convertData}