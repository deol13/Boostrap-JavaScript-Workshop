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


        // I use groups instead of rows and columns to match Merhdads better and the cards are more responsive when the screen get smaller.
        // Using both row/columns and groups made them clash, and using only rows/columns didn't get as good as a result as using groups.
        const content = `    
            <div class="card-body" id="${divID}">
                <div class="border border-1 rounded">

                    <!--First row, contains title, when it was created and check, edit and remove buttons-->
                    <!--The i elements are the icons.-->

                    <div class="btn-toolbar justify-content-between">
                        <div class="input-group">
                            <h6 class="card-title pt-2 ps-3">${result.title}</h6>
                        </div>
                        <div class="btn-group mt-2 me-3">
                            <p class="card-text ps-3 pe-3">Created: ${result.created}</p>

                            <div class="btn-group float-sm-end">
                                <button class="btn btn-check">
                                    <i class="bi bi-check2" style="font-size: 1em; color: #198754;"></i>
                                </button>
                                <button class="btn btn-edit-card">
                                    <i class="bi bi-pencil" style="font-size: 1em; color: #0d6efd;"></i>
                                </button>
                                <button type="button" class="btn btn-remove-card" id="${count}" onclick="removeCard(this.id)">
                                    <i class="bi bi-trash" style="font-size: 1em; color: #dc3545;"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                
                    <p class="card-text ps-3">${result.description}</p>
                    
                    <!--A group of due date, who the assignment is assigned to and the number of attachments-->
                    <!--Added ps-1 pe-1 to make the "box's" of assignedTo and attchment number bigger because by default the text is too close to the edges.-->

                    <div class="btn-toolbar mb-3 ms-3">
                        <div class="input-group me-2">      
                            <p class="card-text ">
                            <i class="bi bi-calendar-event" style="font-size: 1em; color: #000000;"></i>
                            Due: ${result.dueDate}
                            </p>
                        </div>
                        <div class="input-group me-2">
                            <p class="card-text text-center cardAssignedTo ps-1 pe-1">
                            <i class="bi bi-person" style="font-size: 1em; color: #ffffff;"></i>
                            ${result.assignToPerson}
                            </p>
                        </div>
                        <div class="input-group">
                            <p class="card-text text-center cardAttachementNr ps-1 pe-1">
                            <i class="bi bi-paperclip" style="font-size: 1em; color: #ffffff;"></i>
                            ${result.attachments.length} attachments
                            </p>
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
    
    // Add the attached files to an array
    var files = [];
    for (var i = 0; i < attachments.files.length; i++) {
        var name = attachments.files.item(i).name;
        files.push(attachments.files.item(i));
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
    
    showTable();
}

function onlyDate(date){
    // Used to remove time.
    let dateTime = date.split(' ');
    return dateTime[0];
}
