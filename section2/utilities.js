const validateMarks = (marks, splitChar) => {
    let splitMarks = marks.split(splitChar)
    return splitMarks.every(element => isNaN(Number(element)) === false && ( element >= 0  && element <= 100))
}

const calcAvg = (marks, splitChar) =>{
    const splitMarks = marks.split(splitChar)
    const notRoundedAns = splitMarks.reduce((a,b) => Number(a)+Number(b)) / splitMarks.length
    return Math.round(notRoundedAns * 100)/100
}

const calcMax = (marks, splitChar) =>{
    const splitMarks = marks.split(splitChar)
    return splitMarks.reduce((a,b) => Number(a) > Number(b) ? a:b)
}

const calcMin = (marks, splitChar) =>{
    const splitMarks = marks.split(splitChar)
    return splitMarks.reduce((a,b) => Number(a) < Number(b) ? a:b)
}

const countEqualOrGreaterThreshold = (marks, splitChar, thr=70) =>{
    const splitMarks = marks.split(splitChar)
    return splitMarks.filter((element) => element >= thr).length
}

const countLowerThreshold = (marks, splitChar, thr=70) =>{
    const splitMarks = marks.split(splitChar)
    return splitMarks.filter((element) => element < thr).length
}

const sortMarks = (marks, splitChar) =>{
    return marks.split(splitChar).sort((a,b) => b-a)
}

const askMarks = (msg, splitChar) => {
    let marks
    do{
        marks = prompt(msg)
        if(validateMarks(marks, splitChar) === false){
            alert("One of your marks is not in the appropriate format")
        }
    }while(validateMarks(marks, splitChar) === false)
    return marks
}

export {calcAvg, askMarks, calcMax, calcMin, countEqualOrGreaterThreshold, countLowerThreshold, sortMarks}