from django.urls import path
from .views import (
    BookListCreateView, BookRetrieveView,
    CreateOrderView, MyOrdersView,
    cart, add_to_cart, payment
)

urlpatterns = [
    path('books/', BookListCreateView.as_view()),
    path('books/<int:pk>/', BookRetrieveView.as_view()),

    path('orders/', CreateOrderView.as_view()),
    path('my-orders/', MyOrdersView.as_view()),

    path('cart/', cart),
    path('cart/add/', add_to_cart),

    path('payment/', payment),
]
