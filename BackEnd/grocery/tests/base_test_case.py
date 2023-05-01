from django.urls import reverse
from rest_framework.test import APITestCase
from django.contrib.auth.models import User


class GroceryBaseTestCase(APITestCase):
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
