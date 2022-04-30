from tkinter.tix import Tree
from django.contrib.auth.models import User, Group
from rest_framework import serializers

from api_project.api_app.models import Recipe


class RecipeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Recipe
        fields = ['url', 'user', 'name', 'recipe_description', 'likes', 'dislikes', 'calorie']

class UserSerializer(serializers.HyperlinkedModelSerializer):
    recipe = RecipeSerializer(many=True)
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'first_name', 'last_name', 'recipe']

