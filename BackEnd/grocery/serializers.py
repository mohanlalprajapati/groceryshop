from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UnitType, GroceryItem, GroceryList


class UnitTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = UnitType
        fields = "__all__"


class GroceryItemSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    grocery_list = serializers.PrimaryKeyRelatedField(required=False,queryset=GroceryList.objects.all())

    class Meta:
        model = GroceryItem
        fields = [
            "id",
            "item_name",
            "quantity",
            "remark",
            "unit_type",
            "is_purchased",
            "brand_name",
            "grocery_list"
        ]


class GroceryListSerializer(serializers.ModelSerializer):
    items = GroceryItemSerializer(many=True)

    def create(self, validated_data):

        items_data = validated_data.pop("items", None)
        shared_with = validated_data.pop("shared_with", None)
        grocery_list = GroceryList.objects.create(**validated_data)
        if shared_with:
            for share_user in shared_with:
                grocery_list.shared_with_set.add(User.objects.get(pk=share_user))
            pass
        if items_data:
            for item in items_data:
                item.pop("id",None)
                GroceryItem.objects.create(grocery_list=grocery_list, **item)
        return grocery_list

    def update(self, instance, validated_data):
        items_data = validated_data.pop("items", None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if items_data:
            for grocery_item in items_data:
                grocer_item_id = grocery_item.get("id", None)
                if grocer_item_id and grocer_item_id > 0:
                    grocery_item_obj = GroceryItem.objects.get(pk=grocer_item_id)
                    for attr, value in grocery_item.items():
                        setattr(grocery_item_obj, attr, value)
                    grocery_item_obj.save()
                else:
                    grocery_item.pop("id", None)
                    GroceryItem.objects.create(grocery_list=instance, **grocery_item)

        return instance

    class Meta:
        model = GroceryList
        fields = ("items", "id", "owner", "created_date", "shared_with", "name")
