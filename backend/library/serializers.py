from rest_framework import serializers
from .models import Book, Order, CartItem

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'


class CartItemSerializer(serializers.ModelSerializer):
    book = BookSerializer(read_only=True)
    book_id = serializers.PrimaryKeyRelatedField(
        queryset=Book.objects.all(),
        write_only=True,
        source='book'
    )

    class Meta:
        model = CartItem
        fields = ['id', 'user', 'book', 'book_id', 'quantity']
        read_only_fields = ['id', 'user', 'book']


class OrderSerializer(serializers.ModelSerializer):
    book = BookSerializer(read_only=True)
    book_id = serializers.PrimaryKeyRelatedField(
        queryset=Book.objects.all(),
        write_only=True,
        source='book'
    )

    class Meta:
        model = Order
        fields = ['id', 'user', 'book', 'book_id', 'quantity', 'ordered_at', 'is_rental']
        read_only_fields = ['id', 'user', 'ordered_at', 'book']
