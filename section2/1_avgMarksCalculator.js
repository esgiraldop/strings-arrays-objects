const validateMarks = (marks, splitChar) => {
    let splitMarks = marks.split(splitChar)
    return splitMarks.every(element => isNaN(Number(element)) === false && ( element >= 0  && element <= 10))
}

const calcAvg = (marks, splitChar) =>{
    let splitMarks = marks.split(splitChar)
    return splitMarks.reduce((a,b) => Number(a)+Number(b)) / splitMarks.length
}

const askMarks = (msg) => {
    let marks
    do{
        marks = prompt(msg)
        if(validateMarks(marks, " ") === false){
            alert("One of your marks is not in the appropriate format")
        }
    }while(validateMarks(marks, " ") === false)
    return marks
}

const main = () => {
    let msg = "Please enter your marks separated by spaces. Only numbers from 1 to 10 allowed: "
    let marks = askMarks(msg)
    alert(`The average of your marks is ${calcAvg(marks, " ")}`)
}

main()

export {calcAvg, askMarks}