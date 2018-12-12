import hashlib
import random
import time
import uuid

from django.http import HttpResponse
from django.shortcuts import render, redirect

# Create your views here.
from shanmao1.models import Goods, User


def index(request):
    goodlist = Goods.objects.all()
    # username = request.COOKIES.get('username')
    token = request.session.get('token')
    # username = request.session.get('username')
    if token:
        users = User.objects.filter(token=token)
        user = users.first()
        # username = User.username

    else:
        user = None

    data = {
        'user': user,
        # 'username': username,
        'goodlist': goodlist

    }

    return render(request, 'index.html', context=data)


def generate_token():

    token = str(time.time()) + str(random.random())
    md5 = hashlib.md5()
    md5.update(token.encode('utf-8'))

    return md5.hexdigest()

def generate_password(password):
    md5 = hashlib.md5()
    md5.update(password.encode('utf-8'))
    return md5.hexdigest()


def register(request):
    if request.method == 'GET':
        return render(request, 'regist.html')
    elif request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        email = request.POST.get('email')

        user = User()
        user.email = email
        user.username = username
        user.password = generate_password(password)
        user.token = generate_token()
        user.save()

        response = redirect('sm:index')

        

        request.session['token'] = user.token





        # response.set_cookie('username',username)
        return response


def nike(request):
    goodlist = Goods.objects.all()

    data = {
        'goodlist': goodlist
    }
    return render(request, 'nike.html', context=data)


def logout(request):
    response = redirect('sm:index')

    request.session.flush()
    return response


def login(request):
    if request.method == 'GET':
        return render(request, 'login.html')
    elif request.method == 'POST':
        username = request.POST.get('username')
        password = generate_password(request.POST.get('password'))

        users = User.objects.filter(username=username).filter(password=password)

        if users.count():
            response = redirect('sm:index')
            user = users.first()
            user.token = generate_token()
            user.save()
            request.session['token'] = user.token
            # response.set_cookie('token', user.token)
            return response
        else:

            return render(request, 'login.html', context={'err': '用户名或密码错误'})


def balance(request):
    return None
