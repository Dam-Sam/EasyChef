# Generated by Django 4.1.7 on 2023-04-02 08:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0008_recipe_num_rating_recipe_total_rating'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='total_rating',
            field=models.JSONField(default=dict),
        ),
    ]
