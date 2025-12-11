from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from library.models import Book, Order
from django import forms


# ---------------------------
# LOGIN FORM
# ---------------------------
class LoginForm(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)


# ---------------------------
# LOGIN VIEW
# ---------------------------
def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            u = authenticate(
                username=form.cleaned_data['username'],
                password=form.cleaned_data['password']
            )
            if u and u.is_staff:
                login(request, u)
                return redirect('custom_admin_dashboard')
        return render(
            request,
            'admin_login.html',
            {'form': form, 'error': 'Invalid credentials or not staff user'}
        )

    else:
        form = LoginForm()

    return render(request, 'admin_login.html', {'form': form})


# ---------------------------
# DASHBOARD
# ---------------------------
@login_required
def dashboard(request):
    if not request.user.is_staff:
        return redirect('custom_admin_login')

    books = Book.objects.count()
    orders = Order.objects.count()

    return render(
        request,
        'admin_dashboard.html',
        {'books': books, 'orders': orders}
    )


# ---------------------------
# MANAGE BOOKS
# ---------------------------
@login_required
def admin_books(request):
    if not request.user.is_staff:
        return redirect('custom_admin_login')

    if request.method == 'POST':
        Book.objects.create(
            title=request.POST.get('title', ''),
            author=request.POST.get('author', ''),
            description=request.POST.get('description', ''),
            price=request.POST.get('price') or 0,
            stock=request.POST.get('stock') or 0,
            cover=request.POST.get('cover', ''),
        )
        return redirect('custom_admin_books')

    books = Book.objects.all().order_by('-id')
    return render(request, 'admin_books.html', {'books': books})


# ---------------------------
# MANAGE ORDERS
# ---------------------------
@login_required
def admin_orders(request):
    if not request.user.is_staff:
        return redirect('custom_admin_login')

    orders = Order.objects.all().order_by('-id')
    return render(request, 'admin_orders.html', {'orders': orders})


# ---------------------------
# MANAGE USERS (NEW)
# ---------------------------
@login_required
def admin_users(request):
    if not request.user.is_staff:
        return redirect('custom_admin_login')

    from django.contrib.auth.models import User
    users = User.objects.all().order_by('-id')

    return render(request, 'admin_users.html', {'users': users})



@login_required
def admin_logout(request):
    logout(request)
    return redirect('custom_admin_login')

