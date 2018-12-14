from django.db import models

# Create your models here.

# 商品
class Goods(models.Model):
    img = models.CharField(max_length=100)
    information = models.CharField(max_length=100)
    RMB = models.CharField(max_length=10)
    price = models.DecimalField(max_digits=6,decimal_places=2)
    original =models.DecimalField(max_digits=6,decimal_places=2)
    goodsid = models.CharField(max_length=8,default='')

# 用户
class User(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    token = models.CharField(max_length=256,default='')

# 购物车
class Balance(models.Model):
    user = models.ForeignKey(User)
    goods = models.ForeignKey(Goods)
    number = models.IntegerField()
    isselect = models.BooleanField(default=True)