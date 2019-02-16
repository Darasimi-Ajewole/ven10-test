from django.db import models

# Create your models here 

#Product Model
class Product(models.Model): 
    name = models.CharField(max_length=12) 
    price = models.DecimalField(max_digits=7, decimal_places=2)
    description = models.TextField()
    category =  models.CharField(max_length=12)
    image = models.ImageField(upload_to='')
    color = models.CharField(max_length=12)

    def _str_(self): 
        return self.name