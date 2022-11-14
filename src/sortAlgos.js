function convertData(arr) {
    return arr.map((value, index) => ({
            index: index,
            value: value
        }
    ))
}

function bubbleSort(arr) {
    let dataArr = arr.map(obj => obj.value)
    for (let i = 0; i<dataArr.length; i++) {
        let j = i+1
        while (dataArr[i] > dataArr[j]) {
            [dataArr[i], dataArr[j]] = [dataArr[j], dataArr[i]]
            j++
        }

    }

    console.log(convertData(dataArr))
    return convertData(dataArr)
}

export {bubbleSort}