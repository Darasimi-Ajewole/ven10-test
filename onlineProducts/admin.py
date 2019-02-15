from django.contrib import admin
from .models import Product

# Register your models here.
class ProdAdmin(admin.ModelAdmin):
	list_display = ("name","price")

admin.site.register(Product,ProdAdmin)