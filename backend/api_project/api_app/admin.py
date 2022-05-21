from django.contrib import admin
from api_project.api_app.models import Recipe, Ingredient, Utensil

# Register your models here.
admin.site.register(Recipe)
admin.site.register(Ingredient)
admin.site.register(Utensil)

