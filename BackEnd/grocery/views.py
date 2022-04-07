from django.shortcuts import render
from rest_framework.generics import get_object_or_404

from .models import UnitType, GroceryList, GroceryItem
from rest_framework import viewsets, generics
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import (
    UnitTypeSerializer,
    GroceryListSerializer,
    GroceryItemSerializer,
)
from rest_framework.response import Response


class UnitTypeViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = UnitType.objects.all()
    serializer_class = UnitTypeSerializer


class GroceryItemViewSet(viewsets.ModelViewSet):
    queryset = GroceryItem.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = GroceryItemSerializer


class GroceryListViewSet(viewsets.ModelViewSet):

    serializer_class = GroceryListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return GroceryList.objects.filter(owner=self.request.user)
