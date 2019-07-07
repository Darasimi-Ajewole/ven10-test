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
    productForm.form('reset');*/
}

//handles redirection submission 
function afterSubmission(response) {
    console.log(response);
    /*
    var url = currentURL.origin;
    var path = "/static/detail.html"
    var query = "?id=";
    var productID = data.id;
    window.location.href = url + path + query + productID;
     */
    
}

//handles error from form submission
function failed(xhr,status,errorThrown,event) {
    alert( "Sorry, there was a problem!, check console to see what went wrong" );
    console.log( "Error: " + errorThrown );
    console.log( "Status: " + status );
    console.dir( xhr );
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