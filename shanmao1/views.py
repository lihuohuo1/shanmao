import hashlib
import random
import time

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect

# Create your views here.
from shanmao1.models import Goods, User, Balance


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


def nike(request,id):
    token = request.session.get('token')
    users = User.objects.filter(token=token)
    user = users.first()
    if token:
        goods = Goods.objects.get(goodsid=int(id))
        goods.save()

        data = {
            'goods':goods,
            'id':id,
            'user': user,

        }
        return render(request, 'nike.html',context=data)
    else:
        return render(request,'login.html')




def addcart(request):
    token = request.session['token']
    goodsid = request.GET.get('goodsid')
    data = {}
    if token:
        user = User.objects.get(token=token)
        goods = Goods.objects.get(pk=goodsid)
        balances = Balance.objects.filter(user=user).filter(goods=goods)
        if balances.exists():
            pass
        else:
            balance = Balance()
            balance.user = user
            balance.goods = goods
            balance.number = 1
            balance.save()

        return  JsonResponse({'msg':'{},添加购物车成功'.format(goods.information), 'number': balance.number})
    else:
        data['msg'] = '请登录后操作!'
        data['status'] = -1
        return redirect('sm:login')


def balance(request):

    token = request.session.get('token')
    users = User.objects.filter(token=token)
    user = users.first()
    if token:


        data = {
            'user': user,

        }
        return render(request, 'balance.html',context=data)
    else:
        return render(request,'login.html')