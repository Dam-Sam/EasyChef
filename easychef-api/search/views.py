from rest_framework.decorators import api_view, permission_classes
from recipes.models import Recipe, Ingredient
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from recipes.serializers import RecipeSerializer


@api_view(['GET'])
@permission_classes([AllowAny])
def SearchByRecipeName(request, recipe_name):
    cuisine = request.GET.get("cuisine")
    diet = request.GET.get("diets")
    cookingTime = request.GET.get("CookingTime")
    if cuisine:
        res = Recipe.objects.filter(name__contains=recipe_name, cuisine__contains=cuisine).order_by("rating", "likes")
        print(res)
    elif diet:
        res = Recipe.objects.filter(name__contains=recipe_name, cuisine__contains=diet).order_by("rating", "likes")
    elif cookingTime:
        res = Recipe.objects.filter(name__contains=recipe_name, cooking_time=cookingTime).order_by("rating", "likes")
    else:
        res = Recipe.objects.filter(name__contains=recipe_name).order_by("rating", "likes")
    if res:
        Res_list = []
        for i in res:
            serializer = RecipeSerializer(i)
            Res_list.append(serializer.data)
        return Response(Res_list, status=200)
    else:
        return Response(status=404)


@api_view(['GET'])
@permission_classes([AllowAny])
def SearchByIngredients(request, name):
    cuisine = request.GET.get("cuisine")
    diet = request.GET.get("diets")
    cookingTime = request.GET.get("CookingTime")
    ingredients = Ingredient.objects.filter(name__icontains=name)
    ingredient_ids = []
    for ingredient in ingredients:
        ingredient_ids.append(ingredient)
    if cuisine:
        res = Recipe.objects.filter(ingredients__in=ingredient_ids, cuisine=cuisine).order_by("rate", "likes")

    elif diet:
        res = Recipe.objects.filter(ingredients__in=ingredient_ids, diets=diet).order_by("rate", "likes")
    elif cookingTime:
        res = Recipe.objects.filter(ingredients__in=ingredient_ids, cooking_time=cookingTime).order_by("rate", "likes")
    else:
        res = Recipe.objects.filter(ingredients__in=ingredient_ids).order_by("rate", "likes")
    if res:
        Res_list = []
        for i in res:
            serializer = RecipeSerializer(i)
            Res_list.append(serializer.data)
        return Response(Res_list, status=200)
    else:
        return Response(status=404)



@api_view(['GET'])
@permission_classes([AllowAny])
def SearchByCreator(request, Creator):
    cuisine = request.GET.get("cuisine")
    diet = request.GET.get("diets")
    cookingTime = request.GET.get("CookingTime")
    if cuisine:
        res = Recipe.objects.filter(creator__contains=Creator, cuisine=cuisine).order_by("rate", "likes")

    elif diet:
        res = Recipe.objects.filter(creator__contains=Creator, diets=diet).order_by("rate", "likes")
    elif cookingTime:
        res = Recipe.objects.filter(creator__contains=Creator, cooking_time=cookingTime).order_by("rate", "likes")
    else:
        res = Recipe.objects.filter(creator__contains=Creator).order_by("rate", "likes")
    if res:
        Res_list = []
        for i in res:
            serializer = RecipeSerializer(i)
            Res_list.append(serializer.data)
        return Response(Res_list, status=200)
    else:
        return Response(status=404)
