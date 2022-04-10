from django.test import TestCase
from rest_framework import status
from django.urls import reverse
from rest_framework.test import APIClient, APITestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken


# Create your tests here.
from grocery.models import GroceryItem, UnitType, GroceryList


class GroceryItemTestCases(APITestCase):
    def setUp(self):
        super().setUp()
        username = "tim@me.com"
        password = "strongP@assword!"
        self.user = User.objects.create_user(username, username, password)

        jwt_fetch_data = {"username": username, "password": password}

        url = reverse("token_obtain_pair")
        response = self.client.post(url, jwt_fetch_data, format="json")
        token = response.data["access"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        self.grocery_item_url = reverse("grocery:groceryitem-list")
        self.unit_type = UnitType.objects.create(name="Kg")
        self.grocery_list = GroceryList.objects.create(
            name="Test List", owner=self.user
        )

    def test_grocery_item_get(self):
        # self.client.login(**self.credentials)
        response = self.client.get(self.grocery_item_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_grocery_item_create(self):

        data = {
            "item_name": "Butter",
            "quantity": 1,
            "unit_type": self.unit_type.id,
            "grocery_list": self.grocery_list.id,
        }
        response = self.client.post(self.grocery_item_url, data=data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["item_name"], data["item_name"])

    def test_grocery_items_update(self):
        test_grocery_item = GroceryItem.objects.create(
            item_name="Butter",
            quantity=1,
            unit_type=self.unit_type,
            grocery_list=self.grocery_list,
        )
        data = {
            "item_name": "Butter",
            "quantity": 1,
            "unit_type": self.unit_type.id,
            "grocery_list": self.grocery_list.id,
        }
        self.grocery_item_detail_url = reverse(
            "grocery:groceryitem-detail", args=[test_grocery_item.id]
        )
        response = self.client.put(self.grocery_item_detail_url, data=data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["quantity"], data["quantity"])

    def test_grocery_items_delete(self):
        test_grocery_item = GroceryItem.objects.create(
            item_name="Butter",
            quantity=1,
            unit_type=self.unit_type,
            grocery_list=self.grocery_list,
        )
        self.grocery_item_detail_url = reverse(
            "grocery:groceryitem-detail", args=[test_grocery_item.id]
        )
        response = self.client.delete(self.grocery_item_detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_grocery_items_patch(self):
        test_grocery_item = GroceryItem.objects.create(
            item_name="Butter",
            quantity=1,
            unit_type=self.unit_type,
            grocery_list=self.grocery_list,
        )
        self.grocery_item_detail_url = reverse(
            "grocery:groceryitem-detail", args=[test_grocery_item.id]
        )
        data = {"quantity": 2}
        response = self.client.patch(self.grocery_item_detail_url, data=data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["quantity"], data["quantity"])
