from rest_framework import status
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status

# Create your tests here.
from grocery.models import UnitType
from grocery.tests.base_test_case import GroceryBaseTestCase


class TestGroceryAppTestCases(GroceryBaseTestCase):
    def setUp(self):
        super().setUp()
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
