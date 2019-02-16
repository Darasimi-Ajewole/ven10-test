from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view 
from rest_framework.response import Response
from .models import Product  
from .serializers import ProdSerializer, DetailSerializer 
from django.conf import settings
from os.path import join

def add(request):
	return render(request,"add.html")

def detail(request):
	return render(request, "detail.html")
	
	
#Product List API
@api_view(['GET'])
def product_list(request):
	prodList = Product.objects.all()
	serializer = ProdSerializer(prodList,many=True)
	return Response(serializer.data)

#Product detail api
@api_view(['GET'])
def product_detail(request,pk):
    try:
        prod = Product.objects.get(pk=pk)
        
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = DetailSerializer(prod)
    return Response(serializer.data)

#Product create api
@api_view(['POST'])
def create_product(request):
    serializer = DetailSerializer(data=request.data) 
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)