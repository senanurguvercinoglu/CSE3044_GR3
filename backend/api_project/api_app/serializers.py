from django.contrib.auth.models import User, Group
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import serializers

from api_project.api_app.models import Ingredient, Recipe

class IngredientSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['url', 'name']

class RecipeSerializer(serializers.HyperlinkedModelSerializer):
    ingredients = IngredientSerializer(read_only=True, many=True)


    class Meta:
        model = Recipe
        fields = ['url', 'user', 'name', 'recipe_description', 'likes', 'dislikes', 'calorie', 'ingredients']

class UserSerializer(serializers.HyperlinkedModelSerializer):
    recipe = RecipeSerializer(many=True, required=False)
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'first_name', 'last_name', 'recipe']

