from rest_framework.response import Response
from rest_framework import serializers
from .models import Recipe, Ingredient, Step, Comment


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'quantity']


class StepSerializer(serializers.ModelSerializer):
    class Meta:
        model = Step
        fields = ['id', 'description', 'photo', 'video', 'prep_time', 'cooking_time']


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'comment', 'commentator', 'photo', 'video']


class RecipeSerializer(serializers.ModelSerializer):
    # https://stackoverflow.com/questions/74189302/how-to-properly-serialize-a-primarykeyrelatedfield-in-django-rest-framework
    ingredients = serializers.PrimaryKeyRelatedField(queryset=Ingredient.objects.all(), many=True)
    steps = serializers.PrimaryKeyRelatedField(queryset=Step.objects.all(), many=True)
    


    class Meta:
        model = Recipe
        fields = ['id', 'name', 'diets', 'cuisine', 'serving', 'ingredients', 'steps', 'prep_time', 'cooking_time',
                  'base_recipe', 'likes', 'rating', 'comment', 'creator', 'photo', 'video']
        read_only_fields = ['creator']

    # https://stackoverflow.com/questions/28078092/django-rest-framework-writable-nested-serializers

    def to_representation(self, instance):
        self.fields['ingredients'] = IngredientSerializer(many=True, read_only=True)
        self.fields['steps'] = StepSerializer(many=True, read_only=True)
        self.fields['comment'] = CommentSerializer(many=True, read_only=True)
        return super().to_representation(instance)

    def create(self, validated_data):
        request = self.context['request']
        validated_data['creator'] = request.user
        ingredients_data = validated_data.pop('ingredients')
        steps_data = validated_data.pop('steps')
        recipe = Recipe.objects.create(**validated_data)
        for ingredient in ingredients_data:
            recipe.ingredients.add(ingredient)
        for step in steps_data:
            recipe.steps.add(step)
        return recipe

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.diets = validated_data.get('diets', instance.diets)
        instance.cuisine = validated_data.get('cuisine', instance.cuisine)
        instance.serving = validated_data.get('serving', instance.serving)
        instance.prep_time = validated_data.get('prep_time', instance.prep_time)
        instance.cooking_time = validated_data.get('cooking_time', instance.cooking_time)
        instance.base_recipe = validated_data.get('base_recipe', instance.base_recipe)
        instance.photo = validated_data.get('base_recipe', instance.photo)
        instance.video = validated_data.get('base_recipe', instance.video)
        ingredients_data = validated_data.pop('ingredients')
        steps_data = validated_data.pop('steps')
        for ingredient in ingredients_data:
            instance.ingredients.add(ingredient)
        for step in steps_data:
            instance.steps.add(step)
        instance.save()
        return instance
