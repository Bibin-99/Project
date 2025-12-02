
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Book, Order, OrderItem

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ('id','username','email','password')
    def create(self, validated_data):
        user = User(username=validated_data['username'], email=validated_data.get('email',''))
        user.set_password(validated_data['password'])
        user.save()
        return user

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    book = BookSerializer(read_only=True)
    book_id = serializers.PrimaryKeyRelatedField(queryset=Book.objects.all(), source='book', write_only=True)
    class Meta:
        model = OrderItem
        fields = ('id','book','book_id','quantity','price')

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    class Meta:
        model = Order
        fields = ('id','user','created_at','order_type','total','items')
        read_only_fields = ('user','created_at','total')

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        user = self.context['request'].user
        order = Order.objects.create(user=user, **validated_data)
        total = 0
        for it in items_data:
            book = it['book']
            quantity = it.get('quantity',1)
            price = it.get('price', book.price)
            OrderItem.objects.create(order=order, book=book, quantity=quantity, price=price)
            total += price * quantity
        order.total = total
        order.save()
        return order
