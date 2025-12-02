
from django.db import models
from django.contrib.auth.models import User

class Book(models.Model):
    TITLE_TYPE_CHOICES = [('rent','Rent'), ('buy','Buy'), ('both','Both')]
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=200, blank=True)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    available_copies = models.IntegerField(default=1)
    mode = models.CharField(max_length=10, choices=TITLE_TYPE_CHOICES, default='both')
    cover = models.CharField(max_length=500, blank=True)

    def __str__(self):
        return self.title

class Order(models.Model):
    ORDER_TYPE = [('rent','Rent'), ('buy','Buy')]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    created_at = models.DateTimeField(auto_now_add=True)
    order_type = models.CharField(max_length=10, choices=ORDER_TYPE)
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0)

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    book = models.ForeignKey(Book, on_delete=models.PROTECT)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=8, decimal_places=2)
