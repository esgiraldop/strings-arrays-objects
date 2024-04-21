const isEmailOK = email => {
    const emailRegex = new RegExp(/^\S+[@][^. ]+[.]\S{2,3}$/)
    return emailRegex.test(email)
}

const main = () => {
    do{
    email = prompt("Please enter an email address: ")
    if(isEmailOK(email) === false){
        alert("Please enter a valid email")
    }else{
        alert("Your email is valid!")
    }
}while(isEmailOK(email) === false)
}

main()