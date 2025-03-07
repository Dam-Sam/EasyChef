from django.db import models


class Recipe(models.Model):
    name = models.CharField(max_length=255)
    diets = models.CharField(max_length=255)
    cuisine = models.CharField(max_length=255)
    serving = models.PositiveIntegerField()
    ingredients = models.ManyToManyField('Ingredient')
    steps = models.ManyToManyField('Step')
    prep_time = models.PositiveIntegerField(blank=True, null=True)
    cooking_time = models.PositiveIntegerField(blank=True, null=True)
    base_recipe = models.ForeignKey('self', on_delete=models.CASCADE, blank=True, null=True)
    likes = models.PositiveIntegerField(default=0)
    rating = models.CharField(default='0.00', max_length=255)
    num_rating = models.IntegerField(default=0)
    num_mark = models.IntegerField(default=0)
    total_rating = models.JSONField(default=dict)
    total_mark = models.JSONField(default=dict)
    comment = models.ManyToManyField('Comment', blank=True, null=True)
    creator = models.CharField(max_length=255, blank=True)
    photo = models.ImageField(upload_to='photos/', blank=True, null=True)
    video = models.FileField(upload_to='videos/', blank=True, null=True)

    def __str__(self):
        return self.name


class Ingredient(models.Model):
    name = models.CharField(max_length=255)
    quantity = models.CharField(max_length=255)

    def __str__(self):
        return f'{self.name}: {self.quantity}'


class Step(models.Model):
    description = models.TextField()
    photo = models.ImageField(upload_to='photos/', blank=True, null=True)
    video = models.FileField(upload_to='videos/', blank=True, null=True)
    prep_time = models.CharField(blank=True, null=True, max_length=255)
    cooking_time = models.CharField(blank=True, null=True, max_length=255)

    def __str__(self):
        return self.description


class Comment(models.Model):
    comment = models.TextField()
    commentator = models.CharField(max_length=255, blank=True)
    photo = models.ImageField(upload_to='photos/', blank=True, null=True)
    video = models.FileField(upload_to='videos/', blank=True, null=True)

    def __str__(self):
        return self.comment
