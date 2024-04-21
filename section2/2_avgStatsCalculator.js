import {calcAvg, askMarks, calcMax, calcMin, countEqualOrGreaterThreshold, countLowerThreshold, sortMarks} from "./utilities.js"

const main = () => {
    let msg = "Please enter your marks separated by commas. Only numbers from 1 to 100 allowed: "
    let marks = askMarks(msg, ",")
    alert(`The average students mark is ${calcAvg(marks, ",")}\n`+
        `The maximum mark is ${calcMax(marks, ",")}\n`+
        `The minimum mark is ${calcMin(marks, ",")}\n`+
        `The number of passing students is ${countEqualOrGreaterThreshold(marks, ",")}\n`+
        `The number of failing students is ${countLowerThreshold(marks, ",")}\n`+
        `The marks sorted from highest to lowest are ${sortMarks(marks, ",")}`)
}
main()