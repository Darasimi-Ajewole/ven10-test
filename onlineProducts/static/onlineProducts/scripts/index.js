"use strict"

//handles form submission 
function submit(event) {
    event.preventDefault() 
    if(!( productForm.form('is valid'))) {
        return
    }
    productForm.attr('class','ui loading form')
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
}

function updateModal(response) {
    var prodName = $('.card .header');
    var prodDesc = $('.card .description');
    var prodCat = $('.card .meta span');
    var prodPrice = $('.card .extra.content i');
    var prodColor = $('.card');
    
    prodName.text(response.name)
    prodDesc.text(response.description)
    prodCat.text(response.category)
    prodPrice.text(response.price)
    prodColor.css('background-color',response.color)

    var prodImg = $('.card img')
    var reader = new FileReader();
    reader.onload = (event) => {
        prodImg.attr('src',event.target.result);
        productForm.form('reset');
    }
    reader.readAsDataURL(fileInput[0].files[0])
}

//handles redirection submission 
function afterSubmission(response) {
    updateModal(response);
    var fileWrapper = $('.image-upload-wrap')
    fileWrapper.css('opacity','1')    
    productForm.attr('class','ui form');
    $('.ui.modal').modal('show');
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
    if (fileInput[0].files.length) {
        var size = fileInput[0].files[0].size
        return size <= 2000;
    }
    return false;
};

$.fn.form.settings.rules.imageChecker = function(value) {
    if (fileInput[0].files.length) {
        var type = fileInput[0].files[0].type
        var validImageTypes = ["image/gif", "image/jpeg", "image/png"];
        return $.inArray(type, validImageTypes) !== -1;
    }
    return false;
    
};

function switchFileInput () {
    if($('.ui.form').form('is valid', 'image'))  {
        var fileWrapper = $('.image-upload-wrap')
        fileWrapper.css('opacity','0.2')    
    }
}

var productForm = $("form");
var fileInput = $('#pic');
fileInput.on('change',switchFileInput)
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
              },
              {
                type   : 'maxLength[12]',
                prompt : 'Product name must be less than 12 characters'
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
                },
                {
                    type   : 'maxLength[12]',
                    prompt : 'Product Category must be less than 12 characters'
                },
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
                    prompt : 'Product Image must be a standard image format'
                }
            ]
        },
      }
  }

productForm.form(valObject)