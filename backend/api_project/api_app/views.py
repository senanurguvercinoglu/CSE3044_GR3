from django.contrib.auth.models import User

from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework.response import Response


from api_project.api_app.models import Ingredient, Recipe, Utensil

from .serializers import IngredientSerializer, RecipeSerializer, UserSerializer, UtensilSerializer


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

    @action(detail=True, methods=['post'], url_path=r'unset_ingredient/(?P<ingredient_id>\d+)')
    def unset_ingredient(self, request, pk, ingredient_id):
        ingredient = Ingredient.objects.get(pk=ingredient_id)
        recipe = Recipe.objects.get(pk=pk)

        recipe.ingredients.remove(ingredient)
        recipe.save()

        serializer = self.get_serializer(recipe)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], url_path=r'set_utensil/(?P<utensil_id>\d+)')
    def set_utensil(self, request, pk, utensil_id):
        utensil = Utensil.objects.get(pk=utensil_id)
        recipe = Recipe.objects.get(pk=pk)

        recipe.utensils.add(utensil)
        recipe.save()

        serializer = self.get_serializer(recipe)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], url_path=r'unset_utensil/(?P<utensil_id>\d+)')
    def unset_utensil(self, request, pk, utensil_id):
        utensil = Utensil.objects.get(pk=utensil_id)
        recipe = Recipe.objects.get(pk=pk)

        recipe.utensils.remove(utensil)
        recipe.save()

        serializer = self.get_serializer(recipe)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def filter(self, request, *args, **kwargs):
        """
        Example Request
            recipe/filter?u=1_2_3&i=3_4

            u -> utensil ids
            i -> ingredient ids

            savunma notu: gittigidiyor.com da bu sekilde filtreliyormus
        """
        utensil_query_param = request.query_params.get('u')
        ingredient_query_param = request.query_params.get('i')

        raw_utensil_ids = utensil_query_param.split('_') if utensil_query_param is not None else None
        raw_ingredient_ids = ingredient_query_param.split('_') if ingredient_query_param is not None else None

        utensil_ids = map(lambda x: int(x), raw_utensil_ids)
        ingredient_ids = map(lambda x: int(x), raw_ingredient_ids)

        recipes = Recipe.objects.filter(
            utensils__in=utensil_ids,
            ingredients__in=ingredient_ids
        )

        print(
            recipes
        )
        
        return Response({'hadi': 'bismillah'})


class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer

class UtensilViewSet(viewsets.ModelViewSet):
    queryset = Utensil.objects.all()
    serializer_class = UtensilSerializer


