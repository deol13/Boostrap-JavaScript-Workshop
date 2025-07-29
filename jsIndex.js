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
    {title: "Example2", description: "Description of example2", dueDate: "2025-08-18", assignToPerson: "Johan Olsen", attachments: ["exampleFile"], created: "2025-07-29"}
]

function showTable() {
    data.forEach(element => {
        console.log("title: " + element["title"]);
        console.log("description: " + element["description"]);
        console.log("dueDate: " + element["dueDate"]);
        console.log("assignedTo: " + element["assignToPerson"]);
        console.log("attachments: " + element["attachments"].length);
        console.log("--------------------");
    });
}

function validateAndSubmit() {
    console.log("validateAndSubmit called");
    
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const dueDate = document.getElementById("dueDate").value;
    const assignedTo = document.getElementById("assignToPerson").value;
    const attachments = document.getElementById("fileForm");


    // Temporary here to check so everything works, remove when done!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    console.log("title: " + title);
    console.log("description: " + description);
    console.log("dueDate: " + dueDate);
    console.log("assignedTo: " + assignedTo);
    
    var files = [];
    for (var i = 0; i < attachments.files.length; i++) {
        var name = attachments.files.item(i).name;
        files.push(attachments.files.item(i));
        console.log("files name: " + name);
        console.log("file:" + files[i]);
    }

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
    
    var todo = {
        title: title, 
        description: description, 
        dueDate: dueDate, 
        assignToPerson: assignedTo, 
        attachments: files, 
        created: Date.now()
    }
    data.push(todo);
    console.log("Form submitted successfully!");
    
}
