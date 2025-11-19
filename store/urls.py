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
    # CARRITO
    path('cart/add/<int:pk>/', views.cart_add, name='cart_add'),
    path('cart/list.json', views.cart_list_json, name='cart_list_json'),
    path('cart/count.json', views.cart_count_json, name='cart_count_json'),
    path('cart/remove/<int:item_id>/', views.cart_remove, name='cart_remove'),
    # CHECKOUT
    path('checkout/', views.checkout, name='checkout'),
    path('checkout/submit/', views.checkout_submit, name='checkout_submit'),
    # VENTAS ADMIN
    path('ventas/', views.sales_list, name='sales_list'),
    path('ventas/<int:pk>/confirmar/', views.sales_confirm, name='sales_confirm'),
    path('ventas/<int:pk>/rechazar/', views.sales_reject, name='sales_reject'),
    # COMPRAS BUYER
    path('compras/', views.purchases_list, name='purchases_list'),
    # NOTIFICACIONES
    path('notifications/count.json', views.notifications_count_json, name='notifications_count_json'),
    path('notifications/list.json', views.notifications_list_json, name='notifications_list_json'),
]