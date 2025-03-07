# Generated by Django 4.1.7 on 2023-03-31 08:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0002_ingredient_quantity_alter_ingredient_name_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='creator',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AlterField(
            model_name='step',
            name='cooking_time',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='step',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='photos/'),
        ),
        migrations.AlterField(
            model_name='step',
            name='prep_time',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='step',
            name='video',
            field=models.FileField(blank=True, null=True, upload_to='videos/'),
        ),
    ]
