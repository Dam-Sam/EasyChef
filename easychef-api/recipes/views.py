import requests
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.exceptions import ValidationError
from rest_framework.generics import RetrieveAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status, generics
from recipes.models import Recipe, Comment, Ingredient, Step
from recipes.serializers import RecipeSerializer, IngredientSerializer, StepSerializer, CommentSerializer
from django.db.models.functions import Cast
from django.db.models import FloatField


# Create your views here.

class RecipeView(RetrieveAPIView):
    serializer_class = RecipeSerializer

    def get_object(self):
        return get_object_or_404(Recipe, id=self.kwargs['id'])

    @permission_classes([IsAuthenticated])
    def delete(self, request, id=None):
        recipe = Recipe.objects.filter(id=id)
        recipe.delete()
        return Response(status=status.HTTP_200_OK)


class CreateView(generics.ListCreateAPIView):
    serializer_class = RecipeSerializer

    @permission_classes([IsAuthenticated])
    def post(self, request: Request):
        serializer = RecipeSerializer(data=request.data, context={'request': request})

        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class IngredientView(generics.ListCreateAPIView):
    serializer_class = IngredientSerializer

    @permission_classes([IsAuthenticated])
    def post(self, request: Request):
        data = request.data
        serializer = self.serializer_class(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StepView(generics.ListCreateAPIView):
    serializer_class = StepSerializer

    @permission_classes([IsAuthenticated])
    def post(self, request: Request):
        data = request.data
        serializer = self.serializer_class(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EditRecipeView(RetrieveAPIView, UpdateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    @permission_classes([IsAuthenticated])
    def get_object(self):
        recipe = super().get_object()
        if str(recipe.creator) != str(self.request.user):
            self.permission_denied(self.request)
        return recipe


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_with_base(request, id):
    base_recipe = Recipe.objects.get(id=id)
    recipe = Recipe.objects.create(
        name=base_recipe.name,
        diets=base_recipe.diets,
        cuisine=base_recipe.cuisine,
        serving=base_recipe.serving,
        creator=request.user.username,
        base_recipe=base_recipe)
    for ingredient in base_recipe.ingredients.all():
        new_ingredient = Ingredient.objects.create(
            name=ingredient.name,
            quantity=ingredient.quantity)
        recipe.ingredients.add(new_ingredient.id)
    for step in base_recipe.steps.all():
        new_step = Step.objects.create(
            description=step.description,
            photo=step.photo,
            video=step.video,
            prep_time=step.prep_time,
            cooking_time=step.cooking_time)
        recipe.steps.add(new_step.id)
    serializer = RecipeSerializer(recipe)
    return Response(serializer.data)


@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def change_serving(request, id, serve):
    recipe = get_object_or_404(Recipe, id=id)
    if int(serve < 1):
        raise ValidationError({'error': 'Serving must be larger than 0.'})
    curr_serving = recipe.serving
    new = serve
    ratio = float(new) / curr_serving
    recipe.serving = int(new)

    recipe.save()
    for i in recipe.ingredients.all():
        if i.quantity:
            lst = i.quantity.split()
            if float(float(lst[0]) * ratio) % 1 == 0:
                lst[0] = str(int(float(lst[0]) * ratio))
            else:
                lst[0] = str(float(float(lst[0]) * ratio))
            i.quantity = ' '.join(lst)
        i.save()
    serializer = RecipeSerializer(recipe)
    return Response(serializer.data)


# https://stackoverflow.com/questions/40840685/extract-int-digits-and-float-number-from-a-python-string

cart = []
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add(request, id):
    recipe = get_object_or_404(Recipe, id=id)
    #cart = request.session.get('cart', [])
    for i in recipe.ingredients.all():
        exist = False
        for re in cart:
            if i.name == re['name']:
                print(re)
                lst = re['quantity'].split()
                lst1 = i.quantity.split()
                new_quantity = float(lst[0]) + float(lst1[0])
                if new_quantity % 1 == 0:
                    new_quantity = int(new_quantity)
                q = str(new_quantity)
                q += " "
                q += lst[1]
                re['quantity'] = q
                exist = True
        if not exist:
            cart.append({'name': i.name, 'quantity': i.quantity})
    #request.session['cart'] = cart
    return JsonResponse(cart, safe=False)


@api_view(['POST'])
@permission_classes([])
def empty(request):
    cart.clear()
    return JsonResponse(cart, safe=False)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getcart(request):
    return JsonResponse(cart, safe=False)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def rate(request, id):
    recipe = Recipe.objects.get(id=id)
    rating = request.data.get('rating')
    if str(request.user.id) not in recipe.total_rating:
        total = 0
        recipe.total_rating[str(request.user.id)] = int(rating)
        for r in recipe.total_rating.values():
            total += r
        recipe.num_rating += 1
        value = total / recipe.num_rating
        recipe.rating = "{:.2f}".format(value)
        recipe.save()
    else:
        total = 0
        recipe.total_rating[str(request.user.id)] = int(rating)
        for r in recipe.total_rating.values():
            total += r
        value = total / recipe.num_rating
        recipe.rating = "{:.2f}".format(value)
        recipe.save()
    serializer = RecipeSerializer(recipe)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def mark(request, id):
    recipe = Recipe.objects.get(id=id)
    if str(request.user.id) not in recipe.total_mark:
        recipe.total_mark[str(request.user.id)] = "marked"
        recipe.likes += 1
        recipe.num_mark += 1
    else:
        del recipe.total_mark[str(request.user.id)]
        recipe.likes -= 1
        recipe.num_mark -= 1
    recipe.save()
    serializer = RecipeSerializer(recipe)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_comment(request, id):
    recipe = Recipe.objects.get(id=id)
    recipe.comment.clear()
    com = request.data.get('comment')
    commentator = request.user.username
    photo = request.FILES.get('photo')
    video = request.FILES.get('video')
    comment1 = Comment(comment=com, photo=photo, commentator=commentator, video=video)
    comment1.save()
    recipe.comment.add(comment1)

    serializer = RecipeSerializer(recipe)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def myrecipes(request):
    creator = request.user.username
    res = Recipe.objects.filter(creator__contains=creator)
    if res:
        Res_list = []
        for i in res:
            serializer = RecipeSerializer(i)
            Res_list.append(serializer.data)
        return Response(Res_list, status=200)
    else:
        return Response(status=404)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def markedrecipes(request):
    creator = str(request.user.id)
    res = Recipe.objects.all()
    Res_list = []
    for i in res:
        if creator in i.total_mark:
            serializer = RecipeSerializer(i)
            Res_list.append(serializer.data)
    return Response(Res_list, status=200)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def allrecipes(request):
    creator = str(request.user.id)
    res = Recipe.objects.all()
    Res_list = []
    for i in res:
        if creator in i.total_mark:
            serializer = RecipeSerializer(i)
            Res_list.append(serializer.data)
        elif i.creator == request.user.username:
            serializer = RecipeSerializer(i)
            Res_list.append(serializer.data)
        elif creator in i.total_rating:
            serializer = RecipeSerializer(i)
            Res_list.append(serializer.data)
        else:
            for k in i.comment.all():
                if k.commentator == request.user.username:
                    serializer = RecipeSerializer(i)
                    Res_list.append(serializer.data)
                    break
    return Response(Res_list, status=200)


@api_view(['GET'])
@permission_classes([AllowAny])
def popular_on_rating(request):
    recipes = Recipe.objects.all().order_by('-rating')
    serializer = RecipeSerializer(recipes, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def popular_on_marked(request):
    recipes = Recipe.objects.all().order_by('-num_mark')
    serializer = RecipeSerializer(recipes, many=True)
    return Response(serializer.data)

# https://stackoverflow.com/questions/75187420/pass-objects-to-a-serializer-in-django-rest-framework
# https://docs.djangoproject.com/en/4.1/topics/http/sessions/
# https://stackoverflow.com/questions/75187420/pass-objects-to-a-serializer-in-django-rest-framework
# https://stackoverflow.com/questions/5308060/how-to-send-a-post-request-using-django

# https://studygyaan.com/django/function-based-views-django-rest-framework
