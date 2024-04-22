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

const event1 = {
    id: 1, // Identificador único
    name: 'Evento 1', // Nombre del Evento
    date: '2021-12-31', // Fecha del Evento
    description: 'Descripción del Evento 1' // Descripción del Evento
}

const validateDate = (date) => {
    //TODO: Add a validation for the date so it has the format dd/mm/yyyy
}

const addEvent = (events) => {
    name = prompt("Please enter a name for the event").toLowerCase()
    date = prompt("Please enter the date of the event in the format dd//mm//yyyy")
    description = prompt("Please enter a description for the event")
    const id = events.length === 0 ? 1:events[events.length-1].id + 1
    events.push({
        id,
        name,
        date,
        description
    })
    alert(`Event ${name} added`)
}

const isIdInDb = (events, id2Search) => {
    return events.map(element => element.id).includes(Number(id2Search))
}

const getDbElemsAsString = (events) =>{
    return events.map(element =>
        `id:${element.id}, name:${element.name}, date: ${element.date}, description:${element.description}`).
    join("\n")
}

const askExistentID = (events, msg) => {
    do{
        id2Search = prompt(msg)
        if(isIdInDb(events, id2Search) === false){
            alert("That id does not exist in the database")
        }
    }while(isIdInDb(events, id2Search) === false)
    return id2Search
}

const viewEvents = (events) => {
    if(events.length === 0){
        alert("There are no elements")
    }else{
        alert("These are the elements in the database:\n"+getDbElemsAsString(events))
        if(confirm("Do you want to check one event?")){
            const msg = "Please enter the id of the element you want to visualize:"
            existentID = askExistentID(events, msg)
            foundElement = events.find(element => element.id === Number(existentID))
            alert("Here is the element you are looking for:\n"+JSON.stringify(foundElement))
        }
    }
}

const updateEvent = (events) => {
    if(events.length === 0){
        alert("There are no elements")
    }else{
        let msg = "Please enter the id of the element you want to update:"
        const existentID = askExistentID(events, msg)
        const foundElement = events.find(element => element.id === Number(existentID))
        msg = "Please enter a value:\n1. Update name only\n2. Update date only\n3. Update description only\n" +
            "4. Update all three\n5. Cancel operation"
        values = ['1', '2', '3', '4', '5']
        let ans = askMenuOption(msg, values)
        if(ans === '5'){
            return
        }
        if(ans === '1'){
            //Add an event
            foundElement.name = prompt("Please enter the new name")
            alert(`Element with id ${existentID} updated`)
            return
        }
        if(ans === '2'){
            //View current events
            foundElement.date = prompt("Please enter the new date")
            alert(`Element with id ${existentID} updated`)
            return
        }
        if(ans === '3'){
            //Update event
            foundElement.description = prompt("Please enter the new description")
            alert(`Element with id ${existentID} updated`)
            return
        }
        if(ans === '4'){
            foundElement.name = prompt("Please enter the new name")
            foundElement.date = prompt("Please enter the new date")
            foundElement.description = prompt("Please enter the new description")
            alert(`Element with id ${existentID} updated`)
            return
        }
    }
}

const deleteEvent = (events) => {
    if(events.length === 0){
        alert("There are no elements")
    }else {
        let msg = "Please enter the id of the element you want to delete:"
        const existentID = askExistentID(events, msg)
        const foundElementIndex = events.findIndex(element => element.id === Number(existentID))
        events.splice(foundElementIndex,1)
        alert(`The element with ID ${existentID} was deleted`)
    }
}

const menu = () => {
    events = []// Initializing events database
    while(true){
        msg = "Please enter a value:\n1. Add an event\n2. View current events\n3.Update event\n4. Delete event\n5. Quit"
        values = ['1', '2', '3', '4', '5']
        let ans = askMenuOption(msg, values)
        if(ans === '5'){
            return
        }
        if(ans === '1'){
            //Add an event
            addEvent(events)
            continue
        }
        if(ans === '2'){
            //View current events
            viewEvents(events)
            continue
        }
        if(ans === '3'){
            //Update event
            updateEvent(events)
            continue
        }
        if(ans === '4'){
            alert("Nothing added here yet")
            deleteEvent(events)
        }
    }

}
const main = () =>{
    alert("Welcome to the event manager app")
    menu()
}

main()