//retrieves product ID parameter from url

function extractID() {
    const urlString = window.location.href;
    var url = new URL(urlString);
    var id = url.searchParams. get ("id");
    return id
}
//queries the Product Detail api which respond with all properties of a product
function queryApi(id) {
    //url of  Product Detail
    const apiURL = currentURL.origin + `/products/${id}`;
    axios.get(apiURL).then((data) => populate(data));
}

// populates the front end with response from querying Product Detail api
function populate(data) {
    
    var obj = data.data;
    var detail = document.querySelector("#detail");
    
    var heading = document.createElement("h3");
    var pricePara = document.createElement("p");
    var descriptionPara = document.createElement("p");
    var categoryPara = document.createElement("p");
    var descriptionPara = document.createElement("p");
    var image  = document.createElement("img");
    var color= obj.color;
        
    heading.textContent = obj.name;
    pricePara.textContent = "Price:  " + "$" + obj.price ;
    categoryPara.textContent = "Category:  "  + obj.category;
    descriptionPara.textContent = "Description:  " + obj.description;
    
    var imageURL = currentURL.origin + obj.image;
    image.setAttribute("src",imageURL);
    
    detail.append(heading,pricePara,categoryPara, descriptionPara,image)
    
    body = document.querySelector("body");
    body.style.backgroundColor = color;
    
    }

//script entry point
function start() {
    var id = extractID();
    queryApi(id);
    }

var currentURL = new URL(window.location.href);

start();