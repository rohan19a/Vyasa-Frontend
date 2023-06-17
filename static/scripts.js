function handleAdd() {
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

function handleRemove() {
    var elementsDiv = document.getElementById("elements");
    var lastElementDiv = elementsDiv.lastElementChild;
    elementsDiv.removeChild(lastElementDiv);
}

function handleSave() {
    var elementsDiv = document.getElementById("elements");
    var lastElementDiv = elementsDiv.lastElementChild;
    var inputs = lastElementDiv.getElementsByTagName("input");
    var data = {};
    for (var i = 0; i < inputs.length; i++) {
        data[inputs[i].placeholder] = inputs[i].value;
    }
    console.log(data);
    $.ajax({
        type: "POST",
        url: "/add",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            alert(data);
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });
}