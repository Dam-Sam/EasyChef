from django.urls import path

from recipes.views import RecipeView,change_serving,add,empty, CreateView, EditRecipeView, IngredientView, \
    StepView, getcart, rate, mark, add_comment, myrecipes, markedrecipes, allrecipes, popular_on_rating, \
    popular_on_marked, create_with_base

urlpatterns = [
    path('<int:id>/', RecipeView.as_view()),
    path('create/', CreateView.as_view(), name='create'),
    path('<int:pk>/edit/', EditRecipeView.as_view(), name='edit'),
    path('<int:id>/change_serving/<int:serve>/', change_serving, name='change_serving'),
    path('createingre/', IngredientView.as_view(), name='createingre'),
    path('createstep/', StepView.as_view(), name='createstep'),
    path('<int:id>/add/', add, name='add'),
    path('empty/', empty, name='empty'),
    path('getcart/', getcart, name='getcart'),
    path('<int:id>/rate/', rate, name='rate'),
    path('<int:id>/mark/', mark, name='mark'),
    path('<int:id>/comment/', add_comment, name='add_comment'),
    path('myrecipes/',myrecipes, name='myrecipes' ),
    path('markedrecipes/', markedrecipes, name='markedrecipes' ),
    path('allrecipes/', allrecipes, name='allrecipes' ),
    path('popular_on_rating/', popular_on_rating, name='popular_on_rating'),
    path('popular_on_marked/', popular_on_marked, name='popular_on_marked'),
    path('<int:id>/create_with_base/', create_with_base, name='create_with_base'),
]