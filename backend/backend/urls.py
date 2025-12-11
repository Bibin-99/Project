from django.urls import path, include
from custom_admin import views as admin_views
from django.shortcuts import redirect

# Redirect root URL to custom admin login
def redirect_to_admin(request):
    return redirect('custom_admin_login')

urlpatterns = [
    path('', redirect_to_admin),

    # API
    path('api/', include('library.urls')),
    path('api/auth/', include('users.urls')),

    # Custom admin panel
    path('admin-panel/', admin_views.login_view, name='custom_admin_login'),
    path('admin-panel/dashboard/', admin_views.dashboard, name='custom_admin_dashboard'),
    path('admin-panel/books/', admin_views.admin_books, name='custom_admin_books'),
    path('admin-panel/orders/', admin_views.admin_orders, name='custom_admin_orders'),  
    path('admin-panel/users/', admin_views.admin_users, name='custom_admin_users'),
    path('admin-panel/logout/', admin_views.admin_logout, name='custom_admin_logout'),


]
