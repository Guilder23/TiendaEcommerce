from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

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
