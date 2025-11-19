from django.db import models
from django.contrib.auth.models import User

class Product(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Borrador'),
        ('published', 'Publicado'),
        ('sold', 'Vendido'),
    ]
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    description = models.TextField()
    photo = models.ImageField(upload_to='products/', null=True, blank=True)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='draft')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    first_name = models.CharField(max_length=150, blank=True)
    address = models.TextField(blank=True)
    phone = models.CharField(max_length=30, blank=True)
    photo = models.ImageField(upload_to='profiles/', null=True, blank=True)
    role = models.CharField(max_length=10, choices=[('admin','Admin'),('buyer','Comprador')], default='buyer')
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.username
