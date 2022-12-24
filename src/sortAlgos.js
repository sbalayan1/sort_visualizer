const abortController = new AbortController
let signal = abortController.signal

function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time))
}

function convertData(arr) {
    return arr.map((value, index) => ({
            index: index,
            value: value
        }
    ))
}

async function bubbleSort(arr, setState, setData) {
    for (let i = 0; i<arr.length; i++) {
        let j = i+1
        setState(i)
        await sleep(500)

        while (arr[i] > arr[j]) {
            [arr[i], arr[j]] = [arr[j], arr[i]]
            setData(convertData(arr))
            await sleep(500)
            setState(j)
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

async function quickSort(arr, left, right, setState, setSection, setData) {
    if (signal.aborted) {
        console.log("aborted")
        signal = abortController.signal
        return arr
    }
    if (left < right) {
        let pivotIndex = partition(arr, left, right)
        setState(pivotIndex)
        await sleep(1000)

        await quickSort(arr, left, pivotIndex - 1, setState, setSection, setData)
        await quickSort(arr, pivotIndex + 1, right, setState, setSection, setData)

    }

    setData(convertData(arr))
    await sleep(1000)

    return arr
}

function cyclicSort(arr) {
    let i = 0
    while (i<arr.length) {
        let j = arr[i] - 1
        if (arr[i] !== arr[j]) {
            [arr[i], arr[j]] = [arr[j], arr[i]]
        } else {
            i++
        }
    }

    return arr
}

function selectionSort(arr) {
    for (let i=0; i<arr.length; i++) {
        let min = i
        for (let j=i+1; j<arr.length; j++) {
            if (arr[j] < arr[min]) {
                min = j
            }
        }

        if (min !== i) {
            [arr[i], arr[min]] = [arr[min], arr[i]]
        }
    }

    return arr
}


export {bubbleSort, quickSort, cyclicSort, convertData, sleep}