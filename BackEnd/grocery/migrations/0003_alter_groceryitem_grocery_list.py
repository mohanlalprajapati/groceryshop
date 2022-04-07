# Generated by Django 4.0.3 on 2022-04-07 10:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('grocery', '0002_alter_grocerylist_shared_with'),
    ]

    operations = [
        migrations.AlterField(
            model_name='groceryitem',
            name='grocery_list',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='items', to='grocery.grocerylist'),
        ),
    ]