const validateMarks = marks => {
    let splitMarks = marks.split(" ")
    return splitMarks.every(element => isNaN(Number(element)) === false && ( element >= 0  && element <= 10))
}

const calcAvg = marks =>{
    let splitMarks = marks.split(" ")
    return splitMarks.reduce((a,b) => Number(a)+Number(b)) / splitMarks.length
}

const main = () => {
    let marks
    do{
        marks = prompt("Please enter your marks separated by spaces. Only numbers from 1 to 10 allowed: ")
        if(validateMarks(marks) === false){
            alert("One of your marks is not in the appropriate format")
        }
    }while(validateMarks(marks) === false)

    alert(`The average of your marks is ${calcAvg(marks)}`)
}

main()