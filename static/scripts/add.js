"use strict"

//handles form submission 
function submit(event) {
    event.preventDefault() 
    var FD = new FormData(form);
    var image = document.querySelector("#pic");
    FD.append("image", image.files[0]);
    //url of Product Create api
    var url = currentURL.origin;
    var path = "/products/create";
    url += path;
    fetch(url,{
        method: "post",
        body: FD,
        mode: "cors",
    })
    .then((response) => response.json())
    .then((data) => afterSubmission(data))
    
    message.textContent = "Adding New product...";
    form.reset();
}

//handles redirection submission and error from form submission
function afterSubmission(data) {
    var url = currentURL.origin;
    var path = "/static/detail.html"
    var query = "?id=";
    var productID = data.id;
    window.location.href = url + path + query + productID;
}

var form = document.querySelector("form");
var currentURL = new URL(window.location.href);
var message = document.querySelector(".message");
form.addEventListener("submit", submit);