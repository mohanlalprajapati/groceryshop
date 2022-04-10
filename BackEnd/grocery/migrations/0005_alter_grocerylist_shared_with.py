# Generated by Django 4.0.3 on 2022-04-07 19:31

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('grocery', '0004_alter_grocerylist_owner'),
    ]

    operations = [
        migrations.AlterField(
            model_name='grocerylist',
            name='shared_with',
            field=models.ManyToManyField(blank=True, null=True, related_name='grocery', to=settings.AUTH_USER_MODEL),
        ),
    ]
