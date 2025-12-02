
from django.urls import path, include
from rest_framework import routers
from .views import BookViewSet, OrderViewSet, RegisterView

router = routers.DefaultRouter()
router.register('books', BookViewSet, basename='book')
router.register('orders', OrderViewSet, basename='order')

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('', include(router.urls)),
]
