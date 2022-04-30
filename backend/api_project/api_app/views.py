from django.contrib.auth.models import User

from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework.response import Response


from api_project.api_app.models import Ingredient, Recipe

from .serializers import IngredientSerializer, RecipeSerializer, UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    @action(detail=True, methods=['post'], url_path=r'set_ingredient/(?P<ingredient_id>\d+)')
    def set_ingredient(self, request, pk, ingredient_id):
        ingredient = Ingredient.objects.get(pk=ingredient_id)
        recipe = Recipe.objects.get(pk=pk)

        recipe.ingredients.add(ingredient)
        recipe.save()

        serializer = self.get_serializer(recipe)
        return Response(serializer.data)

class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer