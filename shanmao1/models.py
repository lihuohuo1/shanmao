from django.db import models

# Create your models here.


class Goods(models.Model):
    img = models.CharField(max_length=100)
    information = models.CharField(max_length=100)
    RMB = models.CharField(max_length=10)
    price = models.DecimalField(max_digits=6,decimal_places=2)
    original =models.DecimalField(max_digits=6,decimal_places=2)


class User(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    email = models.CharField(max_length=100)