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
            // console.log('swapping elements')
            [arr[i], arr[j]] = [arr[j], arr[i]]
            setData(convertData(arr))
            await sleep(500)
            setState(j)
            j++
            // await sleep(2000)
        }
        // setData(convertData(arr))
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

async function quickSort(arr, left, right, setState, setData) {
    if (left < right) {
        let pivotIndex = partition(arr, left, right)
        setState(pivotIndex)
        await sleep(1000)

        await quickSort(arr, left, pivotIndex - 1, setState, setData)
        await quickSort(arr, pivotIndex + 1, right, setState, setData)

    }

    setData(convertData(arr))
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

export {bubbleSort, quickSort, cyclicSort, convertData}