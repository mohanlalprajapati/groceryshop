from django.test import TestCase
from rest_framework import status
from django.urls import reverse
from rest_framework.test import APIClient, APITestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken


# Create your tests here.
from grocery.models import UnitType


class TestGroceryAppTestCases(APITestCase):
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
        self.unit_type_url = reverse("grocery:unittype-list")

    def test_unit_type_get(self):
        # self.client.login(**self.credentials)
        response = self.client.get(self.unit_type_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_unit_type_create(self):
        data = {"name": "KG"}
        response = self.client.post(self.unit_type_url, data=data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["name"], data["name"])

    def test_unit_types_update(self):
        test_unit_type = UnitType.objects.create(name="Liter")
        self.unit_type_detail_url = reverse(
            "grocery:unittype-detail", args=[test_unit_type.id]
        )
        response = self.client.put(self.unit_type_detail_url, data={"name": "Litre"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_unit_types_delete(self):
        test_unit_type = UnitType.objects.create(name="Liter")
        self.unit_type_detail_url = reverse(
            "grocery:unittype-detail", args=[test_unit_type.id]
        )
        response = self.client.delete(self.unit_type_detail_url, data={"name": "Litre"})
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_unit_types_patch(self):
        test_unit_type = UnitType.objects.create(name="Liter")
        self.unit_type_detail_url = reverse(
            "grocery:unittype-detail", args=[test_unit_type.id]
        )
        response = self.client.patch(self.unit_type_detail_url, data={"name": "Litre"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
