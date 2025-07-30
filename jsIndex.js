// Display a list of To-Do items on the page:
// Skapa en klass som innehåller, title, description, dueDate, Assign to Person: name, antal attachments och när den skapades.
// En array av den klassen som innehåller några hård kodade todos example.
// En metod som går igenom arrayen när webläsaren har laddats in och skickar todo datan en i taget till
// En annan metod som skapar korten och lägger in datan sen skickar det till html sidan.

// Add new To-Do items via a form input or button 
// Metod som lyssnar på form submit knappen: Hämtar form datan sen lägger till den i arrayen sen skickar det till metod some skapar kort.

// Remove existing To-Do items from the list 
// En metod som lyssnar på ta bort todo knappen: Ta bort det kortet från kort listan.

// Validation

var data = [
    {title: "Example1", description: "Description of example1", dueDate: "2025-08-15", assignToPerson: "Dennis Olsen", attachments: [], created: "2025-07-29"},
    {title: "Example2", description: "Description of example2", dueDate: "2025-08-18", assignToPerson: "Johan Karlsson", attachments: ["exampleFile"], created: "2025-07-29"}
]

function showTable() {
    console.log("showTable called");

    // Remove all the cards, removing them one by one had issues with the single removal method,
    // so I create a new div and remove that.
    const element = document.getElementById("cardContainer");
    if(element != null) element.remove();

    /*
    // Temporary here to check so everything works, remove when done!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    data.forEach(element => {
        console.log("title: " + element["title"]);
        console.log("description: " + element["description"]);
        console.log("dueDate: " + element["dueDate"]);
        console.log("assignedTo: " + element["assignToPerson"]);
        console.log("attachments: " + element["attachments"].length);
        console.log("--------------------");
    });
    */

    // Get the base div for the cards
    var container = document.getElementById("cardDiv");
    // Create a new div to contain the cards in, so I can easily remove them all
    var newDiv = document.createElement("div");
    // Set the new divs id
    newDiv.setAttribute("id", "cardContainer");
    var count = 0;

    // Go through each object in the data array and create a card for them
    data.forEach((result) => {
        var divID = "card" + count;

        // In order to be able to remove a card I need to know it's id but I could not find a way to make a button get another elements id and send that.
        // So the remove button's id is count, while the card's base div is "card"+count.
        // I do this so the button can just send it's own id to removeCard, then I add it's id to the word "card" to get the div's id.
        // 
        const content = `    
            <div class="card-body" id="${divID}">
                <div class="border border-1 rounded">
                    <div class="row">
                        <div class="col-md-8">
                            <h6 class="card-title pt-2 ps-3">${result.title}</h6>
                        </div>
                        <div class="col-md-2 text-center">
                            <p class="card-text pt-2">Created: ${result.created}</p>
                        </div>
                        <div class="col-lg-2 pe-4">
                            <div class="btn-group pt-2 float-sm-end">
                                <button class="btn btn-check">
                                    <i class="bi bi-check2" style="font-size: 1em; color: #198754;"></i>
                                </button>
                                <button class="btn btn-edit">
                                    <i class="bi bi-pencil" style="font-size: 1em; color: #0d6efd;"></i>
                                </button>
                                <button type="button" class="btn btn-remove" id="${count}" onclick="removeCard(this.id)">
                                    <i class="bi bi-trash" style="font-size: 1em; color: #dc3545;"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                
                    <p class="card-text ps-3">${result.description}</p>
                    <div class="row pb-2 ps-3">
                        <div class="col-sm-2">                            
                            <p class="card-text ">Due: ${result.dueDate}</p>
                        </div>
                        <div class="col-sm-2">
                            <p class="card-text text-center cardPersonName">${result.assignToPerson}</p>
                        </div>
                        <div class="col-sm-2">
                            <p class="card-text text-center cardNrOfAttachement">${result.attachments.length} attachments</p>
                        </div>
                    </div>
                </div>                  
            </div>
        `;
        // Add the card to the new div
        newDiv.innerHTML += content;
        // Add that div to the container
        container.appendChild(newDiv);
        count++;
    });
}

function removeCard(id) {
    console.log("removeCard called");
    // The remove button's id is count, while it's base div is "card"+count.
    // I do this so the button can just send it's own id to removeCard, then I add it's id to the word "card" to get the div's id.
    // I could not find a way to send the bas div's id.

    const element = document.getElementById("card" + id);
    element.remove();
    data.splice(id, 1);
}

function validateAndSubmit() {
    console.log("validateAndSubmit called");
    
    // Get all the elements
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const dueDate = document.getElementById("dueDate").value;
    const assignedTo = document.getElementById("assignToPerson").value;
    const attachments = document.getElementById("fileForm");


    // Temporary here to check so everything works, remove when done!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    /*
    console.log("title: " + title);
    console.log("description: " + description);
    console.log("dueDate: " + dueDate);
    console.log("assignedTo: " + assignedTo);
    */
    
    // Add the attached files to an array
    var files = [];
    for (var i = 0; i < attachments.files.length; i++) {
        var name = attachments.files.item(i).name;
        files.push(attachments.files.item(i));
        //console.log("files name: " + name);
        //console.log("file:" + files[i]);
    }

    // Check if the mandatory fields are filled
    if(!title || !description || !dueDate || files.length == 0) {
        // Display validation error messages
        if(!title) {
            document.getElementById("title").classList.add("is-invalid");
        } else {
            // Clear existing validation classes
            document.getElementById("title").classList.remove("is-invalid");
        }

        if(!description) {
            document.getElementById("description").classList.add("is-invalid");
        } else {
            document.getElementById("description").classList.remove("is-invalid");
        }

        if(!dueDate) {
            document.getElementById("dueDate").classList.add("is-invalid");
        } else {
            document.getElementById("dueDate").classList.remove("is-invalid");
        }

        if(files.length == 0) {
            document.getElementById("fileForm").classList.add("is-invalid");
        } else {
            document.getElementById("fileForm").classList.remove("is-invalid");
        }

        // Prevent form submission if validation fails
        return;
    } 
    
    // Create an object
    var todo = {
        title: title, 
        description: description, 
        dueDate: dueDate, 
        assignToPerson: assignedTo, 
        attachments: files, 
        created: onlyDate(new Date().toLocaleString("sv-SE"))
    }
    // Add the object to data array.
    data.push(todo);
    console.log("Form submitted successfully!");
    
}

function onlyDate(date){
    // Used to remove time.
    let dateTime = date.split(' ');
    return dateTime[0];
}
