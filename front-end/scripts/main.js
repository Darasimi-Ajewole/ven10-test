"use strict"

// Populates the index page with response from querying the Product List API

function populate(data) {
    var prodDiv = document.querySelector("#list");
    for(const obj of data.data) {
        var newDiv = document.createElement("div");
        var heading = document.createElement("h3");
        var priceParagraph = document.createElement("p");
        var detailLink = document.createElement("a");
        
        heading.textContent = obj.name;
        priceParagraph.textContent = "Price:   " + "$" + obj.price;
        detailLink.textContent = "View Details";
        var baseURL = "detail.html?id=";
        var href = baseURL + obj.id;
        detailLink.setAttribute("href",href);
        
        newDiv.appendChild(heading);
        newDiv.appendChild(priceParagraph);
        newDiv.appendChild(detailLink);
        prodDiv.appendChild(newDiv);
    }
}

// url of Product List api
const prodURL = "http://127.0.0.1:8000/products";

// querying Product List api which returns all product
axios.get(prodURL).then( (data) => populate(data));