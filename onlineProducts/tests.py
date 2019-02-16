from rest_framework import status
from rest_framework.test import APITestCase
from django.conf import settings
from os.path import join
from onlineProducts.models import Product

# Create your tests here.
class ProductTest(APITestCase):
    def setUp(self):
        """
	        creating a product in database using product create api
        """
        
        imgDir = join(settings.BASE_DIR,"onlineProducts","test.png")
        image = open(imgDir,"rb")
        data = {
	        	"name": "hello",
	        	"price": 21,
	        	"description": "hello world",
	        	"category": "test",
	        	"image": image,
	        	"color": "red", 
	        	}
	        	
        productCreateAPI = "http://127.0.0.1:8000/products/create"
        self.client.post(productCreateAPI,data)
    
    def test_prod_details(self):
        prodDetailsApi = "http://127.0.0.1:8000/products/1"
        response = self.client.get(prodDetailsApi)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = response.json()
        prodProp = [
        
        "id",
        "name",
        "price",
        "description",
        "category",
        "image",
        "color",
        ]
        for prop in prodProp:
            self.assertTrue(prop in response)
    
    def test_prod_create(self):
        testProd = Product.objects.get(name="hello")
        self.assertEqual(testProd.price,21)
    
    def test_prod(self):
        prodListAPI = "http://127.0.0.1:8000/products"
        response = self.client.get(prodListAPI)
        response = response.json()
        testProd = response[0]
        prodProp = testProd.keys()
        
        # testing if returned Product properties is 3
        self.assertEqual(len(prodProp),3)
        
        #expected Product properties
        expProp = ["id","name","price"]
        for prop in expProp:
            self.assertTrue(prop in testProd)
        
        
        
        
