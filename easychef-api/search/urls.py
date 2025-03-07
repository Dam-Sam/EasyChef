from django.urls import path

from .views import SearchByIngredients,SearchByRecipeName,SearchByCreator

urlpatterns = [
    path('ByRecipeName/<str:recipe_name>/',SearchByRecipeName,name="SearchByRecipeName"),
    path('ByIngredients/<str:name>/',SearchByIngredients,name="SearchByIngredients"),
    path('ByCreator/<str:Creator>/',SearchByCreator,name="SearchByCreator")
]