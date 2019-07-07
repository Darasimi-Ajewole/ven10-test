"use strict"

//handles form submission 
function submit(event) {
    event.preventDefault() 
    if(!( productForm.form('is valid'))) {
        return
    }
    var FD = new FormData(productForm[0]);
    $.ajax({
        type: 'POST',
        url: '/product_api/create',
        data: FD,
        mimeTypes:"multipart/form-data",
        contentType: false,
        cache: false,
        processData: false,  
    })
    .done(afterSubmission)
    .fail((xhr,status,errorThrown)=> {failed(xhr,status,errorThrown,event)})
    /*
    message.textContent = "Adding New product...";
    productForm.form('reset');*/
}

//handles redirection submission 
function afterSubmission(response) {
    console.log(response);
    //work on after submission
    
}

//handles error from form submission
function failed(xhr,status,errorThrown,event) {
    alert( "Sorry, there was a problem!, kindly try again" );
    event.preventDefault();
}

function fileUpdate(event) {
    event.preventDefault()
    fileInput[0].files = event.originalEvent.dataTransfer.files
}

$.fn.form.settings.rules.imageSize = function(value) {
    var size = fileInput[0].files[0].size
    return size <= 2000;
};

$.fn.form.settings.rules.imageChecker = function(value) {
    var type = fileInput[0].files[0].type
    var validImageTypes = ["image/gif", "image/jpeg", "image/png"];
    return $.inArray(type, validImageTypes) !== -1;
};

var productForm = $("form");
var fileInput = $('#pic');
var dropContainer = $('.image-upload-wrap');

productForm.on("submit", submit);
//drag and drop event
dropContainer.on('dragenter dragover',(event)=>{event.preventDefault()})
dropContainer.on('drop',fileUpdate)

var valObject = {
    fields: {
        name: {
            identifier: 'name',
            rules: [
              {
                type   : 'empty',
                prompt : 'Please enter Product name'
              }
            ]
          },
        price: {
            identifier: 'price',
            rules: [
                {
                    type: 'number',
                    prompt: 'Please enter Product price in Number'
                },
                {
                    type   : 'empty',
                    prompt : 'Please enter Product Price'
                  }
            ]
        },
        description: {
            identifier: 'description',
            rules: [
                {
                    type   : 'empty',
                    prompt : 'Please enter Product description'
                  }
            ]
        },
        category: {
            identifier: 'category',
            rules: [
                {
                    type   : 'empty',
                    prompt : 'Please enter Product Category'
                  }
            ]
        },
        image: {
            identifier: 'image',
            rules: [
                {
                    type   : 'empty',
                    prompt : 'Please add a Product Image'
                },
                {
                    type   : 'imageSize',
                    prompt : 'Image must not be more than 5kb'
                },
                {
                    type   : 'imageChecker',
                    prompt : 'Must be an image'
                }
            ]
        },
      }
  }

productForm.form(valObject)

/* 
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

*/