from django.shortcuts import render
from rest_framework.generics import get_object_or_404

from .models import UnitType, GroceryList, GroceryItem
from rest_framework import viewsets, generics

from rest_framework import status
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

    def get_queryset(self):
        return GroceryItem.objects.filter(grocery_list__owner=self.request.user)


class GroceryListViewSet(viewsets.ModelViewSet):

    serializer_class = GroceryListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return GroceryList.objects.filter(owner=self.request.user)

    def create(self, request, *args, **kwargs):
        data = request.data.copy()

        user = request.user
        data["owner"] = user.id
        serializer = GroceryListSerializer(data=data)
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        data = request.data.copy()
        print(data)
        user = request.user
        data["owner"] = user.id
        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        if getattr(instance, "_prefetched_objects_cache", None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)
