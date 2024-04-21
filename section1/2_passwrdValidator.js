const generateTestsDict =  (password)=> {
    const atLeast8Chars = str => str.length > 7
    const regex1numAtLeast = new RegExp(/\d+/)
    const regex1letterAtLeast = new RegExp(/[a-zA-Z]+/)
    const regex1specCharAtLeast = new RegExp(/[!@#$%^&*()+=_\-{}\[\]:;"'?<>,.|\/~`]+/)

    return [
    {test:atLeast8Chars(password), msg:"* The password does not have at least 8 characters"},
    {test:regex1numAtLeast.test(password), msg:"* The password does not have at least 1 number"},
    {test:regex1letterAtLeast.test(password), msg:"* The password does not have at least 1 letter"},
    {test:regex1specCharAtLeast.test(password), msg:"* The password does not have at least 1 special character"}
] }

const isPasswordOk = (password) => {
    const testsDict = generateTestsDict(password)
    const errorMssgs = []
    if(testsDict[0].test && testsDict[1].test && testsDict[2].test && testsDict[3].test){
        alert("Your password is safe")
        return true
    }else{
        filteredErrors = testsDict.filter(element => element.test === false)
        filteredErrors.forEach(elem => errorMssgs.push(elem.msg))
        alert("Your password is not safe\n" + errorMssgs.join('\n'))
        return false
    }
}

const main = () => {
    let password
    do {
        password = prompt("Please enter a password: ")
    }while(isPasswordOk(password) === false)
}

main()