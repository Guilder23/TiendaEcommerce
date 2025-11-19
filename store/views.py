from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib.auth import update_session_auth_hash
from django.db import transaction
from .models import Product, Profile

def home(request):
    return render(request, 'store/home.html')

def register_view(request):
    if request.method != 'POST':
        return redirect('home')
    username = request.POST.get('username', '').strip()
    email = request.POST.get('email', '').strip()
    password = request.POST.get('password', '')
    password2 = request.POST.get('password2', '')
    if not username or not password:
        messages.error(request, 'Usuario y contraseña son obligatorios')
        return redirect('home')
    if password != password2:
        messages.error(request, 'Las contraseñas no coinciden')
        return redirect('home')
    if User.objects.filter(username=username).exists():
        messages.error(request, 'El usuario ya existe')
        return redirect('home')
    user = User.objects.create_user(username=username, email=email or None, password=password)
    login(request, user)
    messages.success(request, 'Registro exitoso')
    return redirect('home')

def login_view(request):
    if request.method != 'POST':
        return redirect('home')
    username = request.POST.get('username', '').strip()
    password = request.POST.get('password', '')
    user = authenticate(request, username=username, password=password)
    if user is None:
        messages.error(request, 'Credenciales inválidas')
        return redirect('home')
    login(request, user)
    messages.success(request, 'Inicio de sesión exitoso')
    return redirect('home')

def logout_view(request):
    logout(request)
    messages.info(request, 'Sesión cerrada')
    return redirect('home')

#--------------------------------------------------------------------------
# GESTION DE PRODUCTOS
def product_list(request):
    products = Product.objects.filter(status='published').order_by('-created_at')
    return render(request, 'productos/listar_productos.html', {'products': products})

@login_required
def my_products(request):
    products = Product.objects.filter(owner=request.user).order_by('-created_at')
    return render(request, 'productos/mis_productos.html', {'products': products})

@login_required
def product_create(request):
    if request.method == 'GET':
        return redirect('my_products')
    with transaction.atomic():
        name = request.POST.get('name', '').strip()
        description = request.POST.get('description', '').strip()
        price = request.POST.get('price', '').strip()
        status = request.POST.get('status', 'draft')
        photo = request.FILES.get('photo')
        if not name or not price:
            messages.error(request, 'Nombre y precio son obligatorios')
            return redirect('my_products')
        try:
            p = Product(owner=request.user, name=name, description=description, price=price, status=status)
            if photo:
                p.photo = photo
            p.save()
            messages.success(request, 'Producto creado')
            return redirect('my_products')
        except Exception:
            messages.error(request, 'Error al crear producto')
            return redirect('my_products')

@login_required
def product_edit(request, pk):
    try:
        p = Product.objects.get(pk=pk, owner=request.user)
    except Product.DoesNotExist:
        messages.error(request, 'Producto no encontrado')
        return redirect('my_products')
    if request.method == 'GET':
        return redirect('my_products')
    with transaction.atomic():
        p.name = request.POST.get('name', '').strip()
        p.description = request.POST.get('description', '').strip()
        p.price = request.POST.get('price', '').strip()
        p.status = request.POST.get('status', p.status)
        photo = request.FILES.get('photo')
        if photo:
            p.photo = photo
        p.save()
        messages.success(request, 'Producto actualizado')
        return redirect('my_products')

@login_required
def product_set_status(request, pk):
    if request.method != 'POST':
        return redirect('my_products')
    try:
        p = Product.objects.get(pk=pk, owner=request.user)
    except Product.DoesNotExist:
        messages.error(request, 'Producto no encontrado')
        return redirect('my_products')
    s = request.POST.get('status')
    if s not in ['draft', 'published', 'sold']:
        messages.error(request, 'Estado inválido')
        return redirect('my_products')
    p.status = s
    p.save()
    if s == 'published':
        messages.success(request, 'Producto publicado')
    elif s == 'draft':
        messages.info(request, 'Producto cambiado a borrador')
    else:
        messages.info(request, 'Producto marcado como vendido')
    return redirect('my_products')

@login_required
def product_delete(request, pk):
    try:
        p = Product.objects.get(pk=pk, owner=request.user)
    except Product.DoesNotExist:
        messages.error(request, 'Producto no encontrado')
        return redirect('my_products')
    p.status = 'draft'
    p.save()
    messages.info(request, 'Producto eliminado')
    return redirect('my_products')

#--------------------------------------------------------------------------
# PERFIL
@login_required
def profile(request):
    profile, _ = Profile.objects.get_or_create(user=request.user)
    if request.method == 'GET':
        return render(request, 'perfil/perfil.html', {'profile': profile})
    with transaction.atomic():
        profile.first_name = request.POST.get('name', '').strip()
        profile.address = request.POST.get('address', '').strip()
        profile.phone = request.POST.get('phone', '').strip()
        photo = request.FILES.get('photo')
        if photo:
            profile.photo = photo
        email = request.POST.get('email', '').strip()
        request.user.email = email
        request.user.save()
        profile.save()
        messages.success(request, 'Perfil actualizado')
        return redirect('profile')

@login_required
def profile_password(request):
    if request.method != 'POST':
        return render(request, 'perfil/cambiar_password.html')
    current = request.POST.get('current_password', '')
    new = request.POST.get('new_password', '')
    new2 = request.POST.get('new_password2', '')
    if not request.user.check_password(current):
        messages.error(request, 'Contraseña actual incorrecta')
        return redirect('profile_password')
    if not new or new != new2:
        messages.error(request, 'Las contraseñas no coinciden')
        return redirect('profile_password')
    request.user.set_password(new)
    request.user.save()
    update_session_auth_hash(request, request.user)
    messages.success(request, 'Contraseña actualizada')
    return redirect('profile')
