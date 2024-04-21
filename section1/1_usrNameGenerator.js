const checkName = name =>{
    //Function to check
    return name.split(" ").length === 2
}
const askUsrName = () =>{
    let name = ""
    while(checkName(name) === false) {
        name = prompt("Please enter one name and one surname, separated by one space:")
        if (checkName(name) === false) {
            alert("Please enter a valid answer")
        }
    }
    return name
}

const isUsrNameInDb = (usrName, db) => {
    return Object.keys(db).includes(usrName)
}

const usrNameGenerator = (name, db) =>{
    let splitName = name.split(" ")
    let usrName = splitName.map(element => element.slice(0,3)).join("").toLowerCase()
    let counter = 0
    let newUsrName = usrName
    while(isUsrNameInDb(newUsrName, db)){
        counter++
        console.log(newUsrName)
        newUsrName = usrName + counter
    }
    return newUsrName
}

const isAnsOk = (op, optionsList) => {
    return optionsList.includes(op)
}

const ask2continue = (msg, optionsList) =>{
    let ans
    while(optionsList.includes(op) == false){
        ans = prompt(msg)
        if(optionsList.includes(op) == false) {
            alert("Please enter a valid answer")
        }
    }
    return ans
}

const main = () => {
    alert("Welcome to the application!")
    let users = {}, ans = true, name
    while (ans) {
        msg = "Do you want to add an user?"
        //ans = ask2continue(msg, optionsList)
        if (confirm(msg) === false) {
            break
        }
        usrName = askUsrName()
        usrName = usrNameGenerator(usrName, users)
        // Adding new user to the database
        users[usrName] = usrName + "@myDomain.com"
        alert(`Username "${usrName}" added with email "${users[usrName]}"`)
        console.table(users)
    }
    alert("Thanks for using the program!")
}

main()