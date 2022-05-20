from email.policy import default
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
    ingredients = models.ManyToManyField(Ingredient, related_name="ingredients")
    utensils = models.ManyToManyField(Utensil, related_name="utensils")
    calorie = models.IntegerField()
    user = models.ForeignKey(to=User, related_name='recipe',on_delete=models.CASCADE, blank=True, null=True)
    image = models.ImageField(default='', upload_to='images')

    def __str__(self) -> str:
        return self.name

    class Meta:
        app_label = 'api_app'

