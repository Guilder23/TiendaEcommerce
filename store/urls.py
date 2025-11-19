from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('logout/', views.logout_view, name='logout'),
    #--------------------------------------------------------------------------
    # GESTION DE PRODUCTOS
    path('productos/', views.product_list, name='product_list'),
    path('mis-productos/', views.my_products, name='my_products'),
    path('productos/nuevo/', views.product_create, name='product_create'),
    path('productos/<int:pk>/editar/', views.product_edit, name='product_edit'),
    path('productos/<int:pk>/estado/', views.product_set_status, name='product_set_status'),
    path('productos/<int:pk>/eliminar/', views.product_delete, name='product_delete'),
    #--------------------------------------------------------------------------
    # PERFIL
    path('perfil/', views.profile, name='profile'),
    path('perfil/password/', views.profile_password, name='profile_password'),
    #--------------------------------------------------------------------------
    # USUARIOS (ADMIN)
    path('usuarios/', views.users_list, name='users_list'),
    path('usuarios/nuevo/', views.user_create, name='user_create'),
    path('usuarios/<int:pk>/editar/', views.user_edit, name='user_edit'),
    path('usuarios/<int:pk>/eliminar/', views.user_delete, name='user_delete'),
]