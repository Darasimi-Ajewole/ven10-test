from rest_framework import serializers
from .models import Product

#Serializer for Product List api
class ProdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id','name','price')


#serializer for Product Detail and Product Create api    
class DetailSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(max_length=None, use_url=True)
    
    class Meta:
        model = Product
        fields = ('id','name','price','description','category','image','color')