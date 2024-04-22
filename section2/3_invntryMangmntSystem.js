// UTILITY FUNCTIONS

const askMenuOption = (msg, values) =>{
    let ans
    do{
        ans = prompt(msg)
        if(values.includes(ans) === false){
            alert("Please enter a valid value")
        }
    }while(values.includes(ans) === false)
    return ans
}

const checkPosNum = (num) =>{
    num = Number(num)
    return !isNaN(num) && num >= 0
}

const askPosNum = (msg) =>{
    do{
        num = prompt(msg)
        if(checkPosNum(num) === false){
            alert("Please enter a valid option")
        }
    }while(checkPosNum(num) === false)
    return Number(num)
}

const checkPosInt = (num) =>{
    num = Number(num)
    return !isNaN(num) && num >= 0 && Math.round(num) === num
}

const askPosInt = (msg) =>{
    do{
        num = prompt(msg)
        if(checkPosInt(num) === false){
            alert("Please enter a valid option")
        }
    }while(checkPosInt(num) === false)
    return Number(num)
}

const getDbElemsAsString = (products) =>{
    return products.map(element =>
        `id:${element.id}, name:${element.name}, Unitary price: ${element.price},`+
        `quantity: ${element.quantity}, description:${element.description}`).
    join("\n")
}

const isNameInDb = (products, name2Search) => {
    return products.map(element => element.name).includes(name2Search)
}

const askExistentName = (products, msg) => {
    do{
        name2Search = prompt(msg)
        if(isNameInDb(products, name2Search) === false){
            alert("That name does not exist in the database")
        }
    }while(isNameInDb(products, name2Search) === false)
    return name2Search
}

const isIdInDb = (products, id2Search) => {
    return products.map(element => element.id).includes(Number(id2Search))
}

const askExistentId = (products, msg) => {
    do{
        id2Search = prompt(msg)
        if(isIdInDb(products, id2Search) === false){
            alert("That id does not exist in the database")
        }
    }while(isIdInDb(products, id2Search) === false)
    return id2Search
}

//MENU FUNCTIONS

const addProduct = (products) =>{
    // Function to option 1
    let msg, price, quantity, description
    //TODO: Names should be unique, so when there is a given name already, I should append a number
    name = prompt("Please enter a name for the product").toLowerCase()
    msg = "Please enter the unitary price of the product in dollars."+
        "Enter only positive numbers"
    price = askPosNum(msg)
    msg = "Please enter the number of items in stock"+
        "Enter only positive integers"
    quantity = askPosInt(msg)
    description = prompt("Please enter the description of the product")
    const id = products.length === 0 ? 1:products[products.length-1].id + 1
    products.push({
        id,
        name,
        price,
        quantity,
        description
    })
    alert(`Product ${name} added`)
}

const duplicateProduct = (products) =>{
    // Function for option 2
    let msg, ans, values, existentName, foundElement, minPrice, maxPrice
    if(products.length === 0){
        alert("There are no products in the database")
    }else{
        msg = "Please enter the id of the element you want to duplicate:"
        existentId = askExistentId(products, msg)
        foundElement = products.find(element => element.id === Number(existentId))
        copiedElement = {...foundElement}
        copiedElement.id = products[products.length-1].id + 1
        copiedElement.name = copiedElement.name + " copy"
        products.push(copiedElement)
        alert(`A copy of the element with id ${existentId} was created. The id for the copy is ${copiedElement.id}`)
    }
}

const viewProducts = (products) =>{
    // Function for option 3
    let msg, ans, values, existentName, foundElement, minPrice, maxPrice
    if(products.length === 0){
        alert("There are no products in the database")
    }else{
        msg = "Please enter a value:\n"+
            "1. Show all products\n"+
            "2. Show product by name\n"+
            "3. Show products between a minimum and maximum price\n"
        values = ['1', '2', '3']
        ans = askMenuOption(msg, values)
        if(ans === "1"){
            alert("These are the products in the database:\n"+getDbElemsAsString(products))
            return
        }
        if(ans === "2"){
            msg = "Please enter the name of the element you want to visualize:"
            existentName = askExistentName(products, msg)
            foundElement = products.find(element => element.name === existentName)
            alert("Here is the element you are looking for:\n"+JSON.stringify(foundElement))
            return
        }
        if(ans === "3"){
            msg = "Please enter the minimum price. Please enter only positive numbers"
            minPrice = askPosNum(msg)
            msg = "Please enter the maximum price. Please enter only positive numbers"
            maxPrice = askPosNum(msg)
            foundElements = products.filter(element => element.price >=minPrice &&  element.price <= maxPrice)
            alert("Here are the elements you are looking for:\n"+getDbElemsAsString(foundElements))
        }
    }
}

const updateProduct = (products) =>{
    // Function for option 4
    let msg, ans, values, existentId, foundElement
    if(products.length === 0){
        alert("There are no products in the database")
    }else{
        msg = "Please enter the id of the element you want to update:"
        existentId = askExistentId(products, msg)
        foundElement = products.find(element => element.id === Number(existentId))
        msg = "Please enter a value:\n"+
            "1. Update name only\n"+
            "2. Update unitary price only\n"+
            "3. Update quantity only\n" +
            "4. Update description only\n" +
            "5. Update all\n"+
            "6. Cancel operation"
        values = ['1', '2', '3', '4', '5', '6']
        ans = askMenuOption(msg, values)
        if(ans === '6'){
            return
        }
        if(ans === '1'){
            foundElement.name = prompt("Please enter the new name")
            alert(`Element with id ${existentId} updated`)
            return
        }
        if(ans === '2'){
            msg = "Please enter the new unitary price"
            foundElement.price = askPosNum(msg)
            alert(`Element with id ${existentId} updated`)
            return
        }
        if(ans === '3'){
            foundElement.quantity = askPosInt("Please enter the new quantity")
            alert(`Element with id ${existentId} updated`)
            return
        }
        if(ans === '4'){
            foundElement.description = prompt("Please enter the new description")
            alert(`Element with id ${existentId} updated`)
            return
        }
        if(ans === '5'){
            foundElement.name = prompt("Please enter the new name")
            foundElement.price = prompt("Please enter the new unitary price")
            foundElement.quantity = prompt("Please enter the new quantity")
            foundElement.description = prompt("Please enter the new description")
            alert(`Element with id ${existentId} updated`)
        }
    }
}

const deleteProduct = (products) =>{
    // Function for option 5
    let msg, existentID, foundElementIndex
    if(products.length === 0){
        alert("There are no products in the database")
    }else {
        msg = "Please enter the id of the product you want to delete:"
        existentID = askExistentId(products, msg)
        foundElementIndex = products.findIndex(element => element.id === Number(existentID))
        products.splice(foundElementIndex,1)
        alert(`The element with ID ${existentID} was deleted`)
    }
}

const checkProductExists = (products) =>{
    // Function for option 6
    let name2Search, existentId, foundElement
    if(products.length === 0){
        alert("There are no products in the database")
    }else {
        name2Search = prompt("Please enter the name of the element you want to check existence of:")
        if(isNameInDb(products, name2Search) === false){
            alert(`The product with name ${name2Search} does not exist in the database`)
            return
        }
        //TODO: What if there is more than one product with the same name?
        foundElement = products.find(element => element.name === name2Search)
        if(foundElement.quantity === 0){
            alert(`The element ${foundElement.name} exists in the database, but it's out of stock`)
            return
        }
        alert(`The element ${foundElement.name} exists in the database, and there are ${foundElement.quantity} units of it`)
    }
}

const sellProduct = (products) =>{
    // Function for option 7
    let msg, existentID, foundElement, sellNum
    if(products.length === 0){
        alert("There are no products in the database")
    }else {
        msg = "Please enter the id of the product you want to sell:"
        existentID = askExistentId(products, msg)
        foundElement = products.find(element => element.id === Number(existentID))
        if(foundElement.quantity === 0){
            alert(`The element ${foundElement.name} with id ${foundElement.id} is out of stock. Please try with another one`)
            return
        }
        do{
            sellNum = askPosInt(`The total number of items in stock for product with id ${foundElement.id} and name "${foundElement.name}" is ${foundElement.quantity}. How many items do you want to sell?"`)
            if(sellNum > foundElement.quantity){
                alert(`There are not enough items of product with id ${foundElement.id} and name "${foundElement.name}"`)
            }else{
                if(confirm(`Do you want to sell ${sellNum} items of product "${foundElement.name}" with id ${foundElement.id}?`)){
                    break
                }else{
                    alert("Transaction cancelled")
                    return
                }
            }
        }while(sellNum > foundElement.quantity)
        confirm(`Total amount: ${foundElement.price * sellNum} dollars.`)
        foundElement.quantity -= sellNum
        alert(`Transaction completed`)
    }
}

const buyProduct = (products) =>{
    // Function for option 8
    let msg, existentID, foundElement, buyNum
    if(products.length === 0){
        alert("There are no products in the database. Please add the product first in option 1 in the main menu and then come back to this option.")
    }else {
        msg = "Please enter the id of the product you want to buy:"
        existentID = askExistentId(products, msg)
        foundElement = products.find(element => element.id === Number(existentID))
        buyNum = askPosInt(`Please enter the number of items you want to buy for product "${foundElement.name}" with id ${foundElement.id}`)
        if(confirm(`Do you want to buy ${buyNum} items of product "${foundElement.name}" with id ${foundElement.id}?`)){
            foundElement.quantity += buyNum
            alert(`Transaction completed`)
        }else{
            alert("Transaction cancelled")
        }
    }
}

const getTotalValue = (products) => {
    return products.reduce((a,b) => a + b.price*b.quantity, 0)
}

const calcInventory = (products) =>{
    // Function for option 9
    alert(`The value of all the inventory is ${getTotalValue(products)} dollars`)
}

const showSortedProducts = (products) =>{
    // Function for option 10
    let msg, ans1, ans2
    if(products.length === 0){
        alert("There are no products in the database")
    }else{
        msg = "Based on what criteria do you want to sort the products?:\n"+
            "1. Quantity\n"+
            "2. Price\n"
        values = ['1', '2']
        ans1 = askMenuOption(msg, values)
        msg = "Do you want to sort the products in:\n"+
            "1. Descending order\n"+
            "2. Ascending order\n"
        values = ['1', '2']
        ans2 = askMenuOption(msg, values)
        if(ans1 === "1" && ans2 === "1"){
            products.sort((a,b) => b.quantity - a.quantity)
            alert("These are the products in the database, ordered by quantity in descending order:\n"+getDbElemsAsString(products))
            return
        }
        if(ans1 === "1" && ans2 === "2"){
            products.sort((a,b) => a.quantity - b.quantity)
            alert("These are the products in the database, ordered by quantity in ascending order:\n"+getDbElemsAsString(products))
            return
        }
        if(ans1 === "2" && ans2 === "1"){
            products.sort((a,b) => b.price - a.price)
            alert("These are the products in the database, ordered by price in descending order:\n"+getDbElemsAsString(products))
            return
        }
        if(ans1 === "2" && ans2 === "2"){
            products.sort((a,b) => a.price - b.price)
            alert("These are the products in the database, ordered by price in ascending order:\n"+getDbElemsAsString(products))
        }
    }
}

const getRudeDescriptions = (products, curseWordsList) =>{
    // Function for option 11
    if(products.length === 0){
        alert("There are no products in the database")
    }else{
        if(confirm("Do you want to scan the list of products to identify the products with curse words in the description?")){
            let blacklistedProducts = []
            // Scanning the database
            products.forEach(element =>{
                for(let word of curseWordsList){
                    if(element.description.includes(word)){
                        element.description = element.description.replace(word,"*".repeat(word.length))
                        //TODO: If there is a description with two curse words, the product will appear twice in "blacklistedProducts". Action: Correct this
                        blacklistedProducts.push(element)
                    }
                }
            })
            if(blacklistedProducts.length === 0){
                alert("No curse words were found in the descriptions of the products")
                return
            }
            alert("These are the products in the database with cursing words (Censored version):\n"+getDbElemsAsString(blacklistedProducts))
        }else{
            alert("Action cancelled")
        }
    }
}

const getMostExpensiveProd = (products) =>{
    return products.reduce((a,b) => a.price>b.price ? a:b)
}

const getCheapestProd = (products) =>{
    return products.reduce((a,b) => a.price<b.price ? a:b)
}

const generateReport = (products) =>{
    // Function for option 12
    alert(`There are ${products.length} products\n`+
    `The value of all the inventory is ${getTotalValue(products)} dollars\n`+
        `\n`+
        `\n`+
        `\n`+
        `\n`+
    )
}

const menu = () => {
    const curseWordsList = ['palabra1', 'palabra2', 'palabra3', 'palabra4', 'palabra5']
    let products = []// Initializing products database
    while(true){
        msg = "Please enter a value:\n"+
            "1. Create a product\n"+
            "2. Duplicate product\n"+
            "3. View current products\n"+
            "4.Update product\n"+
            "5. Delete product\n"+
            "6. Check product existence\n"+
            "7. Sell product\n"+
            "8. Buy product\n"+
            "9. Calculate the total value of the inventory\n"+
            "10. Show sorted products\n"+
            "11. Identify products with rude descriptions\n"+
            "12. Generate report of the products\n"+
            "13. Quit"
        values = ['1', '2', '3', '4', '5', '6', '7', '8', '9',
                    '10', '11', '12', '13']
        let ans = askMenuOption(msg, values)
        if(ans === '13'){
            return
        }
        if(ans === '1'){
            //Add a product
            addProduct(products)
            continue
        }
        if(ans === '2'){
            //Duplicate product
            duplicateProduct(products)
            continue
        }
        if(ans === '3'){
            //View current products
            viewProducts(products)
            continue
        }
        if(ans === '4'){
            //Update product
            updateProduct(products)
            continue
        }
        if(ans === '5'){
            // Delete product
            deleteProduct(products)
            continue
        }
        if(ans === '6'){
            // Delete product
            checkProductExists(products)
            continue
        }
        if(ans === '7'){
            // Sell product
            sellProduct(products)
            continue
        }
        if(ans === '8'){
            // Buy product
            buyProduct(products)
            continue
        }
        if(ans === '9'){
            // Calculate value of inventory
            calcInventory(products)
            continue
        }
        if(ans === '10'){
            // Show sorted products
            showSortedProducts(products)
            continue
        }
        if(ans === '11'){
            // get rude descriptions
            getRudeDescriptions(products, curseWordsList)
            continue
        }
        if(ans === '12'){
            // Generate report
            generateReport(products)
        }
    }

}

const main = () =>{
    alert("Welcome to the inventory app")
    menu()
    alert("Thanks for using our app. Please come back soon")
}

main()