from django.db import models
from django.contrib.auth.models import User


class UnitType(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return self.name


# Create your models here.
class GroceryList(models.Model):

    name = models.CharField(max_length=30)
    owner = models.ForeignKey(User, on_delete=models.RESTRICT)
    created_date = models.DateTimeField(auto_now=True)
    shared_with = models.ManyToManyField(User, related_name="grocery", blank=True)

    def __str__(self):
        return f"{self.owner.username}_{self.name}"


class GroceryItem(models.Model):
    grocery_list = models.ForeignKey(
        GroceryList, on_delete=models.CASCADE, related_name="items"
    )
    item_name = models.CharField(max_length=50)
    brand_name = models.CharField(max_length=30, blank=True, null=True)
    quantity = models.FloatField()
    unit_type = models.ForeignKey(UnitType, on_delete=models.RESTRICT)
    is_purchased = models.BooleanField(default=False)
    remark = models.TextField(max_length=200, blank=True, null=True)

    def __str__(self):
        return self.item_name
