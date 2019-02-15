"use strict"

//handles form submission 
function submit(event) {
    event.preventDefault() 
    var FD = new FormData(form);
    var image = document.querySelector("#pic");
    FD.append("image", image.files[0]);
    //url of Product Create api
    var url = "http://127.0.0.1:8000/products/create"
    axios.post(url,FD).then((data) => afterSubmission(data) )
    message.textContent = "Adding New product..."
    form.reset();
}

//handles redirection submission and error from form submission
function afterSubmission(data) {
    if (data.status===201) {
        var previewURL = "detail.html?id=";
        var productID = data.data.id;
        window.location.href = previewURL + productID;
    }
    else {
        message.textContent = "Error in form submission";
    }
}

var form = document.querySelector("form");
var message = document.querySelector(".message");
form.addEventListener("submit", submit);