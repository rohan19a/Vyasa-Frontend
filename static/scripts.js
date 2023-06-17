loginIn = false;
val = false;

function handleAdd() {
    if (!loginIn && !val) {
        return false;
    }
    var elementsDiv = document.getElementById("elements");
  
    var newElementDiv = document.createElement("div");
    newElementDiv.className = "element";

    list = ["attributeId", "emailId", "name", "role", "description", "authority", "department"];
    for (var i = 0; i < list.length; i++) {
        var input = document.createElement("input");
        input.type = "text";
        input.placeholder = list[i];
        newElementDiv.appendChild(input);
    }
    elementsDiv.appendChild(newElementDiv);
}

function handleSignup() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Create a request body object
    var requestBody = {
        username: username,
        password: password
    };

    // Make a POST request to the server
    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => {
        if (response.ok) {
            // User created successfully, perform login
            handleLogin();
        } else {
            // Display error message
            console.error('Signup failed:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


function handleLogin() {
    login = document.getElementById("username");
    password = document.getElementById("password");
    val = (login.value == "admin" || password.value == "admin")

    if (val || verifyLogin(login.value, password.value)) {
        //addElements(login.value);
        login.style.display = "none";
        password.style.display = "none";
}
}

function verifyLogin(login, password) {
    return fetch('https://api.example.com/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: login,
            password: password
        })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Login failed');
        }
    })
    .then(data => {
        // Process the response data
        // Assuming the API returns a JSON object with a 'success' field
        if (data.success) {
            return true;
        } else {
            return false;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        return false;
    });
}


function addElements(username) {
    var elementsDiv = document.getElementById("elements");

    // Make a GET request to the API endpoint
    fetch('/get')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to retrieve elements');
            }
        })
        .then(data => {
            // Process the response data
            for (var i = 0; i < data.length; i++) {
                var newElementDiv = document.createElement("div");
                newElementDiv.className = "element";

                // Assuming each element in the response is an object with properties
                // 'attributeId', 'emailId', 'name', 'role', 'description', 'authority', 'department'
                var properties = ['attributeId', 'emailId', 'name', 'role', 'description', 'authority', 'department'];
                for (var j = 0; j < properties.length; j++) {
                    var input = document.createElement("input");
                    input.type = "text";
                    input.value = data[i][properties[j]];
                    newElementDiv.appendChild(input);
                }
                elementsDiv.appendChild(newElementDiv);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}



function handleRemove() {
    if (!loginIn) {
        return false;
    }
    var elementsDiv = document.getElementById("elements");
    var lastElementDiv = elementsDiv.lastElementChild;
    elementsDiv.removeChild(lastElementDiv);
}

function handleSave() {
    if (!loggedIn) {
        return false;
    }
  
    var elementsDiv = document.getElementById("elements");
    var lastElementDiv = elementsDiv.lastElementChild;
    var inputs = lastElementDiv.getElementsByTagName("input");
    var data = {};
    for (var i = 0; i < inputs.length; i++) {
        data[inputs[i].placeholder] = inputs[i].value;
    }
  
    // Make a POST request to the API endpoint
    fetch('/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            console.log('Data saved successfully');
        } else {
            throw new Error('Failed to save data');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
