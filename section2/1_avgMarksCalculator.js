import {calcAvg, askMarks} from "./utilities.js";

const main = () => {
    let msg = "Please enter your marks separated by spaces. Only numbers from 1 to 10 allowed: "
    let marks = askMarks(msg, " ")
    alert(`The average of your marks is ${calcAvg(marks, " ")}`)
}
main()