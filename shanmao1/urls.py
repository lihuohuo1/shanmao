from django.conf.urls import url

from shanmao1 import views

urlpatterns = [
    url(r'^$',views.index,name='index'),
    url(r'^index$',views.index,name='index1'),
    url(r'^login$',views.login,name='login'),
    url(r'^$',views.register,name='register'),
]