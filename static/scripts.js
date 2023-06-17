loginIn = false;


function handleAdd() {
    if (!loginIn) {
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

function handleLogin() {
    login = document.getElementById("username");
    password = document.getElementById("password");
    if (verifyLogin(login.value, password.value)) {
        addElements(login.value);
        login.style.display = "none";
        password.style.display = "none";
}
}

function verifyLogin(login, password) {
    if (login == "admin" && password == "admin") {
        return true;
    }
    return false;
}

function addElements(username) {
    //make an api request to get the elements
    return true
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
    if (!loginIn) {
        return false;
    }
    var elementsDiv = document.getElementById("elements");
    var lastElementDiv = elementsDiv.lastElementChild;
    var inputs = lastElementDiv.getElementsByTagName("input");
    var data = {};
    for (var i = 0; i < inputs.length; i++) {
        data[inputs[i].placeholder] = inputs[i].value;
    }
    console.log(data);
}