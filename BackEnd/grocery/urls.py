from rest_framework import routers
from .views import UnitTypeViewSet, GroceryItemViewSet, GroceryListViewSet
from django.urls import path, include

app_name = "grocery"
router = routers.DefaultRouter()
router.register(r"unittypes", UnitTypeViewSet)
router.register(r"grocerylists", GroceryListViewSet, basename="grocerylist")
router.register(r"groceryitems", GroceryItemViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
