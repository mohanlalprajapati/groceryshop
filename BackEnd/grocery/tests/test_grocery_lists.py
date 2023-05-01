from django.test import TestCase
from rest_framework import status
from django.urls import reverse
from rest_framework.test import APIClient, APITestCase
from django.contrib.auth.models import User


# Create your tests here.
from grocery.models import GroceryList, UnitType, GroceryItem
from grocery.tests.base_test_case import GroceryBaseTestCase

class GroceryListTestCases(GroceryBaseTestCase):
    def setUp(self):
        super().setUp()
        self.grocery_list_url = reverse("grocery:grocerylist-list")
        self.unit_type = UnitType.objects.create(name="kg")

    def test_grocery_list_get(self):
        # self.client.login(**self.credentials)
        response = self.client.get(self.grocery_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_grocery_list_create(self):
        data = {
            "name": "Monthly",
            "items": [
                {"item_name": "butter", "unit_type": self.unit_type.id, "quantity": 2}
            ],
        }
        response = self.client.post(self.grocery_list_url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        self.assertEqual(response.data["name"], data["name"])

    def test_grocery_lists_update(self):
        test_grocery_list = GroceryList.objects.create(name="Weeekly", owner=self.user)
        test_grocery_item = GroceryItem.objects.create(
            grocery_list=test_grocery_list,
            item_name="butter",
            unit_type=self.unit_type,
            quantity=1,
        )

        self.grocery_list_detail_url = reverse(
            "grocery:grocerylist-detail", args=[test_grocery_list.id]
        )
        data = {
            "name": "weekly",
            "items": [
                {
                    "id": test_grocery_item.id,
                    "item_name": "butter",
                    "unit_type": self.unit_type.id,
                    "quantity": 2,
                },
                {
                    "item_name": "rice",
                    "unit_type": self.unit_type.id,
                    "quantity": 1,
                }
            ],
        }
        response = self.client.put(
            self.grocery_list_detail_url, data=data, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        test_grocery_item.refresh_from_db()
        self.assertEqual(response.data["items"][0]["quantity"], data["items"][0]["quantity"])
        self.assertEqual(len(response.data["items"]), 2)

    def test_grocery_lists_delete(self):
        test_grocery_list = GroceryList.objects.create(name="ToDelete", owner=self.user)
        self.grocery_list_detail_url = reverse(
            "grocery:grocerylist-detail", args=[test_grocery_list.id]
        )
        response = self.client.delete(self.grocery_list_detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_grocery_lists_patch(self):
        test_grocery_list = GroceryList.objects.create(
            name="Wrong Name", owner=self.user
        )
        self.grocery_list_detail_url = reverse(
            "grocery:grocerylist-detail", args=[test_grocery_list.id]
        )
        response = self.client.patch(
            self.grocery_list_detail_url, data={"name": "Correct Name"}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
