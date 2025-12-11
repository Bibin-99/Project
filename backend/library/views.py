from rest_framework import generics, permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from .models import Book, Order, CartItem
from .serializers import BookSerializer, OrderSerializer, CartItemSerializer


# -------------------
# BOOK VIEWS
# -------------------
class BookListCreateView(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [permissions.AllowAny]


class BookRetrieveView(generics.RetrieveAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [permissions.AllowAny]


# -------------------
# CART VIEWS
# -------------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def cart(request):
    items = CartItem.objects.filter(user=request.user)
    serializer = CartItemSerializer(items, many=True)
    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    serializer = CartItemSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response({"msg": "Added to cart"})
    return Response(serializer.errors, status=400)


# -------------------
# ORDER VIEWS
# -------------------
class CreateOrderView(generics.CreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class MyOrdersView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by('-ordered_at')


# -------------------
# PAYMENT VIEW
# -------------------
@api_view(['GET'])
def payment(request):
    return Response({"msg": "payment page"})
