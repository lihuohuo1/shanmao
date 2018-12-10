from django.http import HttpResponse
from django.shortcuts import render, redirect

# Create your views here.
from shanmao1.models import Goods, User


def index(request):
    # goodlist = Goods.objects.all()
    #
    # data = {
    #     'goodlist': goodlist
    # }

    # 获取用户信息

    username = request.COOKIES.get('username')

    return render(request,'index.html', context={'username': username})




def register(request):
    if request.method == 'GET':
        return render(request,'regist.html')
    elif request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        email = request.POST.get('email')

        user = User()
        user.username = username
        user.password = password
        user.email = email
        user.save()

        response = redirect('sm:index')

        response.set_cookie('username',username)
        return response


def nike(request):
    goodlist = Goods.objects.all()

    data = {
        'goodlist' : goodlist
    }
    return render(request, 'nike.html', context=data)


def logout(request):
    response = redirect('sm:index')

    response.delete_cookie('username')
    return response


def login(request):
    if request.method == 'GET':
        return render(request, 'login.html')
    elif request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        users = User.objects.filter(username=username).filter(password=password)
        if users.count():
            response = redirect('sm:index')
            response.set_cookie('username',username)
            return response
        else:

            return render(request,'login.html',context={'err':'用户名或密码错误'})


def balance(request):
    return None