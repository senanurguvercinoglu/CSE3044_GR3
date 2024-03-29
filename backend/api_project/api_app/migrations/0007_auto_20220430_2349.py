# Generated by Django 3.2.13 on 2022-04-30 20:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api_app', '0006_recipe_ingredients'),
    ]

    operations = [
        migrations.CreateModel(
            name='Utensil',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=40)),
            ],
        ),
        migrations.AddField(
            model_name='recipe',
            name='utensils',
            field=models.ManyToManyField(to='api_app.Utensil'),
        ),
    ]
