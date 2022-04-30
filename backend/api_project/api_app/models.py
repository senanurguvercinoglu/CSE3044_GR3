from django.db import models
from django.contrib.auth.models import User


class Ingredient(models.Model):
    name = models.CharField(max_length=40)

    def __str__(self) -> str:
        return self.name


class Utensil(models.Model):
    name = models.CharField(max_length=40)

    def __str__(self) -> str:
        return self.name


class Recipe(models.Model):
    name = models.CharField(max_length=40)
    recipe_description = models.TextField()
    likes = models.IntegerField()
    dislikes = models.IntegerField()
    ingredients = models.ManyToManyField(Ingredient)
    utensils = models.ManyToManyField(Utensil)
    calorie = models.IntegerField()
    user = models.ForeignKey(to=User, related_name='recipe',on_delete=models.CASCADE, blank=True, null=True)
    
    def __str__(self) -> str:
        return self.name

    class Meta:
        app_label = 'api_app'

